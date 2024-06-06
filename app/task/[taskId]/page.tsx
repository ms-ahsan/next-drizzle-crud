import Task from '@/components/Task';
import { getDetails } from '@/server/actions/taskActions';
import { TaskType } from '@/types/taskTypes';

import { MoveLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface Params {
  params: {
    taskId: number;
  };
}

async function page({ params }: Params) {
  const taskDetail: TaskType | undefined = await getDetails(
    params.taskId
  );

  return (
    <div className='flex min-h-screen items-center justify-between p-16 max-w-5xl mx-auto md:p-24'>
      <div className='flex flex-col space-y-5 w-full'>
        <Link
          href='/'
          className='flex items-center text-lg font-medium underline-offset-4 underline space-x-2'
        >
          <MoveLeft /> <p>Back to My Tasks</p>
        </Link>
        {taskDetail ? (
          <Task taskDetail={taskDetail} />
        ) : (
          <p>Task not found!</p>
        )}
      </div>
    </div>
  );
}

export default page;
