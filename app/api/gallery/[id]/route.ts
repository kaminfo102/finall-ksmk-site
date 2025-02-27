import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const item = await prisma.gallery.update({
      where: {
        id: parseInt(params.id)
      },
      data: {
        title: body.title,
        imageUrl: body.imageUrl,
        description: body.description
      }
    })
    return NextResponse.json(item)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update gallery item' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.gallery.delete({
      where: {
        id: parseInt(params.id)
      }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete gallery item' },
      { status: 500 }
    )
  }
}