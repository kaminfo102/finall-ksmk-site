"use client"

import { motion } from "framer-motion"
import { Code2, Users, Trophy, BookOpen, Rocket, Heart } from "lucide-react"

const features = [
  {
    icon: Code2,
    title: "آموزش تخصصی در حوزه کودکان و نوجوانان",
    description: "یادگیری با جدیدترین تکنولوژی‌ها و روش‌های آموزشی روز"
  },
  {
    icon: Users,
    title: " مربیان مجرب و متخصص در حوزه کودکان و نوجوانان",
    description: "بهره‌مندی از تجربیات اساتید حرفه‌ای و متخصص"
  },
  {
    icon: Trophy,
    title: "گواهینامه معتبر",
    description: "اعطای گواهینامه معتبر پایان دوره با قابلیت استعلام"
  },
  {
    icon: BookOpen,
    title: " منابع آموزشی با کیفیت بالا",
    description: "منابع آموزشی با کیفیت بالا و به روز شده همگام با جدید ترین روش های آموزشی روز دنیا"
  },
  {
    icon: Rocket,
    title: "پشتیبانی ویژه",
    description: "ارائه خدمات مشاوره و پشتیبانی ۲۴/۷ به فراگیران"
  },
  {
    icon: Heart,
    title: "برگزاری مسابقات ملی و بین المللی",
    description: "برگزاری مسابقات متعدد استانی، ملی و بین المللی برای فراگیران"
  }
]

export function FeaturesSection() {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute top-1/4 right-0 shape-blob opacity-30" />
      <div className="absolute bottom-1/4 left-0 shape-blob opacity-30" />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-4"
          >
            چرا موسسه بین المللی کودکان هوشمند؟
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-muted-foreground"
          >
            ویژگی‌های منحصر به فرد ما در ارائه خدمات آموزشی در حوزه کودکان و نوجوانان
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card/50 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-primary/10 hover:border-primary/20 transition-all duration-300 group"
            >
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}