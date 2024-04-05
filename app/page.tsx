import Link from 'next/link';

const page = () => {
  return (
    <main className='flex flex-col items-center'>
      <Link className='underline' href='/auth/login'>
        Login page
      </Link>
      <Link className='underline' href='/auth/create-user'>
        Create user page
      </Link>
    </main>
  );
};

export default page;
