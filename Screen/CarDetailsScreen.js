import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import Toast from 'react-native-toast-message';
import axios from 'axios'; // Import axios

const CarDetails = ({ route }) => {
  const { car } = route.params;

  const handleBuyCar = async () => {
    try {
      await sendEmailToOwner(car);

      Toast.show({
        type: 'success',
        text1: 'Thank you for choosing this car!',
        text2: 'In a few minutes, we will contact you.',
      });

    } catch (error) {
      console.error('Failed to send email:', error);
      Alert.alert('Error', 'Failed to send request. Please try again later.');
    }
  };

  const sendEmailToOwner = async (car) => {
    try {
      const response = await axios.post('http://192.168.1.72:5000/api/sendEmail', {
        carBrand: car.carBrand,
        bodyType: car.bodyType,
        ownerEmail: car.email,
      });
      console.log('API Response:', response.data.message);
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Display car image */}
      <Image source={{ uri: car.carImages[0] }} style={styles.carImage} />

      <View style={styles.detailsSection}>
        {/* Car name (Brand + Model) */}
        <Text style={styles.carName}>{car.carBrand} {car.carModel}</Text>

        {/* Car price */}
        <Text style={styles.price}>${car.price}</Text>

        {/* Placeholder for reviews */}
        <Text style={styles.reviews}>⭐ 124 reviews</Text>

        {/* Car details */}
        <View style={styles.carDetails}>
          <View style={styles.detailsRow}>
            <Text style={styles.detailLabel}>Brand</Text>
            <Text style={styles.detailValue}>{car.carBrand}</Text>
          </View>

          <View style={styles.detailsRow}>
            <Text style={styles.detailLabel}>Body Type</Text>
            <Text style={styles.detailValue}>{car.bodyType}</Text>
          </View>

          <View style={styles.detailsRow}>
            <Text style={styles.detailLabel}>Registration Year</Text>
            <Text style={styles.detailValue}>{car.regYear}</Text>
          </View>

          <View style={styles.detailsRow}>
            <Text style={styles.detailLabel}>Registration Number</Text>
            <Text style={styles.detailValue}>{car.regNumber}</Text>
          </View>

          <View style={styles.detailsRow}>
            <Text style={styles.detailLabel}>Kilometres Driven</Text>
            <Text style={styles.detailValue}>{car.kilometreDriven} km</Text>
          </View>

          <View style={styles.detailsRow}>
            <Text style={styles.detailLabel}>Fuel Type</Text>
            <Text style={styles.detailValue}>{car.fuelType}</Text>
          </View>

          <View style={styles.detailsRow}>
            <Text style={styles.detailLabel}>Transmission</Text>
            <Text style={styles.detailValue}>{car.transmission}</Text>
          </View>

          <View style={styles.detailsRow}>
            <Text style={styles.detailLabel}>Condition</Text>
            <Text style={styles.detailValue}>{car.carCondition}</Text>
          </View>
        </View>

        {/* Description Section */}
        <View style={styles.descriptionSection}>
          <Text style={styles.descriptionLabel}>Description</Text>
          <Text style={styles.description}>{car.description}</Text>
        </View>

        {/* Contact information */}
        <View style={styles.contactSection}>
          <Text style={styles.contactLabel}>Owner's Information</Text>
          <View style={styles.detailsRow}>
            <Text style={styles.detailLabel}>Full Name</Text>
            <Text style={styles.detailValue}>{car.fullName}</Text>
          </View>

          <View style={styles.detailsRow}>
            <Text style={styles.detailLabel}>Address</Text>
            <Text style={styles.detailValue}>{car.address}</Text>
          </View>

          <View style={styles.detailsRow}>
            <Text style={styles.detailLabel}>Mobile Number</Text>
            <Text style={styles.detailValue}>{car.mobileNumber}</Text>
          </View>

          <View style={styles.detailsRow}>
            <Text style={styles.detailLabel}>Email</Text>
            <Text style={styles.detailValue}>{car.email}</Text>
          </View>
        </View>

        {/* Buy Car button */}
        <TouchableOpacity style={styles.inquiryButton} onPress={handleBuyCar}>
          <Text style={styles.inquiryButtonText}>Buy Car</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  carImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  detailsSection: {
    flex: 1,
  },
  carName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 20,
    color: 'green',
    marginVertical: 5,
  },
  reviews: {
    fontSize: 16,
    color: '#888',
  },
  carDetails: {
    marginTop: 20,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    fontWeight: 'bold',
    color: '#444',
  },
  detailValue: {
    color: '#555',
  },
  descriptionSection: {
    marginTop: 20,
  },
  descriptionLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  description: {
    color: '#666',
  },
  contactSection: {
    marginTop: 20,
  },
  contactLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  inquiryButton: {
    marginTop: 30,
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  inquiryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CarDetails;
