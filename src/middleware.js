// middleware.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function middleware(req) {
    const getCookies = cookies()
  const token = getCookies.get("token")
  const { pathname } = req.nextUrl;

  if (token) {
    // If the user is authenticated and tries to access the login or signup page, redirect them to the home page
    if (pathname === '/login' || pathname === '/sign-up') {
      return NextResponse.redirect(new URL('/', req.url));
    }
  } else {
    // If the user is not authenticated and tries to access protected pages, redirect them to the login page
    if (pathname === '/' || pathname.startsWith('/protected')) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // Continue to the requested page if no redirection is needed
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/sign-up',
  ],
};
