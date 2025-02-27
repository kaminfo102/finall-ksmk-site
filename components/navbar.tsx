"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Home, BookOpen, GalleryVerticalEnd, Info, Phone } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  { title: "صفحه اصلی", href: "/", icon: <Home className="h-5 w-5" /> },
  { title: "دوره‌ها", href: "./courses", icon: <BookOpen className="h-5 w-5" /> },
  { title: "گالری", href: "./gallery", icon: <GalleryVerticalEnd className="h-5 w-5" /> },
  { title: "درباره ما", href: "./about", icon: <Info className="h-5 w-5" /> },
  { title: "تماس با ما", href: "./contact", icon: <Phone className="h-5 w-5" /> },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>

          <div className="hidden md:flex items-center space-x-6 space-x-reverse">
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href} className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-all">
                {item.icon}
                {item.title}
              </Link>
            ))}
          </div>

          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link href="/" className="flex items-center">
              <Image src="/images/logo/logo.jpg" alt="Logo" width={100} height={100} className="rounded-lg" />
            </Link>
          </div>

          <div className="flex items-center md:mr-auto md:flex-row md:gap-4">
            <ThemeToggle />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t bg-background/90 backdrop-blur-md shadow-lg"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-3 items-center">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 py-2 text-sm font-medium hover:text-primary transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  {item.title}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
