import React from 'react';
import { Creator } from '../../models';
import { useNavigate } from 'react-router-dom';

interface CreatorCardProps {
  creator: Creator;
}

export const CreatorCard: React.FC<CreatorCardProps> = ({ creator }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/creators/${creator.id}`);
  };
  
  return (
    <div 
      className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex items-center p-4">
        <div className="mr-4">
          {creator.avatarUrl ? (
            <img 
              src={creator.avatarUrl} 
              alt={creator.name} 
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
              {creator.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        
        <div>
          <h3 className="font-semibold text-lg">{creator.name}</h3>
          {creator.location && (
            <p className="text-sm text-gray-500">{creator.location}</p>
          )}
          {creator.bio && (
            <p className="text-sm mt-2 line-clamp-2">{creator.bio}</p>
          )}
        </div>
      </div>
    </div>
  );
};