import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { Prisma } from '@prisma/client'

// Validation schema for registration data
const registrationSchema = z.object({
  eventId: z.number().int().positive("شناسه رویداد نامعتبر است"),
  firstName: z.string()
    .min(2, "نام باید حداقل ۲ حرف باشد")
    .max(50, "نام نمی‌تواند بیشتر از ۵۰ حرف باشد"),
  lastName: z.string()
    .min(2, "نام خانوادگی باید حداقل ۲ حرف باشد")
    .max(50, "نام خانوادگی نمی‌تواند بیشتر از ۵۰ حرف باشد"),
  phone: z.string()
    .min(11, "شماره تلفن باید ۱۱ رقم باشد")
    .max(11, "شماره تلفن باید ۱۱ رقم باشد")
    .regex(/^09[0-9]{9}$/, "شماره تلفن باید با ۰۹ شروع شود"),
  email: z.string()
    .email("ایمیل معتبر نیست")
    .optional()
    .or(z.literal("")),
  age: z.number()
    .int()
    .min(1, "سن باید حداقل ۱ سال باشد")
    .max(100, "سن نمی‌تواند بیشتر از ۱۰۰ سال باشد"),
  gender: z.enum(["male", "female"], {
    required_error: "لطفاً جنسیت را انتخاب کنید"
  }),
  address: z.string()
    .min(10, "آدرس باید حداقل ۱۰ حرف باشد")
    .max(200, "آدرس نمی‌تواند بیشتر از ۲۰۰ حرف باشد"),
  emergencyContact: z.string()
    .min(11, "شماره تماس اضطراری باید ۱۱ رقم باشد")
    .max(11, "شماره تماس اضطراری باید ۱۱ رقم باشد")
    .regex(/^09[0-9]{9}$/, "شماره تماس اضطراری باید با ۰۹ شروع شود"),
  medicalConditions: z.string()
    .max(500, "توضیحات پزشکی نمی‌تواند بیشتر از ۵۰۰ حرف باشد")
    .optional()
    .or(z.literal("")),
  notes: z.string()
    .max(500, "یادداشت‌ها نمی‌تواند بیشتر از ۵۰۰ حرف باشد")
    .optional()
    .or(z.literal(""))
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // Validate input data
    const validationResult = registrationSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'اطلاعات نامعتبر است', details: validationResult.error.errors },
        { status: 400 }
      )
    }

    const data = validationResult.data

    // Use transaction to ensure data consistency
    const result = await prisma.$transaction(async (tx) => {
      // Check if event exists and has capacity
      const event = await tx.event.findUnique({
        where: { id: data.eventId },
        include: {
          _count: {
            select: { registrations: true }
          }
        }
      })

      if (!event) {
        throw new Error('رویداد مورد نظر یافت نشد')
      }

      if (event._count.registrations >= event.capacity) {
        throw new Error('ظرفیت رویداد تکمیل شده است')
      }

      // Check if user is already registered
      const existingRegistration = await tx.registration.findFirst({
        where: {
          eventId: data.eventId,
          OR: [
            { phone: data.phone },
            ...(data.email ? [{ email: data.email }] : [])
          ]
        }
      })

      if (existingRegistration) {
        throw new Error('شما قبلاً در این رویداد ثبت نام کرده‌اید')
      }

      // Create registration
      const registrationData: any = {
        eventId: data.eventId,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone
      };
      
      if (data.email) {
        registrationData.email = data.email;
      }
      
      const registration = await tx.registration.create({
        data: registrationData
      })

      return registration
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error in event registration:', error)
    
    // Handle specific Prisma errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          { error: 'شما قبلاً در این رویداد ثبت نام کرده‌اید' },
          { status: 400 }
        )
      }
    }
    
    // Handle custom errors from transaction
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'خطا در ثبت نام. لطفاً دوباره تلاش کنید' },
      { status: 500 }
    )
  }
}