import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clean up existing data
  await prisma.heroSlider.deleteMany()
  await prisma.course.deleteMany()
  await prisma.gallery.deleteMany()
  await prisma.contact.deleteMany()
  await prisma.event.deleteMany()

  // Create hero slides
  await prisma.heroSlider.createMany({
    data: [
      {
        title: "به آموزشگاه ما خوش آمدید",
        description: "آموزش حرفه‌ای برنامه‌نویسی و طراحی وب با بهترین اساتید",
        // imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070",
        imageUrl: "https://uploadkon.ir/uploads/a42808_250-DMaharat.jpg",
        link: "/courses"
      },
      {
        title: "دوره‌های جامع و کاربردی",
        description: "یادگیری مهارت‌های مورد نیاز بازار کار با پروژه‌های عملی",
        imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071",
        link: "/courses"
      },
      {
        title: "همراهی در مسیر موفقیت",
        description: "پشتیبانی و مشاوره تخصصی در تمام مراحل یادگیری",
        imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070",
        link: "/contact"
      }
    ]
  })

  // Create courses
  await prisma.course.createMany({
    data: [
      {
        title: "آموزش جامع React.js",
        summary: "یادگیری React.js از مقدماتی تا پیشرفته با پروژه‌های عملی",
        content: `
# دوره جامع React.js

React.js یکی از محبوب‌ترین کتابخانه‌های JavaScript برای ساخت رابط‌های کاربری است. در این دوره، شما از مفاهیم پایه تا تکنیک‌های پیشرفته را خواهید آموخت.

## سرفصل‌ها

1. مقدمه و نصب React
2. کامپوننت‌ها و Props
3. State و Lifecycle
4. Hooks و Custom Hooks
5. مدیریت حالت با Redux
6. کار با API‌ها
7. بهینه‌سازی عملکرد
8. تست‌نویسی
9. پروژه‌های عملی

## پیش‌نیازها

- آشنایی با HTML و CSS
- تسلط بر JavaScript مدرن
- درک مفاهیم اولیه برنامه‌نویسی

## مدت دوره

- ۴۰ ساعت آموزش
- ۲۰ ساعت پروژه عملی
- پشتیبانی نامحدود
        `,
        imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070",
        views: 1200,
        likes: 450
      },
      {
        title: "برنامه‌نویسی Python",
        summary: "دوره کامل پایتون برای توسعه نرم‌افزار و هوش مصنوعی",
        content: `
# دوره جامع Python

Python زبانی قدرتمند و همه‌کاره است که در حوزه‌های مختلف از جمله هوش مصنوعی، علم داده و توسعه وب کاربرد دارد.

## سرفصل‌ها

1. مبانی Python
2. ساختارهای داده
3. برنامه‌نویسی شیءگرا
4. کار با فایل‌ها و دیتابیس
5. کتابخانه‌های کاربردی
6. هوش مصنوعی و یادگیری ماشین
7. فریم‌ورک Django
8. پروژه‌های عملی

## پیش‌نیازها

- آشنایی با مفاهیم برنامه‌نویسی
- علاقه به یادگیری

## مدت دوره

- ۶۰ ساعت آموزش
- ۳۰ ساعت پروژه عملی
- پشتیبانی نامحدود
        `,
        imageUrl: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=2074",
        views: 980,
        likes: 320
      },
      {
        title: "طراحی UI/UX",
        summary: "اصول طراحی رابط کاربری و تجربه کاربری در وب و موبایل",
        content: `
# دوره جامع طراحی UI/UX

طراحی رابط کاربری و تجربه کاربری نقش مهمی در موفقیت محصولات دیجیتال دارد. در این دوره، اصول و تکنیک‌های طراحی حرفه‌ای را خواهید آموخت.

## سرفصل‌ها

1. مبانی طراحی UI/UX
2. اصول طراحی گرافیکی
3. روانشناسی کاربر
4. پروتوتایپ و وایرفریم
5. کار با Figma
6. طراحی ریسپانسیو
7. انیمیشن و تعامل
8. پروژه‌های عملی

## پیش‌نیازها

- علاقه به طراحی
- آشنایی با کامپیوتر

## مدت دوره

- ۵۰ ساعت آموزش
- ۲۵ ساعت پروژه عملی
- پشتیبانی نامحدود
        `,
        imageUrl: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=2070",
        views: 750,
        likes: 280
      }
    ]
  })

  // Create gallery items
  await prisma.gallery.createMany({
    data: [
      {
        title: "کلاس برنامه‌نویسی",
        imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070",
        description: "دوره آموزشی React.js"
      },
      {
        title: "کارگاه عملی",
        imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071",
        description: "کارگاه طراحی UI/UX"
      },
      {
        title: "جلسه مشاوره",
        imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070",
        description: "مشاوره تخصصی برنامه‌نویسی"
      },
      {
        title: "فضای آموزشی",
        imageUrl: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=2070",
        description: "محیط آموزشی آموزشگاه"
      }
    ]
  })

  // Create events
  await prisma.event.createMany({
    data: [
      {
        title: "مسابقه برنامه‌نویسی ۱۴۰۳",
        description: "بزرگترین رویداد برنامه‌نویسی سال با جوایز ارزنده",
        imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070",
        date: new Date("2024-06-15T09:00:00Z"),
        location: "سنندج، سالن همایش‌های دانشگاه",
        capacity: 100,
        price: 500000
      },
      {
        title: "کارگاه React.js پیشرفته",
        description: "آموزش تکنیک‌های پیشرفته و بهینه‌سازی در React.js",
        imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070",
        date: new Date("2024-07-01T14:00:00Z"),
        location: "آموزشگاه ما، سالن کنفرانس",
        capacity: 30,
        price: 1500000
      },
      {
        title: "همایش هوش مصنوعی",
        description: "بررسی آخرین دستاوردهای هوش مصنوعی در برنامه‌نویسی",
        imageUrl: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=2074",
        date: new Date("2024-08-10T10:00:00Z"),
        location: "هتل شادی، سالن اصلی",
        capacity: 200,
        price: null
      }
    ]
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })