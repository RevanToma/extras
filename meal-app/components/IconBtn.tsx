import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

type IconBtnProps = {
  onPress: () => void;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
};

const IconBtn: React.FC<IconBtnProps> = ({ onPress, icon, color }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <Ionicons name={icon} color={color} size={25} />
    </Pressable>
  );
};

export default IconBtn;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
});
