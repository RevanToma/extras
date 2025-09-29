import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

export const selectFavorites = (state: RootState) => state.favorites.items;

export const selectFavoritesCount = createSelector(
  [selectFavorites],
  (favorites) => favorites.length
);

export const selectIsFavorite = createSelector(
  [selectFavorites, (_, recipeId: number) => recipeId],
  (favorites, recipeId) => favorites.some(favorite => favorite.id === recipeId)
);