"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface Category {
  id: number
  title: string
  description: string
  price: string
}

export default function CategoryForm() {
  const [categories, setCategories] = useState<Category[]>([{ id: 1, title: "", description: "", price: "" }])
  console.log("CATS", categories)

  const addCategory = () => {
    const newId = categories.length > 0 ? Math.max(...categories.map((c) => c.id)) + 1 : 1
    setCategories([...categories, { id: newId, title: "", description: "", price: "" }])
  }

  const removeCategory = (id: number) => {
    setCategories(categories.filter((category) => category.id !== id))
  }

  const updateCategory = (id: number, field: keyof Category, value: string) => {
    setCategories(categories.map((category) => (category.id === id ? { ...category, [field]: value } : category)))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted with categories:", categories)
    // Here you would typically send the data to your server
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Categories Form</h1>

      {categories.map((category) => (
        <div key={category.id} className="space-y-4 p-4 border rounded-lg relative">
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={() => removeCategory(category.id)}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Remove category</span>
          </Button>

          <div>
            <Label htmlFor={`title-${category.id}`}>Title</Label>
            <Input
              id={`title-${category.id}`}
              value={category.title}
              onChange={(e) => updateCategory(category.id, "title", e.target.value)}
              placeholder="Enter title"
              required
            />
          </div>

          <div>
            <Label htmlFor={`description-${category.id}`}>Description</Label>
            <Textarea
              id={`description-${category.id}`}
              value={category.description}
              onChange={(e) => updateCategory(category.id, "description", e.target.value)}
              placeholder="Enter description"
              required
            />
          </div>

          <div>
            <Label htmlFor={`price-${category.id}`}>Price</Label>
            <Input
              id={`price-${category.id}`}
              type="number"
              value={category.price}
              onChange={(e) => updateCategory(category.id, "price", e.target.value)}
              placeholder="Enter price"
              required
              min="0"
              step="0.01"
            />
          </div>
        </div>
      ))}

      <Button type="button" onClick={addCategory} className="w-full">
        <Plus className="mr-2 h-4 w-4" /> Add Category
      </Button>

      <Button type="submit" className="w-full">
        Submit
      </Button>
    </form>
  )
}
