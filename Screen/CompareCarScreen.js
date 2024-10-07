import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const CompareCarScreen = () => {
  const carsToCompare = [
    { id: '1', name: 'Car A', price: '$20,000', features: 'Feature 1, Feature 2' },
    { id: '2', name: 'Car B', price: '$22,000', features: 'Feature 1, Feature 3' },
    // Add more cars to compare
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Compare Cars</Text>

      <FlatList
        data={carsToCompare}
        renderItem={({ item }) => (
          <View style={styles.carItem}>
            <Text style={styles.carName}>{item.name}</Text>
            <Text>Price: {item.price}</Text>
            <Text>Features: {item.features}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5F5F5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  carItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  carName: { fontSize: 18, fontWeight: 'bold' },
});

export default CompareCarScreen;
