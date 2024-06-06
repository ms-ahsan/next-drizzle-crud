'use server';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import { db } from '@/server';
import { tasks } from '@/server/schema';

export const getData = async () => {
  const data = await db.select().from(tasks);
  return data;
};
export const getDetails = async (id: number) => {
  const data = await db.query.tasks.findFirst({
    where: eq(tasks.id, id),
  });
  return data;
};

export type Tasks = typeof tasks.$inferInsert;

export const addTask = async ({ title, description }: Tasks) => {
  try {
    await db.insert(tasks).values({ title, description }).returning();
    revalidatePath('/');
    return { success: `New task has been created` };
  } catch (err) {
    return { error: 'Failed to create task' };
  }
};

export const deleteTask = async (id: number) => {
  try {
    await db.delete(tasks).where(eq(tasks.id, id));
    revalidatePath('/');
    return { success: `Task delete successfully` };
  } catch (err) {
    return { error: 'Failed to delete task' };
  }
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
  try {
    await db
      .update(tasks)
      .set({
        title,
        description,
      })
      .where(eq(tasks.id, id));

    revalidatePath(`/task/${id}`);
    return { success: `task has been edited` };
  } catch (err) {
    return { error: 'Failed to edit task' };
  }
};
