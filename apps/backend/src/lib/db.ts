import { drizzle } from 'drizzle-orm/libsql'
import 'dotenv/config'
import * as schema from '@/backend/lib/schema.js'
// You can specify any property from the libsql connection options

export const db = drizzle({
  connection: {
    url: process.env.DATABASE_URI!,
    authToken: process.env.DATABASE_AUTH_TOKEN!,
  },
  schema,
})
