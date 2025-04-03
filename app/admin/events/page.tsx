import { prisma } from "@/lib/prisma"
import AdminEventsClient from "./client"

export default async function AdminEventsPage() {
  const events = await prisma.event.findMany({
    orderBy: {
      date: 'desc'
    }
  })

  return <AdminEventsClient events={events} />
}