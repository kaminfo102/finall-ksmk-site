import { Metadata } from "next"
import { PrismaClient } from "@prisma/client"
import { EventsHero } from "@/components/events-hero"
import { EventsList } from "@/components/events-list"

const prisma = new PrismaClient()

export const metadata: Metadata = {
  title: "رویدادها | آموزشگاه ما",
  description: "رویدادها و مسابقات آموزشگاه ما"
}

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    orderBy: { date: "asc" }
  })

  return (
    <div className="pt-16">
      <EventsHero />
      <EventsList events={events} />
    </div>
  )
}