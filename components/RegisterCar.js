// RegisterUser.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const RegisterUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('Seller'); // Default to Seller

  const handleRegister = () => {
    // Handle registration logic here (e.g., API call)
    console.log({ name, email, password, userType });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register User</Text>

      <View style={styles.userTypeContainer}>
        <TouchableOpacity 
          style={[styles.userTypeButton, userType === 'Admin' && styles.selectedUserType]} 
          onPress={() => setUserType('Admin')}
        >
          <Text style={styles.userTypeText}>Admin</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.userTypeButton, userType === 'Seller' && styles.selectedUserType]} 
          onPress={() => setUserType('Seller')}
        >
          <Text style={styles.userTypeText}>Seller</Text>
        </TouchableOpacity>
      </View>

      <TextInput 
        style={styles.input} 
        placeholder="Name" 
        value={name}
        onChangeText={setName}
      />
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#E0F7FA',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userTypeContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  userTypeButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#00796B',
    borderRadius: 5,
    marginHorizontal: 10,
  },
  userTypeText: {
    fontSize: 16,
  },
  selectedUserType: {
    backgroundColor: '#00796B',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#00796B',
    borderRadius: 5,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#00796B',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default RegisterUser;
