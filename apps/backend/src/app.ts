import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { cors } from 'hono/cors'
import { auth } from './lib/auth'

export type Env = {
  BETTER_AUTH_SECRET: string
  BETTER_AUTH_URL: string
  DATABASE_URI: string
  GOOGLE_CLIENT_ID: string
  GOOGLE_CLIENT_SECRET: string
}

const app = new Hono<{
  Bindings: Env
  Variables: {
    user: Record<string, unknown> | null
    session: Record<string, unknown> | null
  }
}>()
  .use('*', logger())
  .use(
    '*',
    cors({
      origin: '*',
      credentials: true,
    })
  )
  .use('*', async (c, next) => {
    const betterAuth = auth({
      mongodbURI: c.env.DATABASE_URI,
      googleClientID: c.env.GOOGLE_CLIENT_ID,
      googleClientSecret: c.env.GOOGLE_CLIENT_SECRET,
    })

    const session = await betterAuth.api.getSession({
      headers: c.req.raw.headers,
    })

    if (!session) {
      c.set('user', null)
      c.set('session', null)
      return next()
    }

    c.set('user', session.user)
    c.set('session', session.session)
    return next()
  })
  .on(['POST', 'GET'], '/api/auth/**', (c) => {
    const betterAuth = auth({
      mongodbURI: c.env.DATABASE_URI,
      googleClientID: c.env.GOOGLE_CLIENT_ID,
      googleClientSecret: c.env.GOOGLE_CLIENT_SECRET,
    })
    return betterAuth.handler(c.req.raw)
  })
  .post(
    '/',
    zValidator(
      'json',
      z.object({
        name: z.string(),
      })
    ),
    (c) => {
      const validated = c.req.valid('json')

      return c.json(
        {
          message: `Hello ${validated.name}`,
        },
        {
          status: 200,
        }
      )
    }
  )

export default app
export type AppType = typeof app
