"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export function AboutSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative aspect-square rounded-2xl overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070"
              alt="درباره ما"
              fill
              className="object-cover transform hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">چرا آموزشگاه ما؟</h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                آموزشگاه ما با بیش از ۱۰ سال سابقه در زمینه آموزش برنامه‌نویسی و طراحی وب،
                همواره در تلاش برای ارائه بهترین خدمات آموزشی به علاقه‌مندان بوده است.
              </p>
              <p>
                ما با بهره‌گیری از اساتید مجرب و به‌روزترین متدهای آموزشی، محیطی پویا و
                کاربردی برای یادگیری فراهم کرده‌ایم.
              </p>
              <ul className="space-y-2 list-disc list-inside">
                <li>دوره‌های کاربردی و پروژه‌محور</li>
                <li>پشتیبانی ۲۴/۷ از دانشجویان</li>
                <li>گواهینامه معتبر پایان دوره</li>
                <li>تضمین ورود به بازار کار</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}