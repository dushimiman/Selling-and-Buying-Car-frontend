import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importing screens
import WelcomeScreen from './Screen/WelcomeScreen';
import RegisterUser from './Screen/RegisterUser';
import LoginScreen from './Screen/LoginScreen';
import BuyCarNavigator from './Screen/BuyCarNavigator'; // Ensure this is set up correctly
import CarListings from './components/CarListings'; 
import RegisterCar from './components/RegisterCar'; 
import CarDetailsScreen from './Screen/CarDetailsScreen';

const Stack = createNativeStackNavigator();

// App component
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="RegisterUser" component={RegisterUser} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="HomeTabs" component={BuyCarNavigator} />
        <Stack.Screen name="CarListings" component={CarListings} />
        <Stack.Screen name="RegisterCar" component={RegisterCar} />
        <Stack.Screen name="CarDetailsScreen" component={CarDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
