import MealsList from '@/components/MealsList';
import { CATEGORIES, MEALS } from '@/data';
import { hexToRgba } from '@/utils';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';

const MealsOverviewScreen = () => {
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();
  const navigation = useNavigation();

  const catId = Array.isArray(categoryId) ? categoryId[0] : categoryId;

  const displayedMeals = MEALS.filter((meal) =>
    meal.categoryIds.includes(catId)
  );

  const category = CATEGORIES.find((cat) => cat.id === catId);

  useLayoutEffect(() => {
    if (category) {
      const rgbaColor = hexToRgba(category.color, 0.9);

      navigation.setOptions({
        title: category.title,
        headerStyle: { backgroundColor: rgbaColor },
      });
    }
  }, [catId, navigation]);

  return (
    <MealsList displayedMeals={displayedMeals} bgColor={category?.color} />
  );
};

export default MealsOverviewScreen;
