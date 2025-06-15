import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'

import { config } from 'dotenv'
import * as schema from '@/backend/lib/schema.js'

config()

const sql = neon(process.env.DATABASE_URI!)
export const db = drizzle({ client: sql, schema })
