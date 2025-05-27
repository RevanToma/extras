import { MealItem as Meal } from '@/types';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import MealItem from './MealItem';

type MealsListProps = {
  displayedMeals: Meal[];
  bgColor?: string;
};

const MealsList: React.FC<MealsListProps> = ({ displayedMeals, bgColor }) => {
  const renderMealItem = ({ item }: { item: Meal }) => {
    return <MealItem data={item} />;
  };

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <FlatList
        data={displayedMeals}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  );
};

export default MealsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
