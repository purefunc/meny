import { integer, text, boolean, pgTable } from "drizzle-orm/pg-core"
import { z } from "zod"

const menuTable = pgTable("menu", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  logo_src: text("logo_src"),
  image_src: text("image_src"),
})

const categoryTable = pgTable("category", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  image_src: text("img_src"),
  menu_id: integer("menu_id").references(() => menuTable.id), // Foreign key to menu table
})

const menuItemTable = pgTable("menu_item", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  price: integer("price").notNull(),
  hidden: boolean("hidden").notNull(),
  image_src: text("img_src"),
  tags: text("tags").array(),
  category_id: integer("category_id").references(() => categoryTable.id), // Foreign key to category table
})

const MenuItemSchema = z.object({
  id: z.number().int(),
  title: z.string().min(1, "Title is required"),
  description: z.string(),
  price: z.number().int().nonnegative(),
  hidden: z.boolean(),
  image_src: z.string().optional(),
  tags: z.array(z.string()).optional(),
  category_id: z.number().int(),
})

const CategorySchema = z.object({
  id: z.number().int(),
  title: z.string().min(1, "Title is required"),
  description: z.string(),
  image_src: z.string().optional(),
  menu_id: z.number().int(),

  // items: z.array(MenuItemSchema),
})

const MenuSchema = z.object({
  id: z.number().int(),
  title: z.string().min(1, "Title is required"),
  description: z.string(),
  logo_src: z.string().optional(),
  image_src: z.string().optional(),
  // categories: z.array(CategorySchema),
})

export type MenuItem = z.infer<typeof MenuItemSchema>
export type Category = z.infer<typeof CategorySchema>
export type Menu = z.infer<typeof MenuSchema>

export { MenuItemSchema, CategorySchema, MenuSchema, menuTable, categoryTable, menuItemTable }
