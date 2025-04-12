import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();

  const isAuthenticated = cookieStore.has('session');
  if (isAuthenticated) {
    return NextResponse.redirect(new URL('/room', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/',
};
