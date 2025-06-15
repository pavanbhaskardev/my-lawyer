import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { auth } from './lib/auth.js'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { db } from './lib/db.js'

import { config } from 'dotenv'
import { specialization, userSpecialization } from './lib/schema.js'

config()

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
      allowHeaders: ['Content-Type', 'Authorization', 'Cookie'],
      allowMethods: ['POST', 'GET', 'OPTIONS', 'PUT', 'DELETE'],
      exposeHeaders: ['Content-Length', 'Set-Cookie'],
      maxAge: 600,
      credentials: true,
    })
  )
  .basePath('/api')
  .on(['POST', 'GET'], '/auth/*', async (c) => {
    try {
      const response = await auth.handler(c.req.raw)
      return response
    } catch (error) {
      console.error('Auth handler error:', error)
      return c.json({ error: 'Authentication error' }, 500)
    }
  })
  .use('*', async (c, next) => {
    try {
      const session = await auth.api.getSession({
        headers: c.req.raw.headers,
      })

      if (!session) {
        c.set('user', null)
        c.set('session', null)
        return c.json(
          {
            error: 'Unauthenticated',
          },
          {
            status: 401,
          }
        )
      }

      c.set('user', session.user)
      c.set('session', session.session)

      return next()
    } catch (error) {
      console.error('Error in session middleware:', error)
      c.set('user', null)
      c.set('session', null)
      return next()
    }
  })
  .post(
    '/create-specialization',
    zValidator(
      'json',
      z.object({
        name: z.string().min(3),
        description: z.string().optional(),
      })
    ),
    async (c) => {
      const { name, description = '' } = c.req.valid('json')
      const user = c.get('user')
      const id = crypto.randomUUID()

      const [newSpecialization] = await db
        .insert(specialization)
        .values({
          id,
          name,
          description,
        })
        .returning()

      const [relation] = await db
        .insert(userSpecialization)
        .values({
          specializationId: newSpecialization.id,
          userId: user?.id ?? '',
        })
        .returning()

      return c.json({ data: { newSpecialization, relation } }, { status: 201 })
    }
  )

// Local development server (only runs when not in production/Vercel)
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  const { serve } = await import('@hono/node-server')

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
    console.log('Received SIGINT, shutting down gracefully...')
    server.close()
    process.exit(0)
  })

  process.on('SIGTERM', () => {
    console.log('Received SIGTERM, shutting down gracefully...')
    server.close((err) => {
      if (err) {
        console.error('Error during shutdown:', err)
        process.exit(1)
      }
      process.exit(0)
    })
  })
}

export default app
export type AppType = typeof app
