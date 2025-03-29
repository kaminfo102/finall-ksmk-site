"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { format } from "date-fns-jalali"

type Event = {
  id: number
  title: string
  description: string
  imageUrl: string
  date: Date
  location: string
  capacity: number
  price?: number | null
  createdAt: Date
  updatedAt: Date
}

export function EventsSection({ events }: { events: Event[] }) {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">رویدادهای پیش رو</h2>
          <p className="text-muted-foreground">
            در رویدادهای آموزشی و مسابقات ما شرکت کنید
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card rounded-lg overflow-hidden shadow-lg"
            >
              <div className="relative h-48">
                <Image
                  src={event.imageUrl}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {event.description}
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 ml-2" />
                    <span>{format(new Date(event.date), 'dd MMMM yyyy')}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 ml-2" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="h-4 w-4 ml-2" />
                    <span>ظرفیت: {event.capacity} نفر</span>
                  </div>
                </div>
                <Button className="w-full">ثبت‌نام در رویداد</Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}