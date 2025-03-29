"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type GalleryItem = {
  id: number
  title: string
  imageUrl: string
  description?: string | null
  createdAt: Date
}

export function GallerySection({ items }: { items: GalleryItem[] }) {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">گالری تصاویر</h2>
          <p className="text-muted-foreground">نمونه کارها و لحظات به یاد ماندنی</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="relative aspect-square cursor-pointer group"
              onClick={() => setSelectedImage(item)}
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover rounded-lg transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <h3 className="text-white text-lg font-semibold">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedImage?.title}</DialogTitle>
              {selectedImage?.description && (
                <DialogDescription>{selectedImage.description}</DialogDescription>
              )}
            </DialogHeader>
            {selectedImage && (
              <div className="relative aspect-video">
                <Image
                  src={selectedImage.imageUrl}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}