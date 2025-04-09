"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
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
}

export function EventsSlider() {
  const [currentEvent, setCurrentEvent] = useState(0)
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events')
        if (!response.ok) throw new Error('Failed to fetch events')
        const data = await response.json()
        setEvents(data)
      } catch (error) {
        console.error('Error fetching events:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEvents()
  }, [])

  useEffect(() => {
    if (events.length > 0) {
      const timer = setInterval(() => {
        setCurrentEvent((prev) => (prev + 1) % events.length)
      }, 5000)
      return () => clearInterval(timer)
    }
  }, [events.length])

  const nextEvent = () => setCurrentEvent((prev) => (prev + 1) % events.length)
  const prevEvent = () => setCurrentEvent((prev) => (prev - 1 + events.length) % events.length)

  if (isLoading) {
    return (
      <div className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden rounded-lg bg-muted animate-pulse" />
    )
  }

  if (events.length === 0) {
    return (
      <div className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden rounded-lg bg-muted flex items-center justify-center">
        <p className="text-muted-foreground">هیچ رویدادی یافت نشد</p>
      </div>
    )
  }

  const currentEventData = events[currentEvent]

  return (
    <div className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden rounded-lg">
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
              src={currentEventData.imageUrl}
              alt={currentEventData.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
              quality={100}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
          </div>
          
          <div className="absolute bottom-0 left-0 right-0">
            <div className="bg-gradient-to-t from-black/90 via-black/80 to-transparent p-4 md:p-6">
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="flex flex-col gap-3"
                >
                  <div className="space-y-2">
                    <h1 className="text-xl md:text-3xl font-bold text-white leading-tight">
                      {currentEventData.title}
                    </h1>
                    <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-transparent">
                      <p className="text-sm md:text-base text-white/90 pr-2 leading-relaxed">
                        {currentEventData.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm">
                    <div className="flex items-center gap-1.5 text-white/90 bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm">
                      <span className="text-primary text-sm">📍</span>
                      <span className="font-medium">{currentEventData.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-white/90 bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm">
                      <span className="text-primary text-sm">📅</span>
                      <span className="font-medium">
                        {format(new Date(currentEventData.date), 'yyyy/MM/dd')}
                      </span>
                    </div>
                    {currentEventData.price !== null && currentEventData.price !== undefined && (
                      <div className="flex items-center gap-1.5 text-white/90 bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm">
                        <span className="text-primary text-sm">💰</span>
                        <span className="font-medium">{currentEventData.price.toLocaleString()} تومان</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-1">
                    <Link href={`/events/${currentEventData.id}`}>
                      <Button 
                        size="default" 
                        variant="default" 
                        className="w-full md:w-auto bg-primary hover:bg-primary/90 text-sm md:text-base font-medium py-2 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        مشاهده جزئیات
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-4 bg-white/20 hover:bg-white/40 backdrop-blur-sm z-10 md:right-6"
        onClick={prevEvent}
      >
        <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-4 bg-white/20 hover:bg-white/40 backdrop-blur-sm z-10 md:left-6"
        onClick={nextEvent}
      >
        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
      </Button>

      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
        <span className="text-white text-xs md:text-sm font-medium">
          {currentEvent + 1} / {events.length}
        </span>
      </div>
    </div>
  )
} 