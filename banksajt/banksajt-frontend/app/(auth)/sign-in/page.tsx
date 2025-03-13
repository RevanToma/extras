import { Metadata } from 'next';
import AuthForm from '@/components/shared/auth-form';
import { signInAction } from '@/actions/user.actions';

export const metadata: Metadata = {
  title: 'Sign In',
};

const SignInPage = () => {
  return (
    <AuthForm
      type='sign-in'
      title='Sign In'
      action={signInAction}
      buttonText='Sign In'
      linkText='Don’t have an account?'
      linkHref='/sign-up'
    />
  );
};
export default SignInPage;
