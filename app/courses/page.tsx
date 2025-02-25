import { PrismaClient } from '@prisma/client'
import { Metadata } from 'next'
import { CoursesSection } from '@/components/courses-section'

const prisma = new PrismaClient()

export const metadata: Metadata = {
  title: 'دوره‌های آموزشی',
  description: 'لیست دوره‌های آموزشی آموزشگاه ما'
}

export default async function CoursesPage() {
  const courses = await prisma.course.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  return (
    <div className="pt-16">
      <div className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">دوره‌های آموزشی</h1>
          <p className="text-muted-foreground">
            جدیدترین و بهترین دوره‌های آموزشی ما را مشاهده کنید
          </p>
        </div>
      </div>
      <CoursesSection courses={courses} />
    </div>
  )
}