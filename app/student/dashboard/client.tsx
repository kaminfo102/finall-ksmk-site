"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

type Course = {
  id: number
  title: string
  summary: string
  imageUrl: string
  progress: number
}

type Event = {
  id: number
  title: string
  date: string
  location: string
  status: string
}

type Student = {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string | null
  courses: Course[]
  events: Event[]
}

export default function StudentDashboardClient({
  student,
}: {
  student: Student
}) {
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/student/logout", {
        method: "POST",
      })

      if (!response.ok) {
        throw new Error("خطا در خروج")
      }

      toast({
        title: "خروج موفقیت‌آمیز",
        description: "در حال انتقال به صفحه ورود...",
      })

      router.push("/student/login")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: error instanceof Error ? error.message : "خطا در خروج",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container max-w-4xl mx-auto py-10">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">پنل دانشجویی</h1>
          <Button
            variant="outline"
            onClick={handleLogout}
            disabled={isLoading}
          >
            {isLoading ? "در حال خروج..." : "خروج"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">اطلاعات شخصی</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">نام:</span> {student.firstName}{" "}
                {student.lastName}
              </p>
              <p>
                <span className="font-medium">ایمیل:</span> {student.email}
              </p>
              <p>
                <span className="font-medium">شماره تماس:</span> {student.phone}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">دوره‌های من</h2>
            {student.courses.length > 0 ? (
              <div className="space-y-4">
                {student.courses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white p-3 rounded-md shadow-sm"
                  >
                    <h3 className="font-medium">{course.title}</h3>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        پیشرفت: {course.progress}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">در حال حاضر هیچ دوره‌ای ثبت‌نام نشده‌اید.</p>
            )}
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">رویدادهای من</h2>
            {student.events.length > 0 ? (
              <div className="space-y-4">
                {student.events.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white p-3 rounded-md shadow-sm"
                  >
                    <h3 className="font-medium">{event.title}</h3>
                    <p className="text-sm text-gray-500">
                      تاریخ: {new Date(event.date).toLocaleDateString("fa-IR")}
                    </p>
                    <p className="text-sm text-gray-500">مکان: {event.location}</p>
                    <p className="text-sm text-gray-500">
                      وضعیت:{" "}
                      <span
                        className={
                          event.status === "confirmed"
                            ? "text-green-600"
                            : event.status === "pending"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }
                      >
                        {event.status === "confirmed"
                          ? "تایید شده"
                          : event.status === "pending"
                          ? "در انتظار تایید"
                          : "لغو شده"}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">در حال حاضر در هیچ رویدادی ثبت‌نام نشده‌اید.</p>
            )}
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">تنظیمات حساب</h2>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.push("/student/profile")}
              >
                ویرایش اطلاعات شخصی
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.push("/student/password")}
              >
                تغییر رمز عبور
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 