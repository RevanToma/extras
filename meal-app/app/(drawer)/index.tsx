import CategoryGridTile from '@/components/CategoryGridTile';
import Category from '@/models/category';
import { CATEGORIES } from '@/types';
import { useRouter } from 'expo-router';
import { FlatList } from 'react-native-gesture-handler';

const CategoriesScreen = () => {
  const router = useRouter();

  const renderCatagoryItem = ({ item }: { item: Category }) => {
    const pressHandler = () => {
      router.push({
        pathname: '/categories/[categoryId]',
        params: { categoryId: item.id },
      });
    };
    return (
      <CategoryGridTile
        title={item.title}
        color={item.color}
        onPress={pressHandler}
      />
    );
  };
  return (
    <FlatList
      data={CATEGORIES}
      keyExtractor={(item) => item.id}
      renderItem={renderCatagoryItem}
      numColumns={2}
    />
  );
};

export default CategoriesScreen;
