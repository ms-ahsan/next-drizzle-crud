import {
  text,
  boolean,
  pgTable,
  varchar,
  serial,
} from 'drizzle-orm/pg-core';

export const tasks = pgTable('task', {
  id: serial('id').primaryKey(),
  title: varchar('title').notNull(),
  description: text('description').notNull(),
  done: boolean('done').default(false).notNull(),
});
