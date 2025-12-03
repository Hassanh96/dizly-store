'use server';

import { cookies } from 'next/headers';

// Force update: 001 - هذا التعليق مهم لإجبار السيرفر على التحديث
export async function setAdminCookie(password: string) {
  
  // --- منطقة التشخيص (Debug Zone) ---
  console.log("--- DEBUG START ---");
  console.log("Time:", new Date().toISOString()); // للتأكد أن هذه نسخة جديدة
  console.log("Input Password:", password);
  console.log("Env Password:", process.env.ADMIN_PASSWORD); 
  console.log("Match?", password === process.env.ADMIN_PASSWORD);
  console.log("--- DEBUG END ---");
  // ----------------------------------

  if (password === process.env.ADMIN_PASSWORD) {
    // في حالة التطابق، نقوم بإنشاء الكوكي
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

export async function deleteAdminCookie() {
  (await cookies()).delete('admin_session');
}