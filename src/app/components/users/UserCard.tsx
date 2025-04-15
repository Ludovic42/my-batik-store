import React from 'react';
import { User } from '../../models';

interface UserCardProps {
  user: User;
  onClick?: (user: User) => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onClick }) => {
  const handleClick = () => {
    if (onClick) onClick(user);
  };
  
  return (
    <div 
      className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      <div className="p-4">
        <h3 className="font-semibold text-lg">{user.name || user.email}</h3>
        <p className="text-sm text-gray-500">{user.email}</p>
        <div className="mt-2 flex justify-between items-center">
          <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{user.role}</span>
          <span className="text-sm text-gray-500">
            Joined {new Date(user.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};
