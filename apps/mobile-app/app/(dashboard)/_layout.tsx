import { logo } from '@/constants/Images'
import { authClient } from '@/lib/auth-client'
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs'
import { Tabs } from 'expo-router'
import { UserRoundCog, UsersRound } from 'lucide-react-native'
import { View, Image, Text } from 'react-native'

const Header = (props: BottomTabHeaderProps) => {
  return (
    <View className="bg-accent/10 h-16 items-center justify-center flex-row gap-2">
      <Image source={logo} className="size-10" />
      <Text className="text-xl font-bold">My Lawyer</Text>
    </View>
  )
}

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
        name="lawyers/index"
        options={{
          title: 'Lawyers',
          tabBarIcon: ({ color }) => <UsersRound color={color} size={24} />,
          header: Header,
        }}
      />

      <Tabs.Screen
        name="lawyers/[id]"
        options={{
          href: null,
          header: Header,
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
          header: Header,
        }}
      />

      <Tabs.Screen
        name="admin"
        options={{
          title: 'Admin',
          tabBarIcon: ({ color }) => <UserRoundCog color={color} size={24} />,
          header: Header,
          href: session?.user?.role === 'admin' ? '/(dashboard)/admin' : null,
        }}
      />
    </Tabs>
  )
}
