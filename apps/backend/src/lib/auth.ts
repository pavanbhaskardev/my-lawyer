import { betterAuth } from 'better-auth'
import { MongoClient } from 'mongodb'
import { mongodbAdapter } from 'better-auth/adapters/mongodb'
import { openAPI } from 'better-auth/plugins'

let cachedClient: MongoClient | null = null

export const auth = ({ mongodbURI }: { mongodbURI: string }) => {
  if (!cachedClient) {
    cachedClient = new MongoClient(mongodbURI)
  }

  const db = cachedClient.db()

  return betterAuth({
    database: mongodbAdapter(db),
    emailAndPassword: {
      enabled: true,
    },
    plugins: [openAPI()],
  })
}
