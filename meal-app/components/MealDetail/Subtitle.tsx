import React, { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Subtitle = ({ children }: { children: ReactNode }) => {
  return (
    <View style={styles.subTitleContainer}>
      <Text style={styles.subTitle}>{children}:</Text>
    </View>
  );
};

export default Subtitle;

const styles = StyleSheet.create({
  subTitle: {
    color: '#e2b497',
    fontSize: 18,
    fontWeight: 'bold',

    textAlign: 'center',
  },
  subTitleContainer: {
    borderBottomColor: '#e2b497',
    borderBottomWidth: 2,
    marginVertical: 4,
    marginHorizontal: 12,
    padding: 6,
  },
});
