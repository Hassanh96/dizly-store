'use client';

import React, { use } from 'react'; // 1. استيراد use للتعامل مع params
import { useCart } from '@/context/CartContext';
import { useProduct } from '@/context/ProductContext'; // 2. استيراد سياق المنتجات

export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  // 3. فك الـ Promise للحصول على id المنتج
  const { id } = use(params);

  // استدعاء الدوال من الـ Context
  const { addToCart } = useCart();
  const { getProductById } = useProduct();

  // 4. البحث عن المنتج الحقيقي في الذاكرة (Context)
  // هذا السطر هو الذي يحل مشكلتك: هو يبحث في المنتجات المضافة وليست الثابتة
  const product = getProductById(id);

  // في حال لم يتم العثور على المنتج
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <h2 className="text-2xl font-bold text-red-500 mb-4">عذراً، المنتج غير موجود</h2>
        <p className="text-gray-600 mb-6 text-center">
          قد يكون تم حذفه أو أنك تحاول الوصول لمنتج غير محفوظ في هذه الجلسة.
          <br />
          (تذكر: المنتجات محفوظة في LocalStorage للمتصفح الحالي فقط).
        </p>
        <a href="/" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          العودة للرئيسية
        </a>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-xl shadow-sm">
        
        {/* قسم الصورة */}
        <div className="relative h-96 w-full bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.title} 
              className="object-contain w-full h-full"
              onError={(e) => {
                // التعامل مع الصور التالفة
                (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=No+Image';
              }}
            />
          ) : (
            <div className="text-gray-400 font-medium">
              لا توجد صورة
            </div>
          )}
        </div>

        {/* قسم التفاصيل */}
        <div className="flex flex-col justify-center space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
            <div className="flex items-center gap-2">
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                {product.category}
                </span>
                {product.storeId && (
                    <span className="text-xs text-gray-500">من متجر رقم: {product.storeId}</span>
                )}
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed text-lg">
            {product.description || 'لا يوجد وصف متاح لهذا المنتج.'}
          </p>
          
          <div className="flex items-center justify-between border-t border-b py-4 border-gray-100">
             <span className="text-gray-600 text-lg">السعر</span>
             <span className="text-3xl font-bold text-green-600">${product.price}</span>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                  addToCart(product);
                  alert('تمت الإضافة للسلة بنجاح');
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              إضافة إلى السلة
            </button>
          </div>
          
          <div className="text-sm text-gray-400 mt-4">
            معرف المنتج: {product.id}
          </div>
        </div>
      </div>
    </div>
  );
}