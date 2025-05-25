import type { AppType } from '@/backend/app'
import { hc } from 'hono/client'

export const honoClient = hc<AppType>(process.env.EXPO_PUBLIC_API_URL!)
