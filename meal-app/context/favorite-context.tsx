import { ReactNode, createContext, useState } from 'react';

type FavContextType = {
  ids: string[];
  addFav: (id: string) => void;
  removeFav: (id: string) => void;
};

export const FavContext = createContext<FavContextType>({
  ids: [],
  addFav: (id) => {},
  removeFav: (id) => {},
});

const FavContextProvider = ({ children }: { children: ReactNode }) => {
  const [favMealId, setFavMealIds] = useState<string[]>([]);

  const addFavHandler = (id: string) => {
    setFavMealIds((currFavMealIds) => {
      return [...currFavMealIds, id];
    });
  };

  const removeFavHandler = (id: string) => {
    setFavMealIds((currFavMealIds) => {
      return currFavMealIds.filter((mealId) => mealId !== id);
    });
  };

  const value = {
    ids: favMealId,
    addFav: addFavHandler,
    removeFav: removeFavHandler,
  };

  return <FavContext.Provider value={value}>{children}</FavContext.Provider>;
};

export default FavContextProvider;
