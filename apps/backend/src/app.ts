import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { serve } from '@hono/node-server'
import { cors } from 'hono/cors'
import { auth } from './lib/auth.js'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'

const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null
    session: typeof auth.$Infer.Session.session | null
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
    const betterAuth = auth

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
  .on(['POST', 'GET'], '/api/auth/*', (c) => {
    const betterAuth = auth
    return betterAuth.handler(c.req.raw)
  })
  .basePath('/api/v1')
  .use('*', async (c, next) => {
    const user = c.get('user')
    const session = c.get('session')

    if (!user || !session) {
      return c.json({ message: 'Unauthenticated' }, { status: 401 })
    }

    return next()
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

const server = serve(
  {
    fetch: app.fetch,
    port: 8787,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
  }
)

// graceful shutdown
process.on('SIGINT', () => {
  server.close()
  process.exit(0)
})

process.on('SIGTERM', () => {
  server.close((err) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    process.exit(0)
  })
})

export default app
export type AppType = typeof app
