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
import { toast, useToast } from '@/components/ui/use-toast';
import { addTask } from '@/server/actions/taskActions';
import { Textarea } from './ui/textarea';

const FormSchema = z.object({
  title: z.string().min(1, {
    message: 'title cannot be empty.',
  }),
  description: z.string().min(1, {
    message: 'description cannot be empty.',
  }),
});

interface AddTaskProps {
  onSuccess: () => void;
}

const AddTask = ({ onSuccess }: AddTaskProps) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const newTask = await addTask(data);
    if (newTask.success) {
      toast({
        variant: 'success',
        description: newTask.success,
      });
      onSuccess();
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
                <Input placeholder='add task title' {...field} />
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
                  placeholder='add task description'
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

export default AddTask;
