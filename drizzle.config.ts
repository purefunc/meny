import { defineConfig, Config } from "drizzle-kit"
import { env } from "@/env/server"

export default defineConfig({
  schemaFilter: ["public"],
  schema: "./src/db/schema/index.ts",
  out: "./src/supabase/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL!,
  },
}) satisfies Config
