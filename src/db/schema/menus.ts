import { relations } from "drizzle-orm";
import {
  boolean,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

import { categories } from "./categories";
import users from "./users";

export const menus = pgTable("menus", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  description: text("description").notNull(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
  updatedBy: uuid("updatedBy")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  image: varchar("image", { length: 2048 }),
  notes: text("notes"),
  isPublic: boolean("isPublic").notNull().default(false),
  message: text("message"),
});

export const menusRelations = relations(menus, ({ one, many }) => ({
  user: one(users, {
    fields: [menus.userId],
    references: [users.id],
  }),
  categories: many(categories),
}));

export const CreateMenuSchema = createInsertSchema(menus).pick({
  id: true,
  name: true,
  description: true,
});

export const UpdateMenuSchema = createInsertSchema(menus).omit({
  userId: true,
  createdAt: true,
  updatedAt: true,
  updatedBy: true,
});
