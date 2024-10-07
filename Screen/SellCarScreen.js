import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // For dropdowns
import * as ImagePicker from 'expo-image-picker'; // For image uploads
import * as FileSystem from 'expo-file-system'; // To convert image to Base64
import axios from 'axios'; // For HTTP requests

const SellCarScreen = () => {
  const [step, setStep] = useState(1);
  const [carBrand, setCarBrand] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [regYear, setRegYear] = useState('');
  const [regNumber, setRegNumber] = useState('');
  const [kilometreDriven, setKilometreDriven] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [transmission, setTransmission] = useState('');
  const [carCondition, setCarCondition] = useState('');
  const [carImages, setCarImages] = useState([]); // Store Base64 encoded images
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');

  // For handling image uploads
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true, // Allow multiple image selection
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri; // Get the URI of the first selected image

      // Convert image to Base64
      const base64Image = await FileSystem.readAsStringAsync(imageUri, { encoding: 'base64' });
      setCarImages([...carImages, `data:image/jpeg;base64,${base64Image}`]); // Add the Base64 string
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    const carData = {
      carBrand,
      bodyType,
      regYear,
      regNumber,
      kilometreDriven,
      fuelType,
      transmission,
      carCondition,
      carImages, // Base64 encoded images
      fullName,
      address,
      mobileNumber,
      email,
    };

    try {
      const res = await axios.post('http://192.168.1.72:5000/api/cars', carData);
      console.log('Car data submitted:', res.data);
      alert('Your car has been submitted successfully!');
    } catch (error) {
      console.error('Error submitting car:', error);
      alert('Error submitting your car. Please try again.');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.formSection}>
            <Text style={styles.title}>Part 1: Car Details</Text>
            {/* Pickers and TextInput for car details */}
            <Picker selectedValue={carBrand} style={styles.input} onValueChange={(itemValue) => setCarBrand(itemValue)}>
              <Picker.Item label="Select Car Brand" value="" />
              <Picker.Item label="Toyota" value="Toyota" />
              <Picker.Item label="Honda" value="Honda" />
              <Picker.Item label="Ford" value="Ford" />
              <Picker.Item label="BMW" value="BMW" />
            </Picker>
            <Picker
              selectedValue={bodyType}
              style={styles.input}
              onValueChange={(itemValue) => setBodyType(itemValue)}
            >
              <Picker.Item label="Select Body Type" value="" />
              <Picker.Item label="Sedan" value="Sedan" />
              <Picker.Item label="SUV" value="SUV" />
              <Picker.Item label="Hatchback" value="Hatchback" />
              <Picker.Item label="Truck" value="Truck" />
            </Picker>
            <Picker
              selectedValue={carCondition}
              style={styles.input}
              onValueChange={(itemValue) => setCarCondition(itemValue)}
            >
              <Picker.Item label="Select Condition" value="" />
              <Picker.Item label="New" value="New" />
              <Picker.Item label="Used" value="Used" />
            </Picker>
            <TextInput style={styles.input} placeholder="Registration Year" value={regYear} onChangeText={setRegYear} keyboardType="numeric" />
            <TextInput
              style={styles.input}
              placeholder="Kilometres Driven"
              value={kilometreDriven}
              onChangeText={setKilometreDriven}
              keyboardType="numeric"
            />
             <Picker
              selectedValue={fuelType}
              style={styles.input}
              onValueChange={(itemValue) => setFuelType(itemValue)}
            >
              <Picker.Item label="Select Fuel Type" value="" />
              <Picker.Item label="Petrol" value="Petrol" />
              <Picker.Item label="Diesel" value="Diesel" />
              <Picker.Item label="Electric" value="Electric" />
            </Picker>
            <Picker
              selectedValue={transmission}
              style={styles.input}
              onValueChange={(itemValue) => setTransmission(itemValue)}
            >
              <Picker.Item label="Select Transmission" value="" />
              <Picker.Item label="Manual" value="Manual" />
              <Picker.Item label="Automatic" value="Automatic" />
            </Picker>
            <TouchableOpacity style={styles.button} onPress={() => setStep(2)}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        );
      case 2:
        return (
          <View style={styles.formSection}>
            <Text style={styles.title}>Part 2: Car Look & Upload Images</Text>
            <Button title="Upload Car Images" onPress={pickImage} />
            <View style={styles.imageContainer}>
              {carImages.map((imageUri, index) => (
                <Image key={index} source={{ uri: imageUri }} style={styles.image} />
              ))}
            </View>
            <TouchableOpacity style={styles.button} onPress={() => setStep(3)}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        );
      case 3:
        return (
          <View style={styles.formSection}>
            <Text style={styles.title}>Your Information</Text>
            <TextInput style={styles.input} placeholder="Full Name" value={fullName} onChangeText={setFullName} />
            <TextInput style={styles.input} placeholder="Your Address" value={address} onChangeText={setAddress} />
            <TextInput style={styles.input} placeholder="Mobile Number" value={mobileNumber} onChangeText={setMobileNumber} keyboardType="phone-pad" />
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }} style={styles.container}>
        {renderStep()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5F5F5' },
  formSection: { marginVertical: 20 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  input: { borderColor: '#ccc', borderWidth: 1, borderRadius: 10, paddingHorizontal: 15, marginBottom: 15, height: 40 },
  button: { backgroundColor: '#00796B', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  imageContainer: { flexDirection: 'row', marginVertical: 10 },
  image: { width: 80, height: 80, marginRight: 10, borderRadius: 10 },
});

export default SellCarScreen;
