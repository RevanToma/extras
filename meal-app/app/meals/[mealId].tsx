import IconBtn from '@/components/IconBtn';
import MealDetail from '@/components/MealDetail';
import List from '@/components/MealDetail/List';
import Subtitle from '@/components/MealDetail/Subtitle';
import { FavContext } from '@/context/favorite-context';
import { MEALS } from '@/data';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useCallback, useContext, useLayoutEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function MealDetailsScreen() {
  const { mealId } = useLocalSearchParams<{ mealId: string }>();
  const navigation = useNavigation();

  const meal = MEALS.find((m) => m.id === mealId);

  const { ids, removeFav, addFav } = useContext(FavContext);
  const mealIsFav = ids.includes(mealId ?? '');

  const changeFavHandler = useCallback(() => {
    if (!mealId) return;
    if (mealIsFav) {
      removeFav(mealId);
    } else {
      addFav(mealId);
    }
  }, [mealId, mealIsFav, ids, addFav, removeFav]);

  useLayoutEffect(() => {
    if (!meal) return;

    navigation.setOptions({
      title: meal.title,
      headerRight: () => (
        <IconBtn
          onPress={changeFavHandler}
          icon={mealIsFav ? 'star' : 'star-outline'}
          color='white'
        />
      ),
    });
  }, [navigation, changeFavHandler, meal, mealIsFav]);

  if (!meal) {
    return (
      <View style={styles.centered}>
        <Text>Meal not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.root}>
      <View style={styles.screen}>
        <Image source={{ uri: meal.imageUrl }} style={styles.image} />
        <Text style={styles.title}>{meal.title}</Text>
        <MealDetail data={meal} textStyle={styles.detailText} />
        <View style={styles.listContainer}>
          <Subtitle>Ingredients:</Subtitle>
          <List data={meal.ingredients} />
          <Subtitle>Steps</Subtitle>
          <List data={meal.steps} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    marginBottom: 32,
  },
  screen: {
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 350,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    margin: 8,
    color: 'white',
  },
  detailText: {
    color: 'white',
  },
  listContainer: {
    width: '80%',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
