'use client';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from './ui/badge';
import { Pencil, Trash } from 'lucide-react';
import { TaskType } from '@/types/taskTypes';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { deleteTask } from '@/server/actions/taskActions';
import { useToast } from './ui/use-toast';
import { useRouter } from 'next/navigation';
import EditTask from './EditTask';

type taskDetailProps = {
  taskDetail: TaskType | undefined;
};

const Task = ({ taskDetail }: taskDetailProps) => {
  const { toast } = useToast();
  const router = useRouter();

  const handleDelete = async (id: number | undefined) => {
    if (id === undefined) return;
    const newTask = await deleteTask(id);
    if (newTask.success) {
      router.push('/');
      toast({
        variant: 'success',
        description: newTask.success,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        {taskDetail?.done ? (
          <div className='w-2/5 h-4 bg-green-500 rounded-sm'></div>
        ) : (
          <div className='w-2/5 h-4 bg-red-500 rounded-sm'></div>
        )}
        <div className='flex justify-between items-center'>
          <CardTitle>{taskDetail?.title}</CardTitle>
          <div className='flex space-x-2'>
            <div>
              <Dialog>
                <DialogTrigger asChild>
                  <Pencil
                    className='w-5 h-5 hover:text-blue-600'
                    aria-label='edit'
                  />
                </DialogTrigger>
                <DialogContent className='max-w-lg'>
                  <EditTask taskDetail={taskDetail} />
                </DialogContent>
              </Dialog>
            </div>
            <div>
              <Dialog>
                <DialogTrigger asChild>
                  <Trash
                    className='w-5 h-5 hover:text-red-500'
                    aria-label='delete'
                  />
                </DialogTrigger>
                <DialogContent className='max-w-sm'>
                  <DialogHeader className='flex items-center justify-center '>
                    <DialogTitle>Delete Task</DialogTitle>
                    <DialogDescription className='text-center'>
                      You are going to delete &apos;
                      {taskDetail?.title}&apos;. Are you sure ?
                    </DialogDescription>
                  </DialogHeader>

                  <div className='flex items-center justify-between'>
                    <DialogClose asChild>
                      <Button type='button' variant='secondary'>
                        No, Keep it
                      </Button>
                    </DialogClose>
                    <Button
                      onClick={() => handleDelete(taskDetail?.id)}
                      variant='destructive'
                    >
                      Yes, Delete!
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>{taskDetail?.description}</CardContent>
      <CardFooter>
        {taskDetail?.done ? (
          <Badge variant={'default'}>Done</Badge>
        ) : (
          <Badge variant={'destructive'}>Todo</Badge>
        )}
      </CardFooter>
    </Card>
  );
};

export default Task;
