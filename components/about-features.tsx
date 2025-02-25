"use client"

import { motion } from "framer-motion"
import { Code2, Users, Trophy, BookOpen } from "lucide-react"

const features = [
  {
    icon: Code2,
    title: "آموزش عملی",
    description: "یادگیری از طریق پروژه‌های واقعی و کاربردی"
  },
  {
    icon: Users,
    title: "اساتید مجرب",
    description: "بهره‌مندی از تجربیات اساتید حرفه‌ای"
  },
  {
    icon: Trophy,
    title: "گواهینامه معتبر",
    description: "اعطای گواهینامه پایان دوره به فراگیران"
  },
  {
    icon: BookOpen,
    title: "منابع آموزشی",
    description: "دسترسی به جدیدترین منابع و مطالب آموزشی"
  }
]

export function AboutFeatures() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card p-6 rounded-lg shadow-lg"
            >
              <feature.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}