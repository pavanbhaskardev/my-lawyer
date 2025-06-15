import { user, account, session, verification } from '@schema'
import { relations } from 'drizzle-orm'

import { pgTable, text, timestamp, primaryKey } from 'drizzle-orm/pg-core'

const specialization = pgTable('specialization', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  createdAt: timestamp('created_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp('updated_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
})

// Junction table for many-to-many relationship
const userSpecialization = pgTable(
  'user_specialization',
  {
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    specializationId: text('specialization_id')
      .notNull()
      .references(() => specialization.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at')
      .$defaultFn(() => new Date())
      .notNull(),
  },
  (table) => ({
    // Composite primary key
    pk: primaryKey({ columns: [table.userId, table.specializationId] }),
  })
)

// Relations - One-way: Users can have multiple specializations
const userRelations = relations(user, ({ many }) => ({
  userSpecializations: many(userSpecialization),
}))

const userSpecializationRelations = relations(
  userSpecialization,
  ({ one }) => ({
    user: one(user, {
      fields: [userSpecialization.userId],
      references: [user.id],
    }),
    specialization: one(specialization, {
      fields: [userSpecialization.specializationId],
      references: [specialization.id],
    }),
  })
)

export {
  user,
  account,
  session,
  verification,
  specialization,
  userRelations,
  userSpecialization,
  userSpecializationRelations,
}
