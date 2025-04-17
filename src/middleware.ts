import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();

  const authCookie = cookieStore.get('auth');
  if (!authCookie) {
    return NextResponse.next();
  }

  const role = authCookie.value;
  if (role === 'HOST') {
    return NextResponse.redirect(new URL('/host/dashboard', request.url));
  }

  if (role === 'STAFF') {
    return NextResponse.redirect(new URL('/staff/dashboard', request.url));
  }
}

export const config = {
  matcher: '/',
};
