import { NextResponse, type NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authCookie = request.cookies.get('auth');
  const token = authCookie ? authCookie.value : '';

  let userRole = '';

  try {
    if (token) {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
      userRole = decoded.role || ''; 
    } else {
      return NextResponse.redirect(new URL('/403', request.url));
    }
  } catch (error) {
    console.error('Invalid token:', error);
    return NextResponse.redirect(new URL('/403', request.url)); // Redirect on error
  }

  if (pathname.startsWith('/superadmin') && userRole !== 'super admin') {
    return NextResponse.redirect(new URL('/403', request.url));
  }

  if (pathname.startsWith('/admin') && userRole === 'user') {
    return NextResponse.redirect(new URL('/403', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/superadmin/:path*', '/admin/:path*', '/candidate/:path*'],
};
