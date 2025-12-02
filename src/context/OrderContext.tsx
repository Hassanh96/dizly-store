// src/context/OrderContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem } from './CartContext'; 

// =========================================================
// 1. الواجهات (Interfaces)
// =========================================================

export interface CustomerInfo {
    name: string;
    phone: string;
    address: string;
}

export interface Order {
    id: string;
    customer: CustomerInfo;
    items: CartItem[];
    totalPrice: number;
    date: string;
    status: 'Pending' | 'Completed' | 'Cancelled'; // حالات الطلب
}

interface OrderContextType {
    orders: Order[];
    addOrder: (customer: CustomerInfo, items: CartItem[], total: number) => void;
    // 👇 الإضافة الجديدة: تعريف الدالة في الواجهة
    updateOrderStatus: (id: string, newStatus: 'Pending' | 'Completed' | 'Cancelled') => void;
}

// =========================================================
// 2. سياق React (Context)
// =========================================================

export const OrderContext = createContext<OrderContextType | undefined>(undefined);

// =========================================================
// 3. مزود السياق (Provider)
// =========================================================

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const storedOrders = localStorage.getItem('orders');
        if (storedOrders) {
            setOrders(JSON.parse(storedOrders));
        }
    }, []);

    const updateLocalStorage = (newOrders: Order[]) => {
        localStorage.setItem('orders', JSON.stringify(newOrders));
    };

    const addOrder = (customer: CustomerInfo, items: CartItem[], total: number) => {
        const newOrder: Order = {
            id: Date.now().toString(),
            customer,
            items,
            totalPrice: total,
            date: new Date().toISOString(),
            status: 'Pending',
        };

        setOrders(prev => {
            const newOrders = [newOrder, ...prev]; 
            updateLocalStorage(newOrders);
            return newOrders;
        });
    };

    // 👇 الإضافة الجديدة: تنفيذ دالة تحديث الحالة
    const updateOrderStatus = (id: string, newStatus: 'Pending' | 'Completed' | 'Cancelled') => {
        setOrders(prev => {
            const newOrders = prev.map(order => 
                order.id === id ? { ...order, status: newStatus } : order
            );
            updateLocalStorage(newOrders);
            return newOrders;
        });
    };

    return (
        <OrderContext.Provider value={{ 
            orders, 
            addOrder,
            updateOrderStatus // 👈 تمرير الدالة الجديدة
        }}>
            {children}
        </OrderContext.Provider>
    );
};

// =========================================================
// 4. خطاف الوصول المخصص (Custom Hook)
// =========================================================

export const useOrder = () => {
    const context = useContext(OrderContext);
    if (context === undefined) {
        throw new Error('useOrder must be used within an OrderProvider');
    }
    return context;
};