import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const event = await prisma.event.create({
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
      { error: 'Failed to create event' },
      { status: 500 }
    )
  }
}