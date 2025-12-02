// src/data/products.ts

export const categories = [
    { id: '1', name: 'ملابس نسائية' },
    { id: '2', name: 'ملابس رجالية' },
    { id: '3', name: 'إكسسوارات' },
    { id: '4', name: 'أحذية' },
];

export const products = [
    {
        id: '1',
        name: 'فستان صيفي مزهر',
        price: 25000,
        image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        description: 'فستان صيفي أنيق ومريح مصنوع من القطن الناعم، مثالي للأجواء الحارة والنزهات.',
        categoryId: '1',
        isFeatured: true,
        inventoryCount: 15, // 📦 مخزون أولي
    },
    {
        id: '2',
        name: 'حقيبة جلدية فاخرة',
        price: 45000,
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        description: 'حقيبة يد نسائية مصنوعة من الجلد الطبيعي عالي الجودة، تتسع لجميع أغراضك الشخصية.',
        categoryId: '3',
        isFeatured: true,
        inventoryCount: 8, // 📦 مخزون أولي
    },
    {
        id: '3',
        name: 'قميص رجالي كلاسيك',
        price: 30000,
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        description: 'قميص رجالي بتصميم كلاسيكي أنيق، مناسب للعمل والمناسبات الرسمية.',
        categoryId: '2',
        isFeatured: false,
        inventoryCount: 20, // 📦 مخزون أولي
    },
    {
        id: '4',
        name: 'ساعة يد ذهبية',
        price: 150000,
        image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        description: 'ساعة يد فاخرة مطلية بالذهب، مقاومة للماء وتتميز بتصميم عصري جذاب.',
        categoryId: '3',
        isFeatured: true,
        inventoryCount: 5, // 📦 مخزون قليل
    },
    {
        id: '5',
        name: 'بنطلون جينز نسائي',
        price: 35000,
        image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        description: 'بنطلون جينز بقصة مريحة وعصرية، يناسب الاستخدام اليومي.',
        categoryId: '1',
        isFeatured: false,
        inventoryCount: 12, // 📦 مخزون أولي
    },
    // يمكنك إضافة المزيد من المنتجات هنا بنفس الهيكل
];