import { betterAuth } from 'better-auth'
import { openAPI, admin } from 'better-auth/plugins'
import { expo } from '@better-auth/expo'
import { admin as adminRole, lawyer, user } from './permissions.js'
import { z } from 'zod'
import { db } from './db.js'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { config } from 'dotenv'

config()

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: ['mylawyer://', 'exp://', process.env.BETTER_AUTH_URL!],
  database: drizzleAdapter(db, {
    provider: 'pg', // or "mysql", "sqlite"
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  user: {
    additionalFields: {
      phoneNumber: {
        type: 'number',
        required: false,
        validator: {
          input: z.number().min(10),
        },
      },
    },
  },
  plugins: [
    openAPI(),
    admin({
      roles: {
        admin: adminRole,
        lawyer,
        user,
      },
      defaultRole: 'user',
    }),
    expo(),
  ],
})
