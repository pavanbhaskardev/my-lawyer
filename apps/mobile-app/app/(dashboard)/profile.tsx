import { View, Text, Button } from 'react-native'
import React from 'react'
import { authClient } from '@/lib/auth-client'

const Profile = () => {
  const { data: session } = authClient.useSession()

  const handleLogout = async () => {
    return await authClient.signOut()
  }

  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-4xl text-primary">
        {`User: ${JSON.stringify(session?.user)}`}
      </Text>

      <Button
        title="Log out"
        onPress={() => {
          handleLogout()
        }}
      />
    </View>
  )
}

export default Profile
