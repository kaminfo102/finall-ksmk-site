"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

type Student = {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string | null
}

export default function StudentDashboard() {
  const router = useRouter()
  const [student, setStudent] = useState<Student | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch("/api/student/profile")
        if (!response.ok) {
          throw new Error("خطا در دریافت اطلاعات")
        }
        const data = await response.json()
        setStudent(data)
      } catch (error) {
        toast.error("خطا در دریافت اطلاعات")
      } finally {
        setIsLoading(false)
      }
    }

    fetchStudent()
  }, [])

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/student/logout", {
        method: "POST",
      })

      if (!response.ok) {
        throw new Error("خطا در خروج")
      }

      toast.success("خروج موفقیت‌آمیز")
      router.push("/student/login")
    } catch (error) {
      toast.error("خطا در خروج")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">در حال بارگذاری...</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">پنل دانشجو</h1>
          <Button variant="outline" onClick={handleLogout}>
            خروج
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-card p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">اطلاعات شخصی</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">نام:</span> {student?.firstName}
              </p>
              <p>
                <span className="font-medium">نام خانوادگی:</span>{" "}
                {student?.lastName}
              </p>
              <p>
                <span className="font-medium">ایمیل:</span> {student?.email}
              </p>
              {student?.phone && (
                <p>
                  <span className="font-medium">شماره موبایل:</span>{" "}
                  {student.phone}
                </p>
              )}
            </div>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">دوره‌های من</h2>
            <p className="text-muted-foreground">
              در حال حاضر در هیچ دوره‌ای ثبت‌نام نکرده‌اید.
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">رویدادهای من</h2>
            <p className="text-muted-foreground">
              در حال حاضر در هیچ رویدادی ثبت‌نام نکرده‌اید.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 