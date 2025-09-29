import { RecipeCard } from './RecipeCard';
import type { Recipe } from '../types/recipe';
import { FC } from 'react';

interface ResultsListProps {
  recipes: Recipe[];
}

export const ResultsList: FC<ResultsListProps> = ({ recipes }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
      {recipes.map((r) => (
        <RecipeCard key={r.id} recipe={r} />
      ))}
    </div>
  );
};
