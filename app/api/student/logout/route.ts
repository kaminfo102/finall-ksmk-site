import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
  try {
    // Delete the token cookie
    cookies().delete("student-token")

    return NextResponse.json(
      { message: "خروج موفقیت‌آمیز" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json(
      { error: "خطا در خروج" },
      { status: 500 }
    )
  }
} 