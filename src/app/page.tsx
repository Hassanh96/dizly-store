// src/app/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
// 💡 التعديل الهام هنا: استيراد useCategory من ProductContext بدلاً من CategoryContext
import { useCategory } from '../context/ProductContext';
import { useProduct } from '../context/ProductContext';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import FeaturedSlider from '../components/FeaturedSlider'; // إضافة شريط التمرير

// تحديد واجهة المنتجات للتصحيح
interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    categoryId: string;
    isFeatured: boolean;
    inventoryCount: number;
}

export default function HomePage() {
    // استخدام الخطاف من ProductContext
    const { categories } = useCategory(); 
    const { products: rawProducts } = useProduct() as any; 
    const products = rawProducts as Product[];

    return (
        <div className="container mx-auto px-4 py-8" dir="rtl">
            <header className="text-center mb-12">
                <h1 className="text-5xl font-extrabold text-indigo-700">مرحباً بك في متجر DİZLY</h1>
                <p className="text-xl text-gray-600 mt-2">اكتشف أحدث وأفضل المنتجات لدينا.</p>
            </header>

            {/* 1. شريط المنتجات المميزة */}
            <FeaturedSlider />

            {/* 2. أقسام المتجر */}
            <section className="my-12">
                <h2 className="text-3xl font-bold text-gray-800 border-b pb-2 mb-6">تصفح الأقسام</h2>
                {categories.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {categories.map(category => (
                            <CategoryCard key={category.id} category={category} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">جاري تحميل الأقسام...</p>
                )}
            </section>

            <div className="text-center mt-10">
                 <Link href="/product" className="inline-block bg-indigo-600 text-white text-xl px-8 py-3 rounded-full hover:bg-indigo-700 transition duration-300 font-semibold shadow-lg">
                    شاهد جميع المنتجات
                </Link>
            </div>
        </div>
    );
}