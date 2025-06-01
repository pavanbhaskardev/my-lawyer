import { user, account, session, verification } from '@schema'
import { sqliteTable, text, primaryKey } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'

// --- Tags Table ---
export const tags = sqliteTable('tags', {
  id: text('id').primaryKey(),
  name: text('name').notNull().unique(),
  description: text('description'),
})

// --- User-To-Tags Join Table ---
export const userToTags = sqliteTable(
  'user_to_tags',
  {
    userId: text('user_id')
      .notNull()
      .references(() => user.id),
    tagId: text('tag_id')
      .notNull()
      .references(() => tags.id),
  },
  (table) => ({
    pk: primaryKey(table.userId, table.tagId),
  })
)

// --- Relations ---
export const tagsRelations = relations(tags, ({ many }) => ({
  users: many(userToTags),
}))

export const userRelations = relations(user, ({ many }) => ({
  tags: many(userToTags),
}))

export const userToTagsRelations = relations(userToTags, ({ one }) => ({
  user: one(user, {
    fields: [userToTags.userId],
    references: [user.id],
  }),
  tag: one(tags, {
    fields: [userToTags.tagId],
    references: [tags.id],
  }),
}))

export { user, account, session, verification }
