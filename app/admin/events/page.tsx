import { Metadata } from "next"
import { PrismaClient } from "@prisma/client"
import { AdminEventsList } from "@/components/admin/events-list"

const prisma = new PrismaClient()

export const metadata: Metadata = {
  title: "مدیریت رویدادها | آموزشگاه ما",
  description: "پنل مدیریت رویدادها"
}

export default async function AdminEventsPage() {
  const events = await prisma.event.findMany({
    orderBy: { date: "desc" },
    // include: {
    //   registrations: true
    // }
  })

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">مدیریت رویدادها</h1>
      <AdminEventsList events={events} />
    </div>
  )
}