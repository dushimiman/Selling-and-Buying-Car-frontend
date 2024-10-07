import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BuyCarScreen from './BuyCarScreen'; // Correct import for BuyCarScreen
import SellCarScreen from './SellCarScreen'; // Correct import for SellCarScreen
import CompareCarScreen from './CompareCarScreen'; // Correct import for CompareCarScreen
import ProfileScreen from './ProfileScreen'; // Correct import for ProfileScreen
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const BuyCarNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'BuyCar') {
            iconName = 'car-sport-outline';
          } else if (route.name === 'SellCar') {
            iconName = 'cash-outline';
          } else if (route.name === 'CompareCar') {
            iconName = 'swap-horizontal-outline';
          } else if (route.name === 'Profile') {
            iconName = 'person-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#00796B',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="BuyCar" component={BuyCarScreen} options={{ tabBarLabel: 'Buy Car' }} />
      <Tab.Screen name="SellCar" component={SellCarScreen} options={{ tabBarLabel: 'Sell Car' }} />
      <Tab.Screen name="CompareCar" component={CompareCarScreen} options={{ tabBarLabel: 'Compare Cars' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Profile' }} />
    </Tab.Navigator>
  );
};

export default BuyCarNavigator;
