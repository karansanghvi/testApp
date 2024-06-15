import React, { useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { db } from './firebaseConfig'; // Ensure the path is correct
import { addDoc, collection } from 'firebase/firestore';

export default function Index() {
  const navigation = useNavigation(); 
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelection = (option) => {
    setSelectedOption(option === selectedOption ? null : option);
  };

  const handleProceedButton = async () => {
    if (selectedOption) {
      try {
        const docRef = await addDoc(collection(db, "users"), { gender: selectedOption });
        console.log('User added with ID: ', docRef.id);
        navigation.navigate('YoungScreen', { userId: docRef.id }); 
      } catch (e) {
        console.error("Error adding document: ", e);
        alert('Error saving your selection. Please try again.');
      }
    } else {
      alert('Please select a gender.');
    }
  };

  return (
    <View style={styles.main}>
            

      <Text style={styles.screenOneText}>Which fashion realm are you ready to explore</Text>
      <Text style={styles.smallText}>Pick your gender!</Text>

      <TouchableOpacity
        style={[
          styles.rowContainer,
          selectedOption === "Male" && { backgroundColor: 'rgba(211, 211, 211, 0.3)' }, 
        ]}
        onPress={() => handleSelection("Male")}
      >
        <Text style={styles.containerOneText}>Male</Text>
        <Text style={styles.containerOneMiniText}>Sharp-Dressed Gentleman</Text>
        <Image
          style={styles.image}
          source={require('../assets/images/image2.jpg')}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.rowContainer,
          selectedOption === "Female" && { backgroundColor: 'rgba(211, 211, 211, 0.3)' }, 
        ]}
        onPress={() => handleSelection("Female")}
      >
        <Text style={styles.containerOneText}>Female</Text>
        <Text style={styles.containerTwoMiniText}>Fashionable Femme</Text>
        <Image
          style={styles.image}
          source={require('../assets/images/image1.jpg')}
        />
      </TouchableOpacity>

      <View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={handleProceedButton}
        >
          <Text style={styles.buttonText}>Proceed</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={require('../assets/images/bg.png')}
        style={styles.backgroundImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  
  main: {
    flex: 1,
    backgroundColor: 'black',
    padding: 16,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '120%',
    height: '95%',
    zIndex: -1, // Ensure the background image is behind all other elements
    opacity: 0.8, // Adjust the opacity to make the background visible but not too overwhelming
  },
  screenOneText: {
    color: 'white',
    fontSize: 28,
    marginTop: 180,
    marginLeft: 4,
    fontWeight: 'bold',
  },
  smallText: {
    color: 'grey',
    marginLeft: 4,
    marginTop: 8,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(211, 211, 211, 0.1)', 
    padding: 10,
    borderRadius: 8, 
    marginTop: 40,
  },
  containerOneText: {
    color: 'white',
    paddingBottom: 60,
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 15,
  },
  containerOneMiniText: {
    color: 'grey',
    marginLeft: -60,
  },
  containerTwoMiniText: {
    color: 'grey',
    marginLeft: -120,
  },
  image: {
    width: 100,
    height: 100,
  },
  buttonContainer: {
    backgroundColor: '#fa07b9',
    paddingVertical: 12,
    paddingHorizontal: 120,
    borderRadius: 6,
    alignSelf: 'center',
    marginTop: 100,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  }
});
