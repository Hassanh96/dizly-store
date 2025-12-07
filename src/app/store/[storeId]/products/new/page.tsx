'use client';

import React, { useState, use } from 'react'; 
import { useRouter } from 'next/navigation';
import { useProduct } from '@/context/ProductContext';

export default function NewProductPage({ params }: { params: Promise<{ storeId: string }> }) {
  const router = useRouter();
  
  const { storeId } = use(params);
  const { addProduct, products } = useProduct();

  // 1. تحديد التصنيفات الموجودة مسبقاً
  const defaultCategories = ['عام', 'إلكترونيات', 'ملابس', 'منزل', 'ألعاب'];
  
  // دمج التصنيفات الافتراضية مع تصنيفات المنتجات الحالية (بدون تكرار)
  const existingCategories = Array.from(new Set([
    ...defaultCategories,
    ...products.map(p => p.category)
  ]));

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    image: '',
    category: existingCategories[0], // القيمة الافتراضية
  });

  // حالة خاصة لمعرفة هل اختار المستخدم "إضافة جديد" أم لا
  const [isCustomCategory, setIsCustomCategory] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // دالة خاصة للتعامل مع تغيير القائمة المنسدلة
  const handleCategorySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'NEW_CUSTOM_CATEGORY') {
      setIsCustomCategory(true);
      setFormData(prev => ({ ...prev, category: '' })); // تفريغ القيمة للكتابة
    } else {
      setIsCustomCategory(false);
      setFormData(prev => ({ ...prev, category: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.price || !formData.category) {
      alert('يرجى ملء الحقول الأساسية وتحديد التصنيف');
      return;
    }

    addProduct({
      title: formData.title,
      price: Number(formData.price),
      description: formData.description,
      image: formData.image,
      category: formData.category,
      storeId: storeId,
    });

    alert('تم حفظ المنتج بنجاح!');
    router.push(`/store/${storeId}`);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10 border border-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <span className="text-green-600 text-3xl">+</span> إضافة منتج جديد
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* اسم المنتج */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">اسم المنتج</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="مثال: سماعة بلوتوث"
          />
        </div>

        {/* السعر */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">السعر ($)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition"
            placeholder="0.00"
          />
        </div>

        {/* قسم التصنيف (الذكي) */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <label className="block text-sm font-semibold text-gray-700 mb-2">التصنيف</label>
          
          {/* القائمة المنسدلة */}
          <select
            value={isCustomCategory ? 'NEW_CUSTOM_CATEGORY' : formData.category}
            onChange={handleCategorySelect}
            className="w-full border border-gray-300 rounded-lg p-2.5 mb-3 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <optgroup label="اختر تصنيفاً موجوداً">
              {existingCategories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </optgroup>
            <option value="NEW_CUSTOM_CATEGORY" className="font-bold text-blue-600">
              ➕ إضافة تصنيف جديد...
            </option>
          </select>

          {/* حقل الكتابة يظهر فقط عند اختيار "إضافة جديد" */}
          {isCustomCategory && (
            <div className="animate-fadeIn">
              <label className="block text-xs text-gray-500 mb-1">اكتب اسم القسم الجديد:</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                autoFocus
                className="w-full border-2 border-blue-400 rounded-lg p-2.5 bg-white focus:outline-none shadow-sm"
                placeholder="مثال: عطور، رياضة، سيارات..."
              />
            </div>
          )}
        </div>

        {/* الصورة */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">رابط الصورة</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition"
            placeholder="https://..."
          />
        </div>

        {/* الوصف */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">الوصف</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition"
            placeholder="اكتب وصفاً مختصراً للمنتج..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg flex justify-center items-center gap-2"
        >
          <span>حفظ المنتج</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </form>
    </div>
  );
}