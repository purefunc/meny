"use client"

import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Trash2, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const formSchema = z.object({
  categories: z
    .array(
      z.object({
        title: z.string().min(1, "Title is required"),
        description: z.string().optional(),
        price: z.coerce.number().min(0, "Price must be a positive number"),
      })
    )
    .min(1, "At least one category is required"),
})

export default function CategoryForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categories: [{ title: "", description: "", price: 0 }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "categories",
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form submitted with categories:", values.categories)
    // Here you would typically send the data to your server
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Categories Form</h1>

        {fields.map((field, index) => (
          <div key={field.id} className="space-y-4 p-4 border rounded-lg relative">
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => remove(index)}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Remove category</span>
            </Button>

            <FormField
              control={form.control}
              name={`categories.${index}.title`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={`title-${index}`}>Title</FormLabel>
                  <FormControl>
                    <Input id={`title-${index}`} placeholder="Enter title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`categories.${index}.description`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={`description-${index}`}>Description</FormLabel>
                  <FormControl>
                    <Textarea id={`description-${index}`} placeholder="Enter description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`categories.${index}.price`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={`price-${index}`}>Price</FormLabel>
                  <FormControl>
                    <Input
                      id={`price-${index}`}
                      type="number"
                      placeholder="Enter price"
                      min="0"
                      step="0.01"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}

        <Button type="button" onClick={() => append({ title: "", description: "", price: 0 })} className="w-full">
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </Button>

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  )
}
