import { memo } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  readonly?: boolean;
}

export const StarRating = memo(function StarRating({ 
  rating, 
  onRatingChange, 
  readonly = false 
}: StarRatingProps) {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`star ${star <= rating ? 'active' : ''}`}
          onClick={() => !readonly && onRatingChange(star)}
          disabled={readonly}
        >
          <Star size={24} fill={star <= rating ? 'currentColor' : 'none'} />
        </button>
      ))}
    </div>
  );
});