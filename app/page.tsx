import { PrismaClient } from "@prisma/client"
import { HeroSlider } from "@/components/hero-slider"
import { EventsSlider } from "@/components/events-slider"
import { CoursesSection } from "@/components/courses-section"
import { GallerySection } from "@/components/gallery-section"
import { ContactSection } from "@/components/contact-section"
import { AboutSection } from "@/components/about-section"
import { EventsSection } from "@/components/events-section"
import { PromotionDialog } from "@/components/promotion-dialog"
import { StatsSection } from "@/components/stats-section"
import { FeaturesSection } from "@/components/features-section"
import { RoadmapSection } from "@/components/roadmap-section"
import { CompetitionRules } from "@/components/competition-rules"
import { FAQSection } from "@/components/faq-section"
import { CalendarDays } from 'lucide-react'
import { WhatsAppFloat } from "@/components/whatsapp-float"


const prisma = new PrismaClient()

export default async function Home() {
  const [slides, courses, galleryItems, events] = await Promise.all([
    prisma.heroSlider.findMany({
      orderBy: { createdAt: 'desc' }
    }),
    prisma.course.findMany({
      orderBy: { createdAt: 'desc' },
      take: 3
    }),
    prisma.gallery.findMany({
      orderBy: { createdAt: 'desc' }
    }),
    prisma.event.findMany({
      orderBy: { date: 'asc' },
      take: 4
    })
  ])

  return (
    <div className="pt-16">
      <WhatsAppFloat />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-[500px] md:h-[600px] lg:h-[700px] rounded-2xl overflow-hidden shadow-lg border border-border/50">
            <HeroSlider slides={slides} />
          </div>
          <div className="lg:col-span-1 flex flex-col h-[500px] md:h-[600px] lg:h-[700px] rounded-2xl shadow-lg border border-border/50 overflow-hidden">
            <div className="flex items-center justify-center p-4 bg-gradient-to-b from-muted/50 to-muted/70 border-b border-border/50">
              <h3 className="text-lg font-semibold text-primary">رویدادهای مهم</h3>
              <CalendarDays className="h-5 w-5 mr-2 text-primary/80" />
            </div>
            <div className="flex-grow overflow-hidden">
              <EventsSlider events={events} />
            </div>
          </div>
        </div>
      </div>
      {/* <StatsSection /> */}
      {/* دوره های آموزشی */}
      <CoursesSection courses={courses} />
      {/* چرا آموزشگاه ما */}
      <FeaturesSection />
      {/* نقشه راه */}
      {/* <RoadmapSection /> */}
      {/* شرایط مسابقه */}
      {/* <CompetitionRules /> */}
      
      {/*  چرا آموزشگاه ما با تصویر*/}
      {/* <AboutSection /> */}
      <GallerySection items={galleryItems} />
      <EventsSection events={events} />
      <FAQSection />
      <ContactSection />
      <PromotionDialog />
      {/* <RepresentativesSection /> */}
    </div>
  )
}