import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'

const app = new Hono().post(
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

app.use('*', logger())

export default app
export type AppType = typeof app
