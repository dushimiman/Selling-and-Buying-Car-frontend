import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (email && password) {
        try {
            const response = await axios.post('http://192.168.1.72:5000/api/login', {
                email,
                password,
            });

            if (response.status === 200) {
                Alert.alert('Success', response.data.message);
                // Store the token securely for future requests
                const token = response.data.token;

                // Navigate to the BuyCarNavigator after successful login
                navigation.navigate('HomeTabs'); // This matches the name in App.js
            }
        } catch (error) {
            if (error.response) {
                Alert.alert('Error', error.response.data.message);
            } else {
                Alert.alert('Error', 'An error occurred. Please try again.');
            }
        }
    } else {
        Alert.alert('Error', 'All fields are required!');
    }
};
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
        <Text style={styles.registerText}>Don't have an account? Register</Text>
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
  loginButton: {
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
  registerText: {
    color: '#00796B',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
