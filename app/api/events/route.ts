import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Event validation schema
const eventInputSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(2, "عنوان باید حداقل ۲ حرف باشد"),
  description: z.string().min(10, "توضیحات باید حداقل ۱۰ حرف باشد"),
  content: z.string().optional().nullable(),
  imageUrl: z.string().url("آدرس تصویر معتبر نیست"),
  date: z.string().min(1, "تاریخ را وارد کنید"),
  location: z.string().min(2, "مکان را وارد کنید"),
  capacity: z.number().int().min(1, "ظرفیت باید حداقل ۱ نفر باشد"),
  price: z.number().nullable().optional(),
  images: z.array(z.object({
    url: z.string().url("آدرس تصویر معتبر نیست")
  })).optional().default([])
});

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      include: {
        registrations: true,
        images: true
      },
      orderBy: {
        date: 'desc'
      }
    });
    
    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'خطا در دریافت رویدادها' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validationResult = eventInputSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'داده‌های ورودی نامعتبر هستند', details: validationResult.error.format() },
        { status: 400 }
      );
    }
    
    const data = validationResult.data;
    const date = new Date(data.date);
    
    if (isNaN(date.getTime())) {
      return NextResponse.json(
        { error: 'فرمت تاریخ نامعتبر است' },
        { status: 400 }
      );
    }

    // Create event with optimized data structure
    const event = await prisma.event.create({
      data: {
        title: data.title,
        description: data.description,
        content: data.content,
        imageUrl: data.imageUrl,
        date,
        location: data.location,
        capacity: data.capacity,
        price: data.price,
        images: {
          create: data.images.map(image => ({ url: image.url }))
        }
      },
      include: {
        images: true
      }
    });
    
    return NextResponse.json(event);
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'خطا در ایجاد رویداد: ' + (error instanceof Error ? error.message : 'خطای ناشناخته') },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validationResult = eventInputSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'داده‌های ورودی نامعتبر هستند', details: validationResult.error.format() },
        { status: 400 }
      );
    }
    
    const data = validationResult.data;
    
    if (!data.id) {
      return NextResponse.json(
        { error: 'شناسه رویداد وجود ندارد' },
        { status: 400 }
      );
    }
    
    const date = new Date(data.date);
    
    if (isNaN(date.getTime())) {
      return NextResponse.json(
        { error: 'فرمت تاریخ نامعتبر است' },
        { status: 400 }
      );
    }

    // Use transaction to ensure data integrity
    const event = await prisma.$transaction(async (tx) => {
      // Delete existing images
      await tx.eventImage.deleteMany({
        where: {
          eventId: data.id
        }
      });

      // Update event with new data
      return tx.event.update({
        where: {
          id: data.id
        },
        data: {
          title: data.title,
          description: data.description,
          content: data.content,
          imageUrl: data.imageUrl,
          date,
          location: data.location,
          capacity: data.capacity,
          price: data.price,
          images: {
            create: data.images.map(image => ({ url: image.url }))
          }
        },
        include: {
          images: true
        }
      });
    });
    
    return NextResponse.json(event);
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json(
      { error: 'خطا در به‌روزرسانی رویداد: ' + (error instanceof Error ? error.message : 'خطای ناشناخته') },
      { status: 500 }
    );
  }
} 