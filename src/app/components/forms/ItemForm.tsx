import React, { useState, useEffect } from 'react';
import { Item, ItemInput } from '../../models';

interface ItemFormProps {
  initialValues?: Partial<Item>;
  onSubmit: (item: ItemInput) => void;
  onCancel?: () => void;
  loading?: boolean;
}

export const ItemForm: React.FC<ItemFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
  loading = false
}) => {
  const [formValues, setFormValues] = useState<ItemInput>({
    creatorId: initialValues?.creatorId || '',
    name: initialValues?.name || '',
    price: initialValues?.price || 0,
    category: initialValues?.category || '',
    description: initialValues?.description || '',
    widthCm: initialValues?.widthCm,
    heightCm: initialValues?.heightCm,
    size: initialValues?.size || '',
    colors: initialValues?.colors || [],
    mainImage: initialValues?.mainImage || ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newColor, setNewColor] = useState('');
  
  useEffect(() => {
    if (initialValues) {
      setFormValues({
        creatorId: initialValues.creatorId || '',
        name: initialValues.name || '',
        price: initialValues.price || 0,
        category: initialValues.category || '',
        description: initialValues.description || '',
        widthCm: initialValues.widthCm,
        heightCm: initialValues.heightCm,
        size: initialValues.size || '',
        colors: initialValues.colors || [],
        mainImage: initialValues.mainImage || ''
      });
    }
  }, [initialValues]);
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formValues.creatorId) {
      newErrors.creatorId = 'Creator is required';
    }
    
    if (!formValues.name) {
      newErrors.name = 'Name is required';
    }
    
    if (formValues.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormValues(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value
    }));
  };
  
  const handleAddColor = () => {
    if (newColor && !(formValues.colors ?? []).includes(newColor)) {
      setFormValues(prev => ({
        ...prev,
        colors: [...(prev?.colors ?? []), newColor]
      }));
      setNewColor('');
    }
  };
  
  const handleRemoveColor = (color: string) => {
    setFormValues(prev => ({
      ...prev,
      colors: (prev?.colors ?? []).filter(c => c !== color)
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formValues);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            className={`w-full rounded-md shadow-sm ${
              errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="category">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formValues.category}
            onChange={handleInputChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="price">
            Price
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              id="price"
              name="price"
              min="0"
              step="0.01"
              value={formValues.price}
              onChange={handleInputChange}
              className={`w-full pl-7 rounded-md ${
                errors.price ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
              }`}
            />
          </div>
          {errors.price && (
            <p className="mt-1 text-sm text-red-600">{errors.price}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="size">
            Size
          </label>
          <input
            type="text"
            id="size"
            name="size"
            value={formValues.size}
            onChange={handleInputChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="e.g. Small, Medium, Large"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="widthCm">
            Width (cm)
          </label>
          <input
            type="number"
            id="widthCm"
            name="widthCm"
            min="0"
            step="0.1"
            value={formValues.widthCm || ''}
            onChange={handleInputChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="heightCm">
            Height (cm)
          </label>
          <input
            type="number"
            id="heightCm"
            name="heightCm"
            min="0"
            step="0.1"
            value={formValues.heightCm || ''}
            onChange={handleInputChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="mainImage">
            Main Image URL
          </label>
          <input
            type="text"
            id="mainImage"
            name="mainImage"
            value={formValues.mainImage || ''}
            onChange={handleInputChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="colors">
          Colors
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {(formValues.colors ?? []).map(color => (
            <span
              key={color}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              {color}
              <button
                type="button"
                onClick={() => handleRemoveColor(color)}
                className="ml-1.5 inline-flex text-blue-400 hover:text-blue-600 focus:outline-none"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            id="newColor"
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
            className="flex-grow rounded-l-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Add a color"
          />
          <button
            type="button"
            onClick={handleAddColor}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add
          </button>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={formValues.description || ''}
          onChange={handleInputChange}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      
      <div className="flex justify-end space-x-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            loading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Saving...' : 'Save Item'}
        </button>
      </div>
    </form>
  );
};
