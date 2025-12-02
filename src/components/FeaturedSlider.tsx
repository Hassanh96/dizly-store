// src/components/FeaturedSlider.tsx
'use client';

import React from 'react';
import { useProduct, Product } from '../context/ProductContext';
import ProductCard from './ProductCard'; // يفترض أن هذا المسار صحيح
import Link from 'next/link';

export default function FeaturedSlider() {
    const { products: rawProducts } = useProduct() as any;
    const products = rawProducts as Product[];

    // تصفية المنتجات المميزة
    const featuredProducts = products.filter(p => p.isFeatured).slice(0, 8); // عرض 8 كحد أقصى

    if (featuredProducts.length === 0) {
        return null; // لا شيء للعرض إذا لم توجد منتجات مميزة
    }

    return (
        <div className="py-12" dir="rtl">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-extrabold text-gray-800">✨ منتجاتنا المميزة</h2>
                    <Link 
                        href="/product" 
                        className="text-indigo-600 hover:text-indigo-800 font-semibold transition"
                    >
                        عرض الكل &larr;
                    </Link>
                </div>
                
                {/* منطقة التمرير الأفقية */}
                <div 
                    className="flex overflow-x-scroll snap-x snap-mandatory space-x-6 space-x-reverse pb-4"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // لإخفاء شريط التمرير
                >
                    {featuredProducts.map((product) => (
                        <div key={product.id} className="flex-shrink-0 w-72 snap-center">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}