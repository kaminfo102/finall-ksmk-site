"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Instagram, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-background to-muted/30 pt-20 pb-10 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20"></div>
      <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-primary/5 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-right"
          >
            <Link href="/" className="block mb-6 ml-auto w-fit group">
              <div className="relative overflow-hidden rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/logo/logo.jpg"
                  alt="Logo"
                  width={120}
                  height={120}
                  className="rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              آموزشگاه ما با هدف ارائه آموزش‌های با کیفیت و کاربردی در حوزه برنامه‌نویسی و طراحی وب فعالیت می‌کند.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-right"
          >
            <h3 className="font-semibold text-xl mb-6 relative inline-block">
              دسترسی سریع
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/30"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/courses" className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center justify-end gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary transition-colors duration-300"></span>
                  دوره‌های آموزشی
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center justify-end gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary transition-colors duration-300"></span>
                  گالری تصاویر
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center justify-end gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary transition-colors duration-300"></span>
                  درباره ما
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center justify-end gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary transition-colors duration-300"></span>
                  تماس با ما
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-right"
          >
            <h3 className="font-semibold text-xl mb-6 relative inline-block">
              تماس با ما
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/30"></span>
            </h3>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-center justify-end gap-3">
                <Phone className="h-5 w-5 text-primary/70" />
                <span>۰۸۷-۳۳۲۳۳۳۲۳</span>
              </li>
              <li className="flex items-center justify-end gap-3">
                <Mail className="h-5 w-5 text-primary/70" />
                <span>info@example.com</span>
              </li>
              <li className="flex items-center justify-end gap-3">
                <MapPin className="h-5 w-5 text-primary/70" />
                <span>استان کردستان، سنندج، خیابان پاسداران</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-right"
          >
            <h3 className="font-semibold text-xl mb-6 relative inline-block">
              شبکه‌های اجتماعی
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/30"></span>
            </h3>
            <div className="flex justify-end space-x-6 space-x-reverse">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300 transform hover:scale-110">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-border/50 pt-8 text-center text-muted-foreground">
          <p className="text-sm">تمامی حقوق برای آموزشگاه ما محفوظ است. © {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  )
}