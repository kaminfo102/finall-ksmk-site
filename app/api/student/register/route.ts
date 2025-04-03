import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, password, phone } = body

    // Check if email already exists
    const existingStudent = await prisma.student.findUnique({
      where: { email },
    })

    if (existingStudent) {
      return NextResponse.json(
        { error: "این ایمیل قبلاً ثبت شده است" },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create student
    const student = await prisma.student.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phone,
      },
    })

    return NextResponse.json(
      { message: "ثبت‌نام با موفقیت انجام شد" },
      { status: 201 }
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "خطا در ثبت‌نام" },
      { status: 500 }
    )
  }
} 