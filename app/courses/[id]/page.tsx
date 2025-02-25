import { PrismaClient } from '@prisma/client'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Eye, Heart } from 'lucide-react'
import { Metadata } from 'next'
import ReactMarkdown from 'react-markdown'

const prisma = new PrismaClient()

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const course = await prisma.course.findUnique({
    where: { id: parseInt(params.id) }
  })

  if (!course) {
    return {
      title: 'دوره یافت نشد',
      description: 'متأسفانه دوره مورد نظر یافت نشد.'
    }
  }

  return {
    title: course.title,
    description: course.summary
  }
}

export default async function CoursePage({ params }: Props) {
  const course = await prisma.course.findUnique({
    where: { id: parseInt(params.id) }
  })

  if (!course) {
    notFound()
  }

  return (
    <article className="pt-16">
      <div className="relative h-[400px] md:h-[500px]">
        <Image
          src={course.imageUrl}
          alt={course.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {course.title}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              {course.summary}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center space-x-4 space-x-reverse mb-8 text-muted-foreground">
          <div className="flex items-center">
            <Eye className="h-5 w-5 ml-1" />
            <span>{course.views} بازدید</span>
          </div>
          <div className="flex items-center">
            <Heart className="h-5 w-5 ml-1" />
            <span>{course.likes} لایک</span>
          </div>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <ReactMarkdown>{course.content}</ReactMarkdown>
        </div>
      </div>
    </article>
  )
}