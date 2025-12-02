'use client';

import React, { useState } from 'react';
import { useProduct, useCategory, Product, Category } from '../../context/ProductContext';
import { useOrder, Order } from '../../context/OrderContext'; 
import ProductEditForm from '../../components/ProductEditForm';
// 👇👇 استيراد القائمة من الملف الجديد الذي أنشأته للتو
import ProductList from '../../components/ProductList';

// =========================================================
// 1. نموذج إضافة قسم (Category Form)
// =========================================================
const CategoryForm = () => {
    const { addCategory } = useCategory();
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        
        addCategory({ 
            name: name.trim(), 
            image: image.trim() || 'https://via.placeholder.com/150' 
        });
        
        setName('');
        setImage('');
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow h-fit">
            <h3 className="text-xl font-bold mb-3">إدارة الأقسام</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input type="text" placeholder="اسم القسم الجديد" value={name} onChange={(e) => setName(e.target.value)} className="p-2 border rounded" required />
                <input type="text" placeholder="رابط صورة القسم (اختياري)" value={image} onChange={(e) => setImage(e.target.value)} className="p-2 border rounded" />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 font-bold">أضف قسم</button>
            </form>
        </div>
    );
};

// =========================================================
// 2. نموذج إضافة منتج (Product Form)
// =========================================================
const ProductForm = () => {
    const { categories } = useCategory();
    const { addProduct } = useProduct(); 
    
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [categoryId, setCategoryId] = useState(categories[0]?.id || '');
    const [isFeatured, setIsFeatured] = useState(false);
    const [inventoryCount, setInventoryCount] = useState(10); 

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || price <= 0 || !categoryId) return;
        
        const newProduct = {
            name: name.trim(),
            price,
            description,
            image,
            categoryId,
            isFeatured,
            inventoryCount: Number(inventoryCount),
        };
        
        addProduct(newProduct);
        
        setName(''); setPrice(0); setDescription(''); setImage(''); setIsFeatured(false); setInventoryCount(10);
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="text-xl font-bold mb-3">أضف منتج جديد</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
                <input type="text" placeholder="اسم المنتج" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded" required />
                <div className="flex gap-2">
                    <input type="number" placeholder="السعر" value={price || ''} onChange={(e) => setPrice(parseFloat(e.target.value))} className="w-1/2 p-2 border rounded" min="0" required />
                    <input type="number" placeholder="الكمية" value={Number.isNaN(inventoryCount) ? '' : inventoryCount} onChange={(e) => setInventoryCount(parseInt(e.target.value))} className="w-1/2 p-2 border rounded bg-yellow-50" min="0" required />
                </div>
                <textarea placeholder="الوصف" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded" required />
                <input type="text" placeholder="رابط صورة المنتج (URL)" value={image} onChange={(e) => setImage(e.target.value)} className="w-full p-2 border rounded" />
                <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="w-full p-2 border rounded" required>
                    <option value="">-- اختر القسم --</option>
                    {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                </select>
                <div className="flex items-center space-x-2 space-x-reverse">
                    <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} id="isFeatured" className="w-4 h-4" />
                    <label htmlFor="isFeatured" className="text-sm">منتج مميز (وصل حديثاً)</label>
                </div>
                <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 font-semibold">حفظ المنتج</button>
            </form>
        </div>
    );
};

// =========================================================
// 3. عرض الطلبات (Orders Display)
// =========================================================
const OrdersDisplay = ({ pendingOrders, completedOrders, onUpdateStatus }: { 
    pendingOrders: Order[], 
    completedOrders: Order[],
    onUpdateStatus: (id: string, newStatus: any) => void 
}) => {
    const OrderCard = ({ order }: { order: Order }) => (
        <div className={`p-4 rounded-lg shadow-md border ${order.status === 'Pending' ? 'bg-yellow-50 border-yellow-200' : 'bg-green-50 border-green-200'}`}>
            <div className="flex justify-between items-start mb-2 border-b pb-2">
                <div>
                    <p className="font-bold text-lg text-gray-800">طلب #{order.id.slice(-6)}</p>
                    <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-bold rounded-full ${order.status === 'Pending' ? 'bg-yellow-500 text-white' : 'bg-green-500 text-white'}`}>
                    {order.status === 'Pending' ? 'قيد الانتظار' : 'مكتمل'}
                </span>
            </div>
            <p className="text-gray-700">العميل: <strong>{order.customer.name}</strong></p>
            <p className="font-bold mt-2 text-xl text-purple-700">{order.totalPrice.toLocaleString()} د.ع</p>
            {order.status === 'Pending' && (
                <button onClick={() => onUpdateStatus(order.id, 'Completed')} className="w-full mt-4 bg-green-600 text-white py-2 rounded hover:bg-green-700 font-bold">أكمل الطلب ✔️</button>
            )}
        </div>
    );
    
    return (
        <div className="space-y-8">
            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">طلبات جديدة ({pendingOrders.length}) 🚨</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pendingOrders.map(order => <OrderCard key={order.id} order={order} />)}
                    {pendingOrders.length === 0 && <p className="text-gray-500">لا توجد طلبات جديدة.</p>}
                </div>
            </section>
            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">الأرشيف ({completedOrders.length}) 📦</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-70">
                    {completedOrders.map(order => <OrderCard key={order.id} order={order} />)}
                </div>
            </section>
        </div>
    );
};

// =========================================================
// 4. صفحة الأدمن الرئيسية (Admin Page)
// =========================================================
export default function AdminPage() {
    const { products: rawProducts, deleteProduct } = useProduct() as any;
    const products = rawProducts as Product[];
    const { orders, updateOrderStatus } = useOrder(); 
    
    const pendingOrders = orders ? orders.filter((o) => o.status === 'Pending') : [];
    const completedOrders = orders ? orders.filter((o) => o.status !== 'Pending') : [];

    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const handleUpdateStatus = (id: string, newStatus: 'Pending' | 'Completed' | 'Cancelled') => {
        updateOrderStatus(id, newStatus);
    };

    return (
        <div className="container mx-auto px-4 py-8" dir="rtl">
            <h1 className="text-4xl font-extrabold text-purple-700 mb-10 border-b-4 pb-2">لوحة تحكم الأدمن ⚙️</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                <div className="lg:col-span-1"><CategoryForm /></div>
                <div className="lg:col-span-2"><ProductForm /></div>
            </div>
            
            <hr className="my-10" />
            
            {/* 👇👇 استخدام المكون المستورد */}
            <ProductList 
                products={products} 
                onDelete={deleteProduct} 
                onEdit={(product) => setEditingProduct(product)}
            /> 
            
            {editingProduct && (
                <ProductEditForm 
                    product={editingProduct} 
                    onClose={() => setEditingProduct(null)} 
                />
            )}
            
            <hr className="my-10" />
            
            <OrdersDisplay 
                pendingOrders={pendingOrders} 
                completedOrders={completedOrders} 
                onUpdateStatus={handleUpdateStatus} 
            />
        </div>
    );
}