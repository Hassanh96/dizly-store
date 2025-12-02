'use client';

import React from 'react';
// تأكد من أنك تستورد Order من OrderContext
import { Order } from '../context/OrderContext';

interface OrderDisplayProps {
    pendingOrders: Order[];
    completedOrders: Order[];
}

const OrderDisplay: React.FC<OrderDisplayProps> = ({ pendingOrders, completedOrders }) => {
    
    // مكون فرعي لبطاقة الطلب
    const OrderCard = ({ order }: { order: Order }) => (
        <div className="border p-4 rounded-lg shadow-sm bg-gray-50 mb-4">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h4 className="font-bold text-lg">طلب #{order.id.slice(-6)}</h4>
                    <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString('ar-EG')}</p>
                </div>
                <span className={`px-2 py-1 rounded text-sm ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                    {order.status === 'Pending' ? 'قيد الانتظار' : 'مكتمل'}
                </span>
            </div>
            <div className="text-sm space-y-1">
                <p><strong>العميل:</strong> {order.customer.name}</p>
                <p><strong>الهاتف:</strong> {order.customer.phone}</p>
                <p><strong>الإجمالي:</strong> {order.totalPrice.toLocaleString()} د.ع</p>
            </div>
            <div className="mt-3 border-t pt-2">
                <p className="font-semibold text-xs text-gray-600 mb-1">المنتجات:</p>
                <ul className="list-disc list-inside text-xs text-gray-700">
                    {order.items.map((item, idx) => (
                        <li key={idx}>{item.name} (x{item.quantity})</li>
                    ))}
                </ul>
            </div>
        </div>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* الطلبات الجديدة */}
            <div>
                <h3 className="text-xl font-bold text-yellow-600 mb-4 border-b pb-2">
                    الطلبات الجديدة ({pendingOrders.length})
                </h3>
                {pendingOrders.length === 0 ? (
                    <p className="text-gray-500">لا توجد طلبات جديدة.</p>
                ) : (
                    pendingOrders.map(order => <OrderCard key={order.id} order={order} />)
                )}
            </div>

            {/* الطلبات المكتملة */}
            <div>
                <h3 className="text-xl font-bold text-green-600 mb-4 border-b pb-2">
                    الطلبات المكتملة ({completedOrders.length})
                </h3>
                {completedOrders.length === 0 ? (
                    <p className="text-gray-500">لا يوجد سجل للطلبات المكتملة.</p>
                ) : (
                    completedOrders.map(order => <OrderCard key={order.id} order={order} />)
                )}
            </div>
        </div>
    );
};

export default OrderDisplay;