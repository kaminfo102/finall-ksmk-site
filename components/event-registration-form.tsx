"use client"

import { useState, useCallback } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

// Registration form schema with improved validation
const registrationSchema = z.object({
  name: z.string()
    .min(2, "نام باید حداقل ۲ حرف باشد")
    .max(50, "نام نمی‌تواند بیشتر از ۵۰ حرف باشد"),
  phone: z.string()
    .min(11, "شماره تلفن باید ۱۱ رقم باشد")
    .max(11, "شماره تلفن باید ۱۱ رقم باشد")
    .regex(/^09[0-9]{9}$/, "شماره تلفن باید با ۰۹ شروع شود"),
  email: z.string()
    .email("ایمیل معتبر نیست")
    .optional()
    .or(z.literal("")),
  age: z.number()
    .min(1, "سن باید حداقل ۱ سال باشد")
    .max(100, "سن نمی‌تواند بیشتر از ۱۰۰ سال باشد"),
  gender: z.enum(["male", "female"], {
    required_error: "لطفاً جنسیت را انتخاب کنید"
  }),
  address: z.string()
    .min(10, "آدرس باید حداقل ۱۰ حرف باشد")
    .max(200, "آدرس نمی‌تواند بیشتر از ۲۰۰ حرف باشد"),
  emergencyContact: z.string()
    .min(11, "شماره تماس اضطراری باید ۱۱ رقم باشد")
    .max(11, "شماره تماس اضطراری باید ۱۱ رقم باشد")
    .regex(/^09[0-9]{9}$/, "شماره تماس اضطراری باید با ۰۹ شروع شود"),
  medicalConditions: z.string()
    .max(500, "توضیحات پزشکی نمی‌تواند بیشتر از ۵۰۰ حرف باشد")
    .optional()
    .or(z.literal("")),
  notes: z.string()
    .max(500, "یادداشت‌ها نمی‌تواند بیشتر از ۵۰۰ حرف باشد")
    .optional()
    .or(z.literal(""))
})

type FormValues = z.infer<typeof registrationSchema>

interface EventRegistrationFormProps {
  eventId: number
  eventTitle: string
  eventDate: Date
  eventLocation: string
  eventCapacity: number
  eventPrice?: number | null
}

export default function EventRegistrationForm({
  eventId,
  eventTitle,
  eventDate,
  eventLocation,
  eventCapacity,
  eventPrice
}: EventRegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const form = useForm<FormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      age: 18,
      gender: "male",
      address: "",
      emergencyContact: "",
      medicalConditions: "",
      notes: ""
    }
  })

  const onSubmit = useCallback(async (values: FormValues) => {
    try {
      setIsSubmitting(true)
      
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

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'خطا در ثبت نام')
      }

      toast.success('ثبت نام با موفقیت انجام شد')
      form.reset()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'خطا در ثبت نام')
    } finally {
      setIsSubmitting(false)
    }
  }, [eventId, form])

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">ثبت نام در رویداد</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 p-4 bg-muted rounded-lg">
          <h3 className="font-semibold text-lg mb-2">{eventTitle}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
            <div>تاریخ: {new Date(eventDate).toLocaleDateString('fa-IR')}</div>
            <div>مکان: {eventLocation}</div>
            <div>ظرفیت: {eventCapacity} نفر</div>
            {eventPrice && <div>قیمت: {eventPrice.toLocaleString()} تومان</div>}
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نام و نام خانوادگی</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="نام خود را وارد کنید" />
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
                      <Input {...field} placeholder="۰۹۱۲۳۴۵۶۷۸۹" dir="ltr" />
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
                    <FormLabel>ایمیل (اختیاری)</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" placeholder="example@domain.com" dir="ltr" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>سن</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field} 
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>جنسیت</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="جنسیت خود را انتخاب کنید" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">مرد</SelectItem>
                        <SelectItem value="female">زن</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="emergencyContact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>شماره تماس اضطراری</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="۰۹۱۲۳۴۵۶۷۸۹" dir="ltr" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>آدرس کامل</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      placeholder="آدرس کامل خود را وارد کنید"
                      className="min-h-[100px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="medicalConditions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>شرایط پزشکی (اختیاری)</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      placeholder="در صورت وجود شرایط پزشکی خاص، توضیحات را وارد کنید"
                      className="min-h-[100px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>یادداشت‌ها (اختیاری)</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      placeholder="یادداشت‌های خود را وارد کنید"
                      className="min-h-[100px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  در حال ثبت نام...
                </>
              ) : (
                'ثبت نام'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
} 