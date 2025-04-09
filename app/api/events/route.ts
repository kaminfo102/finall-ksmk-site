import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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
    })
    return NextResponse.json(events)
  } catch (error) {
    return NextResponse.json(
      { error: 'خطا در دریافت رویدادها' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const event = await prisma.event.create({
      data: {
        title: body.title,
        description: body.description,
        content: body.content,
        imageUrl: body.imageUrl,
        date: new Date(body.date),
        location: body.location,
        capacity: body.capacity,
        price: body.price,
        images: {
          create: body.images.map((image: { url: string }) => ({
            url: image.url
          }))
        }
      },
      include: {
        images: true
      }
    })
    return NextResponse.json(event)
  } catch (error) {
    return NextResponse.json(
      { error: 'خطا در ایجاد رویداد' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    
    // First, delete all existing images
    await prisma.eventImage.deleteMany({
      where: {
        eventId: body.id
      }
    })

    // Then update the event with new data
    const event = await prisma.event.update({
      where: {
        id: body.id
      },
      data: {
        title: body.title,
        description: body.description,
        content: body.content,
        imageUrl: body.imageUrl,
        date: new Date(body.date),
        location: body.location,
        capacity: body.capacity,
        price: body.price,
        images: {
          create: body.images.map((image: { url: string }) => ({
            url: image.url
          }))
        }
      },
      include: {
        images: true
      }
    })
    return NextResponse.json(event)
  } catch (error) {
    return NextResponse.json(
      { error: 'خطا در به‌روزرسانی رویداد' },
      { status: 500 }
    )
  }
} 