import Logo from '@/components/logo';
import { render, screen } from '@testing-library/react';
import { useTheme } from 'next-themes';

jest.mock('next-themes', () => ({
  useTheme: jest.fn(),
}));

describe('Logo', () => {
  beforeEach(() => {
    (useTheme as jest.Mock).mockReturnValue({ theme: 'light' });
  });

  it('should render the logo', () => {
    render(<Logo />);
    expect(screen.getByText('MoneyMate')).toBeInTheDocument();
  });

  it('should have the correct href', () => {
    render(<Logo />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
  });

  it('should have the correct styling for light theme', () => {
    (useTheme as jest.Mock).mockReturnValue({ theme: 'light' });

    render(<Logo />);
    expect(screen.getByRole('link')).toHaveClass(
      'bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'
    );
  });

  it('should have the correct styling for dark theme', () => {
    (useTheme as jest.Mock).mockReturnValue({ theme: 'dark' });
    render(<Logo />);
    expect(screen.getByRole('link')).toHaveClass(
      'bg-gradient-to-r from-emerald-400 to-sky-500 bg-clip-text text-transparent'
    );
  });
});
