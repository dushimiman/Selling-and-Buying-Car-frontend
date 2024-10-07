// CarListings.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CarListings = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Car Listings</Text>
      {/* Add your car listings UI here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default CarListings;
