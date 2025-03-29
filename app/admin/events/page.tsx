import { PrismaClient } from "@prisma/client"
import AdminEventsClient from "./client"

const prisma = new PrismaClient()

export default async function AdminEventsPage() {
  const events = await prisma.event.findMany({
    orderBy: {
      date: 'desc'
    }
  })

  return <AdminEventsClient events={events} />
}