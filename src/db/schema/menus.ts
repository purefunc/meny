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
import { z } from "zod";

import users from "./users";

// Tables

export const menuItems = pgTable("menuItems", {
  id: uuid("id").primaryKey().defaultRandom(),
  categoryId: uuid("categoryId")
    .notNull()
    .references(() => categories.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  price: text("price"),
  posId: text("posId").default(""),
  isHidden: boolean("isHidden"),
  image: varchar("image", { length: 2048 }),
  tags: text("tags").array().default([]),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
  updatedBy: uuid("updatedBy")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  menuId: uuid("menuId")
    .notNull()
    .references(() => menus.id, { onDelete: "cascade" }),
  description: text("description"),
  isHidden: boolean("isHidden"),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
  updatedBy: uuid("updatedBy")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  image: varchar("image", { length: 2048 }),
  notes: text("notes").array().default([]),
});

export const menus = pgTable("menus", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  description: text("description"),
  name: text("name").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
  updatedBy: uuid("updatedBy")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  image: varchar("image", { length: 2048 }),
  notes: text("notes").array().default([]),
  isPublic: boolean("isPublic"),
  message: text("message"),
});

// Relations

export const menuItemsRelations = relations(menuItems, ({ one }) => ({
  category: one(categories, {
    fields: [menuItems.categoryId],
    references: [categories.id],
  }),
}));

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  menu: one(menus, {
    fields: [categories.menuId],
    references: [menus.id],
  }),
  menuItems: many(menuItems),
}));

export const menusRelations = relations(menus, ({ one, many }) => ({
  user: one(users, {
    fields: [menus.userId],
    references: [users.id],
  }),
  categories: many(categories),
}));

// Schemas

const MenuItemSchema = createSelectSchema(menuItems)
  .omit({
    categoryId: true,
    createdAt: true,
    updatedAt: true,
    updatedBy: true,
  })
  .extend({
    id: z.string().uuid().optional(),
  });

const CategorySchema = createSelectSchema(categories)
  .omit({
    menuId: true,
    createdAt: true,
    updatedAt: true,
    updatedBy: true,
  })
  .extend({
    id: z.string().uuid().optional(),
  });

export const InsertMenuSchema = createInsertSchema(menus).pick({
  name: true,
  description: true,
});

export const MenuSchema = createSelectSchema(menus)
  .omit({
    userId: true,
    createdAt: true,
    updatedAt: true,
    updatedBy: true,
    isPublic: true,
  })
  .extend({
    categories: z
      .array(
        CategorySchema.extend({
          menuItems: z.array(MenuItemSchema).default([]),
        })
      )
      .default([]),
  });

export const TogglePublishMenuSchema = createSelectSchema(menus).pick({
  id: true,
  isPublic: true,
});
