'use server';

import { cookies } from 'next/headers';

export async function setAdminCookie(password: string) {
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