"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

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
  const [isLoading, setIsLoading] = useState(true)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [slides.length, isPaused])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  const handleImageLoad = () => {
    setIsLoading(false)
  }

  return (
    <div 
      className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
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
            {/* Loading skeleton */}
            {isLoading && (
              <div className="absolute inset-0 bg-muted animate-pulse" />
            )}
            
            <Image
              src={slides[currentSlide].imageUrl}
              alt={slides[currentSlide].title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
              className={cn(
                "object-cover transition-opacity duration-300",
                isLoading ? "opacity-0" : "opacity-100"
              )}
              priority={currentSlide === 0}
              quality={90}
              onLoad={handleImageLoad}
            />
            
            {/* Enhanced gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
          </div>
          
          {/* Content container with improved positioning */}
          <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8">
            <div className="container mx-auto max-w-5xl">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="space-y-4 text-center"
              >
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                  {slides[currentSlide].title}
                </h1>
                <div className="max-h-24 sm:max-h-32 overflow-y-auto">
                  <p className="text-base sm:text-lg md:text-xl text-white/90">
                    {slides[currentSlide].description}
                  </p>
                </div>
                {slides[currentSlide].link && (
                  <div className="pt-4">
                    <Link href={slides[currentSlide].link!}>
                      <Button 
                        size="lg" 
                        variant="default" 
                        className="w-full sm:w-auto bg-white/20 hover:bg-white/40 backdrop-blur-sm"
                      >
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

      {/* Navigation buttons with improved positioning and styling */}
      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm"
        onClick={prevSlide}
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm"
        onClick={nextSlide}
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
      </Button>

      {/* Slide indicators with improved visibility */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 space-x-reverse">
        {slides.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              currentSlide === index ? "bg-white w-4" : "bg-white/50"
            )}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}