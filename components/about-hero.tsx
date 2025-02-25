"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export function AboutHero() {
  return (
    <section className="relative h-[500px] flex items-center">
      <Image
        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071"
        alt="درباره ما"
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
            داستان ما
          </h1>
          <p className="text-xl text-white/90">
            ما با هدف ارائه آموزش‌های با کیفیت و کاربردی در حوزه برنامه‌نویسی و طراحی وب،
            از سال ۱۳۹۲ فعالیت خود را آغاز کردیم و تا امروز افتخار همراهی هزاران دانشجو را داشته‌ایم.
          </p>
        </motion.div>
      </div>
    </section>
  )
}