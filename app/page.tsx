import Tasks from '@/components/Tasks';
import { getData } from '@/server/actions/taskActions';
import { TaskType } from '@/types/taskTypes';
import Loading from './loading';
import { Suspense } from 'react';

export default async function Home() {
  const tasks: TaskType[] = await getData();
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-16 md:p-24'>
      <Suspense fallback={<Loading />}>
        <Tasks tasks={tasks} />
      </Suspense>
    </main>
  );
}
