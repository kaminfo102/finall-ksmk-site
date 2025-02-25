"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { MapPin, Phone, Mail, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"

const kurdistanCities = [
  "سنندج",
  "سقز",
  "مریوان",
  "بانه",
  "قروه",
  "کامیاران",
  "دیواندره",
  "بیجار",
  "دهگلان",
  "سروآباد",
]

const formSchema = z.object({
  firstName: z.string().min(2, "نام باید حداقل ۲ حرف باشد"),
  lastName: z.string().min(2, "نام خانوادگی باید حداقل ۲ حرف باشد"),
  phone: z.string().regex(/^09\d{9}$/, "شماره موبایل معتبر نیست"),
  city: z.string().min(1, "لطفاً شهر خود را انتخاب کنید"),
  message: z.string().min(10, "پیام باید حداقل ۱۰ حرف باشد"),
})

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      city: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error('خطا در ارسال فرم')
      }

      setIsSuccess(true)
      form.reset()
      toast.success('پیام شما با موفقیت ارسال شد', {
        duration: 5000,
        position: 'top-center',
        className: 'bg-green-50 dark:bg-green-900 text-lg p-4',
        style: {
          background: 'var(--background)',
          border: '1px solid var(--border)',
        },
        description: (
          <div className="mt-2 flex items-center text-green-600 dark:text-green-400">
            <CheckCircle2 className="h-5 w-5 ml-2" />
            <span>در اسرع وقت با شما تماس خواهیم گرفت</span>
          </div>
        ),
      })
    } catch (error) {
      toast.error('خطا در ارسال پیام', {
        duration: 5000,
        position: 'top-center',
        className: 'bg-red-50 dark:bg-red-900 text-lg p-4',
        style: {
          background: 'var(--background)',
          border: '1px solid var(--border)',
        },
        description: (
          <div className="mt-2 text-red-600 dark:text-red-400">
            لطفاً دوباره تلاش کنید
          </div>
        ),
      })
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setIsSuccess(false), 3000)
    }
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">تماس با ما</h2>
          <p className="text-muted-foreground">ما همیشه آماده پاسخگویی به شما هستیم</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4 space-x-reverse"
              >
                <div className="bg-primary/10 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">آدرس</h3>
                  <p className="text-muted-foreground">
                    استان کردستان، سنندج، خیابان پاسداران، مجتمع آموزشی ما
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4 space-x-reverse"
              >
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">تلفن تماس</h3>
                  <p className="text-muted-foreground">۰۸۷-۳۳۲۳۳۳۲۳</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4 space-x-reverse"
              >
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">ایمیل</h3>
                  <p className="text-muted-foreground">info@example.com</p>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="relative">
            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10 rounded-lg"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <CheckCircle2 className="h-24 w-24 text-green-500" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-card rounded-lg p-6 shadow-lg"
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>نام</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="نام خود را وارد کنید" 
                              {...field}
                              className="transition-all duration-200 focus:scale-[1.02]"
                            />
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
                            <Input 
                              placeholder="نام خانوادگی خود را وارد کنید" 
                              {...field}
                              className="transition-all duration-200 focus:scale-[1.02]"
                            />
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
                          <Input 
                            placeholder="۰۹۱۲۳۴۵۶۷۸۹" 
                            {...field}
                            className="transition-all duration-200 focus:scale-[1.02]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>شهر</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="transition-all duration-200 focus:scale-[1.02]">
                              <SelectValue placeholder="شهر خود را انتخاب کنید" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {kurdistanCities.map((city) => (
                              <SelectItem key={city} value={city}>
                                {city}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>پیام</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="پیام خود را بنویسید"
                            className="min-h-[120px] transition-all duration-200 focus:scale-[1.02]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full transition-all duration-200 hover:scale-[1.02]" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "در حال ارسال..." : "ارسال پیام"}
                  </Button>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}