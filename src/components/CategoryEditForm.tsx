'use client';

import React, { useState, useEffect } from 'react';
import { Category } from '../context/ProductContext';

interface CategoryEditFormProps {
    category: Category | null; // إذا كان null فهذا يعني إضافة جديد
    onSubmit: (id: string, data: any) => void; // دالة الحفظ
    onClose: () => void;
}

const CategoryEditForm: React.FC<CategoryEditFormProps> = ({ category, onSubmit, onClose }) => {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');

    // تحديث البيانات عند فتح النموذج للتعديل
    useEffect(() => {
        if (category) {
            setName(category.name);
            setImage(category.image);
        } else {
            setName('');
            setImage('');
        }
    }, [category]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // إرسال البيانات (نرسل ID القسم إذا كان موجوداً، أو سلسلة فارغة إذا كان جديداً)
        onSubmit(category ? category.id : '', { name, image });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                    {category ? 'تعديل القسم' : 'إضافة قسم جديد'}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-1">اسم القسم</label>
                        <input 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
                            required 
                        />
                    </div>
                    
                    <div>
                        <label className="block text-gray-700 mb-1">رابط الصورة</label>
                        <input 
                            type="text" 
                            value={image} 
                            onChange={(e) => setImage(e.target.value)} 
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>

                    <div className="flex gap-2 justify-end mt-6">
                        <button 
                            type="button" 
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                        >
                            إلغاء
                        </button>
                        <button 
                            type="submit" 
                            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                        >
                            حفظ
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CategoryEditForm;