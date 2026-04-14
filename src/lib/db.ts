import { neon } from "@neondatabase/serverless";

export function getDb() {
  const url = process.env.SITE_DATABASE_URL;
  if (!url) throw new Error("SITE_DATABASE_URL environment variable is not set");
  return neon(url);
}

// Lazy tagged-template wrapper — safe to import at module level.
// Initializes the neon connection on first use (at request time, not build time).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sql: any = new Proxy(
  (() => {}) as any,
  {
    apply(_target, _this, args) {
      return (getDb() as any)(...args);
    },
    get(_target, prop) {
      return (getDb() as any)[prop];
    },
  }
);
