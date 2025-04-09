import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { format } from "date-fns-jalali"
import { Calendar, MapPin, Users, Coins } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { EventRegistrationForm } from "@/components/event-registration-form"

export default async function EventPage({ params }: { params: { id: string } }) {
  const event = await prisma.event.findUnique({
    where: { id: parseInt(params.id) },
    include: {
      images: true
    }
  })

  if (!event) {
    notFound()
  }

  return (
    <div className="pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Main Image */}
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src={event.imageUrl}
                alt={event.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Event Details */}
            <div className="bg-card rounded-2xl p-6 shadow-lg border border-border/50">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{event.title}</h1>
              
              {/* Short Description */}
              <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                <p className="text-muted-foreground text-lg leading-relaxed">{event.description}</p>
              </div>

              {/* Full Content */}
              {event.content && (
                <div className="prose prose-lg dark:prose-invert max-w-none mt-8 pt-8 border-t">
                  <h2 className="text-2xl font-bold mb-4">جزئیات رویداد</h2>
                  <div className="text-muted-foreground text-lg leading-relaxed whitespace-pre-wrap">
                    {event.content}
                  </div>
                </div>
              )}

              {/* Image Gallery */}
              {event.images.length > 0 && (
                <div className="mt-8 pt-8 border-t">
                  <h2 className="text-2xl font-bold mb-6">گالری تصاویر</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {event.images.map((image) => (
                      <div key={image.id} className="relative aspect-video rounded-lg overflow-hidden">
                        <Image
                          src={image.url}
                          alt={event.title}
                          fill
                          className="object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Registration Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl p-6 shadow-lg border border-border/50 sticky top-24">
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-5 w-5" />
                  <span className="font-medium">
                    {format(new Date(event.date), 'yyyy/MM/dd')}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-5 w-5" />
                  <span className="font-medium">{event.location}</span>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-5 w-5" />
                  <span className="font-medium">ظرفیت: {event.capacity} نفر</span>
                </div>

                {event.price !== null && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Coins className="h-5 w-5" />
                    <span className="font-medium">
                      {event.price.toLocaleString()} تومان
                    </span>
                  </div>
                )}

                <div className="pt-4">
                  <EventRegistrationForm eventId={event.id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 