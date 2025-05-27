import MealsList from '@/components/MealsList';
import { CATEGORIES, MEALS } from '@/data';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';

const MealsOverviewScreen = () => {
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();
  const navigation = useNavigation();

  const catId = Array.isArray(categoryId) ? categoryId[0] : categoryId;

  const displayedMeals = MEALS.filter((meal) =>
    meal.categoryIds.includes(catId)
  );

  useLayoutEffect(() => {
    const category = CATEGORIES.find((cat) => cat.id === catId);
    if (category) {
      navigation.setOptions({ title: category.title });
    }
  }, [catId, navigation]);

  return <MealsList displayedMeals={displayedMeals} />;
};

export default MealsOverviewScreen;
