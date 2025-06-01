import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 관리자 페이지 접근 시도
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // 로그인 페이지는 제외
    if (request.nextUrl.pathname === '/admin') {
      return NextResponse.next();
    }

    // 세션 스토리지에서 관리자 상태 확인
    const isAdmin = request.cookies.get('isAdmin')?.value;

    if (!isAdmin) {
      // 관리자가 아니면 로그인 페이지로 리다이렉트
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
}; 