import { View, Text, Button, Image } from 'react-native'
import React from 'react'
import { authClient } from '@/lib/auth-client'

const SignIn = () => {
  const handleGoogleLogin = async () => {
    return await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/dashboard',
    })
  }

  return (
    <View className="flex-1 items-center justify-center gap-10">
      <View className="items-center">
        <Image
          source={require('../../assets/images/my_lawyer_logo.png')}
          alt="my-lawyer-logo"
          className="size-36"
        />
        <Text className="text-3xl font-bold">Welcome to My.Lawyer</Text>
        <Text className="text-lg">Find best lawyer's near you</Text>
      </View>

      <Button title="Continue with google" onPress={handleGoogleLogin} />
    </View>
  )
}

export default SignIn
