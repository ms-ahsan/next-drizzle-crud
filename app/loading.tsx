import { LoaderCircle } from 'lucide-react';

function loading() {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <LoaderCircle className='animate-spin h-12 w-12' />
    </div>
  );
}

export default loading;
