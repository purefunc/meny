import { migrate } from "drizzle-orm/postgres-js/migrator";
import drizzleConfig from "@/drizzle.config
import { config } from "dotenv"
import db, { client } from "./index";

config({ path: ".env.local" })

if (!process.env.DB_MIGRATING) {
  throw new Error("You must set DB_MIGRATING to true.");
}

await migrate(db, { migrationsFolder: drizzleConfig.out! });

await client.end();
