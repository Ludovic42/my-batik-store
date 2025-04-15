import React, { useState } from 'react';
import { Order } from '../../models';
import { OrderItemComponent } from './OrderItem';

interface OrderCardProps {
  order: Order;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const [expanded, setExpanded] = useState(false);
  
  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'canceled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="border rounded-lg overflow-hidden shadow-md mb-4 bg-white">
      <div className="p-4 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">Order #{order.id}</p>
          <p className="text-sm">
            {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
          </p>
        </div>
        
        <div className="flex items-center">
          <span className={`text-sm px-3 py-1 rounded-full ${getStatusBadgeColor(order.status)}`}>
            {order.status}
          </span>
          <span className="font-bold ml-4">${order.totalPrice.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="border-t px-4">
        <button 
          className="flex items-center justify-between w-full py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          onClick={() => setExpanded(!expanded)}
        >
          <span>{expanded ? 'Hide' : 'Show'} order details</span>
          <span>{expanded ? '▲' : '▼'}</span>
        </button>
      </div>
      
      {expanded && (
        <div className="px-4 pt-2 pb-4">
          {order.items && order.items.length > 0 ? (
            <div>
              {order.items.map(item => (
                <OrderItemComponent key={item.id} orderItem={item} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No items in this order</p>
          )}
        </div>
      )}
    </div>
  );
};
