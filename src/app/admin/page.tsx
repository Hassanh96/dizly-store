// src/app/admin/page.tsx
'use client';

import React, { useState } from 'react';
// تأكد أن المسار هنا صحيح: يخرج من admin (..) ثم من app (..) ليصل إلى src ثم يدخل context
import { useProduct, useCategory } from '../../context/ProductContext';
import Image from 'next/image';

export default function AdminPage() {
    // استخدام الهوك لجلب البيانات والدوال
    const { products, addProduct, deleteProduct } = useProduct();
    const { categories } = useCategory();

    // حالات (States) النموذج
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [isFeatured, setIsFeatured] = useState(false);
    const [inventoryCount, setInventoryCount] = useState('');
    
    // حالة جديدة لتحديد نوع الوسائط (صورة أو فيديو)
    const [mediaType, setMediaType] = useState<'image' | 'video'>('image');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // التحقق من البيانات المطلوبة
        if (!name || !price || !categoryId || !inventoryCount) {
            alert('يرجى ملء الحقول الأساسية');
            return;
        }

        addProduct({
            name,
            price: Number(price),
            image,
            type: mediaType, // إرسال النوع المختار (فيديو أو صورة)
            description,
            categoryId,
            isFeatured,
            inventoryCount: Number(inventoryCount)
        });

        // إعادة تعيين النموذج بعد الحفظ
        setName('');
        setPrice('');
        setImage('');
        setDescription('');
        setInventoryCount('');
        setIsFeatured(false);
        setMediaType('image'); // إعادة التعيين للافتراضي
    };

    return (
        <div className="container mx-auto px-4 py-8" dir="rtl">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">لوحة التحكم - إدارة المنتجات</h1>

            {/* --- نموذج إضافة منتج --- */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-10">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">إضافة منتج جديد</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* الاسم */}
                        <div>
                            <label className="block text-gray-700 mb-2">اسم المنتج</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>

                        {/* السعر */}
                        <div>
                            <label className="block text-gray-700 mb-2">السعر (د.ع)</label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>
                    </div>

                    {/* --- اختيار نوع الوسائط --- */}
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <label className="block text-gray-700 font-bold mb-3">نوع العرض:</label>
                        <div className="flex gap-6">
                            {/* خيار الصورة */}
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="mediaType"
                                    value="image"
                                    checked={mediaType === 'image'}
                                    onChange={() => setMediaType('image')}
                                    className="w-5 h-5 text-indigo-600 focus:ring-indigo-500"
                                />
                                <span className="text-gray-800 font-medium">صورة 🖼️</span>
                            </label>

                            {/* خيار الفيديو */}
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="mediaType"
                                    value="video"
                                    checked={mediaType === 'video'}
                                    onChange={() => setMediaType('video')}
                                    className="w-5 h-5 text-indigo-600 focus:ring-indigo-500"
                                />
                                <span className="text-gray-800 font-medium">فيديو 🎥</span>
                            </label>
                        </div>
                    </div>

                    {/* رابط الوسائط */}
                    <div>
                        <label className="block text-gray-700 mb-2">
                            {mediaType === 'image' ? 'رابط الصورة (URL)' : 'رابط الفيديو (MP4 URL)'}
                        </label>
                        <input
                            type="text"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
                            placeholder={mediaType === 'image' ? "https://example.com/image.jpg" : "https://example.com/video.mp4"}
                        />
                    </div>

                    {/* القسم */}
                    <div>
                        <label className="block text-gray-700 mb-2">القسم</label>
                        <select
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
                            required
                        >
                            <option value="">اختر القسم...</option>
                            {/* هنا نستخدم cat كاسم للمتغير داخل الحلقة */}
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* الوصف */}
                    <div>
                        <label className="block text-gray-700 mb-2">الوصف</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 h-24"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* الكمية */}
                        <div>
                            <label className="block text-gray-700 mb-2">الكمية المتوفرة</label>
                            <input
                                type="number"
                                value={inventoryCount}
                                onChange={(e) => setInventoryCount(e.target.value)}
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>

                        {/* منتج مميز */}
                        <div className="flex items-center h-full pt-6">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={isFeatured}
                                    onChange={(e) => setIsFeatured(e.target.checked)}
                                    className="w-5 h-5 text-indigo-600 rounded"
                                />
                                <span className="text-gray-700">منتج مميز (يظهر في الرئيسية)</span>
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-bold text-lg"
                    >
                        إضافة المنتج
                    </button>
                </form>
            </div>

            {/* --- قائمة المنتجات الحالية --- */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-6 text-gray-700">المنتجات الحالية ({products.length})</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-right">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="p-3">صورة/فيديو</th>
                                <th className="p-3">الاسم</th>
                                <th className="p-3">السعر</th>
                                <th className="p-3">النوع</th>
                                <th className="p-3">الكمية</th>
                                <th className="p-3">إجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {/* هنا نستخدم product كاسم للمتغير داخل الحلقة */}
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                    <td className="p-3">
                                        <div className="w-16 h-16 relative bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                                            {product.type === 'video' ? (
                                                <span className="text-2xl">🎥</span>
                                            ) : (
                                                <Image
                                                    src={product.image || 'https://via.placeholder.com/150'}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-3 font-medium">{product.name}</td>
                                    <td className="p-3 text-indigo-600">{product.price.toLocaleString()} د.ع</td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 rounded text-xs ${product.type === 'video' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                                            {product.type === 'video' ? 'فيديو' : 'صورة'}
                                        </span>
                                    </td>
                                    <td className="p-3">{product.inventoryCount}</td>
                                    <td className="p-3">
                                        <button
                                            onClick={() => deleteProduct(product.id)}
                                            className="text-red-500 hover:text-red-700 bg-red-50 px-3 py-1 rounded"
                                        >
                                            حذف
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {products.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="text-center py-8 text-gray-500">
                                        لا توجد منتجات حالياً
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}