import React from 'react';
import { Item } from '../../models';
import { useNavigate } from 'react-router-dom';
import Image from "next/image";

interface ItemCardProps {
  item: Item;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/items/${item.id}`);
  };
  
  return (
    <div 
      className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
      onClick={handleClick}
    >
      <div className="relative h-48 bg-gray-200">
        {item.mainImage ? (
          <Image 
            src={item.mainImage} 
            alt={item.name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No Image
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg">{item.name}</h3>
        <p className="text-sm text-gray-500">{item.category}</p>
        <div className="mt-2 flex justify-between items-center">
          <span className="font-bold">${item.price.toFixed(2)}</span>
          <span className="text-sm text-gray-500">By {item.creator?.name || 'Unknown Creator'}</span>
        </div>
      </div>
    </div>
  );
};
