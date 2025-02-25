"use client"

import Image from "next/image"
import { motion } from "framer-motion"

const team = [
  {
    name: "دکتر محمد احمدی",
    role: "مدیر آموزشگاه",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070",
    bio: "دکترای مهندسی نرم‌افزار با ۱۵ سال سابقه تدریس"
  },
  {
    name: "مهندس سارا محمدی",
    role: "مدرس ارشد فرانت‌اند",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2070",
    bio: "متخصص React و Vue.js با ۸ سال تجربه"
  },
  {
    name: "مهندس علی کریمی",
    role: "مدرس بک‌اند",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2070",
    bio: "متخصص Node.js و Python با ۱۰ سال تجربه"
  },
  {
    name: "مهندس نیلوفر رضایی",
    role: "مدرس UI/UX",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070",
    bio: "طراح ارشد رابط کاربری با ۷ سال تجربه"
  }
]

export function AboutTeam() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">تیم ما</h2>
          <p className="text-muted-foreground">
            با اساتید مجرب و متخصص ما آشنا شوید
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card rounded-lg overflow-hidden shadow-lg"
            >
              <div className="relative h-64">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-primary mb-2">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}