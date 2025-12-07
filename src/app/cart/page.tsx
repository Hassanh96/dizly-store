'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  // 1. استخراج البيانات والدوال الصحيحة من السياق
  const { 
    cartItems, 
    removeFromCart, 
    addToCart, // سنستخدمها لزيادة الكمية
    cartTotal, // الاسم الصحيح بدلاً من totalPrice
    clearCart 
  } = useCart();

  // في حال كانت السلة فارغة
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto p-6 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="text-8xl mb-6 opacity-20">🛒</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">سلتك فارغة</h2>
        <p className="text-gray-500 mb-8 text-lg">لم تقم بإضافة أي منتجات للسلة بعد.</p>
        <Link 
          href="/" 
          className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          ابدأ التسوق الآن
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12" dir="rtl">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4 flex items-center gap-3">
          <span>🛍️</span> سلة التسوق
          <span className="text-sm font-normal text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
            {cartItems.length} منتجات
          </span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* قسم المنتجات */}
          <div className="lg:w-2/3 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6 transition hover:shadow-md">
                
                {/* صورة المنتج */}
                <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative border">
                   {item.image ? (
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                   ) : (
                      <div className="flex items-center justify-center h-full text-xs text-gray-400">لا توجد صورة</div>
                   )}
                </div>

                {/* التفاصيل */}
                <div className="flex-grow text-center sm:text-right">
                  <h3 className="font-bold text-lg text-gray-800 mb-1">{item.title}</h3>
                  <p className="text-green-600 font-bold text-xl">${item.price}</p>
                </div>

                {/* التحكم بالكمية */}
                <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg border border-gray-200">
                  <button 
                    onClick={() => addToCart(item)} // إضافة نفس المنتج تزيد الكمية
                    className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm text-green-600 hover:bg-green-50 font-bold transition"
                    title="زيادة الكمية"
                  >
                    +
                  </button>
                  
                  <span className="font-bold w-6 text-center text-gray-700">{item.quantity}</span>
                  
                  {/* زر إنقاص الكمية غير متوفر حالياً في الـ Context، لذا نكتفي بالحذف أو الزيادة */}
                  <button 
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-md text-gray-400 cursor-not-allowed"
                    disabled
                    title="لإنقاص الكمية احذف المنتج وأضفه مجدداً (قريباً)"
                  >
                    -
                  </button>
                </div>

                {/* زر الحذف */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 bg-red-50 p-2 rounded-lg hover:bg-red-100 transition"
                  title="حذف المنتج"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}

             {cartItems.length > 0 && (
                <button 
                    onClick={clearCart}
                    className="text-red-600 text-sm mt-2 hover:underline flex items-center gap-1 mx-auto sm:mx-0"
                >
                    🗑️ إفراغ السلة بالكامل
                </button>
             )}
          </div>

          {/* قسم الملخص والدفع */}
          <div className="lg:w-1/3 h-fit">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6">ملخص الطلب</h2>
              
              <div className="flex justify-between items-center mb-3 text-gray-600">
                <span>المجموع الفرعي</span>
                <span>${cartTotal}</span>
              </div>
              <div className="flex justify-between items-center mb-3 text-gray-600">
                <span>الشحن</span>
                <span className="text-green-600">مجاني</span>
              </div>
              
              <div className="border-t border-dashed my-4"></div>
              
              <div className="flex justify-between items-center mb-8">
                <span className="text-xl font-bold text-gray-800">الإجمالي الكلي</span>
                <span className="text-3xl font-bold text-green-600">${cartTotal}</span>
              </div>

              <button 
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg hover:shadow-blue-500/30 active:scale-95"
                  onClick={() => alert('سيتم تفعيل بوابة الدفع قريباً!')}
              >
                إتمام الشراء 💳
              </button>
              
              <div className="mt-4 text-center text-xs text-gray-400">
                 🔒 عملية دفع آمنة ومشفرة
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}