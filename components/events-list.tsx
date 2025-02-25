"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, MapPin, Users, Coins } from "lucide-react"
import { Button } from "@/components/ui/button"
import { format } from "date-fns-jalali"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"

type Event = {
  id: number
  title: string
  description: string
  imageUrl: string
  date: Date
  location: string
  capacity: number
  price?: number | null
}

const registrationSchema = z.object({
  firstName: z.string().min(2, "نام باید حداقل ۲ حرف باشد"),
  lastName: z.string().min(2, "نام خانوادگی باید حداقل ۲ حرف باشد"),
  phone: z.string().regex(/^09\d{9}$/, "شماره موبایل معتبر نیست"),
  email: z.string().email("ایمیل معتبر نیست")
})

export function EventsList({ events }: { events: Event[] }) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isRegistering, setIsRegistering] = useState(false)

  const form = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: ""
    }
  })

  const onSubmit = async (values: z.infer<typeof registrationSchema>) => {
    if (!selectedEvent) return

    setIsRegistering(true)
    try {
      const response = await fetch('/api/events/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...values,
          eventId: selectedEvent.id
        })
      })

      if (!response.ok) {
        throw new Error('Failed to register')
      }

      toast.success('ثبت‌نام با موفقیت انجام شد', {
        description: 'به زودی با شما تماس خواهیم گرفت'
      })
      setSelectedEvent(null)
      form.reset()
    } catch (error) {
      toast.error('خطا در ثبت‌نام', {
        description: 'لطفاً دوباره تلاش کنید'
      })
    } finally {
      setIsRegistering(false)
    }
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full flex flex-col">
                <div className="relative h-48">
                  <Image
                    src={event.imageUrl}
                    alt={event.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {event.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 flex-grow">
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 ml-2 text-muted-foreground" />
                    <span>{format(new Date(event.date), 'dd MMMM yyyy - HH:mm')}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 ml-2 text-muted-foreground" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="h-4 w-4 ml-2 text-muted-foreground" />
                    <span>ظرفیت: {event.capacity} نفر</span>
                  </div>
                  {event.price && (
                    <div className="flex items-center text-sm">
                      <Coins className="h-4 w-4 ml-2 text-muted-foreground" />
                      <span>{event.price.toLocaleString()} تومان</span>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    onClick={() => setSelectedEvent(event)}
                  >
                    ثبت‌نام در رویداد
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
          <DialogContent className="sm:max-w-[500px]">
            {selectedEvent && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedEvent.title}</DialogTitle>
                  <DialogDescription>
                    برای ثبت‌نام در این رویداد، لطفاً فرم زیر را تکمیل کنید.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="relative h-48 rounded-lg overflow-hidden">
                    <Image
                      src={selectedEvent.imageUrl}
                      alt={selectedEvent.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 ml-2 text-muted-foreground" />
                      <span>
                        {format(new Date(selectedEvent.date), 'dd MMMM yyyy - HH:mm')}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 ml-2 text-muted-foreground" />
                      <span>{selectedEvent.location}</span>
                    </div>
                    {selectedEvent.price && (
                      <div className="flex items-center">
                        <Coins className="h-4 w-4 ml-2 text-muted-foreground" />
                        <span>هزینه: {selectedEvent.price.toLocaleString()} تومان</span>
                      </div>
                    )}
                  </div>

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>نام</FormLabel>
                              <FormControl>
                                <Input placeholder="نام خود را وارد کنید" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>نام خانوادگی</FormLabel>
                              <FormControl>
                                <Input placeholder="نام خانوادگی خود را وارد کنید" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>شماره موبایل</FormLabel>
                            <FormControl>
                              <Input placeholder="۰۹۱۲۳۴۵۶۷۸۹" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ایمیل</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="example@domain.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <DialogFooter>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setSelectedEvent(null)}
                        >
                          انصراف
                        </Button>
                        <Button type="submit" disabled={isRegistering}>
                          {isRegistering ? "در حال ثبت..." : "ثبت‌نام"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}