import React, { useEffect } from 'react'
import { authClient } from '@/lib/auth-client'
import { View, Text } from 'react-native'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

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

  if (isPending) {
    return (
      <SafeAreaView className="bg-background h-full">
        <View>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    )
  }

  return <>{children}</>
}
