'use server';

import { cookies } from 'next/headers';

// // Force Update: 003 - فحص شامل للمتغيرات
export async function setAdminCookie(password: string) {
  
  console.log("--- DEBUG START (DEEP SCAN) ---");
  // 1. طباعة عدد المتغيرات التي يراها السيرفر
  const allKeys = Object.keys(process.env);
  console.log("Total Env Keys Found:", allKeys.length);
  
  // 2. هل المتغير موجود ضمن القائمة؟
  console.log("Is ADMIN_PASSWORD in list?", allKeys.includes('ADMIN_PASSWORD'));
  
  // 3. طباعة أول 5 متغيرات لنرى ماذا يوجد في الذاكرة
  console.log("Sample Keys:", allKeys.slice(0, 5).join(", "));
  
  // 4. المحاولة المباشرة
  console.log("Direct Access Value:", process.env.ADMIN_PASSWORD); 
  console.log("--- DEBUG END ---");

  if (password === process.env.ADMIN_PASSWORD) {
    (await cookies()).set('admin_session', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24,
      path: '/',
    });
    return { success: true };
  }
  
  return { success: false };
}

export async function deleteAdminCookie() {
  (await cookies()).delete('admin_session');
}