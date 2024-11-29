import { defineConfig, Config } from "drizzle-kit"
import { env } from "@/env/server"

export default defineConfig({
  schema: "./db/schema/index.ts",
  out: "./supabase/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL!,
  },
}) satisfies Config
