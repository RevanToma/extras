import { Metadata } from 'next';
import AuthForm from '@/components/shared/auth-form';
import { signUpAction } from '@/actions/user.actions';

export const metadata: Metadata = {
  title: 'Sign Up',
};

const SignUpPage = () => {
  return (
    <AuthForm
      title='Sign Up'
      action={signUpAction}
      buttonText='Sign Up'
      linkText='Already have an account?'
      linkHref='/sign-in'
    />
  );
};
export default SignUpPage;
