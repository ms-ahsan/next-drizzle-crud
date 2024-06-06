'use client';
import { useState } from 'react';
import { TaskType } from '@/types/taskTypes';
import Task from './Task';
import { Checkbox } from '@/components/ui/checkbox';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

import AddTask from './Addtask';
import { toggleTask } from '@/server/actions/taskActions';
import Link from 'next/link';

interface Props {
  tasks: TaskType[];
}

const Tasks = ({ tasks: initialTasks }: Props) => {
  const [tasks, setTasks] = useState<TaskType[]>(initialTasks);
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckboxChange = async (
    id: number,
    checked: boolean
  ) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, done: checked } : task
      )
    );
    await toggleTask(id, checked);
  };

  return (
    <main className='w-full'>
      <div className='text-5xl font-medium text-center mb-10'>
        My Tasks
      </div>
      <div className='grid grid-cols-2 md:grid-cols-4 lg:md:grid-cols-6 gap-3 min-h-40 md:min-h-44 lg:min-h-60 '>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Card className='flex justify-center items-center cursor-pointer w-full shadow-sm'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='w-10 h-10 text-gray-400'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 4.5v15m7.5-7.5h-15'
                />
              </svg>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
              <DialogDescription>
                Create your daily routine
              </DialogDescription>
              <AddTask onSuccess={() => setIsOpen(false)} />
            </DialogHeader>
          </DialogContent>
        </Dialog>

        {tasks &&
          tasks.map((task) => (
            <Card
              key={task.id}
              className='min-h-40 flex flex-col  justify-between md:min-h-44 lg:min-h-60 shadow-sm hover:cursor-pointer hover:shadow-md hover:border-2'
            >
              <CardHeader className='p-3 lg:p-6'>
                <div className='flex flex-row justify-between items-center'>
                  {task.done ? (
                    <div className='w-2/5 h-4 bg-green-500 rounded-sm'></div>
                  ) : (
                    <div className='w-2/5 h-4 bg-red-500 rounded-sm'></div>
                  )}

                  <Checkbox
                    className='w-6 h-6'
                    checked={task.done}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(
                        task.id,
                        checked as boolean
                      )
                    }
                  />
                </div>
                <CardTitle className='text-md lg:text-2xl'>
                  <p className='line-clamp-2 '>{task.title}</p>
                </CardTitle>
              </CardHeader>
              <CardContent className=' p-3 pt-0 lg:p-6 lg:pt-0'>
                <p className='line-clamp-2 lg:line-clamp-3'>
                  {task.description}
                </p>
              </CardContent>
              <CardFooter className='p-3 pt-0 lg:p-6 lg:pt-0'>
                <Link
                  href={`task/${task.id}`}
                  className='font-medium underline underline-offset-2 '
                >
                  Detail
                </Link>
              </CardFooter>
            </Card>
          ))}
      </div>
    </main>
  );
};

export default Tasks;
