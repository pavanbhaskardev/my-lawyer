import { Stack } from 'expo-router'
import '../global.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '@/providers/AuthContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

// Create a client
const queryClient = new QueryClient()

export default function RootLayout() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <SafeAreaView className="bg-background h-full">
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />

          <StatusBar style="dark" />
        </SafeAreaView>
      </QueryClientProvider>
    </AuthProvider>
  )
}
