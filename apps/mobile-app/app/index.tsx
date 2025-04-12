import { Text, View } from 'react-native'
import type { AppType } from '@/backend/app'
import { hc } from 'hono/client'
import { useQuery } from '@tanstack/react-query'

const IndexPage = () => {
  const client = hc<AppType>(process.env.EXPO_PUBLIC_API_URL!)

  const { isPending, data } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const res = await client.index.$post({ json: { name: 'Sateesh Challa' } })

      if (res.ok) {
        const data = await res.json()
        return data
      }
    },
  })

  console.log({ isPending, data })

  return (
    <View className="flex-1 items-center justify-center bg-background">
      {isPending && <Text className="text-text">Loading...</Text>}
      <Text className="text-4xl text-primary">{`🔥Damn ${data?.message}!`}</Text>
    </View>
  )
}

export default IndexPage
