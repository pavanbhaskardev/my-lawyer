import { Text, View } from 'react-native'
import type { AppType } from '@/backend/app'
import { hc } from 'hono/client'
import { useQuery } from '@tanstack/react-query'

const IndexPage = () => {
  const client = hc<AppType>('http://localhost:8787')

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

  return (
    <View className="flex-1 items-center justify-center bg-red-300">
      {isPending && <Text>Loading...</Text>}
      <Text className="text-4xl">{`🔥Damn ${data?.message}!`}</Text>
    </View>
  )
}

export default IndexPage
