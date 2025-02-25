"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export function EventsHero() {
  return (
    <section className="relative h-[400px] flex items-center">
      <Image
        src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070"
        alt="رویدادها"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            رویدادهای آموزشگاه
          </h1>
          <p className="text-xl text-white/90">
            در رویدادها و مسابقات ما شرکت کنید و از فرصت‌های یادگیری و شبکه‌سازی بهره‌مند شوید.
          </p>
        </motion.div>
      </div>
    </section>
  )
}