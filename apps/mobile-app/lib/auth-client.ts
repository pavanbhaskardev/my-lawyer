import { createAuthClient } from 'better-auth/react'
import { adminClient } from 'better-auth/client/plugins'
import { expoClient } from '@better-auth/expo/client'
import * as SecureStore from 'expo-secure-store'
import { admin, lawyer, user, ac } from '@/backend/lib/permissions'
import { inferAdditionalFields } from 'better-auth/client/plugins'
import { auth } from '@/backend/lib/auth'

export const authClient = createAuthClient({
  baseURL:
    process.env
      .EXPO_PUBLIC_API_URL! /* base url of your Better Auth backend. */,
  plugins: [
    expoClient({
      scheme: 'my-lawyer',
      storagePrefix: 'my-lawyer',
      storage: SecureStore,
    }),
    adminClient({
      ac,
      roles: {
        admin,
        lawyer,
        user,
      },
    }),
    inferAdditionalFields<typeof auth>(),
  ],
})
