import React, { useEffect } from 'react'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'expo-router'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data, isPending } = authClient.useSession()
  const router = useRouter()

  useEffect(() => {
    if (!isPending) {
      if (data?.user) {
        router.replace('/lawyers')
      } else {
        router.replace('/sign-in')
      }
    }
  }, [data, isPending])

  return <>{children}</>
}
