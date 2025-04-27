import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import { logo, google } from '@/constants/Images'
import { StatusBar } from 'expo-status-bar'

const SignIn = () => {
  const handleGoogleLogin = async () => {
    return await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/dashboard',
    })
  }

  return (
    <SafeAreaView className="bg-background h-full">
      <View className="flex-1 items-center justify-center gap-10">
        <View className="items-center">
          <Image source={logo} alt="my-lawyer-logo" className="size-36" />
          <Text className="text-3xl font-bold">Signin to My.Lawyer</Text>
          <Text className="text-lg">Find best lawyer's near you</Text>
        </View>

        <Button
          title="Continue with Google"
          variant="outline"
          onPress={handleGoogleLogin}
          prefixLogo={<Image source={google} className="size-6" />}
        />
      </View>

      <StatusBar style="dark" />
    </SafeAreaView>
  )
}

export default SignIn
