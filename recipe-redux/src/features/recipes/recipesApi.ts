import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Recipe, RecipeSearchResponse } from '../../types/recipe';

export const recipesApi = createApi({
  reducerPath: 'recipesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com',
  }),
  endpoints: (builder) => ({
    searchRecipes: builder.query<
      RecipeSearchResponse,
      { q?: string; limit?: number; skip?: number }
    >({
      query: ({ q, limit = 20, skip = 0 }) => {
        if (q && q.trim().length > 0) {
          return `/recipes/search?q=${encodeURIComponent(
            q
          )}&limit=${limit}&skip=${skip}`;
        }
        return `/recipes?limit=${limit}&skip=${skip}`;
      },
    }),
    getRecipeById: builder.query<Recipe, number>({
      query: (id) => `/recipes/${id}`,
    }),
  }),
});

export const { useSearchRecipesQuery, useGetRecipeByIdQuery } = recipesApi;
