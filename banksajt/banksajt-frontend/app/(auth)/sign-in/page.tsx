import { Metadata } from 'next';
import SignInForm from './sign-in-form';

export const metadata: Metadata = {
  title: 'Sign In',
};

const SignInPage = () => {
  return (
    <div>
      <SignInForm />
    </div>
  );
};
export default SignInPage;
