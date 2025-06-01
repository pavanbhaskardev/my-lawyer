import { View, Text, Image } from 'react-native'
import React from 'react'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import { LogOut, Scale } from 'lucide-react-native'
import { Colors } from '@/constants/Colors'
import { Link } from 'expo-router'

const Profile = () => {
  const { data: session } = authClient.useSession()

  const handleLogout = async () => {
    return await authClient.signOut()
  }

  const userDetails = {
    name: session?.user?.name ?? '',
    image: session?.user?.image ?? '',
    joinedData: session?.user?.createdAt ?? '',
  }

  return (
    <View className="flex-1 items-center justify-start py-4 gap-8 bg-background">
      <View className="items-center">
        <Image
          src={userDetails.image ?? ''}
          alt="user-profile"
          className="size-24 rounded-full mb-3"
        />

        <Text className="text-2xl font-bold">{userDetails.name}</Text>
        <Text className="text-slate-500">{`Joined on ${userDetails.joinedData}`}</Text>
      </View>

      <View className="gap-4">
        <Link href="/apply-for-lawyer" asChild push>
          <Button
            title="Apply for Lawyer"
            size="lg"
            prefixLogo={<Scale color={Colors.light.background} size={20} />}
          />
        </Link>

        <Button
          variant="outline"
          title="Logout"
          size="lg"
          prefixLogo={<LogOut color={Colors.light.primary} size={20} />}
          onPress={() => {
            handleLogout()
          }}
        />
      </View>
    </View>
  )
}

export default Profile
