import { betterAuth } from 'better-auth'
import { MongoClient } from 'mongodb'
import { mongodbAdapter } from 'better-auth/adapters/mongodb'
import { openAPI, admin } from 'better-auth/plugins'
import { expo } from '@better-auth/expo'
import { Env } from '../app'
import { admin as adminRole, lawyer, user } from '@/backend/lib/permissions'
import { z } from 'zod'

export const auth = ({
  BETTER_AUTH_SECRET,
  BETTER_AUTH_URL,
  DATABASE_URI,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
}: Env) => {
  const db = new MongoClient(DATABASE_URI).db()

  return betterAuth({
    baseURL: BETTER_AUTH_URL,
    secret: BETTER_AUTH_SECRET,
    trustedOrigins: ['mylawyer://', 'exp://'],
    database: mongodbAdapter(db),
    emailAndPassword: {
      enabled: true,
    },
    socialProviders: {
      google: {
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
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
      expo(),
      admin({
        roles: {
          admin: adminRole,
          lawyer,
          user,
        },
      }),
    ],
  })
}
