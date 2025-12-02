'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext'; 

export default function Navbar() {
  // ✅ التصحيح: استخدام الاسم الصحيح (cartItems) بدلاً من (items)
  const { cartItems } = useCart();

  // حساب العدد الكلي للمنتجات
  const itemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* الشعار */}
        <Link href="/" className="text-2xl font-bold text-purple-600">
          دزلي ✨
        </Link>

        {/* الروابط وأيقونة السلة */}
        <div className="flex items-center gap-6">
          <Link href="/" className="text-gray-600 hover:text-purple-600">
            الرئيسية
          </Link>
          
          {/* رابط السلة مع العداد */}
          {/* ملاحظة: حالياً هذا الرابط يذهب لصفحة /cart، تأكد من وجودها أو اربطها بالنافذة المنبثقة لاحقاً */}
          <Link href="/cart" className="relative group">
            <span className="text-2xl">🛒</span>
            
            {/* عرض الدائرة الحمراء فقط إذا كان هناك منتجات */}
            {itemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {itemsCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}