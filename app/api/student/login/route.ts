import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"
import { sign } from "jsonwebtoken"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Find student
    const student = await prisma.student.findUnique({
      where: { email },
    })

    if (!student) {
      return NextResponse.json(
        { error: "ایمیل یا رمز عبور اشتباه است" },
        { status: 401 }
      )
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, student.password)

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "ایمیل یا رمز عبور اشتباه است" },
        { status: 401 }
      )
    }

    // Create token
    const token = sign(
      { id: student.id, email: student.email },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" }
    )

    // Set cookie
    cookies().set("student-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return NextResponse.json(
      { message: "ورود موفقیت‌آمیز" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { error: "خطا در ورود" },
      { status: 500 }
    )
  }
} 