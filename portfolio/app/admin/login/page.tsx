import { Metadata } from 'next';
import LoginPage from './loginPage';

export const metaData: Metadata = {
  title: 'Admin Login',
};

const Login = () => {
  return <LoginPage />;
};

export default Login;
