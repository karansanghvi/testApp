import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import HamburgerIcon from '../components/HamburgerIcon';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { db } from './firebaseConfig'; // Adjust the import path if necessary
import { doc, updateDoc, getDoc } from 'firebase/firestore';

// Import all images
import bigImage1 from '../assets/images/big_image1.jpeg';
import bigImage2 from '../assets/images/big_image2.jpeg';
import bigImage3 from '../assets/images/big_image3.jpeg';
import bigImage4 from '../assets/images/big_image4.jpeg';
import smallImage1 from '../assets/images/small_image1.jpeg';
import smallImage2 from '../assets/images/small_image2.jpg';
import smallImage3 from '../assets/images/small_image3.jpg';
import smallImage4 from '../assets/images/small_image4.jpg';

export default function VirtualTryScreen() {
    const [image, setImage] = useState(null);
    const [isMale, setIsMale] = useState(true); // Default to true assuming male
    const navigation = useNavigation();
    const route = useRoute();
    const { userId } = route.params;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDoc = await getDoc(doc(db, 'users', userId));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    
                    setIsMale(userData.gender === 'Male'); // Set isMale based on fetched data
                    console.log('isMale state:', isMale);
                } else {
                    console.error('User document not found');
                    // Handle scenario where user document doesn't exist
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                // Handle error fetching user data
            }
        };

        fetchUserData();
    }, [userId]);

    if (!userId) {
        console.error('No userId provided');
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>No user ID provided. Please go back and try again.</Text>
            </View>
        );
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled && result.assets && result.assets.length > 0 && result.assets[0].uri) {
            try {
                await updateDoc(doc(db, 'users', userId), {
                    profileImage: result.assets[0].uri,
                });
                console.log('Image URI stored in user document');
                setImage(result.assets[0].uri);
            } catch (error) {
                console.error('Error updating user document with image URI:', error);
                Alert.alert('Error', 'Failed to update profile image. Please try again.');
            }
        } else {
            console.log('No valid image URI returned from ImagePicker');
        }
    };

    const removeImage = async () => {
        try {
            await updateDoc(doc(db, 'users', userId), {
                profileImage: null,
            });
            console.log('Image removed from user document');
            setImage(null);
        } catch (error) {
            console.error('Error removing image from user document:', error);
            Alert.alert('Error', 'Failed to remove profile image. Please try again.');
        }
    };

    const handleMenuPress = () => {
        console.log('Menu pressed');
    };

    const navigateToEndScreen = () => {
        navigation.navigate('EndScreen', { userId: userId });
    };

    return (
        <View style={styles.container}>
            <View style={styles.burgerContainer}>
                <HamburgerIcon onPress={handleMenuPress} />
            </View>
            <Text style={styles.mainText}>VIRTUAL TRY - ON</Text>
            <View style={[styles.imageContainer, image ? styles.imageContainerWithImage : null]}>
                <TouchableOpacity onPress={pickImage}>
                    {!image && <Text style={styles.addImageText}>Add a photo</Text>}
                </TouchableOpacity>
                {image && (
                    <View>
                        <Image source={{ uri: image }} style={styles.image} />
                        <TouchableOpacity onPress={removeImage} style={styles.removeButton}>
                            <Text style={styles.removeButtonText}>Remove</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            <Text style={styles.descriptionText}>Throw in a full-length snap to show off your entire fabulous self!</Text>
            <View style={styles.orContainer}>
                <View style={styles.line} />
                <Text style={styles.orText}>or</Text>
                <View style={styles.line} />
            </View>
            <View style={styles.row}>
                <View style={styles.column}>
                    <Image
                        source={isMale ? bigImage1 : smallImage1}
                        style={styles.imageGrid}
                    />
                </View>
                <View style={styles.column}>
                    <Image
                        source={isMale ? bigImage2 : smallImage2}
                        style={styles.imageGrid}
                    />
                </View>
                <View style={styles.column}>
                    <Image
                        source={isMale ? bigImage3 : smallImage3}
                        style={styles.imageGrid}
                    />
                </View>
                <View style={styles.column}>
                    <Image
                        source={isMale ? bigImage4 : smallImage4}
                        style={styles.imageGrid}
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.buttonContainer} onPress={navigateToEndScreen}>
                <Text style={styles.buttonText}>Go to End Screen</Text>
            </TouchableOpacity>
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
        height: '30%',
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
    removeButton: {
        color: 'white',
        backgroundColor: 'rgba(211, 211, 211, 0.2)',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 4,
    },
    removeButtonText: {
        color: 'white',
        textAlign: 'center',
    },
    descriptionText: {
        color: 'grey',
        textAlign: 'center',
        fontSize: 15,
        marginTop: 20,
    },
    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    orText: {
        color: 'white',
        fontWeight: 'bold',
        paddingHorizontal: 10,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: 'grey',
        marginHorizontal: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    column: {
        flex: 1,
        paddingHorizontal: 5,
    },
    imageGrid: {
        width: '100%',
        height: 200,
    },
    buttonContainer: {
        backgroundColor: '#fa07b9',
        paddingVertical: 12,
        paddingHorizontal: 120,
        borderRadius: 6,
        alignSelf: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
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
