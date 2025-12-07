'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// استيراد قاعدة البيانات من ملف الإعدادات
// تأكد من وجود الملف src/lib/firebase.ts وفيه بياناتك
import { db } from '@/lib/firebase'; 
import { 
  collection, 
  addDoc, 
  deleteDoc, 
  doc, 
  onSnapshot, 
  query 
} from 'firebase/firestore';

// تعريف شكل المنتج
export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  storeId: string;
}

// تعريف الدوال والبيانات
interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  getProductsByStore: (storeId: string) => Product[];
  getProductById: (id: string) => Product | undefined;
  loading: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. مراقبة قاعدة البيانات (Real-time Listener)
  useEffect(() => {
    const q = query(collection(db, 'products'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const productsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      
      setProducts(productsData);
      setLoading(false);
      console.log("🔥 Firebase Updated: ", productsData.length);
    }, (error) => {
      console.error("❌ Firebase Error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 2. إضافة منتج
  const addProduct = async (newProductData: Omit<Product, 'id'>) => {
    try {
      await addDoc(collection(db, 'products'), newProductData);
    } catch (error) {
      console.error("Error adding:", error);
      alert("فشل الاتصال بقاعدة البيانات. تأكد من ملف firebase.ts");
    }
  };

  // 3. حذف منتج
  const deleteProduct = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'products', id));
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  // دوال مساعدة
  const getProductsByStore = (storeId: string) => {
    return products.filter((p) => p.storeId === storeId);
  };

  const getProductById = (id: string) => {
    return products.find((p) => p.id === id);
  };

  return (
    <ProductContext.Provider 
      value={{ 
        products, 
        addProduct, 
        deleteProduct, 
        getProductsByStore, 
        getProductById,
        loading
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};