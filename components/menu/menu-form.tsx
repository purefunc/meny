"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Plus, Trash } from "lucide-react"

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  categories: z.array(
    z.object({
      title: z.string().min(1, "Category title is required"),
      description: z.string().optional(),
      items: z.array(
        z.object({
          title: z.string().min(1, "Item title is required"),
          description: z.string().optional(),
          price: z.number().min(0, "Price must be non-negative"),
          hidden: z.boolean().default(false),
          image_src: z.string().optional(),
        })
      ),
    })
  ),
})

export default function MenuForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      categories: [],
    },
  })

  const {
    fields: categoryFields,
    append: appendCategory,
    remove: removeCategory,
  } = useFieldArray({
    control: form.control,
    name: "categories",
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form submitted with menu:", values)
    // Here you would typically send the data to your server
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-3xl mx-auto p-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Menu Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter menu title" {...field} />
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
              <FormLabel>Menu Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter menu description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Categories</h2>
          {categoryFields.map((categoryField, categoryIndex) => (
            <div key={categoryField.id} className="space-y-4 p-4 border rounded-lg relative">
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => removeCategory(categoryIndex)}
              >
                <Trash className="h-4 w-4" />
              </Button>

              <FormField
                control={form.control}
                name={`categories.${categoryIndex}.title`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter category title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`categories.${categoryIndex}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter category description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Menu Items</h3>
                <MenuItemsFieldArray form={form} categoryIndex={categoryIndex} />
              </div>
            </div>
          ))}

          <Button
            type="button"
            onClick={() => appendCategory({ title: "", description: "", items: [] })}
            className="w-full"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Category
          </Button>
        </div>

        <Button type="submit" className="w-full">
          Submit Menu
        </Button>
      </form>
    </Form>
  )
}

function MenuItemsFieldArray({ form, categoryIndex }: { form: any; categoryIndex: number }) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `categories.${categoryIndex}.items`,
  })

  return (
    <>
      {fields.map((field, itemIndex) => (
        <div key={field.id} className="space-y-4 p-4 border rounded-lg relative">
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={() => remove(itemIndex)}
          >
            <Trash className="h-4 w-4" />
          </Button>

          <FormField
            control={form.control}
            name={`categories.${categoryIndex}.items.${itemIndex}.title`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter item title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`categories.${categoryIndex}.items.${itemIndex}.description`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter item description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`categories.${categoryIndex}.items.${itemIndex}.price`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter price"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`categories.${categoryIndex}.items.${itemIndex}.hidden`}
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Hidden</FormLabel>
                  <FormDescription>Hide this item from the menu</FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`categories.${categoryIndex}.items.${itemIndex}.image_src`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="Enter image URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      ))}
      <Button
        type="button"
        onClick={() => append({ title: "", description: "", price: 0, hidden: false, image_src: "" })}
        className="w-full mt-2"
      >
        <Plus className="mr-2 h-4 w-4" /> Add Item
      </Button>
    </>
  )
}
