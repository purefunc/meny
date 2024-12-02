import { pgSchema, timestamp, uuid, varchar } from "drizzle-orm/pg-core"

const authSchema = pgSchema("auth")

const users = authSchema.table("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }).notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: varchar("image", { length: 2048 }).notNull(),
})

export default users
