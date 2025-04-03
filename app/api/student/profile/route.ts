import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"
import { verify } from "jsonwebtoken"

export async function GET() {
  try {
    // Get token from cookie
    const token = cookies().get("student-token")?.value

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Verify token
    const decoded = verify(token, process.env.JWT_SECRET || "your-secret-key") as {
      id: number
      email: string
    }

    // Get student data
    const student = await prisma.student.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
      },
    })

    if (!student) {
      return NextResponse.json(
        { error: "Student not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(student)
  } catch (error) {
    console.error("Profile error:", error)
    return NextResponse.json(
      { error: "خطا در دریافت اطلاعات" },
      { status: 500 }
    )
  }
} 