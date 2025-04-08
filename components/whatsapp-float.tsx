"use client"

import { MessageCircle } from "lucide-react"
import Link from "next/link"

export function WhatsAppFloat() {
  return (
    <Link
      href="https://wa.me/989123456789" // Replace with your actual WhatsApp number
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition-colors duration-300 animate-bounce"
      aria-label="ارتباط با ما از طریق واتس‌اپ"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="text-sm font-medium">تماس با ما</span>
    </Link>
  )
} 