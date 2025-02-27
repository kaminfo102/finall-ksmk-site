"use client"

import { motion } from "framer-motion"

const steps = [
  { number: "۱", title: "ثبت نام", date: "تا ۱۵ اسفند" },
  { number: "۲", title: "ثبت بازو", date: "از ۲۹ بهمن تا ۱۸ اسفند" },
  { number: "۳", title: "درخواست بازخورد", date: "از ۴ اسفند تا ۱۸ اسفند" },
  { number: "۴", title: "پایان مسابقه", date: "(آخرین مهلت ارسال دمو) ۱۹ اسفند" },
  { number: "۵", title: "جمع‌بندی داوران", date: "۲۴ اسفند" },
  { number: "۶", title: "اهدای جوایز", date: "۲۵ اسفند" },
]

export function RoadmapSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">نقشه راه</h2>
          <p className="text-muted-foreground">مراحل و زمان‌بندی مسابقه</p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute top-0 bottom-0 right-[2.25rem] w-0.5 bg-primary/20" />
          
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative flex items-center mb-8 last:mb-0"
            >
              <div className="absolute right-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                {step.number}
              </div>
              <div className="bg-card border rounded-lg p-4 mr-16 w-full shadow-sm">
                <h3 className="font-semibold text-lg mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}