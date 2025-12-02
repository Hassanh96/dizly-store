// src/app/cart/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
// تأكد من صحة مسار الاستيراد. إذا كان cart/page.tsx، يجب أن يكون ../../
import { useCart } from '../../context/CartContext'; 

// دالة مساعدة لتنسيق السعر
const formatPrice = (price: number) => 
    price.toLocaleString('ar-IQ', { style: 'currency', currency: 'IQD', minimumFractionDigits: 0 });


export default function CartPage() {
    // 💡 تم تصحيح الأسماء: يجب أن تكون: 
    // removeItemFromCart بدلاً من removeFromCart
    // updateItemQuantity بدلاً من updateQuantity
    const { 
        cartItems, 
        totalPrice, 
        removeItemFromCart, 
        updateItemQuantity 
    } = useCart();
    
    // دالة للتحكم بتغيير الكمية
    const handleQuantityChange = (id: string, newQuantity: number) => {
        // نضمن أن الكمية لا تقل عن 1، وإلا نقوم بالحذف
        if (newQuantity >= 1) {
            updateItemQuantity(id, newQuantity);
        } else if (newQuantity === 0) {
            removeItemFromCart(id);
        }
    };


    // حالة السلة الفارغة
    if (cartItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4" dir="rtl">
                <span className="text-6xl mb-4">🛒</span>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">سلة التسوق فارغة</h1>
                <p className="text-gray-500 mb-8">ابدأ الآن بتصفح منتجاتنا المميزة.</p>
                <Link href="/" className="bg-indigo-600 text-white px-8 py-3 rounded-full hover:bg-indigo-700 transition shadow-lg">
                    تصفح المنتجات
                </Link>
            </div>
        );
    }

    // حالة السلة الممتلئة
    return (
        <div className="container mx-auto px-4 py-8" dir="rtl">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-2">سلة التسوق ({cartItems.length})</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* قائمة المنتجات */}
                <div className="lg:col-span-2 space-y-4">
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex gap-4 bg-white p-4 rounded-xl shadow-md border border-gray-100 items-center">
                            
                            {/* صورة المنتج */}
                            <Link href={`/product/${item.id}`} className="relative w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden cursor-pointer">
                                <Image 
                                    src={item.image || 'https://via.placeholder.com/150'} 
                                    alt={item.name} 
                                    fill 
                                    className="object-cover" 
                                />
                            </Link>

                            {/* تفاصيل المنتج */}
                            <div className="flex-1 flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <Link href={`/product/${item.id}`}><h3 className="font-bold text-gray-800 hover:text-indigo-600 transition">{item.name}</h3></Link>
                                        <p className="text-gray-500 text-sm">السعر للوحدة: {formatPrice(item.price)}</p>
                                    </div>
                                    {/* زر الحذف */}
                                    <button 
                                        onClick={() => removeItemFromCart(item.id)}
                                        className="text-red-500 hover:text-red-700 h-fit p-2 rounded-full transition"
                                        title="حذف المنتج"
                                    >
                                        🗑️
                                    </button>
                                </div>
                                
                                {/* التحكم بالكمية */}
                                <div className="flex justify-between items-center mt-3">
                                    <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1 border">
                                        <button 
                                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                            className="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm hover:bg-gray-100 disabled:opacity-50 font-bold text-lg"
                                        >
                                            -
                                        </button>
                                        <span className="w-8 text-center font-semibold text-gray-800">{item.quantity}</span>
                                        <button 
                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                            className="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm hover:bg-gray-100 font-bold text-lg"
                                        >
                                            +
                                        </button>
                                    </div>
                                    
                                    <p className="font-bold text-xl text-indigo-700">
                                        {formatPrice(item.price * item.quantity)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ملخص الطلب */}
                <div className="lg:col-span-1">
                    <div className="bg-gray-50 p-6 rounded-xl shadow-lg border border-gray-200 sticky top-4">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">ملخص الطلب</h2>
                        
                        <div className="space-y-3 mb-6 border-b border-gray-200 pb-6">
                            <div className="flex justify-between text-lg font-medium text-gray-600">
                                <span>المجموع الفرعي</span>
                                <span>{formatPrice(totalPrice)}</span>
                            </div>
                            <div className="flex justify-between text-lg font-medium text-gray-600">
                                <span>الشحن</span>
                                <span className="text-green-600 font-bold">مجاني</span>
                            </div>
                        </div>

                        <div className="flex justify-between text-2xl font-bold text-gray-800 mb-6">
                            <span>الإجمالي الكلي</span>
                            <span className="text-indigo-700">{formatPrice(totalPrice)}</span>
                        </div>

                        <Link 
                            href="/checkout"
                            className="block w-full text-center bg-indigo-600 text-white text-xl py-4 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg active:scale-95"
                        >
                            إتمام الطلب والدفع ✨
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}