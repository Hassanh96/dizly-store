// src/context/ProductContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast'; 

// =========================================================
// 1. الواجهات (Interfaces)
// =========================================================

export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    // 👇 هذا هو التعديل الجوهري: أضفنا النوع لنميز بين الفيديو والصورة
    type: 'image' | 'video';
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
    getProductById: (id: string) => Product | undefined; 
    addProduct: (product: Omit<Product, 'id'>) => void;
    updateProduct: (id: string, updatedProduct: Partial<Product>) => void;
    deleteProduct: (id: string) => void;
    updateProductStock: (productId: string, quantity: number) => void;
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
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    
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
            toast.success('تم إضافة المنتج بنجاح');
            return newProducts;
        });
    };

    const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
        setProducts(prev => {
            const newProducts = prev.map(p => 
                p.id === id ? { ...p, ...updatedProduct } : p
            );
            updateLocalStorage(newProducts, categories);
            toast.success('تم تحديث المنتج بنجاح');
            return newProducts;
        });
    };

    const deleteProduct = (id: string) => {
        setProducts(prev => {
            const newProducts = prev.filter(p => p.id !== id);
            updateLocalStorage(newProducts, categories);
            toast.success('تم حذف المنتج بنجاح');
            return newProducts;
        });
    };
    
    const updateProductStock = (productId: string, quantity: number) => {
        setProducts(prev => {
            const newProducts = prev.map(p => {
                if (p.id === productId) {
                    const newCount = Math.max(0, p.inventoryCount - quantity);
                    return { ...p, inventoryCount: newCount };
                }
                return p;
            });
            updateLocalStorage(newProducts, categories);
            return newProducts;
        });
    };

    // --- دوال الأقسام ---

    const addCategory = (categoryData: Omit<Category, 'id'>) => {
        const newCategory: Category = { ...categoryData, id: Date.now().toString(), image: categoryData.image || 'default-category-image.jpg' };
        setCategories(prev => {
            const newCategories = [...prev, newCategory];
            updateLocalStorage(products, newCategories);
            toast.success('تم إضافة القسم بنجاح');
            return newCategories;
        });
    };

    const updateCategory = (id: string, updatedCategory: Partial<Category>) => {
        setCategories(prev => {
            const newCategories = prev.map(c => 
                c.id === id ? { ...c, ...updatedCategory } : c
            );
            updateLocalStorage(products, newCategories);
            toast.success('تم تحديث القسم بنجاح');
            return newCategories;
        });
    };

    const deleteCategory = (id: string) => {
        setCategories(prev => {
            const productsAfterDeletion = products.filter(p => p.categoryId !== id);
            
            const newCategories = prev.filter(c => c.id !== id);
            updateLocalStorage(productsAfterDeletion, newCategories);
            toast.success('تم حذف القسم ومنتجاته بنجاح');
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
            updateProductStock, 
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

export const useCategory = () => {
    const context = useContext(ProductContext); 
    if (context === undefined) {
        throw new Error('useCategory must be used within a ProductProvider'); 
    }
    return { 
        categories: context.categories, 
        addCategory: context.addCategory, 
        updateCategory: context.updateCategory, 
        deleteCategory: context.deleteCategory 
    };
};