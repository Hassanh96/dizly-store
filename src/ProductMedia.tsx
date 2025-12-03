// src/components/ProductMedia.tsx
import React from 'react';
import Image from 'next/image';

// 1. تعريف الخصائص: أضفنا خاصية "النوع" لتكون إجبارية وصريحة
interface ProductMediaProps {
    src: string;
    alt: string;
    type: 'image' | 'video'; // 👈 هنا يكمن الذكاء: نطلب النوع صراحةً
    className?: string;
    poster?: string; // (اختياري) صورة غلاف للفيديو قبل التشغيل
}

export default function ProductMedia({ src, alt, type, className, poster }: ProductMediaProps) {
    
    return (
        <div className={`relative overflow-hidden ${className || ''}`}>
            
            {/* جملة شرطية بسيطة جداً تعتمد على "النوع" القادم من البيانات */}
            {type === 'video' ? (
                <video 
                    src={src} 
                    controls 
                    poster={poster}
                    className="w-full h-full object-contain"
                >
                    <source src={src} type="video/mp4" />
                    متصفحك لا يدعم تشغيل الفيديو.
                </video>
            ) : (
                <Image
                    src={src || 'https://via.placeholder.com/800'}
                    alt={alt}
                    fill
                    className="object-cover"
                    priority={false} // تحسين الأداء للصور غير الرئيسية
                />
            )}
            
        </div>
    );
}