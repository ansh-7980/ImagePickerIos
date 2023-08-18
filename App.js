import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Button,
  Image,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
export default function App() {
  const [image, setImage] = useState(null);

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setImage(imageUri);
        AsyncStorage.setItem('image', imageUri);
        console.log(imageUri);
      }
    });
  };
  const openImageCamera = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled Camera');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setImage(imageUri);
        AsyncStorage.setItem('image', imageUri);

        console.log(imageUri);
      }
    });
  };

  const readData = async () => {
    try {
      let image = await AsyncStorage.getItem('image');
      console.log('image ius', image);
      setImage(image);
    } catch {
      console.log('error to get image');
    }
  };

  useEffect(() => {
    readData();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Hello, lets try the image picker Library in iOS</Text>
      <Button
        title="Pick image from library"
        onPress={() => openImagePicker()}
      />
      <Button
        title="Pick image from camera"
        onPress={() => openImageCamera()}
      />

      <Image source={{uri: image}} style={{width: 100, height: 100}} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'blue',
  },
});
