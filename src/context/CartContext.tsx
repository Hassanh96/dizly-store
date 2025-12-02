// src/context/CartContext.tsx
'use client';

import React, { createContext, useContext, useState } from 'react';

// =========================================================
// 1. الواجهات (Interfaces)
// =========================================================

export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

export interface CartContextType {
    cartItems: CartItem[];
    totalPrice: number;
    
    // 👇👇 تم إضافة هذا التعريف لحل مشكلة TypeScript
    addItemToCart: (item: CartItem) => void;
    
    removeItemFromCart: (id: string) => void;
    updateItemQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
}

// =========================================================
// 2. سياق React (Context)
// =========================================================

export const CartContext = createContext<CartContextType | undefined>(undefined);

// =========================================================
// 3. مزود السياق (Provider)
// =========================================================

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    
    // دالة إضافة المنتج إلى السلة
    const addItemToCart = (item: CartItem) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(i => i.id === item.id);

            if (existingItem) {
                // إذا كان المنتج موجوداً، قم بزيادة الكمية
                return prevItems.map(i =>
                    i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
                );
            } else {
                // إذا كان المنتج جديداً، قم بإضافته
                return [...prevItems, item];
            }
        });
    };
    
    // دالة إزالة المنتج
    const removeItemFromCart = (id: string) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    // دالة تحديث الكمية
    const updateItemQuantity = (id: string, quantity: number) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, quantity: quantity } : item
            ).filter(item => item.quantity > 0) // لضمان إزالة المنتج إذا أصبحت الكمية صفر
        );
    };

    // دالة مسح السلة
    const clearCart = () => {
        setCartItems([]);
    };
    
    // حساب السعر الإجمالي
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{ 
            cartItems, 
            totalPrice, 
            addItemToCart, // يتم تمرير الدالة هنا
            removeItemFromCart,
            updateItemQuantity,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
};

// =========================================================
// 4. خطاف الوصول المخصص (Custom Hook)
// =========================================================

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};