import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const item = await prisma.gallery.create({
      data: {
        title: body.title,
        imageUrl: body.imageUrl,
        description: body.description
      }
    })
    return NextResponse.json(item)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create gallery item' },
      { status: 500 }
    )
  }
}