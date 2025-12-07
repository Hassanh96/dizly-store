'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { useProduct } from '@/context/ProductContext';
import { useCart } from '@/context/CartContext';

export default function StorePage({ params }: { params: Promise<{ storeId: string }> }) {
  
  const { storeId } = use(params);
  const { getProductsByStore } = useProduct();
  const { addToCart } = useCart();

  const storeProducts = getProductsByStore(storeId);

  return (
    <div className="container mx-auto p-6 min-h-screen bg-gray-50">
      
      {/* --- قسم الرأس (Header) --- */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100 gap-4">
        
        {/* معلومات المتجر */}
        <div className="text-center md:text-right">
          <h1 className="text-3xl font-bold text-gray-800">لوحة تحكم التاجر</h1>
          <p className="text-gray-500 mt-1 flex items-center gap-2 justify-center md:justify-start">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            معرف المتجر: <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">{storeId}</span>
          </p>
        </div>

        {/* --- الأزرار (أضفنا زر عرض المتجر هنا) --- */}
        <div className="flex gap-3">
          {/* زر 1: الذهاب للمتجر الرئيسي (معاينة التغييرات) */}
          <Link 
            href="/"
            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 shadow-sm font-medium"
            title="الذهاب للصفحة الرئيسية ورؤية المنتجات كما يراها الزبون"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            عرض المتجر الرئيسي
          </Link>

          {/* زر 2: إضافة منتج جديد */}
          <Link 
            href={`/store/${storeId}/products/new`}
            className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition flex items-center gap-2 shadow-sm font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            إضافة منتج
          </Link>
        </div>
      </div>

      {/* --- عرض منتجات التاجر الحالية --- */}
      <h2 className="text-xl font-bold text-gray-700 mb-4 px-1">منتجاتك الحالية ({storeProducts.length})</h2>
      
      {storeProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {storeProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 border border-gray-100 group">
              
              {/* صورة المنتج */}
              <div className="relative h-48 w-full bg-gray-100 flex items-center justify-center overflow-hidden">
                {product.image ? (
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                ) : (
                  <div className="text-gray-400 text-sm">لا توجد صورة</div>
                )}
                {/* شريط التصنيف */}
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-gray-600 shadow-sm">
                  {product.category}
                </div>
              </div>
              
              {/* التفاصيل */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 truncate mb-1">{product.title}</h3>
                <p className="text-gray-500 text-xs mb-3 line-clamp-2 h-8">
                  {product.description || 'لا يوجد وصف'}
                </p>
                
                <div className="flex justify-between items-center pt-3 border-t border-gray-50">
                  <span className="text-xl font-bold text-green-600">${product.price}</span>
                  {/* أزرار إجراءات صغيرة */}
                  <div className="flex gap-2">
                     <button className="text-gray-400 hover:text-blue-600 transition" title="تعديل (قريباً)">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                     </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border-2 border-dashed border-gray-200">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
             </svg>
          </div>
          <p className="text-lg text-gray-500 mb-2">لا توجد منتجات حتى الآن</p>
          <p className="text-sm text-gray-400">ابدأ بإضافة منتجاتك لبيعها في المتجر</p>
        </div>
      )}
    </div>
  );
}