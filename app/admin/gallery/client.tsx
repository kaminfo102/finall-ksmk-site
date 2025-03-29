"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Edit, Trash2, Plus, Image as ImageIcon } from "lucide-react"
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

type GalleryItem = {
  id: number
  title: string
  imageUrl: string
  description?: string | null
  createdAt: Date
}

const gallerySchema = z.object({
  title: z.string().min(2, "عنوان باید حداقل ۲ حرف باشد"),
  imageUrl: z.string().url("آدرس تصویر معتبر نیست"),
  description: z.string().optional()
})

export default function AdminGalleryClient({ items }: { items: GalleryItem[] }) {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const form = useForm<z.infer<typeof gallerySchema>>({
    resolver: zodResolver(gallerySchema),
    defaultValues: {
      title: "",
      imageUrl: "",
      description: ""
    }
  })

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/gallery/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete gallery item')
      }

      toast.success('تصویر با موفقیت حذف شد')
      setIsDeleteDialogOpen(false)
      window.location.reload()
    } catch (error) {
      toast.error('خطا در حذف تصویر')
    }
  }

  const onSubmit = async (values: z.infer<typeof gallerySchema>) => {
    try {
      const response = await fetch('/api/gallery', {
        method: selectedItem ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...values,
          id: selectedItem?.id
        })
      })

      if (!response.ok) {
        throw new Error('Failed to save gallery item')
      }

      toast.success(selectedItem ? 'تصویر با موفقیت ویرایش شد' : 'تصویر با موفقیت اضافه شد')
      setIsEditDialogOpen(false)
      setIsAddDialogOpen(false)
      window.location.reload()
    } catch (error) {
      toast.error('خطا در ذخیره تصویر')
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">مدیریت گالری</h1>
        <Button onClick={() => {
          form.reset()
          setIsAddDialogOpen(true)
        }}>
          <Plus className="ml-2 h-4 w-4" />
          افزودن تصویر جدید
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items?.length > 0 ? (
          items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-lg overflow-hidden border"
            >
              <div className="relative h-48">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                {item.description && (
                  <p className="text-muted-foreground text-sm mb-4">
                    {item.description}
                  </p>
                )}
                <div className="flex justify-end space-x-2 space-x-reverse">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedItem(item)
                      form.reset({
                        title: item.title,
                        imageUrl: item.imageUrl,
                        description: item.description || ""
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
                      setSelectedItem(item)
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
          <p className="text-center col-span-full text-muted-foreground">هیچ تصویری یافت نشد.</p>
        )}
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>حذف تصویر</DialogTitle>
            <DialogDescription>
              آیا از حذف این تصویر اطمینان دارید؟ این عمل غیرقابل بازگشت است.
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
              onClick={() => selectedItem && handleDelete(selectedItem.id)}
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
              {selectedItem ? 'ویرایش تصویر' : 'افزودن تصویر جدید'}
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>توضیحات (اختیاری)</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">
                  {selectedItem ? 'ویرایش' : 'افزودن'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
} 