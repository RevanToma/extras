import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { getUser, logoutUser } from '@/actions/user.actions';

const Account = async () => {
  const userData = await getUser();

  if (!userData) {
    redirect('/sign-in');
  }
  return (
    <form
      className='flex flex-col gap-3 items-center justify-center'
      action={logoutUser}
      method='post'
    >
      <h1>Account</h1>
      <p>Welcome to your account page!</p>
      <Button type='submit' variant='destructive' className='cursor-pointer'>
        Logout
      </Button>
    </form>
  );
};

export default Account;
