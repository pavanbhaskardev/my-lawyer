import { Text, View, Button } from 'react-native'
import type { AppType } from '@/backend/app'
import { hc } from 'hono/client'
import { useQuery } from '@tanstack/react-query'
import { authClient } from '@/lib/auth-client'

const IndexPage = () => {
  const client = hc<AppType>(process.env.EXPO_PUBLIC_API_URL!)

  const { isPending, data } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const res = await client.index.$post({ json: { name: 'Mr.Lawyer' } })

      if (res.ok) {
        const data = await res.json()
        return data
      }
    },
  })

  const handleGoogleLogin = async () => {
    return await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/dashboard',
    })
  }

  return (
    <View className="flex-1 items-center justify-center bg-background">
      {isPending && <Text className="text-text">Loading...</Text>}
      <Text className="text-4xl text-primary">{`🔥Damn ${data?.message}!`}</Text>
      <Button title="Sign-In with Google" onPress={handleGoogleLogin} />
    </View>
  )
}

export default IndexPage
