import { MealItem as Meal } from '@/types';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MealDetail from './MealDetail';

type MealItemProps = {
  data: Meal;
};

const MealItem: React.FC<MealItemProps> = ({ data }) => {
  const router = useRouter();

  const handleMealPressed = () => {
    router.push({
      pathname: '/meals/[mealId]',
      params: { mealId: data.id },
    });
  };

  return (
    <View style={styles.screen}>
      <Pressable
        style={({ pressed }) => [
          styles.container,
          pressed ? styles.btnPressed : null,
        ]}
        onPress={handleMealPressed}
      >
        <View>
          <Image source={{ uri: data.imageUrl }} style={styles.image} />
          <Text style={styles.title}>{data.title}</Text>
        </View>
        <MealDetail data={data} />
      </Pressable>
    </View>
  );
};

export default MealItem;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  container: {
    width: 300,
    height: 300,
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    shadowOpacity: 0.3,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 8,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 8,
  },

  btnPressed: {
    opacity: 0.7,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 8,
    gap: 8,
  },
});
