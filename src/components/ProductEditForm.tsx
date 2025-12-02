'use client';

import React, { useState, useEffect } from 'react';
// 👇👇 التصحيح هنا: استيراد useCategory من ProductContext بدلاً من الملف المحذوف
import { useProduct, useCategory } from '../context/ProductContext';

// تحديث الواجهة لتشمل المخزون
interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    categoryId: string;
    isFeatured: boolean;
    inventoryCount: number; 
}

interface ProductEditFormProps {
    product: Product;
    onClose: () => void;
}

const ProductEditForm: React.FC<ProductEditFormProps> = ({ product, onClose }) => {
    // الآن useCategory تأتي من ProductContext وتعمل بشكل صحيح
    const { categories } = useCategory();
    
    const { updateProduct } = useProduct() as any; 

    // حالة النموذج المحلية
    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price.toString());
    const [image, setImage] = useState(product.image);
    const [description, setDescription] = useState(product.description);
    const [categoryId, setCategoryId] = useState(product.categoryId);
    const [isFeatured, setIsFeatured] = useState(product.isFeatured);
    const [inventoryCount, setInventoryCount] = useState(product.inventoryCount.toString());

    // تحديث الحالة عند تغيير المنتج
    useEffect(() => {
        setName(product.name);
        setPrice(product.price.toString());
        setImage(product.image);
        setDescription(product.description);
        setCategoryId(product.categoryId);
        setIsFeatured(product.isFeatured);
        setInventoryCount(product.inventoryCount.toString()); 
    }, [product]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !price || !categoryId) {
            alert('الرجاء تعبئة البيانات الأساسية واختيار التصنيف');
            return;
        }

        const updatedProduct: Product = {
            id: product.id,
            name,
            price: Number(price),
            image,
            description,
            categoryId,
            isFeatured,
            inventoryCount: Number(inventoryCount),
        };

        if (updateProduct) {
            updateProduct(product.id, updatedProduct); // تأكد من تمرير ID والمعلومات المحدثة
            // ملاحظة: قد تختلف دالة updateProduct حسب تعريفها في السياق، لكن هذا الشكل شائع
            // إذا كانت تأخذ كائن واحد فقط فيمكنك إبقاؤها كما كانت: updateProduct(updatedProduct)
            
            alert('تم تعديل المنتج بنجاح! ✏️');
            onClose();
        } else {
            console.error("updateProduct function is missing in Context");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" dir="rtl">
            <div className="bg-white p-6 rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto w-full max-w-lg relative">
                
                <button 
                    onClick={onClose} 
                    className="absolute top-3 left-3 text-gray-500 hover:text-gray-800 text-2xl"
                >
                    &times;
                </button>

                <h2 className="text-2xl font-bold text-green-700 mb-6 border-b pb-2">تعديل المنتج: {product.name}</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* اختيار القسم */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">القسم التابع له</label>
                        <select 
                            value={categoryId} 
                            onChange={(e) => setCategoryId(e.target.value)}
                            className="w-full p-2 border rounded mt-1 bg-gray-50"
                            required
                        >
                            <option value="">-- اختر قسماً --</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* الاسم والسعر والمخزون */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700">اسم المنتج</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                                className="w-full p-2 border rounded mt-1" required />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700">السعر (د.ع)</label>
                            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)}
                                className="w-full p-2 border rounded mt-1" required />
                        </div>

                        {/* حقل تعديل المخزون الجديد */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">الكمية بالمخزن</label>
                            <input type="number" value={inventoryCount} onChange={(e) => setInventoryCount(e.target.value)}
                                className="w-full p-2 border rounded mt-1 bg-yellow-50" required />
                        </div>
                    </div>

                    {/* رابط الصورة */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">رابط الصورة</label>
                        <input type="text" value={image} onChange={(e) => setImage(e.target.value)}
                            className="w-full p-2 border rounded mt-1" placeholder="https://..." />
                        {image && (
                            <img src={image} alt="صورة المنتج" className="mt-2 w-20 h-20 object-cover rounded shadow"/>
                        )}
                    </div>
                    
                    {/* الوصف */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">الوصف</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-2 border rounded mt-1 h-20" />
                    </div>

                    {/* مميز */}
                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="edit-feat" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} className="w-4 h-4 text-purple-600"/>
                        <label htmlFor="edit-feat" className="text-sm text-gray-700">عرض في "وصل حديثاً"</label>
                    </div>

                    {/* زر الحفظ */}
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                        حفظ التعديلات 💾
                    </button>
                </form>

            </div>
        </div>
    );
};

export default ProductEditForm;