'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useProduct } from '@/context/ProductContext';
import { useCart } from '@/context/CartContext';

export default function HomePage() {
  const { products } = useProduct();
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');

  // 1. استخراج التصنيفات الفريدة من المنتجات الموجودة فعلياً
  // نستخدم Set لمنع التكرار
  const categories = ['الكل', ...Array.from(new Set(products.map((p) => p.category)))];

  // 2. تصفية المنتجات بناءً على التصنيف المختار
  const filteredProducts = selectedCategory === 'الكل'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* قسم الترويسة (Hero Section) */}
      <section className="bg-blue-600 text-white py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">مرحباً بك في متجر علي</h1>
        <p className="text-xl mb-8">أفضل المنتجات بأفضل الأسعار</p>
        <Link href="#products" className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition">
          تسوق الآن
        </Link>
      </section>

      {/* قسم التصنيفات والمنتجات */}
      <div id="products" className="container mx-auto px-4 py-12">
        
        {/* أزرار الفلترة */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full border transition ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* شبكة المنتجات */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                {/* صورة المنتج */}
                <div className="relative h-48 w-full bg-gray-200">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      لا توجد صورة
                    </div>
                  )}
                </div>

                {/* تفاصيل المنتج */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 truncate">{product.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-bold text-green-600">${product.price}</span>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
                    >
                      أضف للسلة
                    </button>
                  </div>
                  <Link 
                    href={`/product/${product.id}`} 
                    className="block text-center text-blue-500 mt-3 text-sm hover:underline"
                  >
                    عرض التفاصيل
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl text-gray-600">لا توجد منتجات متاحة حالياً.</h2>
            <p className="text-gray-500 mt-2">جرب إضافة منتجات جديدة من لوحة التحكم.</p>
          </div>
        )}
      </div>
    </div>
  );
}