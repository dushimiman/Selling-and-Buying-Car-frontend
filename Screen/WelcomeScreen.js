import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';

const slides = [
  {
    id: 1,
    image: require('../assets/home.png'),
    title: 'Welcome to AutoTrade',
    subtitle: 'Discover a seamless experience in buying, selling, and renting cars all in one place.'
  },
  {
    id: 2,
    image: require('../assets/home.png'),
    title: 'Buy Your Dream Car',
    subtitle: 'Find the perfect vehicle for you from a wide range of cars.'
  },
  {
    id: 3,
    image: require('../assets/home.png'),
    title: 'Sell your Car',
    subtitle: 'Find the perfect vehicle for you from a wide range of cars.'
  },
  {
    id: 4,
    image: require('../assets/home.png'),
    title: 'Rent a Car for Adventures',
    subtitle: 'Rent cars easily and enjoy your journey wherever you go.'
  }
];

const WelcomeScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const slideInterval = useRef(null);

  // Automatically slide every 3 seconds
  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide(); // Cleanup when component unmounts
  }, []);

  const startAutoSlide = () => {
    slideInterval.current = setInterval(() => {
      setCurrentIndex(prevIndex => {
        let nextIndex = prevIndex + 1;
        if (nextIndex >= slides.length) nextIndex = 0;
        flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
        return nextIndex;
      });
    }, 3000); // Change slide every 3 seconds
  };

  const stopAutoSlide = () => {
    clearInterval(slideInterval.current);
  };

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.carsImage} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={event => {
          const newIndex = Math.floor(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
          setCurrentIndex(newIndex);
        }}
      />
      <View style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index ? styles.activeDot : styles.inactiveDot
            ]}
          />
        ))}
      </View>
      <TouchableOpacity 
  style={styles.nextButton} 
  onPress={() => navigation.navigate('RegisterUser')}
>
  <Text style={styles.buttonText}>Next</Text>
</TouchableOpacity>
      <TouchableOpacity 
        onPress={() => navigation.navigate('SomeOtherScreen')}
      >
        <Text style={styles.skipText}>Skip</Text>
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
  carsImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00796B',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#004D40',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#00796B',
  },
  inactiveDot: {
    backgroundColor: '#B2DFDB',
  },
  nextButton: {
    backgroundColor: '#00796B',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  skipText: {
    color: '#00796B',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  slide: {
    width: 300, // Adjust the width for your slide container
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WelcomeScreen;
