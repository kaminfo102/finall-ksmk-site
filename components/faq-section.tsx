"use client"

import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "./ui/button"

const faqs = [
  {
    question: "مسابقه از کی شروع میشه؟ تا کی وقت داریم برای شرکت کردن؟",
    answer: "مسابقه از ۲۹ بهمن شروع میشه و تا ۱۹ اسفند فرصت دارید برای شرکت در مسابقه."
  },
  {
    question: "در طول اجرای مسابقه مشکلاتم رو از کی میتونم بپرسم؟",
    answer: "شما می‌تونید از طریق پشتیبانی آنلاین یا ایمیل با تیم ما در ارتباط باشید."
  },
  {
    question: "مسابقه چه جوایزی داره؟",
    answer: "جوایز نقدی ارزنده، فرصت همکاری با شرکت‌های معتبر و گواهینامه معتبر شرکت در مسابقه"
  },
  {
    question: "چه موضوعاتی رو میتونیم پیاده کنیم؟",
    answer: "شما آزاد هستید هر ایده خلاقانه‌ای در حوزه هوش مصنوعی و برنامه‌نویسی رو پیاده‌سازی کنید."
  }
]

export function FAQSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">سوالات متداول</h2>
          <p className="text-muted-foreground">پاسخ به سوالات رایج شما</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <AccordionItem value={`item-${index}`} className="bg-card border rounded-lg px-6">
                  <AccordionTrigger className="text-lg py-4 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: faqs.length * 0.1 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <Button variant="outline" size="lg">
              سوالات بیشتر
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}