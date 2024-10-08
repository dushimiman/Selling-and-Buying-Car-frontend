import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './Screen/WelcomeScreen';
import RegisterUser from './Screen/RegisterUser';
import LoginScreen from './Screen/LoginScreen';
import BuyCarNavigator from './Screen/BuyCarNavigator'; 
import CarListings from './components/CarListings'; 
import RegisterCar from './components/RegisterCar'; 
import CarDetails from './Screen/CarDetailsScreen';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const Stack = createNativeStackNavigator();

const App = () => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const retrieveUserRole = async () => {
      try {
        const role = await AsyncStorage.getItem('userRole'); 
        if (role) {
          setUserRole(role);
        }
      } catch (error) {
        console.error('Failed to retrieve user role:', error);
      }
    };

    retrieveUserRole();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="RegisterUser" component={RegisterUser} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="HomeTabs">
          {() => <BuyCarNavigator userRole={userRole} />} 
        </Stack.Screen>
        <Stack.Screen name="CarListings" component={CarListings} />
        <Stack.Screen name="RegisterCar" component={RegisterCar} />
        <Stack.Screen name="CarDetails" component={CarDetails} options={{ title: 'Car Details' }} />
      </Stack.Navigator>

      <Toast />
    </NavigationContainer>
  );
};

export default App;
