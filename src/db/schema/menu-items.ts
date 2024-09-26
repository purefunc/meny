import { relations } from "drizzle-orm";
import {
  boolean,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { categories } from "./categories";
import users from "./users";

export const menuItems = pgTable("menuItems", {
  id: uuid("id").primaryKey().defaultRandom(),
  categoryId: uuid("categoryId")
    .notNull()
    .references(() => categories.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: text("price").notNull(),
  isHidden: boolean("isHidden").notNull(),
  isSeasonal: boolean("isSeasonal").notNull(),
  image: varchar("image", { length: 2048 }).notNull(),
  tags: text("tags").array(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
  updatedBy: uuid("updatedBy")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const menuItemsRelations = relations(menuItems, ({ one }) => ({
  category: one(categories, {
    fields: [menuItems.categoryId],
    references: [categories.id],
  }),
}));

export const CreateMenuItemSchema = createInsertSchema(menuItems).omit({
  categoryId: true,
  createdAt: true,
  updatedAt: true,
});

export const MenuItemSchema = createSelectSchema(menuItems);
