import { PrismaClient } from "@prisma/client"
import { HeroSlider } from "@/components/hero-slider"
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
      <HeroSlider slides={slides} />
      <StatsSection />
      <RoadmapSection />
      <CompetitionRules />
      <FAQSection />
      <CoursesSection courses={courses} />
      <FeaturesSection />
      <AboutSection />
      <GallerySection items={galleryItems} />
      <EventsSection events={events} />
      <ContactSection />
      <PromotionDialog />
    </div>
  )
}