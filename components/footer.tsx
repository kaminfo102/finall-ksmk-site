"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/30 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link href="/" className="block mb-6">
              <Image
                  src="/images/logo/logo.jpg"
                  alt="Logo"
                  width={100}
                  height={100}
                  className="rounded-lg"
              />
            </Link>
            <p className="text-muted-foreground">
              آموزشگاه ما با هدف ارائه آموزش‌های با کیفیت و کاربردی در حوزه برنامه‌نویسی و طراحی وب فعالیت می‌کند.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-semibold text-lg mb-4">دسترسی سریع</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/courses" className="text-muted-foreground hover:text-primary transition-colors">
                  دوره‌های آموزشی
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-muted-foreground hover:text-primary transition-colors">
                  گالری تصاویر
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  درباره ما
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  تماس با ما
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="font-semibold text-lg mb-4">تماس با ما</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>تلفن: ۰۸۷-۳۳۲۳۳۳۲۳</li>
              <li>ایمیل: info@example.com</li>
              <li>آدرس: استان کردستان، سنندج، خیابان پاسداران</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="font-semibold text-lg mb-4">شبکه‌های اجتماعی</h3>
            <div className="flex space-x-4 space-x-reverse">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </motion.div>
        </div>

        <div className="border-t pt-8 text-center text-muted-foreground">
          <p>تمامی حقوق برای آموزشگاه ما محفوظ است. © {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  )
}