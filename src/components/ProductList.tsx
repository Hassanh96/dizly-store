'use client';

import React from 'react';
import Image from 'next/image';
import { Product } from '../context/ProductContext'; // تأكد من مسار الاستيراد الصحيح للواجهة

interface ProductListProps {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (id: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onEdit, onDelete }) => {
    
    // 💡 دالة التعامل مع الحذف لإضافة طبقة أمان
    const handleDeleteClick = (product: Product) => {
        // رسالة تأكيد تظهر اسم المنتج ليتأكد المستخدم مما يحذفه
        const isConfirmed = window.confirm(`هل أنت متأكد أنك تريد حذف المنتج "${product.name}" نهائياً؟ 🗑️`);
        
        if (isConfirmed) {
            onDelete(product.id);
        }
    };

    return (
        <section className="p-4 bg-white rounded-lg shadow-xl overflow-x-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">قائمة المنتجات ({products.length}) 📋</h2>
            
            {/* التحقق من وجود منتجات قبل عرض الجدول */}
            {products.length === 0 ? (
                <p className="text-gray-500 text-center py-4">لا توجد منتجات مضافة حالياً.</p>
            ) : (
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المنتج</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">السعر</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المخزون</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">إجراءات</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center gap-3">
                                    {/* عرض صورة مصغرة للمنتج إن وجدت */}
                                    <div className="relative w-10 h-10 rounded overflow-hidden bg-gray-100 border">
                                        <Image 
                                            src={product.image || 'https://via.placeholder.com/150'} 
                                            alt={product.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    {product.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {product.price.toLocaleString()} د.ع
                                </td>
                                <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold ${product.inventoryCount === 0 ? 'text-red-600' : 'text-green-600'}`}>
                                    {product.inventoryCount}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2 space-x-reverse">
                                    <button 
                                        onClick={() => onEdit(product)} 
                                        className="text-blue-600 hover:text-blue-900 font-bold ml-2 bg-blue-50 px-3 py-1 rounded hover:bg-blue-100 transition"
                                    >
                                        تعديل ✏️
                                    </button>
                                    
                                    {/* زر الحذف يستدعي دالة التأكيد أولاً */}
                                    <button 
                                        onClick={() => handleDeleteClick(product)} 
                                        className="text-red-600 hover:text-red-900 font-bold bg-red-50 px-3 py-1 rounded hover:bg-red-100 transition"
                                    >
                                        حذف 🗑️
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </section>
    );
};

export default ProductList;