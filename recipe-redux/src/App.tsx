import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useSearchRecipesQuery } from './features/recipes/recipesApi';
import { useAppSelector, useAppDispatch } from './app/hooks';
import {
  selectFavorites,
  selectFavoritesCount,
} from './features/favorites/selectors';
import { clearFavorites } from './features/favorites/favoritesSlice';
import { SearchSection } from './components/SearchSection';
import { Pagination } from './components/Pagination';
import { Header } from './components/Header';
import { ResultsList } from './components/ResultsList';
import { FavoritesPanel } from './components/FavoritesPanel';

function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get('q') || '',
    showFavorites = searchParams.get('view') === 'favorites',
    activeQuery = searchQuery || '';

  const dispatch = useAppDispatch(),
    favorites = useAppSelector(selectFavorites),
    favoritesCount = useAppSelector(selectFavoritesCount);

  const pageParam = parseInt(searchParams.get('page') || '1', 10),
    page = Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam,
    limit = 20,
    skip = (page - 1) * limit;

  const {
    data: searchResults,
    isLoading,
    isError,
    error,
  } = useSearchRecipesQuery({ q: activeQuery || undefined, limit, skip });

  const setSearchQuery = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value.trim()) {
      newParams.set('q', value);
    } else {
      newParams.delete('q');
    }
    newParams.set('page', '1');
    newParams.delete('view');
    setSearchParams(newParams);
  };

  const handleSearch = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', '1');
    newParams.delete('view');
    setSearchParams(newParams);
  };

  const toggleFavorites = () => {
    const newParams = new URLSearchParams(searchParams);
    if (showFavorites) {
      newParams.delete('view');
    } else {
      newParams.set('view', 'favorites');
    }
    setSearchParams(newParams);
  };

  const handleClearFavorites = () => {
    dispatch(clearFavorites());
  };

  const handlePageChange = (p: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', String(p < 1 ? 1 : p));
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const total = searchResults?.total ?? 0;

  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 to-red-50'>
      <Header
        showFavorites={showFavorites}
        favoritesCount={favoritesCount}
        onToggleFavorites={toggleFavorites}
      />

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {!showFavorites && (
          <SearchSection
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
          />
        )}

        {showFavorites && (
          <FavoritesPanel
            favorites={favorites}
            favoritesCount={favoritesCount}
            onClearFavorites={handleClearFavorites}
            onExplore={() => setSearchParams(new URLSearchParams())}
          />
        )}

        {!showFavorites && (
          <div>
            {isLoading && (
              <div className='text-center py-12'>
                <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
                <p className='text-gray-600'>Söker recept...</p>
              </div>
            )}

            {isError && (
              <div className='text-center py-12'>
                <div className='bg-red-50 border border-red-200 rounded p-6 max-w-md mx-auto'>
                  <h3 className='text-lg font-semibold text-red-900 mb-2'>
                    Ett fel uppstod
                  </h3>
                  <p className='text-red-700'>
                    {error && 'status' in error
                      ? `Fel ${error.status}: Kunde inte hämta recept`
                      : 'Kunde inte ansluta till receptdatabasen'}
                  </p>
                  <button
                    onClick={handleSearch}
                    className='mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors'
                  >
                    Försök igen
                  </button>
                </div>
              </div>
            )}

            {searchResults && !isLoading && (
              <div>
                <div className='flex items-center justify-between mb-6'>
                  <h2 className='text-xl font-semibold text-gray-900'>
                    {searchQuery
                      ? `Sökresultat för "${searchQuery}"`
                      : 'Alla recept'}
                  </h2>
                  <span className='text-gray-600'>
                    {searchResults.total} recept hittades
                  </span>
                </div>

                {searchResults.recipes.length === 0 ? (
                  <div className='text-center py-12'>
                    <Search className='w-16 h-16 text-gray-300 mx-auto mb-4' />
                    <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                      Inga recept hittades
                    </h3>
                    <p className='text-gray-600'>
                      Försök med andra sökord som "chicken", "pasta" eller
                      "dessert"
                    </p>
                  </div>
                ) : (
                  <div>
                    <ResultsList recipes={searchResults.recipes} />

                    <Pagination
                      total={total}
                      limit={limit}
                      page={page}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
