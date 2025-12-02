// src/context/ProductContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// =========================================================
// 1. الواجهات (Interfaces)
// =========================================================

// 💡 تم إضافة كلمة 'export' هنا لحل المشكلة
export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    categoryId: string;
    isFeatured: boolean;
    inventoryCount: number;
}

export interface Category {
    id: string;
    name: string;
    image: string;
}

interface ProductContextType {
    products: Product[];
    categories: Category[];
    // 💡 تم إضافة دالة الجلب بالمعرف التي استخدمتها في productDetails.tsx
    getProductById: (id: string) => Product | undefined; 
    // دوال لوحة الأدمن (Admin Functions)
    addProduct: (product: Omit<Product, 'id'>) => void;
    updateProduct: (id: string, updatedProduct: Partial<Product>) => void;
    deleteProduct: (id: string) => void;
    addCategory: (category: Omit<Category, 'id'>) => void;
    updateCategory: (id: string, updatedCategory: Partial<Category>) => void;
    deleteCategory: (id: string) => void;
}

// =========================================================
// 2. سياق React (Context)
// =========================================================

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

// =========================================================
// 3. مزود السياق (Provider)
// =========================================================

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
    // 💡 محاكاة لبيانات مخزنة محلياً (بدلاً من قاعدة البيانات)
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    
    // محاكاة تحميل البيانات من التخزين المحلي عند التحميل
    useEffect(() => {
        const storedProducts = localStorage.getItem('products');
        const storedCategories = localStorage.getItem('categories');
        
        if (storedProducts) {
            setProducts(JSON.parse(storedProducts));
        }
        if (storedCategories) {
            setCategories(JSON.parse(storedCategories));
        }
    }, []);

    // دالة مساعدة لتحديث التخزين المحلي
    const updateLocalStorage = (newProducts: Product[], newCategories: Category[]) => {
        localStorage.setItem('products', JSON.stringify(newProducts));
        localStorage.setItem('categories', JSON.stringify(newCategories));
    };

    // --- دوال المنتجات ---
    
    const getProductById = (id: string) => products.find(p => p.id === id);

    const addProduct = (productData: Omit<Product, 'id'>) => {
        const newProduct: Product = { ...productData, id: Date.now().toString() };
        setProducts(prev => {
            const newProducts = [...prev, newProduct];
            updateLocalStorage(newProducts, categories);
            return newProducts;
        });
    };

    const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
        setProducts(prev => {
            const newProducts = prev.map(p => 
                p.id === id ? { ...p, ...updatedProduct } : p
            );
            updateLocalStorage(newProducts, categories);
            return newProducts;
        });
    };

    const deleteProduct = (id: string) => {
        setProducts(prev => {
            const newProducts = prev.filter(p => p.id !== id);
            updateLocalStorage(newProducts, categories);
            return newProducts;
        });
    };

    // --- دوال الأقسام ---

    const addCategory = (categoryData: Omit<Category, 'id'>) => {
        const newCategory: Category = { ...categoryData, id: Date.now().toString() };
        setCategories(prev => {
            const newCategories = [...prev, newCategory];
            updateLocalStorage(products, newCategories);
            return newCategories;
        });
    };

    const updateCategory = (id: string, updatedCategory: Partial<Category>) => {
        setCategories(prev => {
            const newCategories = prev.map(c => 
                c.id === id ? { ...c, ...updatedCategory } : c
            );
            updateLocalStorage(products, newCategories);
            return newCategories;
        });
    };

    const deleteCategory = (id: string) => {
        setCategories(prev => {
            const newCategories = prev.filter(c => c.id !== id);
            updateLocalStorage(products, newCategories);
            return newCategories;
        });
    };
    
    return (
        <ProductContext.Provider value={{ 
            products, 
            categories,
            getProductById,
            addProduct,
            updateProduct,
            deleteProduct,
            addCategory,
            updateCategory,
            deleteCategory
        }}>
            {children}
        </ProductContext.Provider>
    );
};

// =========================================================
// 4. خطاف الوصول المخصص (Custom Hook)
// =========================================================

export const useProduct = () => {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error('useProduct must be used within a ProductProvider');
    }
    return context;
};