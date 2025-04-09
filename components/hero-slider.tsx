"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

type Slide = {
  id: number
  title: string
  description: string
  imageUrl: string
  link?: string | null
  createdAt: Date
  updatedAt: Date
}

export function HeroSlider({ slides }: { slides: Slide[] }) {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  return (
    <div className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <div className="relative w-full h-full">
            <Image
              src={slides[currentSlide].imageUrl}
              alt={slides[currentSlide].title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
              quality={100}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/80 to-transparent p-6">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="space-y-4"
              >
                <h1 className="text-3xl md:text-5xl font-bold text-white">
                  {slides[currentSlide].title}
                </h1>
                <div className="max-h-24 overflow-y-auto">
                  <p className="text-lg md:text-xl text-white/90">
                    {slides[currentSlide].description}
                  </p>
                </div>
                {slides[currentSlide].link && (
                  <div className="pt-4">
                    <Link href={slides[currentSlide].link!}>
                      <Button size="lg" variant="default" className="w-full md:w-auto">
                        بیشتر بدانید
                      </Button>
                    </Link>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40"
        onClick={prevSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40"
        onClick={nextSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 space-x-reverse">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? "bg-white w-4" : "bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}