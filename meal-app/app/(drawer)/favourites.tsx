import MealsList from '@/components/MealsList';
import { FavContext } from '@/context/favorite-context';
import { MEALS } from '@/data';
import React, { useContext } from 'react';

import { StyleSheet, Text, View } from 'react-native';

const FavListScreen = () => {
  const favMealsCtx = useContext(FavContext);

  const favMeals = MEALS.filter((meal) => favMealsCtx.ids.includes(meal.id));

  if (favMeals.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          No favorite meals found. Start adding some!
        </Text>
      </View>
    );
  }

  return <MealsList displayedMeals={favMeals} />;
};

export default FavListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
