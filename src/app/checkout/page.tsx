'use client';

import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useOrder } from '../../context/OrderContext';
import { useProduct } from '../../context/ProductContext'; // 👈 ضروري لتحديث المخزون
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  // 1. استخدام الأسماء الصحيحة (cartItems)
  const { cartItems, clearCart } = useCart();
  const { addOrder } = useOrder();
  const { updateProductStock } = useProduct(); // 👈 استيراد دالة خصم المخزون
  const router = useRouter();

  // 2. حساب السعر الإجمالي محلياً
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // أ. حفظ الطلب في السجل الداخلي للموقع
    addOrder(
      { 
        name: formData.name,
        phone: formData.phone,
        address: formData.address 
      }, 
      cartItems, 
      totalPrice 
    );

    // ب. 📉 خصم المخزون (الخطوة الأهم)
    cartItems.forEach(item => {
        updateProductStock(item.id, item.quantity);
    });

    // ج. تجهيز رسالة واتس آب
    const itemsList = cartItems.map(item => {
      let imageUrl = item.image;
      if (!imageUrl.startsWith('http')) {
        imageUrl = `${window.location.origin}${item.image}`;
      }
      return `- ${item.name} (x${item.quantity})\n   🔗 صورة: ${imageUrl}`;
    }).join('\n\n');

    const message = `مرحباً، أريد تأكيد الطلب التالي: 👇
    
الاسم: ${formData.name}
الهاتف: ${formData.phone}
العنوان: ${formData.address}

🛒 المنتجات:
${itemsList}

💰 الإجمالي: ${totalPrice.toLocaleString()} د.ع`;

    // د. فتح واتس آب
    const encodedMessage = encodeURIComponent(message);
    const myPhoneNumber = "9647814066105"; 
    window.open(`https://wa.me/${myPhoneNumber}?text=${encodedMessage}`, '_blank');
    
    // هـ. تنظيف السلة والعودة
    clearCart();
    router.push('/');
  };

  // حالة السلة الفارغة
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-2xl font-bold mb-4">السلة فارغة!</h1>
        <Link href="/" className="text-purple-600 hover:underline">العودة للتسوق</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">إتمام الشراء 💳</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        
        {/* قسم 1: ملخص الطلب */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 h-fit">
          <h2 className="text-xl font-bold mb-4 text-purple-700">ملخص الطلب</h2>
          <div className="space-y-4 mb-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.name} (x{item.quantity})</span>
                <span className="font-bold">{(item.price * item.quantity).toLocaleString()} د.ع</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-300 pt-4 flex justify-between text-xl font-bold">
            <span>الإجمالي:</span>
            <span>{totalPrice.toLocaleString()} د.ع</span>
          </div>
        </div>

        {/* قسم 2: نموذج البيانات */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">الاسم الكامل</label>
            <input 
              type="text" 
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
              placeholder="مثال: بثينة ..."
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">رقم الهاتف</label>
            <input 
              type="tel" 
              name="phone"
              required
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
              placeholder="078..."
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">العنوان بالتفصيل</label>
            <textarea 
              name="address"
              required
              value={formData.address}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 h-32"
              placeholder="المدينة، المنطقة، أقرب نقطة دالة..."
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition shadow-lg mt-4 flex justify-center items-center gap-2"
          >
            <span>تأكيد الطلب عبر واتس آب</span>
            <span>📱</span>
          </button>
        </form>
      </div>
    </div>
  );
}