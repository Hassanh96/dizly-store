// src/app/product/[id]/page.tsx
'use client';

import React, { useState, use } from 'react'; // 👈 استيراد use
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

// تعريف نوع الخصائص حيث params هي Promise
export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    // 👈 فك تغليف params باستخدام use للحصول على id
    const { id } = use(params);

    const { products: rawProducts } = useProduct() as any;
    const products = rawProducts as Product[];
    const { addItemToCart } = useCart();

    // البحث عن المنتج باستخدام المعرف
    const product = products.find(p => p.id === id);

    // إذا لم يتم العثور على المنتج، يتم إظهار صفحة 404
    if (!product) {
        return notFound();
    }

    const [quantity, setQuantity] = useState(1);
    const availableStock = product.inventoryCount;
    const isOutOfStock = availableStock === 0;

    // تنسيق السعر
    const formattedPrice = product.price.toLocaleString('ar-IQ', { style: 'currency', currency: 'IQD', minimumFractionDigits: 0 });

    const handleAddToCart = () => {
        if (isOutOfStock) return;

        // إضافة المنتج إلى السلة بالكمية المحددة
        addItemToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });

        alert(`تم إضافة ${quantity} من ${product.name} إلى السلة!`);
        setQuantity(1); // إعادة تعيين الكمية بعد الإضافة
    };

    return (
        <div className="container mx-auto px-4 py-12" dir="rtl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white p-8 rounded-xl shadow-2xl">

                {/* --- عمود الصورة --- */}
                <div className="relative w-full aspect-square rounded-lg overflow-hidden border bg-gray-100">
                    <Image
                        src={product.image || 'https://via.placeholder.com/800'}
                        alt={product.name}
                        fill
                        className="object-cover"
                        priority // لتحسين سرعة التحميل
                    />
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