"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function PromotionDialog() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasScrolled = window.scrollY > window.innerHeight
      if (hasScrolled) {
        setIsOpen(true)
      }
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">مسابقه برنامه‌نویسی ۱۴۰۳</DialogTitle>
          <DialogDescription>
            فرصت ویژه برای علاقه‌مندان به برنامه‌نویسی
          </DialogDescription>
        </DialogHeader>
        <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
          <Image
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070"
            alt="مسابقه برنامه‌نویسی"
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            در مسابقه بزرگ برنامه‌نویسی ما شرکت کنید و از جوایز ارزنده بهره‌مند شوید.
            این فرصتی عالی برای محک زدن مهارت‌های شماست.
          </p>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="bg-primary/10 text-primary rounded-full p-1 ml-2">✓</span>
              جوایز نقدی ارزنده
            </li>
            <li className="flex items-center">
              <span className="bg-primary/10 text-primary rounded-full p-1 ml-2">✓</span>
              فرصت همکاری با شرکت‌های معتبر
            </li>
            <li className="flex items-center">
              <span className="bg-primary/10 text-primary rounded-full p-1 ml-2">✓</span>
              گواهینامه معتبر شرکت در مسابقه
            </li>
          </ul>
          <div className="flex justify-end space-x-4 space-x-reverse">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              بعداً یادآوری کن
            </Button>
            <Button>
              ثبت‌نام در مسابقه
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}