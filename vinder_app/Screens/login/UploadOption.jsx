// App.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Button,TouchableOpacity } from 'react-native';

import * as ImagePicker from 'expo-image-picker';

function UploadOption({navigation,route}) {

  const openCamera = ()=>{
    route.params.openCamera();
    navigation.navigate('AddImages');
  }
  const showImagePicker = ()=>{
    route.params.showImagePicker();
    navigation.navigate('AddImages');
  }

  return (
    <View style={styles.screen}>
      <View style={styles.introduction}>
      <View style={{marginBottom:20}}>
        <TouchableOpacity
         onPress={()=>navigation.navigate('AddImages')}>
            <Text style={{fontSize:20}}>X</Text>
        </TouchableOpacity>
        </View>

        <Text style={{fontWeight:"bold",fontSize:30}}>Créer Nouveau</Text>
        <Text>Selectionnez un type de contenu</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}
         onPress={showImagePicker}>
            <Text style={styles.inputStyle}>Telecharger une photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
         onPress={openCamera}>
            <Text style={styles.inputStyle}>Appareil photo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Kindacode.com
// Just some styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white'
  },
  introduction:{
    flex:1,
    justifySelf:'start',
    alignSelf:'start',
    paddingLeft:20

  },
  button: {
    marginTop:50,
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    padding: 25,
    borderRadius: 10,
    width:300,
    shadowColor: "#000000",
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 2
    },
  },
  buttonContainer: {
    flex:2
  },
  imageContainer: {
    padding: 30
  },
  image: {
    width: 400,
    height: 300,
    resizeMode: 'cover'
  }
});

export default UploadOption;
