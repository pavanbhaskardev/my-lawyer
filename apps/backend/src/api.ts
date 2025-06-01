import { handle } from 'hono/vercel'
import app from '@/backend/app'

export default handle(app)
