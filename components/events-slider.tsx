"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

type Event = {
  id: number
  title: string
  description: string
  imageUrl: string
  date: Date
  location: string
  capacity: number
  price?: number | null
}

export function EventsSlider({ events }: { events: Event[] }) {
  const [currentEvent, setCurrentEvent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentEvent((prev) => (prev + 1) % events.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [events.length])

  const nextEvent = () => setCurrentEvent((prev) => (prev + 1) % events.length)
  const prevEvent = () => setCurrentEvent((prev) => (prev - 1 + events.length) % events.length)

  return (
    <div className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentEvent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <div className="relative w-full h-full">
            <Image
              src={events[currentEvent].imageUrl}
              alt={events[currentEvent].title}
              fill
              sizes="100vw"
              className="object-cover object-center"
              priority
              quality={100}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container mx-auto px-4 text-center text-white">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-6xl font-bold mb-4"
              >
                {events[currentEvent].title}
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-lg md:text-xl mb-4 max-w-2xl mx-auto"
              >
                {events[currentEvent].description}
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8"
              >
                <div className="flex items-center gap-2">
                  <span className="text-primary">📍</span>
                  <span>{events[currentEvent].location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary">👥</span>
                  <span>ظرفیت: {events[currentEvent].capacity} نفر</span>
                </div>
                {events[currentEvent].price && (
                  <div className="flex items-center gap-2">
                    <span className="text-primary">💰</span>
                    <span>{events[currentEvent].price.toLocaleString()} تومان</span>
                  </div>
                )}
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Link href={`/events/${events[currentEvent].id}`}>
                  <Button size="lg" variant="default">
                    ثبت نام در رویداد
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40"
        onClick={prevEvent}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40"
        onClick={nextEvent}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 space-x-reverse">
        {events.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentEvent ? "bg-white w-4" : "bg-white/50"
            }`}
            onClick={() => setCurrentEvent(index)}
          />
        ))}
      </div>
    </div>
  )
} 