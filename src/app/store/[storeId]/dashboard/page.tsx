// src/app/store/[storeId]/dashboard/page.tsx
import React from 'react';
import Link from 'next/link';

// 1. تعريف الواجهة: params هو Promise
interface DashboardProps {
  params: Promise<{
    storeId: string;
  }>;
}

// 2. إضافة كلمة async للدالة الرئيسية
export default async function StoreDashboard({ params }: DashboardProps) {
  
  // 3. استخدام await لانتظار وصول البيانات (فك الوعد)
  const resolvedParams = await params;
  
  // الآن يمكننا استخدام storeId بأمان
  const storeName = decodeURIComponent(resolvedParams.storeId);

  return (
    <div className="min-h-screen bg-gray-50 p-8" dir="rtl">
      {/* --- الرأس (Header) --- */}
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            لوحة تحكم: <span className="text-indigo-600">{storeName}</span> 📊
          </h1>
          <p className="text-gray-500 mt-1">مرحباً بك في منطقة إدارة متجرك.</p>
        </div>
        
        <Link 
            href={`/store/${resolvedParams.storeId}`} 
            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
        >
            عرض المتجر 👁️
        </Link>
      </header>

      {/* --- بطاقات الإحصائيات (مؤقتة) --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">إجمالي المنتجات</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">0</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">المبيعات (تجريبي)</h3>
          <p className="text-3xl font-bold text-indigo-600 mt-2">0 د.ع</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">الزيارات</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">0</p>
        </div>
      </div>

      {/* --- منطقة الإجراءات السريعة --- */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-4">ماذا تريد أن تفعل اليوم؟</h2>
        <div className="flex justify-center gap-4">
            
            {/* زر إضافة منتج جديد */}
            <Link 
                href={`/store/${resolvedParams.storeId}/products/new`}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition font-bold flex items-center gap-2"
            >
                <span>+</span> إضافة منتج جديد
            </Link>
            
            <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition font-bold">
                إعدادات المتجر ⚙️
            </button>
        </div>
      </div>
    </div>
  );
}