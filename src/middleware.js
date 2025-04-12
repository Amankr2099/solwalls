// middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
  const { cookies, nextUrl } = req;

  const token =
    cookies.get('next-auth.session-token')?.value ||
    cookies.get('__Secure-next-auth.session-token')?.value;


  if (!token) {
    // Safe way to construct redirect URL
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile'],
};

// http://localhost:3000/api/auth/session
