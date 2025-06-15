import { betterAuth } from 'better-auth'
import { openAPI, admin } from 'better-auth/plugins'
import { expo } from '@better-auth/expo'
import { admin as adminRole, lawyer, user } from './permissions.js'
import { z } from 'zod'
import { db } from './db.js'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { config } from 'dotenv'
import { createAuthMiddleware, APIError } from 'better-auth/api'

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
      lawyerVerified: {
        type: 'date',
        required: false,
      },
      lawyerVerificationStatus: {
        type: 'string',
        defaultValue: 'pending',
        validator: {
          input: z.enum(['pending', 'approved', 'rejected']),
        },
      },
      rejectedReason: {
        type: 'string',
      },
      bio: {
        type: 'string',
      },
    },
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      console.dir(
        { path: ctx.path, body: ctx.body, other: ctx.context.newSession },
        { depth: null }
      )

      if (ctx.path === '/update-user') {
        if (ctx.body?.role !== 'admin') {
          throw new APIError('FORBIDDEN', {
            message: "You're not authorized to perform this action",
          })
        }
      }
    }),
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
