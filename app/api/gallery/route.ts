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