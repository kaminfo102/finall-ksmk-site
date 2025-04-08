"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Phone, Mail, User } from "lucide-react"
import { Card } from "@/components/ui/card"

// تعریف داده‌های نمایندگان شهرستان‌ها
const cityRepresentatives = {
  sanandaj: {
    name: "سنندج",
    representative: "محمد محمدی",
    phone: "087-33233323",
    email: "sanandaj@example.com",
    color: "fill-emerald-200 hover:fill-emerald-300",
  },
  saqqez: {
    name: "سقز",
    representative: "احمد احمدی",
    phone: "087-36233323",
    email: "saqqez@example.com",
    color: "fill-purple-200 hover:fill-purple-300",
  },
  marivan: {
    name: "مریوان",
    representative: "رضا رضایی",
    phone: "087-34233323",
    email: "marivan@example.com",
    color: "fill-yellow-200 hover:fill-yellow-300",
  },
  baneh: {
    name: "بانه",
    representative: "علی علیزاده",
    phone: "087-34633323",
    email: "baneh@example.com",
    color: "fill-green-200 hover:fill-green-300",
  },
  bijar: {
    name: "بیجار",
    representative: "حسن حسینی",
    phone: "087-38233323",
    email: "bijar@example.com",
    color: "fill-yellow-100 hover:fill-yellow-200",
  },
  divandarreh: {
    name: "دیواندره",
    representative: "کریم کریمی",
    phone: "087-38433323",
    email: "divandarreh@example.com",
    color: "fill-pink-200 hover:fill-pink-300",
  },
  dehgolan: {
    name: "دهگلان",
    representative: "جمال جمالی",
    phone: "087-35233323",
    email: "dehgolan@example.com",
    color: "fill-purple-100 hover:fill-purple-200",
  },
  qorveh: {
    name: "قروه",
    representative: "امید امیدی",
    phone: "087-35233323",
    email: "qorveh@example.com",
    color: "fill-green-100 hover:fill-green-200",
  },
  kamyaran: {
    name: "کامیاران",
    representative: "سعید سعیدی",
    phone: "087-35233323",
    email: "kamyaran@example.com",
    color: "fill-yellow-50 hover:fill-yellow-100",
  },
  sarvabad: {
    name: "سروآباد",
    representative: "مراد مرادی",
    phone: "087-35233323",
    email: "sarvabad@example.com",
    color: "fill-pink-100 hover:fill-pink-200",
  },
} as const

type CityKey = keyof typeof cityRepresentatives

export function KurdistanMap() {
  const [selectedCity, setSelectedCity] = useState<CityKey | null>(null)

  const handleCityClick = (city: CityKey) => {
    setSelectedCity(city === selectedCity ? null : city)
  }

  return (
    <>
      <div className="relative w-full aspect-square max-w-2xl mx-auto">
        <svg
          viewBox="0 0 800 800"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* بانه */}
          <path
            d="M100,200 L150,150 L200,200 L150,250 Z"
            className={`${
              cityRepresentatives.baneh.color
            } cursor-pointer transition-colors duration-300 ${
              selectedCity === "baneh" ? "stroke-primary stroke-2" : "stroke-border"
            }`}
            onClick={() => handleCityClick("baneh")}
          />
          {/* سقز */}
          <path
            d="M150,150 L250,100 L300,150 L250,200 Z"
            className={`${
              cityRepresentatives.saqqez.color
            } cursor-pointer transition-colors duration-300 ${
              selectedCity === "saqqez" ? "stroke-primary stroke-2" : "stroke-border"
            }`}
            onClick={() => handleCityClick("saqqez")}
          />
          {/* مریوان */}
          <path
            d="M100,300 L150,250 L200,300 L150,350 Z"
            className={`${
              cityRepresentatives.marivan.color
            } cursor-pointer transition-colors duration-300 ${
              selectedCity === "marivan" ? "stroke-primary stroke-2" : "stroke-border"
            }`}
            onClick={() => handleCityClick("marivan")}
          />
          {/* سنندج */}
          <path
            d="M200,300 L250,250 L300,300 L250,350 Z"
            className={`${
              cityRepresentatives.sanandaj.color
            } cursor-pointer transition-colors duration-300 ${
              selectedCity === "sanandaj" ? "stroke-primary stroke-2" : "stroke-border"
            }`}
            onClick={() => handleCityClick("sanandaj")}
          />
          {/* دیواندره */}
          <path
            d="M250,200 L300,150 L350,200 L300,250 Z"
            className={`${
              cityRepresentatives.divandarreh.color
            } cursor-pointer transition-colors duration-300 ${
              selectedCity === "divandarreh" ? "stroke-primary stroke-2" : "stroke-border"
            }`}
            onClick={() => handleCityClick("divandarreh")}
          />
          {/* بیجار */}
          <path
            d="M300,150 L350,100 L400,150 L350,200 Z"
            className={`${
              cityRepresentatives.bijar.color
            } cursor-pointer transition-colors duration-300 ${
              selectedCity === "bijar" ? "stroke-primary stroke-2" : "stroke-border"
            }`}
            onClick={() => handleCityClick("bijar")}
          />
          {/* قروه */}
          <path
            d="M350,200 L400,150 L450,200 L400,250 Z"
            className={`${
              cityRepresentatives.qorveh.color
            } cursor-pointer transition-colors duration-300 ${
              selectedCity === "qorveh" ? "stroke-primary stroke-2" : "stroke-border"
            }`}
            onClick={() => handleCityClick("qorveh")}
          />
          {/* دهگلان */}
          <path
            d="M300,250 L350,200 L400,250 L350,300 Z"
            className={`${
              cityRepresentatives.dehgolan.color
            } cursor-pointer transition-colors duration-300 ${
              selectedCity === "dehgolan" ? "stroke-primary stroke-2" : "stroke-border"
            }`}
            onClick={() => handleCityClick("dehgolan")}
          />
          {/* کامیاران */}
          <path
            d="M200,350 L250,300 L300,350 L250,400 Z"
            className={`${
              cityRepresentatives.kamyaran.color
            } cursor-pointer transition-colors duration-300 ${
              selectedCity === "kamyaran" ? "stroke-primary stroke-2" : "stroke-border"
            }`}
            onClick={() => handleCityClick("kamyaran")}
          />
          {/* سروآباد */}
          <path
            d="M150,350 L200,300 L250,350 L200,400 Z"
            className={`${
              cityRepresentatives.sarvabad.color
            } cursor-pointer transition-colors duration-300 ${
              selectedCity === "sarvabad" ? "stroke-primary stroke-2" : "stroke-border"
            }`}
            onClick={() => handleCityClick("sarvabad")}
          />
        </svg>

        {/* نام شهرها */}
        <div className="absolute inset-0 pointer-events-none">
          {Object.entries(cityRepresentatives).map(([key, city]) => (
            <div
              key={key}
              className="absolute text-sm font-medium"
              style={{
                // موقعیت هر شهر باید متناسب با مختصات نقشه تنظیم شود
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              {city.name}
            </div>
          ))}
        </div>
      </div>

      {/* کارت اطلاعات نماینده */}
      <AnimatePresence mode="wait">
        {selectedCity && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="lg:sticky lg:top-24"
          >
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-6">
                {cityRepresentatives[selectedCity].name}
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <User className="h-5 w-5 text-primary/70" />
                  <span>{cityRepresentatives[selectedCity].representative}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="h-5 w-5 text-primary/70" />
                  <span dir="ltr">{cityRepresentatives[selectedCity].phone}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="h-5 w-5 text-primary/70" />
                  <span dir="ltr">{cityRepresentatives[selectedCity].email}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 