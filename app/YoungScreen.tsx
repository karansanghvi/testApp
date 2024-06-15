import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from './firebaseConfig'; // Adjust the import path if necessary

export default function YoungScreen() {
  const [selectedValue, setSelectedValue] = useState('option1');
  const navigation = useNavigation();
  const route = useRoute();
  const { userId } = route.params;

  if (!userId) {
    console.error('No userId provided');
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No user ID provided. Please go back and try again.</Text>
      </View>
    );
  }

  const handleYoungScreenButton = async () => {
    const ageGroupMap = {
      option1: '20 - 25 yrs',
      option2: '26 - 31 yrs',
      option3: '32 - 36 yrs',
      option4: '37 - 42 yrs',
    };

    try {
      await updateDoc(doc(db, 'users', userId), {
        ageGroup: ageGroupMap[selectedValue],
      });
      console.log('Document updated successfully');
      navigation.navigate('VirtualTryScreen', { userId: userId });
    } catch (error) {
      console.error('Error updating document:', error);
      Alert.alert('Error', 'There was an error updating your age group. Please try again.');
    }
  };

  return (
    <View style={styles.main}>
      <Text style={styles.screenTwoText}>How young are you feeling today?</Text>
      <Text style={styles.smallText}>Pick your age group!</Text>

      <View style={[styles.rowContainer, selectedValue === 'option1' && styles.selectedContainer]}>
        <View>
          <Text style={styles.ageText}>20 - 25 yrs</Text>
          <Text style={styles.type}>Trendsetters-in-Training</Text>
        </View>
        <RadioButton.Android
          value="option1"
          status={selectedValue === 'option1' ? 'checked' : 'unchecked'}
          onPress={() => setSelectedValue('option1')}
          color="grey"
        />
      </View>

      <View style={[styles.rowContainer, selectedValue === 'option2' && styles.selectedContainer]}>
        <View>
          <Text style={styles.ageText}>26 - 31 yrs</Text>
          <Text style={styles.type}>Style Explorers</Text>
        </View>
        <RadioButton.Android
          value="option2"
          status={selectedValue === 'option2' ? 'checked' : 'unchecked'}
          onPress={() => setSelectedValue('option2')}
          color="grey"
        />
      </View>

      <View style={[styles.rowContainer, selectedValue === 'option3' && styles.selectedContainer]}>
        <View>
          <Text style={styles.ageText}>32 - 36 yrs</Text>
          <Text style={styles.type}>Chic Connoisseurs</Text>
        </View>
        <RadioButton.Android
          value="option3"
          status={selectedValue === 'option3' ? 'checked' : 'unchecked'}
          onPress={() => setSelectedValue('option3')}
          color="grey"
        />
      </View>

      <View style={[styles.rowContainer, selectedValue === 'option4' && styles.selectedContainer]}>
        <View>
          <Text style={styles.ageText}>37 - 42 yrs</Text>
          <Text style={styles.type}>Fashion Mavericks</Text>
        </View>
        <RadioButton.Android
          value="option4"
          status={selectedValue === 'option4' ? 'checked' : 'unchecked'}
          onPress={() => setSelectedValue('option4')}
          color="grey"
        />
      </View>

      <TouchableOpacity style={styles.buttonContainer} onPress={handleYoungScreenButton}>
        <Text style={styles.buttonText}>NEXT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'black',
    padding: 16,
  },
  screenTwoText: {
    color: 'white',
    fontSize: 29,
    marginTop: 120,
    marginLeft: 4,
    fontWeight: 'bold',
  },
  smallText: {
    color: 'grey',
    marginLeft: 4,
    marginTop: 3,
    marginBottom: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(211, 211, 211, 0.2)',
    padding: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  selectedContainer: {
    borderWidth: 2,
    borderColor: 'grey',
    backgroundColor: 'transparent',
  },
  ageText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 6,
  },
  type: {
    color: 'grey',
    marginLeft: 6,
    marginTop: 4,
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
  },
  errorContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

//same line as last page