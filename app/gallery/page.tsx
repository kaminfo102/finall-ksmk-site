import { Metadata } from "next"
import { PrismaClient } from "@prisma/client"
import { GalleryGrid } from "@/components/gallery-grid"

const prisma = new PrismaClient()

export const metadata: Metadata = {
  title: "گالری تصاویر | آموزشگاه ما",
  description: "گالری تصاویر و لحظات به یاد ماندنی آموزشگاه ما"
}

export default async function GalleryPage() {
  const items = await prisma.gallery.findMany({
    orderBy: { createdAt: "desc" }
  })

  return (
    <div className="pt-16">
      <div className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">گالری تصاویر</h1>
          <p className="text-muted-foreground">
            تصاویر و لحظات به یاد ماندنی آموزشگاه ما
          </p>
        </div>
      </div>
      <GalleryGrid items={items} />
    </div>
  )
}