import React from 'react';
import { Item, ItemFilterOptions } from '../../models';
import { ItemCard } from './ItemCard';
import { ItemFilter } from './ItemFilter';

interface ItemGridProps {
  items: Item[];
  loading: boolean;
  error?: string;
  onFilterChange: (filters: ItemFilterOptions) => void;
  filters: ItemFilterOptions;
}

export const ItemGrid: React.FC<ItemGridProps> = ({ 
  items, 
  loading, 
  error, 
  onFilterChange,
  filters 
}) => {
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
        Error loading items: {error}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No items found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div>
      <ItemFilter filters={filters} onFilterChange={onFilterChange} />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {items.map(item => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};