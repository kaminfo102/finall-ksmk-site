import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const gallery = await prisma.gallery.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    return NextResponse.json(gallery)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch gallery items' },
      { status: 500 }
    )
  }
}