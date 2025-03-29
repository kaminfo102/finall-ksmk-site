import { PrismaClient } from "@prisma/client"
import AdminGalleryClient from "./client"

const prisma = new PrismaClient()

export default async function AdminGalleryPage() {
  const items = await prisma.gallery.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  return <AdminGalleryClient items={items} />
}