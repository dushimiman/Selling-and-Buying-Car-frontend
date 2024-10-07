import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

const CarDetailsScreen = ({ route }) => {
  const { car } = route.params; // Get car details from navigation

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Display Car Image */}
      <Image source={{ uri: car.carImages[0] }} style={styles.image} />

      {/* Car Information */}
      <Text style={styles.title}>Car Details</Text>
      <Text style={styles.detail}>Brand: {car.carBrand}</Text>
      <Text style={styles.detail}>Body Type: {car.bodyType}</Text>
      <Text style={styles.detail}>Year: {car.regYear}</Text>
      <Text style={styles.detail}>Registration Number: {car.regNumber}</Text>
      <Text style={styles.detail}>Kilometres Driven: {car.kilometreDriven}</Text>
      <Text style={styles.detail}>Fuel Type: {car.fuelType}</Text>
      <Text style={styles.detail}>Transmission: {car.transmission}</Text>
      <Text style={styles.detail}>Condition: {car.carCondition}</Text>

      {/* Personal Information */}
      <Text style={styles.title}>Seller Information</Text>
      <Text style={styles.detail}>Full Name: {car.fullName}</Text>
      <Text style={styles.detail}>Address: {car.address}</Text>
      <Text style={styles.detail}>Mobile: {car.mobileNumber}</Text>
      <Text style={styles.detail}>Email: {car.email}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default CarDetailsScreen;
