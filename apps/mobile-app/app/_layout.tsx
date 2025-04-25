import { Stack } from 'expo-router'
import '../global.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '@/providers/AuthContext'

// Create a client
const queryClient = new QueryClient()

export default function RootLayout() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Stack />
      </QueryClientProvider>
    </AuthProvider>
  )
}
