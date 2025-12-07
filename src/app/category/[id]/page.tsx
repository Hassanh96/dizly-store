'use client';

import React, { use } from 'react'; 
import Link from 'next/link';
// تم إزالة Image واستخدام img لتجنب مشاكل النطاقات أثناء الرفع السريع
import { useProduct } from '@/context/ProductContext'; // استيراد useProduct فقط
import { useCart } from '@/context/CartContext'; // نحتاج السلة لإضافة زر "أضف للسلة"

// تعريف نوع الخصائص
interface PageProps {
    params: Promise<{ id: string }>;
}

export default function CategoryPage({ params }: PageProps) {
    // 1. فك الـ Promise للحصول على id (الذي هو اسم القسم هنا)
    const { id } = use(params);
    
    // 2. فك تشفير الاسم (لأن المتصفح يحول المسافات إلى %20)
    const categoryName = decodeURIComponent(id);

    // 3. جلب المنتجات والسلة
    const { products, loading } = useProduct();
    const { addToCart } = useCart();

    // 4. تصفية المنتجات حسب اسم القسم (category)
    const categoryProducts = products.filter((p) => p.category === categoryName);

    // التحقق من التحميل
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50" dir="rtl">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-purple-600"></div>
                <span className="mr-4 text-lg font-semibold text-purple-700">جاري تحميل منتجات {categoryName}...</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50" dir="rtl">
            
            {/* رأس الصفحة البنفسجي */}
            <div className="relative bg-purple-600 text-white py-12 overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl font-bold mb-2">{categoryName}</h1>
                    <p className="opacity-90 text-lg">
                        {categoryProducts.length === 0 
                            ? 'لا توجد منتجات متاحة حالياً' 
                            : `تصفح ${categoryProducts.length} منتج مميز في هذا القسم`}
                    </p>
                    <Link href="/" className="inline-block mt-4 text-sm bg-white/20 hover:bg-white/30 px-4 py-1 rounded-full transition backdrop-blur-sm">
                        &larr; العودة للرئيسية
                    </Link>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {categoryProducts.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
                        <span className="text-6xl mb-6 block">📦</span>
                        <p className="text-gray-500 text-lg font-medium">لا توجد منتجات في قسم "{categoryName}" حالياً.</p>
                        
                        <Link href="/store/ali" className="inline-block mt-6 text-purple-600 font-bold hover:bg-purple-50 px-6 py-2 rounded-full transition border border-purple-200">
                             اذهب للمتجر لإضافة منتجات ➕
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {categoryProducts.map((product) => (
                            <div key={product.id} className="group flex flex-col h-full bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden border border-gray-100">
                                
                                {/* صورة المنتج */}
                                <Link href={`/product/${product.id}`} className="block relative h-64 bg-gray-100 overflow-hidden">
                                    {product.image ? (
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=No+Image';
                                            }}
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-gray-400">لا توجد صورة</div>
                                    )}
                                </Link>

                                {/* تفاصيل المنتج */}
                                <div className="p-4 flex flex-col flex-grow">
                                    <Link href={`/product/${product.id}`}>
                                        <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-purple-600 transition truncate">
                                            {product.title}
                                        </h3>
                                    </Link>
                                    
                                    <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-grow">
                                        {product.description || 'لا يوجد وصف متاح'}
                                    </p>
                                    
                                    {/* السعر وزر الإضافة */}
                                    <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-50">
                                        <span className="text-green-600 font-bold text-lg">
                                            ${product.price}
                                        </span>
                                        
                                        <button 
                                            onClick={() => addToCart(product)}
                                            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-purple-600 hover:text-white transition shadow-sm"
                                            title="أضف للسلة"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}