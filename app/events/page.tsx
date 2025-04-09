import { Metadata } from "next"
import { PrismaClient, Prisma } from "@prisma/client"
import { EventsHero } from "@/components/events-hero"
import { EventsList } from "@/components/events-list"

const prisma = new PrismaClient()

export const metadata: Metadata = {
  title: "رویدادها | آموزشگاه ما",
  description: "رویدادها و مسابقات آموزشگاه ما"
}

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    orderBy: { date: "asc" },
    select: {
      id: true,
      title: true,
      description: true,
      imageUrl: true,
      date: true,
      location: true,
      capacity: true,
      price: true
    }
  })

  return (
    <div className="pt-16">
      <EventsHero />
      <div className="container mx-auto px-4 py-8">
        <EventsList events={events} />
      </div>
    </div>
  )
}