import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // هل يحاول المستخدم الدخول إلى لوحة التحكم؟
  if (path.startsWith('/admin')) {
    
    // استثناء: صفحة تسجيل الدخول نفسها مسموح للجميع برؤيتها
    if (path === '/admin/login') {
      return NextResponse.next();
    }

    // التحقق من وجود "الكوكيز" التي تثبت أنه سجل الدخول
    const isAdmin = request.cookies.get('admin_session');

    // إذا لم يكن لديه التصريح، نطرده إلى صفحة تسجيل الدخول
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

// تحديد المسارات التي يعمل عليها الحارس
export const config = {
  matcher: '/admin/:path*',
};