import { Text, View } from 'react-native'
import { authClient } from '@/lib/auth-client'

const IndexPage = () => {
  const { data: session } = authClient.useSession()

  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-4xl text-primary">
        {JSON.stringify(session?.user)}
      </Text>
    </View>
  )
}

export default IndexPage
