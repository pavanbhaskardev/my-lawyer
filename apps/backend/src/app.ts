import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { cors } from 'hono/cors'

const app = new Hono()
  .use('*', logger())
  .use(
    '*',
    cors({
      origin: '*',
      credentials: true,
    })
  )
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
