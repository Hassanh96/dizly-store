'use client';

import React from 'react';
import Image from 'next/image';
import { Category } from '../context/ProductContext';

interface CategoryListProps {
    categories: Category[];
    onEdit: (category: Category) => void;
    onDelete: (id: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg">
                <thead className="bg-gray-50 border-b">
                    <tr>
                        <th className="py-3 px-4 text-right">الصورة</th>
                        <th className="py-3 px-4 text-right">الاسم</th>
                        <th className="py-3 px-4 text-center">إجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.length === 0 ? (
                        <tr>
                            <td colSpan={3} className="text-center py-4 text-gray-500">لا توجد أقسام حالياً</td>
                        </tr>
                    ) : (
                        categories.map((cat) => (
                            <tr key={cat.id} className="border-b hover:bg-gray-50 transition">
                                <td className="py-2 px-4">
                                    <div className="relative w-12 h-12 rounded overflow-hidden bg-gray-200">
                                        <Image 
                                            src={cat.image || '/placeholder.jpg'} 
                                            alt={cat.name} 
                                            fill 
                                            className="object-cover"
                                        />
                                    </div>
                                </td>
                                <td className="py-2 px-4 font-medium">{cat.name}</td>
                                <td className="py-2 px-4 text-center space-x-2 space-x-reverse">
                                    <button 
                                        onClick={() => onEdit(cat)}
                                        className="text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1 rounded"
                                    >
                                        تعديل
                                    </button>
                                    <button 
                                        onClick={() => {
                                            if(confirm('هل أنت متأكد من حذف هذا القسم؟')) onDelete(cat.id);
                                        }}
                                        className="text-red-600 hover:text-red-800 bg-red-50 px-3 py-1 rounded"
                                    >
                                        حذف
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryList;