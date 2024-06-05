'use server';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import { db } from '@/server';
import { tasks } from '@/server/schema';

export const getData = async () => {
  const data = await db.select().from(tasks);
  return data;
};

export type Tasks = typeof tasks.$inferInsert;

export const addTask = async (task: Tasks) => {
  await db.insert(tasks).values(task);
  revalidatePath('/');
};

export const deleteTask = async (id: number) => {
  await db.delete(tasks).where(eq(tasks.id, id));

  revalidatePath('/');
};

export const toggleTask = async (id: number, done: boolean) => {
  await db
    .update(tasks)
    .set({
      done: done,
    })
    .where(eq(tasks.id, id));

  revalidatePath('/');
};

export const editTask = async (
  id: number,
  title: string,
  description: string
) => {
  await db
    .update(tasks)
    .set({
      title,
      description,
    })
    .where(eq(tasks.id, id));

  revalidatePath('/');
};
