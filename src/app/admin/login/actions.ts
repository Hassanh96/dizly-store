'use server';

import { cookies } from 'next/headers';

// Force Update: 004 - تغيير اسم المتغير
export async function setAdminCookie(password: string) {
  
  // --- DEBUG ZONE ---
  const allKeys = Object.keys(process.env);
  console.log("--- DEBUG START (NEW VAR CHECK) ---");
  // نبحث عن المتغير الجديد
  console.log("Looking for DIZLY_PASSWORD...");
  console.log("Is it found?", allKeys.includes('DIZLY_PASSWORD'));
  console.log("Value Check:", process.env.DIZLY_PASSWORD);
  console.log("--- DEBUG END ---");
  // ------------------

  // لاحظ أننا غيرنا الاسم هنا أيضاً 👇
  if (password === process.env.DIZLY_PASSWORD) {
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