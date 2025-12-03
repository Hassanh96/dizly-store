'use server';

import { cookies } from 'next/headers';

export async function setAdminCookie(password: string) {
  // --- بداية منطقة التصحيح (Debug Area) ---
  console.log("--- DEBUG START ---");
  console.log("Input Password (ما كتبته):", password);
  console.log("Env Password (المخزن في السيرفر):", process.env.ADMIN_PASSWORD);
  console.log("Are they equal? (هل يتطابقان؟):", password === process.env.ADMIN_PASSWORD);
  console.log("--- DEBUG END ---");
  // ---------------------------------------

  // التحقق من كلمة المرور
  if (password === process.env.ADMIN_PASSWORD) {
    
    // إذا كانت صحيحة، نعطيه "ختم الدخول" (Cookie)
    (await cookies()).set('admin_session', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // يوم واحد
      path: '/',
    });
    
    return { success: true };
  }
  
  return { success: false };
}

// دالة لتسجيل الخروج (اختيارية للمستقبل)
export async function deleteAdminCookie() {
  (await cookies()).delete('admin_session');
}