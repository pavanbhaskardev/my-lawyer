import { logo } from '@/constants/Images'
import { authClient } from '@/lib/auth-client'
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs'
import { Tabs } from 'expo-router'
import { Home, UserRoundCog, UsersRound } from 'lucide-react-native'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'

interface TabHeaderProps extends BottomTabHeaderProps {
  showHeader?: boolean
}

const Header = ({ showHeader = true, ...props }: TabHeaderProps) => {
  const router = useRouter()

  if (showHeader) {
    return (
      <View className="h-16 bg-slate-100 items-center justify-start px-4 flex-row gap-2">
        <TouchableOpacity
          onPress={() => {
            router.push('/lawyers')
          }}
          className="flex-row items-center gap-2"
        >
          <Image source={logo} className="size-10" />
          <Text className="text-xl font-bold">My Lawyer</Text>
        </TouchableOpacity>
      </View>
    )
  } else {
    return null
  }
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
        name="home/index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home color={color} size={24} />,
          header: (props) => <Header {...props} showHeader={false} />,
        }}
      />

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

      <Tabs.Screen
        name="apply-for-lawyer"
        options={{
          href: null,
          header: Header,
        }}
      />
    </Tabs>
  )
}
