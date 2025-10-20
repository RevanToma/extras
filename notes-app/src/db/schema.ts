import {
  mysqlTable,
  bigint,
  varchar,
  text,
  timestamp,
} from 'drizzle-orm/mysql-core';

export const notes = mysqlTable('notes', {
  id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content'),
  favorite: bigint('favorite', { mode: 'number' }).default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type DbNote = typeof notes.$inferSelect;
export type NewDbNote = typeof notes.$inferInsert;
