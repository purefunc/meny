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

import { menus } from "./menus";
import users from "./users";

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  menuId: uuid("menuId")
    .notNull()
    .references(() => menus.id, { onDelete: "cascade" }),
  description: text("description").notNull(),
  isHidden: boolean("isHidden").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
  updatedBy: uuid("updatedBy")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  image: varchar("image", { length: 2048 }).notNull(),
  notes: text("notes"),
});

export const categoriesRelations = relations(categories, ({ one }) => ({
  menu: one(menus, {
    fields: [categories.menuId],
    references: [menus.id],
  }),
}));

export const CreateCategorySchema = createInsertSchema(categories).omit({
  menuId: true,
  createdAt: true,
  updatedAt: true,
});

export const CategorySchema = createSelectSchema(categories);
