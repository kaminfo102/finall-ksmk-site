import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const gallery = await prisma.gallery.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(gallery)
  } catch (error) {
    return NextResponse.json(
      { error: 'خطا در دریافت تصاویر' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, imageUrl, description } = body

    const galleryItem = await prisma.gallery.create({
      data: {
        title,
        imageUrl,
        description,
      },
    })

    return NextResponse.json(galleryItem)
  } catch (error) {
    return NextResponse.json(
      { error: 'خطا در ذخیره تصویر' },
      { status: 500 }
    )
  }
}