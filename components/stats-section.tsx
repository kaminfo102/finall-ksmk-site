"use client"

import { motion } from "framer-motion"
import { Users, BookOpen, Trophy, Star } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: "۱۰۰۰+",
    label: "دانشجوی موفق",
    description: "فارغ‌التحصیلان شاغل در صنعت"
  },
  {
    icon: BookOpen,
    value: "۵۰+",
    label: "دوره آموزشی",
    description: "دوره‌های تخصصی و کاربردی"
  },
  {
    icon: Trophy,
    value: "۲۰+",
    label: "جوایز و افتخارات",
    description: "کسب شده در رویدادهای مختلف"
  },
  {
    icon: Star,
    value: "۹۸٪",
    label: "رضایت دانشجویان",
    description: "از کیفیت آموزش و پشتیبانی"
  }
]

export function StatsSection() {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute top-0 right-0 shape-blob opacity-50" />
      <div className="absolute bottom-0 left-0 shape-blob opacity-50" />
      
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card/50 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-primary/10 hover:border-primary/20 transition-all duration-300"
            >
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
              <p className="font-semibold mb-2">{stat.label}</p>
              <p className="text-sm text-muted-foreground">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}