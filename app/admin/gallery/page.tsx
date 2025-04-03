import { prisma } from "@/lib/prisma"
import AdminGalleryClient from "./client"

export default async function AdminGalleryPage() {
  const gallery = await prisma.gallery.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })

  return <AdminGalleryClient gallery={gallery} />
}