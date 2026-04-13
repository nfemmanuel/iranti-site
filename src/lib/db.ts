import { neon } from "@neondatabase/serverless";

if (!process.env.SITE_DATABASE_URL) {
  throw new Error("SITE_DATABASE_URL environment variable is not set");
}

export const sql = neon(process.env.SITE_DATABASE_URL);
