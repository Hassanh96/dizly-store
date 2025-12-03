// src/app/product/[id]/page.tsx
'use client';

import React, { useState, use } from 'react';
import Image from 'next/image';
import { useProduct } from '../../../context/ProductContext';
import { useCart } from '../../../context/CartContext';
import { notFound } from 'next/navigation';

// تحديد واجهة المنتج
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

// 🧠 دالة ذكية للتحقق هل الرابط لفيديو أم لا
const isVideoFile = (url: string) => {
    if (!url) return false;
    // نتحقق مما إذا كان الرابط ينتهي بـ mp4 أو webm أو ogg
    return /\.(mp4|webm|ogg)$/i.test(url);
};

export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    // فك تغليف المعاملات
    const { id } = use(params);

    const { products: rawProducts } = useProduct() as any;
    const products = rawProducts as Product[];
    const { addItemToCart } = useCart();

    const product = products.find(p => p.id === id);

    // إذا لم يتم العثور على المنتج
    if (!product) {
        return notFound();
    }

    const [quantity, setQuantity] = useState(1);
    const availableStock = product.inventoryCount;
    const isOutOfStock = availableStock === 0;

    // التحقق من نوع الملف (للتصحيح والتشخيص)
    const isVideo = isVideoFile(product.image);
    // console.log("File Type Check:", isVideo ? "Video 🎥" : "Image 🖼️", product.image);

    const formattedPrice = product.price.toLocaleString('ar-IQ', { style: 'currency', currency: 'IQD', minimumFractionDigits: 0 });

    const handleAddToCart = () => {
        if (isOutOfStock) return;

        addItemToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });

        alert(`تم إضافة ${quantity} من ${product.name} إلى السلة!`);
        setQuantity(1);
    };

    return (
        <div className="container mx-auto px-4 py-12" dir="rtl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white p-8 rounded-xl shadow-2xl">

                {/* --- عمود الصورة أو الفيديو --- */}
                <div className="relative w-full aspect-square rounded-lg overflow-hidden border bg-gray-100 flex items-center justify-center bg-black">
                    
                    {isVideo ? (
                        // ✅ إذا كان فيديو: نعرض مشغل الفيديو
                        <video 
                            src={product.image} 
                            controls 
                            className="w-full h-full object-contain"
                        >
                            متصفحك لا يدعم تشغيل الفيديو.
                        </video>
                    ) : (
                        // 🖼️ إذا كان صورة: نعرض الصورة كالمعتاد
                        <Image
                            src={product.image || 'https://via.placeholder.com/800'}
                            alt={product.name}
                            fill
                            className="object-cover"
                            priority
                        />
                    )}
                    
                </div>

                {/* --- عمود التفاصيل --- */}
                <div className="space-y-6">
                    <h1 className="text-4xl font-extrabold text-gray-900">{product.name}</h1>

                    {/* السعر والتوفر */}
                    <div className="flex items-center justify-between border-y py-4">
                        <p className="text-5xl font-extrabold text-indigo-700">{formattedPrice}</p>

                        {isOutOfStock ? (
                            <span className="text-xl font-bold text-red-600 bg-red-100 px-4 py-1 rounded-full">نفذت الكمية 🚫</span>
                        ) : (
                            <span className="text-xl font-bold text-green-600 bg-green-100 px-4 py-1 rounded-full">متوفر ({availableStock}) ✅</span>
                        )}
                    </div>

                    {/* الوصف */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">الوصف:</h2>
                        <p className="text-gray-600 leading-relaxed whitespace-pre-line">{product.description}</p>
                    </div>

                    {/* إضافة إلى السلة */}
                    <div className="pt-6 border-t space-y-4">
                        <h2 className="text-2xl font-bold text-gray-800">الكمية المطلوبة:</h2>
                        <div className="flex items-center gap-4">

                            <input
                                type="number"
                                min="1"
                                max={availableStock}
                                value={quantity}
                                onChange={(e) => {
                                    const val = parseInt(e.target.value);
                                    if (val > 0 && val <= availableStock) {
                                        setQuantity(val);
                                    } else if (val > availableStock) {
                                        setQuantity(availableStock);
                                    }
                                }}
                                disabled={isOutOfStock}
                                className="w-24 p-3 border-2 border-gray-300 rounded-lg text-center text-xl font-bold"
                            />

                            <button
                                onClick={handleAddToCart}
                                disabled={isOutOfStock || quantity === 0}
                                className={`flex-grow px-8 py-3 rounded-xl text-white text-xl font-semibold transition-colors duration-300 ${
                                    isOutOfStock || quantity === 0
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg'
                                }`}
                            >
                                {isOutOfStock ? 'غير متوفر حالياً' : 'أضف إلى سلة الشراء 🛒'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}