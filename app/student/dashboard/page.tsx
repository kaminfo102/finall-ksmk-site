"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"
import { verify } from "jsonwebtoken"
import { redirect } from "next/navigation"
import StudentDashboardClient from "./client"

type Student = {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string | null
}

export default async function StudentDashboardPage() {
  // Get token from cookie
  const token = cookies().get("student-token")?.value

  if (!token) {
    redirect("/student/login")
  }

  // Verify token and get student data
  const decoded = verify(token, process.env.JWT_SECRET || "your-secret-key") as {
    id: number
    email: string
  }

  // Get student data with courses and events
  const student = await prisma.student.findUnique({
    where: { id: decoded.id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      enrollments: {
        select: {
          course: {
            select: {
              id: true,
              title: true,
              summary: true,
              imageUrl: true,
            },
          },
          progress: true,
        },
      },
      eventRegistrations: {
        select: {
          event: {
            select: {
              id: true,
              title: true,
              date: true,
              location: true,
            },
          },
          status: true,
        },
      },
    },
  })

  if (!student) {
    redirect("/student/login")
  }

  // Transform the data for the client component
  const transformedStudent = {
    ...student,
    courses: student.enrollments.map((enrollment) => ({
      ...enrollment.course,
      progress: enrollment.progress,
    })),
    events: student.eventRegistrations.map((registration) => ({
      ...registration.event,
      status: registration.status,
    })),
  }

  // Remove the enrollments and eventRegistrations from the student object
  const { enrollments, eventRegistrations, ...studentData } = transformedStudent

  return <StudentDashboardClient student={studentData} />
} 