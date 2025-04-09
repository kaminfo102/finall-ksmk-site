"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
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
import { toast } from "sonner"

const registrationSchema = z.object({
  firstName: z.string().min(2, "نام باید حداقل ۲ حرف باشد"),
  lastName: z.string().min(2, "نام خانوادگی باید حداقل ۲ حرف باشد"),
  phone: z.string().regex(/^09\d{9}$/, "شماره موبایل معتبر نیست"),
  email: z.string().email("ایمیل معتبر نیست")
})

export function EventRegistrationForm({ eventId }: { eventId: number }) {
  const [isSubmitting, setIsSubmitting] = useState(false)

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
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/events/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...values,
          eventId
        })
      })

      if (!response.ok) {
        throw new Error('خطا در ثبت‌نام')
      }

      toast('ثبت‌نام با موفقیت انجام شد!', {
        duration: 4000,
        position: 'top-center',
        className: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
        style: {
          background: 'var(--background)',
          border: '1px solid var(--border)',
          fontFamily: 'var(--font-vazirmatn)',
          fontSize: '1rem',
          padding: '1rem',
          borderRadius: '0.75rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          maxWidth: '90%',
          margin: '0 auto',
        },
        description: (
          <div className="mt-2 flex items-center text-green-600 dark:text-green-400 text-sm">
            <span>به زودی با شما تماس خواهیم گرفت</span>
          </div>
        ),
      })

      form.reset()
    } catch (error) {
      toast.error('خطا در ثبت‌نام', {
        duration: 4000,
        position: 'top-center',
        className: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
        style: {
          background: 'var(--background)',
          border: '1px solid var(--border)',
          fontFamily: 'var(--font-vazirmatn)',
          fontSize: '1rem',
          padding: '1rem',
          borderRadius: '0.75rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          maxWidth: '90%',
          margin: '0 auto',
        },
        description: (
          <div className="mt-2 flex items-center text-red-600 dark:text-red-400 text-sm">
            <span>لطفاً دوباره تلاش کنید</span>
          </div>
        ),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                <Input placeholder="example@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "در حال ثبت‌نام..." : "ثبت‌نام در رویداد"}
        </Button>
      </form>
    </Form>
  )
} 