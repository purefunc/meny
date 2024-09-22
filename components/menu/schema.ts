import { z } from "zod"

const MenuItemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string(),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  hidden: z.boolean(),
  image_src: z.string().optional(),
  tags: z.array(z.string()).optional(),
})

const CategorySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string(),
  image_src: z.string().optional(),
  items: z.array(MenuItemSchema),
})

const MenuSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string(),
  logo_src: z.string().optional(),
  image_src: z.string().optional(),
  categories: z.array(CategorySchema),
})

export type MenuItem = z.infer<typeof MenuItemSchema>
export type Category = z.infer<typeof CategorySchema>
export type Menu = z.infer<typeof MenuSchema>

export { MenuItemSchema, CategorySchema, MenuSchema }
