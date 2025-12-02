'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setAdminCookie } from './actions'; // سننشئ هذا الملف حالاً

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // استدعاء السيرفر للتحقق من كلمة المرور
    const result = await setAdminCookie(password);
    
    if (result.success) {
      router.push('/admin'); // توجيه للوحة التحكم
      router.refresh();
    } else {
      setError('كلمة المرور غير صحيحة ❌');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100" dir="rtl">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">تسجيل دخول الأدمن 🛡️</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">كلمة المرور</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="أدخل كلمة المرور..."
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition font-bold">
            دخول 🚀
          </button>
        </form>
      </div>
    </div>
  );
}