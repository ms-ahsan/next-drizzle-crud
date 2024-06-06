import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { editTask } from '@/server/actions/taskActions';
import { Textarea } from '@/components/ui/textarea';
import { TaskType } from '@/types/taskTypes';

const FormSchema = z.object({
  title: z.string().min(1, {
    message: 'Title cannot be empty.',
  }),
  description: z.string().min(1, {
    message: 'Description cannot be empty.',
  }),
});

type EditTaskProps = {
  taskDetail: TaskType | undefined;
};

const EditTask = ({ taskDetail }: EditTaskProps) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: taskDetail?.title || '',
      description: taskDetail?.description || '',
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (taskDetail?.id === undefined) return;
    const newTask = await editTask(
      taskDetail.id,
      data.title,
      data.description
    );
    if (newTask.success) {
      toast({
        variant: 'success',
        description: newTask.success,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full space-y-6'
      >
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder='Add task title' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Add task description'
                  className='resize-none'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
};

export default EditTask;
