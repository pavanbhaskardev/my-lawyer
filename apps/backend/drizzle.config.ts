import type { Config } from 'drizzle-kit'
import 'dotenv/config'

export default {
  out: './drizzle',
  schema: './src/lib/schema.ts',
  dialect: 'turso',
  dbCredentials: {
    url: process.env.DATABASE_URI,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  },
} satisfies Config
