import React, {useState} from 'react';
import {Button, View, Alert} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const ImagePickerComponent = () => {
  // State to store the base64 string of the image
  const [imageBase64, setImageBase64] = useState('');

  // Function to handle opening the camera
  const openCamera = async () => {
    try {
      // Options for the camera
      const options = {
        saveToPhotos: true,
        mediaType: 'photo',
        includeBase64: true,
      };

      // Launching the camera
      const result = await launchCamera(options);

      if (result.didCancel) {
        console.log('User cancelled image capture');
      } else if (result.errorCode) {
        console.log('ImagePicker Error: ', result.errorMessage);
      } else {
        // Setting the base64 state
        const base64String = `data:image/jpeg;base64,${result.assets[0].base64}`;
        setImageBase64(base64String);
        // Send the base64 string to the server
        sendToServer(base64String);
      }
    } catch (error) {
      // Handling any errors with the camera
      console.error(error);
      Alert.alert('Error', 'Failed to open the camera');
    }
  };

  // Function to handle selecting an image from the device
  const selectImage = async () => {
    try {
      // Options for the image picker
      const options = {
        mediaType: 'photo',
        includeBase64: true,
      };

      // Launching the image library
      const result = await launchImageLibrary(options);

      if (result.didCancel) {
        console.log('User cancelled image picker');
      } else if (result.errorCode) {
        console.log('ImagePicker Error: ', result.errorMessage);
      } else {
        // Setting the base64 state
        const base64String = `data:image/jpeg;base64,${result.assets[0].base64}`;
        setImageBase64(base64String);
        // Send the base64 string to the server
        sendToServer(base64String);
      }
    } catch (error) {
      // Handling any errors with the image picker
      console.error(error);
      Alert.alert('Error', 'Failed to select the image');
    }
  };

  // Function to send the base64 image string to a fictional server
  const sendToServer = (base64String) => {
    console.log('Sending to server:', base64String);
    // Here you would typically use fetch or axios to POST the base64String to a server
    // This is a placeholder for your actual server endpoint call
  };

  // Rendering two buttons for the user to select or capture an image
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {/* Button to open the camera */}
      <Button title="Open Camera" onPress={openCamera} />
      {/* Spacer view for layout */}
      <View style={{height: 20}} />
      {/* Button to choose an image from the device */}
      <Button title="Choose Image from Device" onPress={selectImage} />
    </View>
  );
};

export default ImagePickerComponent;
