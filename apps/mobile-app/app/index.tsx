import { Text, View } from 'react-native'
import type { AppType } from '@/backend/app'
import { hc } from 'hono/client'
import { useQuery } from '@tanstack/react-query'

const IndexPage = () => {
  const client = hc<AppType>('http://192.168.1.100:8787/')

  const { isPending, data } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const res = await client.index.$post({ json: { name: 'Sateesh Challa' } })

      console.log({ res })

      if (res.ok) {
        const data = await res.json()
        return data
      }
    },
  })

  console.log({ isPending, data })

  return (
    <View className="flex-1 items-center justify-center bg-black">
      {isPending && <Text className="text-white">Loading...</Text>}
      <Text className="text-4xl text-white">{`🔥Damn ${data?.message}!`}</Text>
    </View>
  )
}

export default IndexPage
