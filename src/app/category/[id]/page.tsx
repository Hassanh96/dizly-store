// src/app/category/[id]/page.tsx
'use client';

import React, { use } from 'react'; // 👈 استيراد use
import Link from 'next/link';
import Image from 'next/image';
import { useProduct, useCategory } from '../../../context/ProductContext';

// تعريف نوع الخصائص حيث params هي Promise
interface PageProps {
    params: Promise<{ id: string }>;
}

export default function CategoryPage({ params }: PageProps) {
    // 👈 استخدام use لفك Promise والحصول على id
    const { id } = use(params);
  
    const { products: rawProducts } = useProduct() as any;
    const products = rawProducts as any[]; 
    const { categories } = useCategory();

    // التحقق من تحميل البيانات
    if (categories.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-purple-600"></div>
                <span className="mr-4 text-lg font-semibold text-purple-700">جاري تحميل القسم...</span>
            </div>
        );
    }

    const categoryInfo = categories.find((c) => c.id === id);
    const categoryProducts = products.filter((p) => p.categoryId === id);

    if (!categoryInfo) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
                <h2 className="text-3xl font-bold text-gray-400 mb-4">عذراً، هذا التصنيف غير موجود 🤷‍♀️</h2>
                <Link href="/" className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition">
                    العودة للرئيسية
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50" dir="rtl">
            
            {/* رأس الصفحة */}
            <div className="relative bg-purple-600 text-white py-12 overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl font-bold mb-2">{categoryInfo.name}</h1>
                    <p className="opacity-90 text-lg">
                        {categoryProducts.length === 0 
                            ? 'لا توجد منتجات متاحة حالياً' 
                            : `تصفح ${categoryProducts.length} منتج مميز`}
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {categoryProducts.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
                        <span className="text-6xl mb-6 block">📦</span>
                        <p className="text-gray-500 text-lg font-medium">لا توجد منتجات في قسم "{categoryInfo.name}" حالياً.</p>
                        <Link href="/admin" className="inline-block mt-6 text-purple-600 font-bold hover:bg-purple-50 px-6 py-2 rounded-full transition border border-purple-200">
                            أضيفي منتجات من لوحة التحكم ➕
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {categoryProducts.map((product) => (
                            <Link href={`/product/${product.id}`} key={product.id} className="group">
                                <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden border border-gray-100 h-full flex flex-col">
                                    <div className="h-64 bg-gray-100 relative overflow-hidden">
                                        <Image
                                            src={product.image || 'https://via.placeholder.com/300'}
                                            alt={product.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition duration-500"
                                        />
                                        {product.isFeatured && (
                                            <span className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full shadow-sm z-10">موصى به</span>
                                        )}
                                        {product.inventoryCount === 0 && (
                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
                                                <span className="bg-red-600 text-white px-4 py-1 rounded-full font-bold transform -rotate-12 border-2 border-white">نفد المخزون</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4 flex flex-col flex-grow">
                                        <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-purple-600 transition">
                                            {product.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-grow">
                                            {product.description}
                                        </p>
                                        <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-50">
                                            <span className="text-green-600 font-bold text-lg">
                                                {product.price.toLocaleString()} د.ع
                                            </span>
                                            <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-purple-600 group-hover:text-white transition">➜</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}