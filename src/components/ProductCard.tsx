'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
// 👇 استيراد الخطاف الخاص بالسلة
import { useCart } from '../context/CartContext';

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

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    // 👇 استخدام دالة الإضافة للسلة
    const { addItemToCart } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        // 🛑 نمنع الانتقال لصفحة التفاصيل عند الضغط على الزر
        e.preventDefault(); 
        
        addItemToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1 // الكمية الافتراضية للإضافة السريعة هي 1
        });
        
        // تنبيه بسيط (اختياري، لأن السلة تحدثت تلقائياً)
        // alert('تمت الإضافة للسلة!'); 
    };

    return (
        <Link href={`/product/${product.id}`} className="group block h-full">
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden border border-gray-100 h-full flex flex-col relative">
                
                {/* صورة المنتج */}
                <div className="h-64 bg-gray-100 relative overflow-hidden">
                    <Image
                        src={product.image || 'https://via.placeholder.com/300'}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    
                    {/* شارات الحالة */}
                    {product.isFeatured && (
                        <span className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full shadow-sm z-10">
                            موصى به
                        </span>
                    )}
                    
                    {product.inventoryCount === 0 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
                            <span className="bg-red-600 text-white px-4 py-1 rounded-full font-bold transform -rotate-12 border-2 border-white">
                                نفد المخزون
                            </span>
                        </div>
                    )}

                    {/* 👇 زر الإضافة السريعة (يظهر عند تمرير الماوس على الكمبيوتر، أو دائماً في الجوال) */}
                    {product.inventoryCount > 0 && (
                        <button
                            onClick={handleAddToCart}
                            className="absolute bottom-2 left-2 bg-white text-indigo-600 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-indigo-600 hover:text-white z-20"
                            title="إضافة سريعة للسلة"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </button>
                    )}
                </div>

                {/* تفاصيل المنتج */}
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
                        
                        {/* سهم الانتقال */}
                        <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-purple-600 group-hover:text-white transition">
                            ➜
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;