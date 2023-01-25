/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  Alert
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
// import * as ImagePicker from 'react-native-image-picker'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const App = () => {
  const [data = { title: '', description: '', location: '', url: '' }, setData] = useState()
  const [images, setImages] = useState()
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
    padding: 2
  };

  const openGallery = async () => {
    try {
      console.log('i am here');
      const options = {
        mediaType: 'photo',
        //   maxWidth: 300,
        // maxHeight: 550,
        // quality: 1,
        selectionLimit: 15
      };
      const response = await launchImageLibrary(options);

      let imagesArray = response?.assets.length ? response?.assets : []
      if (imagesArray.length) {
        setImages(imagesArray)
      }
    } catch (error) {
      console.log(error);
    }

  }
  const onSubmit = async () => {
    try {
      // let imagesArray = []
      // images.forEach(element => {
      //   console.log('image',element);
      //   imagesArray.push(element)
      // });
      console.log(data);
      let formData = new FormData()
      formData.append('title', data.title)
      formData.append('description', data.description)
      formData.append('location', data.location)
      formData.append('url', data.url)
      images.forEach(element => {
        formData.append('images', element)
      });
      
      let result = await fetch('http://api.probunnyproduction.com/api/v1/admin/project/create-project', {
        method: 'POST',
        mode: 'same-origin',
        credentials: 'same-origin',
        body: formData
      });
      console.log(result);
      if (result) {
        Alert.alert('Data upload successfully')
      }
    } catch (error) {
      console.log('error', error);
    }

  }
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}>
        <View style={styles.headContainer}>
          <Text style={styles.headText}>Upload Data</Text>
        </View>
        <View style={styles.bodyContainer}>
          <TextInput placeholder='Title' style={styles.input} value={data.title} onChangeText={(t) => { setData({ ...data, title: t }) }} />
          <TextInput placeholder='Description' style={styles.input} value={data.description} onChangeText={(d) => { setData({ ...data, description: d }) }} />
          <TextInput placeholder='Location' style={styles.input} value={data.location} onChangeText={(l) => { setData({ ...data, location: l }) }} />
          <TextInput placeholder='Url' style={styles.input} value={data.url} onChangeText={(u) => { setData({ ...data, url: u }) }} />
          <View style={styles.btn}>
            <Button title='Pick image from gallery' onPress={() => openGallery()} />
          </View>
          <View style={styles.btn}>
            <Button title='Submit' onPress={() => onSubmit()} />
          </View>
        </View>
        <View style={styles.footer}>
          <Text>Powered By</Text>
          <Text style={styles.brand}>ASCORP TECHNOLOGIES</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  headText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  bodyContainer: {
    padding: 2,
    marginTop: 20
  },
  input: {
    borderWidth: 1,
    margin: 20,
    borderRadius: 15,
    paddingLeft: 5
  },
  btn: {
    padding: 10
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200,
  },
  brand: {
    marginBottom: 20,
    color: '#0b6156'
  }
});

export default App;
