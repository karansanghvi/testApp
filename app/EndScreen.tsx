import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, Alert } from 'react-native';
import HamburgerIcon from '../components/HamburgerIcon';
import { useNavigation, useRoute } from '@react-navigation/native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebaseConfig'; // Adjust the import path if necessary

export default function EndScreen() {
  const [image, setImage] = useState(null);
  const [gender, setGender] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const { userId } = route.params || {};

  useEffect(() => {
    if (userId) {
      loadUserData(userId);
    } else {
      console.error('No userId provided');
      // Handle the case where userId is undefined, such as showing an error message or navigating back
      Alert.alert('Error', 'No user ID provided. Please navigate back and try again.');
    }
  }, [userId]);

  const loadUserData = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setGender(userData.gender);
        setAgeGroup(userData.ageGroup);
        setImage(userData.profileImage);
      } else {
        console.error('User document not found');
        Alert.alert('Error', 'User document not found.');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      Alert.alert('Error', 'Failed to fetch user data. Please try again.');
    }
  };

  const handleMenuPress = () => {
    console.log('Menu pressed');
    // Add menu press handling logic here
  };

  return (
    <View style={styles.container}>
      <View style={styles.burgerContainer}>
        <HamburgerIcon onPress={handleMenuPress} />
      </View>
      <Text style={styles.mainText}>VIRTUAL TRY - ON</Text>
      <View style={[styles.imageContainer, image ? styles.imageContainerWithImage : null]}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text style={styles.addImageText}>No photo added</Text>
        )}
      </View>
      <Text style={styles.descriptionText}>Throw in a full-length snap to show off your entire fabulous self!</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsText}>Gender: {gender}</Text>
        <Text style={styles.detailsText}>Age Group: {ageGroup}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 16,
  },
  burgerContainer: {
    marginTop: 40,
    alignItems: 'flex-end',
  },
  mainText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 20,
    fontWeight: 'bold',
  },
  imageContainer: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#3a3aad',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  imageContainerWithImage: {
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  addImageText: {
    color: 'white',
    backgroundColor: 'rgba(211, 211, 211, 0.2)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  descriptionText: {
    color: 'grey',
    textAlign: 'center',
    fontSize: 15,
    marginTop: 20,
  },
  detailsContainer: {
    backgroundColor: 'rgba(211, 211, 211, 0.2)',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
  },
  detailsText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },
});
