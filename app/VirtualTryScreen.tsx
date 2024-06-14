import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import HamburgerIcon from '../components/HamburgerIcon';
import * as ImagePicker from 'expo-image-picker';

export default function VirtualTryScreen() {
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const removeImage = () => {
        setImage(null);
    };

    const handleMenuPress = () => {
        console.log('Menu pressed');
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
                        source={require('../assets/images/small_image1.jpeg')}
                        style={styles.imageGrid}
                    />
                </View>
                <View style={styles.column}>
                    <Image
                        source={require('../assets/images/small_image2.jpg')}
                        style={styles.imageGrid}
                    />
                </View>
                <View style={styles.column}>
                    <Image
                        source={require('../assets/images/small_image3.jpg')}
                        style={styles.imageGrid}
                    />
                </View>
                <View style={styles.column}>
                    <Image
                        source={require('../assets/images/small_image4.jpg')}
                        style={styles.imageGrid}
                    />
                </View>
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
        padding: 100, 
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
});
