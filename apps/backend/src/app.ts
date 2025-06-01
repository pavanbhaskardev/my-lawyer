import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { auth } from './lib/auth.js'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { db } from './lib/db.js'
import { tags } from './lib/schema.js'
import { config } from 'dotenv'

config()

const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null
    session: typeof auth.$Infer.Session.session | null
  }
}>()
  .use('*', logger())
  .basePath('/api')
  .use(
    '*', // Apply CORS to all routes instead of just /auth/*
    cors({
      origin: process.env.BETTER_AUTH_URL!,
      allowHeaders: ['Content-Type', 'Authorization', 'Cookie'], // Add Cookie header
      allowMethods: ['POST', 'GET', 'OPTIONS', 'PUT', 'DELETE'],
      exposeHeaders: ['Content-Length', 'Set-Cookie'], // Expose Set-Cookie header
      maxAge: 600,
      credentials: true,
    })
  )
  .use('*', async (c, next) => {
    try {
      // Log the incoming headers for debugging
      console.log(
        'Request headers:',
        Object.fromEntries(c.req.raw.headers.entries())
      )

      const session = await auth.api.getSession({
        headers: c.req.raw.headers,
      })

      console.dir({ session }, { depth: Infinity })

      if (!session) {
        console.log('No session found')
        c.set('user', null)
        c.set('session', null)
        return next()
      }

      console.log('Session found:', session)
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
  .on(['POST', 'GET'], '/auth/*', async (c) => {
    try {
      const response = await auth.handler(c.req.raw)
      return response
    } catch (error) {
      console.error('Auth handler error:', error)
      return c.json({ error: 'Authentication error' }, 500)
    }
  })
  .post(
    '/create-tag',
    async (c, next) => {
      // Check if user is authenticated before processing
      const user = c.get('user')

      if (!user) {
        return c.json({ message: 'Authentication required' }, { status: 401 })
      }

      return next()
    },
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

      try {
        const result = await db
          .insert(tags)
          .values({
            name,
            description,
            id,
            // You might want to add user_id here if your schema supports it
            // user_id: user.id,
          })
          .execute()

        if (result.lastInsertRowid) {
          return c.json(
            {
              message: `Success`,
              tag: { id, name, description },
            },
            {
              status: 201,
            }
          )
        }

        return c.json({ message: 'Failed to create tag' }, { status: 500 })
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        console.error('Database error:', error)
        return c.json(
          {
            message: `Failed to create tag: ${message}`,
          },
          {
            status: 500,
          }
        )
      }
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
