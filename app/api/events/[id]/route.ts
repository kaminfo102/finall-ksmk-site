import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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
    await prisma.event.delete({
      where: {
        id: parseInt(params.id)
      }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete event' },
      { status: 500 }
    )
  }
}