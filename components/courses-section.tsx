"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Eye, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

type Course = {
  id: number
  title: string
  summary: string
  imageUrl: string
  views: number
  likes: number
}

export function CoursesSection({ courses }: { courses: Course[] }) {
  const [showAll, setShowAll] = useState(false)
  const displayedCourses = showAll ? courses : courses.slice(0, 3)

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">دوره‌های آموزشی</h2>
          <p className="text-muted-foreground">جدیدترین دوره‌های آموزشی ما را مشاهده کنید</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <CardHeader className="p-0">
                  <div className="relative h-48">
                    <Image
                      src={course.imageUrl}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                  <p className="text-muted-foreground line-clamp-2">{course.summary}</p>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex items-center justify-between">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="flex items-center text-muted-foreground">
                      <Eye className="h-4 w-4 ml-1" />
                      <span>{course.views}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Heart className="h-4 w-4 ml-1" />
                      <span>{course.likes}</span>
                    </div>
                  </div>
                  <Link href={`/courses/${course.id}`}>
                    <Button>مشاهده دوره</Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {courses.length > 3 && (
          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "نمایش کمتر" : "مشاهده همه دوره‌ها"}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}