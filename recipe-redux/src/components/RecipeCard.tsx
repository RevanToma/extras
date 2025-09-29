import { Heart, Clock, Users, ChefHat } from 'lucide-react';
import type { Recipe } from '../types/recipe';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  addFavorite,
  removeFavorite,
} from '../features/favorites/favoritesSlice';
import { selectIsFavorite } from '../features/favorites/selectors';
import { FC } from 'react';

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard: FC<RecipeCardProps> = ({ recipe }) => {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector((state) =>
    selectIsFavorite(state, recipe.id)
  );

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(recipe.id));
    } else {
      dispatch(
        addFavorite({
          id: recipe.id,
          name: recipe.name,
          image: recipe.image,
          cuisine: recipe.cuisine,
          difficulty: recipe.difficulty,
        })
      );
    }
  };

  return (
    <div className='bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300'>
      <div className='relative'>
        <img
          src={recipe.image}
          alt={recipe.name}
          className='w-full h-48 object-cover'
        />
        <button
          onClick={handleToggleFavorite}
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
            isFavorite
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
          }`}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className='p-4'>
        <h3 className='font-bold text-lg text-gray-900 mb-2 line-clamp-2'>
          {recipe.name}
        </h3>

        <div className='flex items-center gap-4 text-sm text-gray-600 mb-3'>
          <div className='flex items-center gap-1'>
            <ChefHat className='w-4 h-4' />
            <span>{recipe.cuisine}</span>
          </div>
          <div className='flex items-center gap-1'>
            <Clock className='w-4 h-4' />
            <span>{recipe.prepTimeMinutes + recipe.cookTimeMinutes} min</span>
          </div>
          <div className='flex items-center gap-1'>
            <Users className='w-4 h-4' />
            <span>{recipe.servings}</span>
          </div>
        </div>

        <div className='flex items-center justify-between'>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              recipe.difficulty === 'Easy'
                ? 'bg-green-100 text-green-800'
                : recipe.difficulty === 'Medium'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {recipe.difficulty}
          </span>
          <div className='text-sm text-gray-500'>
            {recipe.caloriesPerServing} cal
          </div>
        </div>

        <div className='mt-2'>
          <p className='text-xs text-gray-500'>{recipe.mealType.join(', ')}</p>
        </div>
      </div>
    </div>
  );
};
