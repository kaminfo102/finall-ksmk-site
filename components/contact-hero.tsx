"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

const contactInfo = [
  {
    icon: MapPin,
    title: "آدرس",
    details: "استان کردستان، سنندج، خیابان پاسداران، مجتمع آموزشی ما"
  },
  {
    icon: Phone,
    title: "تلفن تماس",
    details: "۰۸۷-۳۳۲۳۳۳۲۳"
  },
  {
    icon: Mail,
    title: "ایمیل",
    details: "info@example.com"
  },
  {
    icon: Clock,
    title: "ساعات کاری",
    details: "شنبه تا چهارشنبه - ۸ صبح تا ۸ شب"
  }
]

export function ContactHero() {
  return (
    <section className="bg-muted/30 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-4"
          >
            تماس با ما
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground"
          >
            ما همیشه آماده پاسخگویی به سؤالات شما هستیم
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactInfo.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card p-6 rounded-lg shadow-lg text-center"
            >
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.details}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}