import { drizzle } from 'drizzle-orm/libsql'
import { config } from 'dotenv'
import * as schema from '@/backend/lib/schema.js'
// You can specify any property from the libsql connection options

config()

export const db = drizzle({
  connection: {
    url: process.env.DATABASE_URI!,
    authToken: process.env.DATABASE_AUTH_TOKEN!,
  },
  schema,
})
