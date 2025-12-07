'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// تعريف نوع البيانات للمنتج داخل السلة
export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

// تعريف الدوال والبيانات التي يوفرها السياق
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // استرجاع البيانات من LocalStorage عند تحميل الصفحة
  useEffect(() => {
    // التحقق من وجود window للتأكد أننا في المتصفح
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('ali_store_cart');
      if (savedCart) {
        try {
          setCartItems(JSON.parse(savedCart));
        } catch (error) {
          console.error("فشل في استعادة بيانات السلة:", error);
        }
      }
    }
  }, []);

  // حفظ البيانات في LocalStorage عند أي تغيير في السلة
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ali_store_cart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // دالة إضافة منتج للسلة
  const addToCart = (product: any) => {
    setCartItems((prevItems) => {
      // هل المنتج موجود مسبقاً في السلة؟
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        // نعم: نقوم بزيادة الكمية فقط
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // لا: نضيفه كمنتج جديد (مع التعامل مع اختلاف تسميات الحقول المحتملة)
        return [
          ...prevItems,
          {
            id: product.id,
            title: product.title || product.name,
            price: Number(product.price),
            image: product.image || product.thumbnail || '',
            quantity: 1,
          },
        ];
      }
    });
  };

  // دالة حذف منتج من السلة
  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // دالة إفراغ السلة بالكامل
  const clearCart = () => {
    setCartItems([]);
  };

  // حساب إجمالي السعر
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  
  // حساب عدد العناصر الكلي
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,     
        removeFromCart,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook مخصص لسهولة استخدام السلة في أي مكان
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};