"use client"

import { useState } from "react"
import { format } from "date-fns-jalali"
import { motion } from "framer-motion"
import { Edit, Trash2, Plus, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
  content?: string | null
  imageUrl: string
  date: Date
  location: string
  capacity: number
  price?: number | null
  images: { id: number; url: string }[]
}

const eventSchema = z.object({
  title: z.string().min(2, "عنوان باید حداقل ۲ حرف باشد"),
  description: z.string().min(10, "توضیحات باید حداقل ۱۰ حرف باشد"),
  content: z.string().optional(),
  imageUrl: z.string().url("آدرس تصویر معتبر نیست"),
  date: z.string().min(1, "تاریخ را وارد کنید"),
  location: z.string().min(2, "مکان را وارد کنید"),
  capacity: z.number().min(1, "ظرفیت باید حداقل ۱ نفر باشد"),
  price: z.number().nullable(),
  images: z.array(z.object({
    url: z.string().url("آدرس تصویر معتبر نیست")
  }))
})

export default function AdminEventsClient({ events }: { events: Event[] }) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      imageUrl: "",
      date: "",
      location: "",
      capacity: 1,
      price: null,
      images: []
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
    <div>
      <div className="flex justify-between items-center mb-6">
        <Button onClick={() => {
          form.reset()
          setIsAddDialogOpen(true)
        }}>
          <Plus className="ml-2 h-4 w-4" />
          افزودن رویداد جدید
        </Button>
      </div>

      <div className="bg-card rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>عنوان</TableHead>
              <TableHead>تاریخ</TableHead>
              <TableHead>مکان</TableHead>
              <TableHead>ظرفیت</TableHead>
              <TableHead>تصاویر</TableHead>
              <TableHead>عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-medium">{event.title}</TableCell>
                <TableCell>{format(new Date(event.date), 'yyyy/MM/dd')}</TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>{event.capacity}</TableCell>
                <TableCell>{event.images?.length || 0}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedEvent(event)
                        form.reset({
                          title: event.title,
                          description: event.description,
                          content: event.content || "",
                          imageUrl: event.imageUrl,
                          date: new Date(event.date).toISOString().split('T')[0],
                          location: event.location,
                          capacity: event.capacity,
                          price: event.price,
                          images: event.images || []
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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

      <Dialog open={isEditDialogOpen || isAddDialogOpen} onOpenChange={(open) => {
        if (!open) {
          setIsEditDialogOpen(false)
          setIsAddDialogOpen(false)
        }
      }}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedEvent ? 'ویرایش رویداد' : 'افزودن رویداد جدید'}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    <FormLabel>توضیحات کوتاه</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>محتوای کامل</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        className="min-h-[200px]"
                        placeholder="توضیحات کامل رویداد را وارد کنید..."
                      />
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
                    <FormLabel>تصویر اصلی</FormLabel>
                    <FormControl>
                      <Input {...field} type="url" dir="ltr" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <FormLabel>تصاویر گالری</FormLabel>
                {form.watch('images')?.map((_, index) => (
                  <FormField
                    key={index}
                    control={form.control}
                    name={`images.${index}.url`}
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-2">
                          <FormControl>
                            <Input {...field} type="url" dir="ltr" />
                          </FormControl>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const images = form.getValues('images')
                              form.setValue('images', images.filter((_, i) => i !== index))
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const images = form.getValues('images') || []
                    form.setValue('images', [...images, { url: '' }])
                  }}
                >
                  افزودن تصویر
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <FormLabel>قیمت (تومان)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...field}
                          onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : null)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsEditDialogOpen(false)
                    setIsAddDialogOpen(false)
                  }}
                >
                  انصراف
                </Button>
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