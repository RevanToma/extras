import { Metadata } from 'next';
import SignUpForm from './sign-up-form';

export const metadata: Metadata = {
  title: 'Sign Up',
};

const SignUpPage = () => {
  return (
    <div>
      <SignUpForm />
    </div>
  );
};
export default SignUpPage;
