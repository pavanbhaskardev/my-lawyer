import { authClient } from '@/lib/auth-client'
import { Tabs } from 'expo-router'
import { UsersRound } from 'lucide-react-native'
import { View, Image } from 'react-native'

export default function TabLayout() {
  const { data: session, isPending } = authClient.useSession()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#3498DA',
        tabBarStyle: {
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="lawyers"
        options={{
          title: 'Lawyers',
          tabBarIcon: ({ color }) => <UsersRound color={color} size={24} />,
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: () => {
            return isPending ? (
              <View className="size-6 bg-slate-500 rounded-full" />
            ) : (
              <Image
                src={session?.user?.image ?? ''}
                alt="user-profile"
                className="size-8 rounded-full"
              />
            )
          },
          headerShown: false,
        }}
      />
    </Tabs>
  )
}
