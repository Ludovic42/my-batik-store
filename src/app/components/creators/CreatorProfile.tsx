import React from 'react';
import { Creator, Item } from '../../models';
import { ItemGrid } from '../items/ItemGrid';

interface CreatorProfileProps {
  creator: Creator;
  items: Item[];
  loading: boolean;
  error?: string;
}

export const CreatorProfile: React.FC<CreatorProfileProps> = ({ 
  creator, 
  items,
  loading,
  error
}) => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-white p-6 rounded-lg shadow-md">
        <div className="flex-shrink-0">
          {creator.avatarUrl ? (
            <img 
              src={creator.avatarUrl} 
              alt={creator.name} 
              className="w-32 h-32 rounded-full object-cover"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-4xl">
              {creator.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        
        <div className="flex-grow text-center md:text-left">
          <h2 className="text-2xl font-bold">{creator.name}</h2>
          
          {creator.location && (
            <p className="text-gray-600 mt-1">{creator.location}</p>
          )}
          
          {creator.bio && (
            <div className="mt-4 text-gray-700">
              <p>{creator.bio}</p>
            </div>
          )}
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-4">Items by {creator.name}</h3>
        <ItemGrid 
          items={items} 
          loading={loading} 
          error={error}
          filters={{}}
          onFilterChange={() => {}}
        />
      </div>
    </div>
  );
};
