"use client"

import { useState } from "react"
import { format } from "date-fns-jalali"
import { motion } from "framer-motion"
import { Edit, Trash2, Plus, Users, Calendar, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
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
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import Image from "next/image"

type Event = {
  id: number
  title: string
  description: string
  imageUrl: string
  date: Date
  location: string
  capacity: number
  price?: number | null
  registrations: any[]
}

const eventSchema = z.object({
  title: z.string().min(2, "عنوان باید حداقل ۲ حرف باشد"),
  description: z.string().min(10, "توضیحات باید حداقل ۱۰ حرف باشد"),
  imageUrl: z.string().url("آدرس تصویر معتبر نیست"),
  date: z.string().min(1, "تاریخ را وارد کنید"),
  location: z.string().min(2, "مکان را وارد کنید"),
  capacity: z.number().min(1, "ظرفیت باید حداقل ۱ نفر باشد"),
  price: z.number().nullable()
})

export default function AdminEventsPage({ events }: { events: Event[] }) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
      date: "",
      location: "",
      capacity: 1,
      price: null
    }
  })

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/events/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete event')
      }

      toast.success('رویداد با موفقیت حذف شد')
      setIsDeleteDialogOpen(false)
      window.location.reload()
    } catch (error) {
      toast.error('خطا در حذف رویداد')
    }
  }

  const onSubmit = async (values: z.infer<typeof eventSchema>) => {
    try {
      const response = await fetch('/api/events', {
        method: selectedEvent ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...values,
          id: selectedEvent?.id
        })
      })

      if (!response.ok) {
        throw new Error('Failed to save event')
      }

      toast.success(selectedEvent ? 'رویداد با موفقیت ویرایش شد' : 'رویداد با موفقیت ایجاد شد')
      setIsEditDialogOpen(false)
      setIsAddDialogOpen(false)
      window.location.reload()
    } catch (error) {
      toast.error('خطا در ذخیره رویداد')
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">مدیریت رویدادها</h1>
        <Button onClick={() => {
          form.reset()
          setIsAddDialogOpen(true)
        }}>
          <Plus className="ml-2 h-4 w-4" />
          افزودن رویداد جدید
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {events?.length > 0 ? (
          events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card rounded-lg overflow-hidden border"
          >
            <div className="relative h-48">
              <Image
                src={event?.imageUrl}
                alt={event?.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{event?.title}</h3>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 ml-2" />
                  <span>{format(new Date(event?.date), 'dd MMMM yyyy')}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 ml-2" />
                  <span>{event?.location}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="h-4 w-4 ml-2" />
                  <span>{event?.registrations?.length} / {event?.capacity}</span>
                </div>
              </div>
              <div className="flex justify-end space-x-2 space-x-reverse">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (!event) return
                    setSelectedEvent(event)
                    form.reset({
                      title: event.title || "",
                      description: event.description || "",
                      imageUrl: event.imageUrl,
                      date: new Date(event.date).toISOString().split('T')[0],
                      location: event.location || "",
                      capacity: event.capacity || "",
                      price: event.price || 0
                    })
                    setIsEditDialogOpen(true)
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedEvent(event)
                    setIsDeleteDialogOpen(true)
                  }}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          </motion.div>
          ))
        ) : (
          <p className="text-center col-span-full text-muted-foreground">هیچ رویدادی یافت نشد.</p>
        )}
      </div>
      

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>حذف رویداد</DialogTitle>
            <DialogDescription>
              آیا از حذف این رویداد اطمینان دارید؟ این عمل غیرقابل بازگشت است.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              انصراف
            </Button>
            <Button
              variant="destructive"
              onClick={() => selectedEvent && handleDelete(selectedEvent.id)}
            >
              حذف
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog 
        open={isEditDialogOpen || isAddDialogOpen} 
        onOpenChange={(open) => {
          if (!open) {
            setIsEditDialogOpen(false)
            setIsAddDialogOpen(false)
          }
        }}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {selectedEvent ? 'ویرایش رویداد' : 'افزودن رویداد جدید'}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>عنوان</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>توضیحات</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>آدرس تصویر</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>تاریخ</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>مکان</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ظرفیت</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>قیمت (اختیاری)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field}
                        value={field.value ?? ''}
                        onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : null)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">
                  {selectedEvent ? 'ویرایش' : 'افزودن'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}