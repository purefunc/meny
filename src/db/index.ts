import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { config } from "dotenv"
import * as schema from "./schema/index"

config({ path: ".env.local" })

export const client = postgres(process.env.DATABASE_URL!, {
  max: process.env.DB_MIGRATING ? 1 : undefined,
  prepare: false,
})

const db = drizzle(client, {
  schema,
})

export default db
