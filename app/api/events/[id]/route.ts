import { NextResponse } from 'next/server'
import { PrismaClient, Prisma } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

// Validation schema for event ID
const eventIdSchema = z.object({
  id: z.string().refine(
    (val) => !isNaN(Number(val)) && Number(val) > 0,
    "شناسه رویداد نامعتبر است"
  )
})

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const event = await prisma.event.update({
      where: {
        id: parseInt(params.id)
      },
      data: {
        title: body.title,
        description: body.description,
        imageUrl: body.imageUrl,
        date: new Date(body.date),
        location: body.location,
        capacity: body.capacity,
        price: body.price
      }
    })
    return NextResponse.json(event)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Validate event ID
    const validationResult = eventIdSchema.safeParse({ id: params.id })
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'شناسه رویداد نامعتبر است' },
        { status: 400 }
      )
    }

    const eventId = parseInt(params.id)

    // Use transaction to ensure data consistency
    await prisma.$transaction(async (tx) => {
      // Check if event exists
      const event = await tx.event.findUnique({
        where: { id: eventId },
        include: {
          _count: {
            select: { registrations: true }
          }
        }
      })

      if (!event) {
        throw new Error('رویداد مورد نظر یافت نشد')
      }

      // Check if event has registrations
      if (event._count.registrations > 0) {
        throw new Error('این رویداد دارای ثبت نام‌کننده است و قابل حذف نیست')
      }

      // Delete event images first
      await tx.eventImage.deleteMany({
        where: { eventId }
      })

      // Delete event
      await tx.event.delete({
        where: { id: eventId }
      })
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting event:', error)
    
    // Handle specific Prisma errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          { error: 'رویداد مورد نظر یافت نشد' },
          { status: 404 }
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
      { error: 'خطا در حذف رویداد. لطفاً دوباره تلاش کنید' },
      { status: 500 }
    )
  }
}