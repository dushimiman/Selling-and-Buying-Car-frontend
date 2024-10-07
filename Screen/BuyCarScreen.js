import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import axios from 'axios';

const BuyCarScreen = ({ navigation }) => {
  const [cars, setCars] = useState([]);
  const [isNew, setIsNew] = useState(true);
  const username = "User";
  const location = "Location";

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://192.168.1.72:5000/api/cars');
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, []);

  const filteredCars = cars.filter(car => (isNew ? car.carCondition === 'New' : car.carCondition === 'Used'));

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image source={require('../assets/profile.png')} style={styles.profileImage} />
            <View style={styles.headerText}>
              <Text style={styles.username}>Hello {username}</Text>
              <Text style={styles.location}>{location}</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Image source={require('../assets/download.png')} style={styles.notificationIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.tabSection}>
          <TouchableOpacity 
            style={isNew ? styles.activeTab : styles.inactiveTab}
            onPress={() => setIsNew(true)}
          >
            <Text style={isNew ? styles.tabTextActive : styles.tabTextInactive}>New cars</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={!isNew ? styles.activeTab : styles.inactiveTab}
            onPress={() => setIsNew(false)}
          >
            <Text style={!isNew ? styles.tabTextActive : styles.tabTextInactive}>Used cars</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchSection}>
          <Text style={styles.title}>FIND THE RIGHT CAR</Text>
          <TextInput style={styles.searchInput} placeholder="Search car, model, etc." />
        </View>

        <View style={styles.filters}>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Select brand</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Select body type</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Select budget</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Select fuel type</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.findButton}>
          <Text style={styles.findButtonText}>Find new car</Text>
        </TouchableOpacity>

        {/* Cars List in Two Columns */}
        <View style={styles.cardContainer}>
          {filteredCars.map((car, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.card}
              onPress={() => navigation.navigate('CarDetails', { car })} 
            >
              <Image source={{ uri: car.carImages[0] }} style={styles.image} />
              <Text style={styles.carBrand}>{car.carBrand}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  headerText: {
    marginLeft: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 14,
    color: '#777',
  },
  notificationIcon: {
    width: 30,
    height: 30,
  },
  tabSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'blue',
  },
  tabTextActive: {
    fontWeight: 'bold',
    color: 'blue',
  },
  inactiveTab: {},
  tabTextInactive: {
    color: '#aaa',
  },
  searchSection: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  filterButton: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
  filterText: {
    color: '#333',
  },
  findButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  findButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%', // Adjust width for two cards
    marginBottom: 20,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 120, 
    marginBottom: 10,
    borderRadius: 10,
  },
  carBrand: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BuyCarScreen;
