import React, { useState } from 'react';
import { Order, OrderFilterOptions } from '../../models';
import { OrderCard } from './OrderCard';

interface OrderListProps {
  orders: Order[];
  loading: boolean;
  error?: string;
  onFilterChange?: (filters: OrderFilterOptions) => void;
}

export const OrderList: React.FC<OrderListProps> = ({ 
  orders, 
  loading, 
  error,
  onFilterChange
}) => {
  const [filters, setFilters] = useState<OrderFilterOptions>({});
  
  const handleStatusFilterChange = (status: string) => {
    const newFilters = { ...filters, status };
    setFilters(newFilters);
    if (onFilterChange) onFilterChange(newFilters);
  };
  
  const handleDateFilterChange = (startDate?: Date, endDate?: Date) => {
    const newFilters = { ...filters, startDate, endDate };
    setFilters(newFilters);
    if (onFilterChange) onFilterChange(newFilters);
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        Error loading orders: {error}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No orders found.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 bg-gray-50 p-4 rounded-lg shadow-sm">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={filters.status || ''}
              onChange={(e) => handleStatusFilterChange(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={filters.startDate ? filters.startDate.toISOString().split('T')[0] : ''}
              onChange={(e) => handleDateFilterChange(
                e.target.value ? new Date(e.target.value) : undefined,
                filters.endDate
              )}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              value={filters.endDate ? filters.endDate.toISOString().split('T')[0] : ''}
              onChange={(e) => handleDateFilterChange(
                filters.startDate,
                e.target.value ? new Date(e.target.value) : undefined
              )}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {orders.map(order => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};