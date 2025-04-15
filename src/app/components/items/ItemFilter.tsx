// src/components/items/ItemFilter.tsx
import React, { useState, useEffect } from 'react';
import { ItemFilterOptions } from '../../models';
import { services } from '../../services';

interface ItemFilterProps {
  filters: ItemFilterOptions;
  onFilterChange: (filters: ItemFilterOptions) => void;
}

export const ItemFilter: React.FC<ItemFilterProps> = ({ filters, onFilterChange }) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [creators, setCreators] = useState<{ id: string, name: string }[]>([]);
  const [localFilters, setLocalFilters] = useState<ItemFilterOptions>(filters);
  
  useEffect(() => {
    // Fetch unique categories
    const fetchCategories = async () => {
      try {
        const items = await services.item.findAll({});
        const uniqueCategories = Array.from(
          new Set(items.map(item => item.category).filter(Boolean) as string[])
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    
    // Fetch creators
    const fetchCreators = async () => {
      try {
        const creatorsList = await services.creator.findAll();
        setCreators(creatorsList.map(c => ({ id: c.id, name: c.name })));
      } catch (error) {
        console.error('Error fetching creators:', error);
      }
    };
    
    fetchCategories();
    fetchCreators();
  }, []);
  
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'number') {
      setLocalFilters(prev => ({
        ...prev,
        [name]: value ? parseFloat(value) : undefined
      }));
    } else {
      setLocalFilters(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange(localFilters);
  };
  
  const handleReset = () => {
    const resetFilters: ItemFilterOptions = {
      sortBy: 'createdAt',
      sortOrder: 'desc'
    };
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            name="category"
            value={localFilters.category || ''}
            onChange={handleInputChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Creator
          </label>
          <select
            name="creatorId"
            value={localFilters.creatorId || ''}
            onChange={handleInputChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">All Creators</option>
            {creators.map(creator => (
              <option key={creator.id} value={creator.id}>
                {creator.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Min Price
          </label>
          <input
            type="number"
            name="minPrice"
            value={localFilters.minPrice || ''}
            onChange={handleInputChange}
            min="0"
            step="0.01"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max Price
          </label>
          <input
            type="number"
            name="maxPrice"
            value={localFilters.maxPrice || ''}
            onChange={handleInputChange}
            min="0"
            step="0.01"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sort By
          </label>
          <select
            name="sortBy"
            value={localFilters.sortBy || 'createdAt'}
            onChange={handleInputChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="createdAt">Date Added</option>
            <option value="price">Price</option>
            <option value="name">Name</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sort Order
          </label>
          <select
            name="sortOrder"
            value={localFilters.sortOrder || 'desc'}
            onChange={handleInputChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>
      
      <div className="mt-4 flex justify-end space-x-2">
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Reset
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Apply Filters
        </button>
      </div>
    </form>
  );
};