import React from 'react';
import { Review } from '../../models';

interface ReviewListProps {
  reviews: Review[];
  loading: boolean;
  error?: string;
}

export const ReviewList: React.FC<ReviewListProps> = ({ 
  reviews, 
  loading, 
  error 
}) => {
  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.length;
  };
  
  const renderStars = (rating: number) => {
    return (
      <div className="flex text-yellow-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star}>
            {star <= rating ? '★' : '☆'}
          </span>
        ))}
      </div>
    );
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-24">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-4">
        Error loading reviews: {error}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500">No reviews yet.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center">
        <div className="mr-2">
          {renderStars(getAverageRating())}
        </div>
        <span className="font-medium">{getAverageRating().toFixed(1)}</span>
        <span className="text-gray-500 ml-2">({reviews.length} reviews)</span>
      </div>
      
      <div className="space-y-4">
        {reviews.map(review => (
          <div key={review.id} className="border-b pb-4">
            <div className="flex justify-between">
              <div className="flex items-center">
                {renderStars(review.rating)}
                <span className="ml-2 font-medium">
                  {review.user?.name || 'Anonymous'}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
            
            {review.comment && (
              <p className="mt-2 text-gray-700">{review.comment}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
