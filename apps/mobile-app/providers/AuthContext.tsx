import React, { useEffect } from 'react'
import { authClient } from '@/lib/auth-client'
import { View, Text } from 'react-native'
import { useRouter } from 'expo-router'

// Provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data, isPending } = authClient.useSession()
  const router = useRouter()

  useEffect(() => {
    if (data?.user) {
      router.replace('/dashboard')
    }
  }, [data])

  if (isPending) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }

  return <>{children}</>
}
