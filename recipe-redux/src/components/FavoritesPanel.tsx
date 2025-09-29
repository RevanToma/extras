import { Heart, Trash2, Search } from 'lucide-react';
import type { Favorite } from '../types/recipe';
import { FavoriteCard } from './FavoriteCard';
import { FC } from 'react';

interface FavoritesPanelProps {
  favorites: Favorite[];
  favoritesCount: number;
  onClearFavorites: () => void;
  onExplore: () => void;
}

export const FavoritesPanel: FC<FavoritesPanelProps> = ({
  favorites,
  favoritesCount,
  onClearFavorites,
  onExplore,
}) => {
  return (
    <div>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h2 className='text-2xl font-bold text-gray-900'>Mina Favoriter</h2>
          <p className='text-gray-600'>{favoritesCount} sparade recept</p>
        </div>

        {favoritesCount > 0 && (
          <button
            onClick={onClearFavorites}
            className='flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors'
          >
            <Trash2 className='w-4 h-4' />
            <span>Rensa alla</span>
          </button>
        )}
      </div>

      {favoritesCount === 0 ? (
        <div className='text-center py-12'>
          <Heart className='w-16 h-16 text-gray-300 mx-auto mb-4' />
          <h3 className='text-xl font-semibold text-gray-900 mb-2'>
            Inga favoriter än
          </h3>
          <p className='text-gray-600 mb-6'>
            Börja söka efter recept och lägg till dina favoriter
          </p>
          <button
            onClick={onExplore}
            className='inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors'
          >
            <Search className='w-5 h-5' />
            <span>Utforska recept</span>
          </button>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {favorites.map((f) => (
            <FavoriteCard key={f.id} favorite={f} />
          ))}
        </div>
      )}
    </div>
  );
};
