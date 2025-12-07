// src/components/ProductMedia.tsx
import React from 'react';
import Image from 'next/image';

// تعريف الخصائص الصحيحة للمكون (وليس DashboardProps)
interface ProductMediaProps {
    src: string;
    alt: string;
    type: 'image' | 'video';
    className?: string;
    poster?: string;
}

export default function ProductMedia({ src, alt, type, className, poster }: ProductMediaProps) {
    return (
        <div className={`relative overflow-hidden ${className || ''}`}>
            {type === 'video' ? (
                <video 
                    src={src} 
                    controls 
                    poster={poster}
                    className="w-full h-full object-cover"
                    playsInline
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
                    priority={false}
                />
            )}
        </div>
    );
}