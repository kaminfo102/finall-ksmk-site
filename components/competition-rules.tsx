"use client"

import { motion } from "framer-motion"
import { FileText } from "lucide-react"
import { Button } from "./ui/button"

const rules = [
  {
    number: "۱",
    text: "این مسابقه کاملا غیرحضوری، آزاد و رایگان هست. 😊"
  },
  {
    number: "۲",
    text: "می‌توانید به صورت انفرادی یا تیمی در مسابقه شرکت کنید. محدودیتی برای تعداد اعضای تیم وجود ندارد."
  },
  {
    number: "۳",
    text: "هر تیم میتونه هر چند تا بازو که خواست رو ثبت کنه"
  },
  {
    number: "۴",
    text: "در این مسابقه، نوآوری و خلاقیت خیلی مهمه."
  },
  {
    number: "۵",
    text: "بازوهای برتر بر اساس معیارهای اعلام شده با حضور اساتیدی در حوزه طراحی محصول، کسب‌وکار و مهندسی انتخاب میشن."
  }
]

export function CompetitionRules() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">شرایط مسابقه</h2>
          <p className="text-muted-foreground">قوانین و مقررات شرکت در مسابقه</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {rules.map((rule, index) => (
            <motion.div
              key={rule.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-start gap-4 bg-card rounded-lg p-4 border shadow-sm"
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">
                {rule.number}
              </div>
              <p className="text-lg">{rule.text}</p>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: rules.length * 0.1 }}
            viewport={{ once: true }}
            className="bg-primary/5 rounded-lg p-6 flex items-center justify-between mt-8"
          >
            <p className="text-lg">
              از اینجا می‌تونید مستندات فنی بازوها رو ببینید و با توسعهٔ بازو در پله بیشتر آشنا بشید.
            </p>
            <Button className="shrink-0">
              <FileText className="h-4 w-4 ml-2" />
              مستندات فنی
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}