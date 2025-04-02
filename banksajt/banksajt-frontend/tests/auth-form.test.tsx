import AuthForm from '@/components/shared/auth-form';
import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('react', () => {
  const actual = jest.requireActual('react');
  return {
    ...actual,
    useActionState: () => [
      { success: false, message: 'Invalid credentials' },
      jest.fn(),
    ],
  };
});

describe('AuthForm', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  const baseProps = {
    title: 'Sign In',
    action: jest.fn(async () => ({
      success: false,
      message: 'Invalid credentials',
    })),
    buttonText: 'Sign In',
    linkText: "Don't have an account?",
    linkHref: '/sign-up',
    type: 'sign-in' as const,
  };

  it('renders the form with inputs and button', () => {
    render(<AuthForm {...baseProps} />);

    expect(
      screen.getByRole('heading', { name: 'Sign In' })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
    expect(screen.getByText(/Don't have an account?/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Sign Up/ })).toHaveAttribute(
      'href',
      '/sign-up'
    );
  });

  it('displays error message if data.success is false', async () => {
    render(<AuthForm {...baseProps} />);
    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
  });
});
