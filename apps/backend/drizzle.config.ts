import type { Config } from 'drizzle-kit'
import 'dotenv/config'

export default {
  out: './drizzle',
  schema: './src/lib/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URI,
  },
} satisfies Config
