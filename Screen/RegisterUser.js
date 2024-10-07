import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleRegister = async () => {
    if (username && email && password && role) {
      try {
        // Corrected URL with '//' after 'http:'
        const response = await axios.post('http://192.168.1.72:5000/api/register', {
          username,
          email,
          password,
          role,
        });

        if (response.status === 201) {
          Alert.alert('Success', response.data.message);
          navigation.navigate('LoginScreen'); // Ensure this matches the registered route name
        }
      } catch (error) {
        if (error.response) {
          Alert.alert('Error', error.response.data.message);
        } else {
          Alert.alert('Error', 'An error occurred while registering. Please try again later.');
        }
      }
    } else {
      Alert.alert('Error', 'All fields are required!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
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
      <TextInput
        style={styles.input}
        placeholder="Role (admin or seller)"
        value={role}
        onChangeText={setRole}
      />

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.loginText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#E0F7FA',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00796B',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#00796B',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#ffffff',
  },
  registerButton: {
    backgroundColor: '#00796B',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginText: {
    color: '#00796B',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;
