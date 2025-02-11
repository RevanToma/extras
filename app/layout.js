import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { BookmarkProvider } from '@/context/bookmarkContext';
import Navbar from '@/components/navBar';
import { ThemeProvider } from '@/components/theme-provider';
import Footer from '@/components/footer';
import Layout from '@/components/layout';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Chas News',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressContentEditableWarning
      >
        <ThemeProvider
          attribute={'class'}
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange
        >
          <BookmarkProvider>{children}</BookmarkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
