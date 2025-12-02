// src/components/Header.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { usePathname } from 'next/navigation'; 

const navItems = [
    { name: 'الرئيسية', href: '/' },
    { name: 'الأقسام', href: '/category' },
    { name: 'كل المنتجات', href: '/product' },
];

export default function Header() {
    const { cartItems } = useCart();
    const pathname = usePathname();

    // حساب إجمالي عدد المنتجات في السلة
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <header className="sticky top-0 z-50 bg-white shadow-md border-b" dir="rtl">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                
                {/* الشعار */}
                <Link href="/" className="text-3xl font-extrabold text-indigo-700 hover:text-indigo-900 transition">
                    متجر DİZLY
                </Link>

                {/* روابط التنقل */}
                <nav className="hidden md:flex items-center space-x-6 space-x-reverse">
                    {navItems.map((item) => (
                        <Link 
                            key={item.name} 
                            href={item.href}
                            className={`text-lg font-medium transition-colors duration-200 
                                ${pathname === item.href 
                                    ? 'text-indigo-600 border-b-2 border-indigo-600 pb-1' 
                                    : 'text-gray-700 hover:text-indigo-600'
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                    
                    {/* 👇 تم إخفاء رابط الأدمن لكي لا يظهر للزبائن */}
                    {/* <Link 
                        href="/admin"
                        className="text-sm font-medium text-red-500 hover:text-red-700 ml-4 border-r pr-4"
                    >
                        لوحة الأدمن
                    </Link>
                    */}
                </nav>

                {/* أيقونة سلة الشراء */}
                <div className="relative">
                    <Link 
                        href="/cart" 
                        className="text-2xl text-gray-700 hover:text-indigo-600 p-2 rounded-full transition"
                        aria-label="سلة الشراء"
                    >
                        🛒
                    </Link>
                    {cartCount > 0 && (
                        <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white">
                            {cartCount}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}