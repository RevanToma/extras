import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value,
    isAuthRoute =
      req.nextUrl.pathname.startsWith('/sign-in') ||
      req.nextUrl.pathname.startsWith('/sign-up'),
    isProtectedRoute = req.nextUrl.pathname.startsWith('/me');

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/me', req.url));
  }

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/me/:path*', '/sign-in', '/sign-up'],
};
