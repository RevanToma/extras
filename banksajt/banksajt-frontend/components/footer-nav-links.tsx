import Link from 'next/link';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterNavLinks = ({ href, children }: NavLinkProps) => {
  return (
    <Link
      href={href}
      className={cn(
        'relative transition text-muted-foreground hover:text-primary',
        'after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-primary',
        'after:transition-all after:duration-300 after:ease-in-out hover:after:w-full'
      )}
    >
      {children}
    </Link>
  );
};

export default FooterNavLinks;
