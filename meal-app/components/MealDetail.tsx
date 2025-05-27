import { MealItem as Meal } from '@/types';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

type MealDetailProps = {
  data: Meal;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

const MealDetail: React.FC<MealDetailProps> = ({ data, style, textStyle }) => {
  return (
    <View style={[styles.details, style]}>
      <Text style={textStyle}>{data.duration}M</Text>
      <Text style={textStyle}>{data.complexity.toUpperCase()}</Text>
      <Text style={textStyle}>{data.affordability.toUpperCase()}</Text>
    </View>
  );
};

export default MealDetail;

const styles = StyleSheet.create({
  details: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 8,
    gap: 8,
  },
});
