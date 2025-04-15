import React from 'react';
import { OrderItem as OrderItemType } from '../../models';

interface OrderItemProps {
  orderItem: OrderItemType;
}

export const OrderItemComponent: React.FC<OrderItemProps> = ({ orderItem }) => {
  return (
    <div className="flex items-center py-4 border-b">
      <div className="w-16 h-16 bg-gray-200 mr-4">
        {orderItem.item?.mainImage ? (
          <img 
            src={orderItem.item.mainImage} 
            alt={orderItem.item.name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>
      
      <div className="flex-grow">
        <h4 className="font-medium">{orderItem.item?.name || 'Unknown Item'}</h4>
        <p className="text-sm text-gray-500">
          Price: ${orderItem.priceAtPurchase.toFixed(2)} × {orderItem.quantity}
        </p>
      </div>
      
      <div className="text-right">
        <p className="font-bold">${(orderItem.priceAtPurchase * orderItem.quantity).toFixed(2)}</p>
      </div>
    </div>
  );
};