import { KurdistanMap } from "@/components/kurdistan-map"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "نمایندگان استان کردستان",
  description: "نمایندگان آموزشگاه در شهرستان‌های استان کردستان",
}

export default function RepresentativesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        نمایندگان استان کردستان
      </h1>
      <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
        برای مشاهده اطلاعات نماینده هر شهرستان، روی آن شهرستان در نقشه کلیک کنید
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <KurdistanMap />
      </div>
    </div>
  )
} 