import { betterAuth } from 'better-auth'
import { MongoClient } from 'mongodb'
import { mongodbAdapter } from 'better-auth/adapters/mongodb'
import { openAPI } from 'better-auth/plugins'
import { expo } from '@better-auth/expo'
import { Env } from '../app'

let cachedClient: MongoClient | null = null

export const auth = ({
  BETTER_AUTH_SECRET,
  BETTER_AUTH_URL,
  DATABASE_URI,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
}: Env) => {
  if (!cachedClient) {
    cachedClient = new MongoClient(DATABASE_URI)
  }

  const db = cachedClient.db()

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
    plugins: [openAPI(), expo()],
  })
}
