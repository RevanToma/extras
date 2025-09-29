import { X, ChefHat } from 'lucide-react';
import type { Favorite } from '../types/recipe';
import { useAppDispatch } from '../app/hooks';
import { removeFavorite } from '../features/favorites/favoritesSlice';
import { FC } from 'react';

interface FavoriteCardProps {
  favorite: Favorite;
}

export const FavoriteCard: FC<FavoriteCardProps> = ({ favorite }) => {
  const dispatch = useAppDispatch();

  const handleRemove = () => {
    dispatch(removeFavorite(favorite.id));
  };

  return (
    <div className='bg-white rounded shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200'>
      <div className='relative'>
        <img
          src={favorite.image}
          alt={favorite.name}
          className='w-full h-32 object-cover'
        />
        <button
          onClick={handleRemove}
          className='absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors'
        >
          <X className='w-4 h-4' />
        </button>
      </div>

      <div className='p-3'>
        <h4 className='font-semibold text-sm text-gray-900 mb-1 line-clamp-2'>
          {favorite.name}
        </h4>
        <div className='flex items-center gap-1 text-xs text-gray-600'>
          <ChefHat className='w-3 h-3' />
          <span>{favorite.cuisine}</span>
          <span className='ml-2 px-2 py-0.5 bg-gray-100 rounded text-xs'>
            {favorite.difficulty}
          </span>
        </div>
      </div>
    </div>
  );
};
