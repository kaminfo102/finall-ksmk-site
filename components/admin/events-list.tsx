"use client"

import { useState, useCallback, memo } from "react"
import { format } from "date-fns-jalali"
import { Edit, Trash2, Plus } from "lucide-react"
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

// Define types
type EventImage = {
  id: number
  url: string
}

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
  images: EventImage[]
}

// Schema for event validation
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

// Form default values
const defaultFormValues = {
  title: "",
  description: "",
  content: "",
  imageUrl: "",
  date: "",
  location: "",
  capacity: 1,
  price: null,
  images: []
};

type FormValues = z.infer<typeof eventSchema>;

// Memoized event row component for better performance
const EventRow = memo(({ 
  event, 
  onEdit, 
  onDelete 
}: { 
  event: Event; 
  onEdit: (event: Event) => void; 
  onDelete: (event: Event) => void; 
}) => {
  return (
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
            onClick={() => onEdit(event)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(event)}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
});

EventRow.displayName = 'EventRow';

export default function AdminEventsClient({ events }: { events: Event[] }) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: defaultFormValues
  })

  // Handlers
  const handleDelete = useCallback(async (id: number) => {
    try {
      const response = await fetch(`/api/events/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete event')
      }

      toast.success('رویداد با موفقیت حذف شد')
      setIsDeleteDialogOpen(false)
      window.location.reload()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'خطا در حذف رویداد')
    }
  }, [])

  const onSubmit = useCallback(async (values: FormValues) => {
    try {
      const formattedValues = {
        ...values,
        id: selectedEvent?.id,
        capacity: Number(values.capacity),
        price: values.price ? Number(values.price) : null,
        images: values.images?.map(img => ({ url: img.url })) || []
      };
      
      const response = await fetch('/api/events', {
        method: selectedEvent ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formattedValues)
      })

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'خطا در ذخیره رویداد')
      }

      toast.success(selectedEvent ? 'رویداد با موفقیت ویرایش شد' : 'رویداد با موفقیت ایجاد شد')
      setIsEditDialogOpen(false)
      setIsAddDialogOpen(false)
      window.location.reload()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'خطا در ذخیره رویداد')
    }
  }, [selectedEvent])

  const handleEditClick = useCallback((event: Event) => {
    setSelectedEvent(event)
    form.reset({
      title: event.title,
      description: event.description,
      content: event.content || "",
      imageUrl: event.imageUrl,
      date: new Date(event.date).toISOString().split('T')[0],
      location: event.location,
      capacity: event.capacity,
      price: event.price || null,
      images: event.images?.map(img => ({ url: img.url })) || []
    })
    setIsEditDialogOpen(true)
  }, [form])

  const handleAddClick = useCallback(() => {
    form.reset(defaultFormValues)
    setSelectedEvent(null)
    setIsAddDialogOpen(true)
  }, [form])

  const handleDeleteClick = useCallback((event: Event) => {
    setSelectedEvent(event)
    setIsDeleteDialogOpen(true)
  }, [])

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Button onClick={handleAddClick}>
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
              <EventRow 
                key={event.id}
                event={event}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Delete Dialog */}
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

      {/* Add/Edit Dialog */}
      <Dialog 
        open={isEditDialogOpen || isAddDialogOpen} 
        onOpenChange={(open) => {
          if (!open) {
            setIsEditDialogOpen(false)
            setIsAddDialogOpen(false)
          }
        }}
      >
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
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
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
                          value={field.value ?? ''}
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