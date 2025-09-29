import { ChefHat, Heart } from 'lucide-react';
import { FC } from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  showFavorites: boolean;
  favoritesCount: number;
  onToggleFavorites: () => void;
}

export const Header: FC<HeaderProps> = ({
  showFavorites,
  favoritesCount,
  onToggleFavorites,
}) => {
  return (
    <header className='bg-white shadow-sm border-b'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
        <div className='flex items-center justify-between'>
          <Link to='/' className='flex items-center space-x-3 cursor-pointer'>
            <ChefHat className='w-8 h-8 text-orange-600' />
            <h1 className='text-2xl font-bold text-gray-900'>
              Recipe Explorer
            </h1>
          </Link>

          <div className='flex items-center space-x-4'>
            <button
              onClick={onToggleFavorites}
              className={`flex items-center space-x-2 px-4 py-2 rounded transition-colors ${
                showFavorites
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Heart
                className={`w-5 h-5 ${showFavorites ? 'fill-current' : ''}`}
              />
              <span>Favoriter ({favoritesCount})</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
