import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { format } from "date-fns-jalali"
import { Metadata } from "next"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import EventRegistrationForm from "@/components/event-registration-form"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const event = await prisma.event.findUnique({
    where: { id: parseInt(params.id) },
    select: {
      title: true,
      description: true,
      imageUrl: true,
    }
  })

  if (!event) {
    return {
      title: 'رویداد یافت نشد',
      description: 'رویداد مورد نظر یافت نشد'
    }
  }

  return {
    title: event.title,
    description: event.description,
    openGraph: {
      title: event.title,
      description: event.description,
      images: [event.imageUrl],
    },
  }
}

// Loading skeleton component
function EventDetailsSkeleton() {
  return (
    <div className="container py-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  )
}

// Event details component
async function EventDetails({ id }: { id: number }) {
  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      images: true,
      _count: {
        select: { registrations: true }
      }
    }
  })

  if (!event) {
    notFound()
  }

  const isFull = event._count.registrations >= event.capacity
  const remainingSpots = event.capacity - event._count.registrations

  return (
    <div className="container py-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <h1 className="text-3xl font-bold">{event.title}</h1>
          <p className="text-muted-foreground">{event.description}</p>
          
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">جزئیات</TabsTrigger>
              <TabsTrigger value="gallery">گالری تصاویر</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="space-y-4">
              {event.content && (
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  {event.content}
                </div>
              )}
            </TabsContent>
            <TabsContent value="gallery" className="space-y-4">
              {event.images.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {event.images.map((image) => (
                    <div key={image.id} className="relative aspect-square overflow-hidden rounded-lg">
                      <Image
                        src={image.url}
                        alt={`تصویر ${event.title}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground">تصویری موجود نیست</p>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{format(new Date(event.date), 'yyyy/MM/dd')}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{format(new Date(event.date), 'HH:mm')}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>
                  {isFull ? (
                    <span className="text-destructive">ظرفیت تکمیل شده</span>
                  ) : (
                    `${remainingSpots} نفر باقی مانده`
                  )}
                </span>
              </div>
              {event.price && (
                <div className="pt-4 border-t">
                  <p className="text-lg font-semibold">
                    {event.price.toLocaleString()} تومان
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {!isFull && (
            <EventRegistrationForm
              eventId={event.id}
              eventTitle={event.title}
              eventDate={event.date}
              eventLocation={event.location}
              eventCapacity={event.capacity}
              eventPrice={event.price}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default function EventPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  
  if (isNaN(id)) {
    notFound()
  }

  return (
    <Suspense fallback={<EventDetailsSkeleton />}>
      <EventDetails id={id} />
    </Suspense>
  )
} 