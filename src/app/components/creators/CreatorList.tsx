import React, { useState } from 'react';
import { Creator } from '../../models';
import { CreatorCard } from './CreatorCard';

interface CreatorListProps {
  creators: Creator[];
  loading: boolean;
  error?: string;
}

export const CreatorList: React.FC<CreatorListProps> = ({ 
  creators, 
  loading, 
  error 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredCreators = creators.filter(creator => 
    creator.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    creator.bio?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    creator.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
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
        Error loading creators: {error}
      </div>
    );
  }

  if (creators.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No creators found.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search creators..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredCreators.map(creator => (
          <CreatorCard key={creator.id} creator={creator} />
        ))}
      </div>
    </div>
  );
};