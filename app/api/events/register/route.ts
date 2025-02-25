import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const registration = await prisma.eventRegistration.create({
      data: {
        eventId: body.eventId,
        firstName: body.firstName,
        lastName: body.lastName,
        phone: body.phone,
        email: body.email,
        status: 'PENDING'
      }
    })
    return NextResponse.json(registration)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to register for event' },
      { status: 500 }
    )
  }
}