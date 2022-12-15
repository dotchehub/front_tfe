import React, {useState} from 'react';
import {View,Text, Button, Platform,StyleSheet,TouchableOpacity,ImageViewer,Image,ImageBackground,Dimensions} from 'react-native';
import * as ImagePicker from 'expo-image-picker';


const image = require('../../images/2.jpg');
const UploadImages = ({navigation,pickedImagePath,setPickedImagePath}) => {
  const [imgUri,setImgUri] = useState('none');

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  // This function is triggered when the "Select an image" button pressed
  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    // Explore the result
    console.log(result);

    if (!result.canceled) {
      result.assets[0].fileName=Date.now()+result.assets[0].fileName;
      setPickedImagePath(result.assets);
      setImgUri(result.assets[0].uri);
      console.log(result.assets);
    }
  }


  // This function is triggered when the "Open camera" button pressed
 const openCamera = async () => {
   // Ask the user for the permission to access the camera
   const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

   if (permissionResult.granted === false) {
     alert("You've refused to allow this appp to access your camera!");
     return;
   }

   const result = await ImagePicker.launchCameraAsync();

   // Explore the result
   console.log(result);

   if (!result.canceled) {
     let myUri = result.assets[0].uri;
     result.assets[0].fileName=Date.now()+myUri.substr(myUri.length-4,myUri.length);
     setPickedImagePath(result.assets);
     setImgUri(result.assets[0].uri);
     console.log(result);
   }
 }

 const selectOption = ()=>{
   navigation.navigate('UploadOption',{ navigation:navigation,openCamera: openCamera, showImagePicker:showImagePicker});
 }
 const removeImage = ()=>{
   setPickedImagePath([]);
   setImgUri("none");
 }

  return (
    <View>
      <ImageBackground  source={{ uri: imgUri }} resizeMode="cover" style={[styles.image,{  height:150,width:windowWidth/4 }]}>
        {imgUri!="none" ? <TouchableOpacity onPress={removeImage} style={styles.remove}><Text style={{color:'white'}}>x</Text></TouchableOpacity>
        :<TouchableOpacity onPress={selectOption} style={styles.add}><Text style={{color:'white',fontWeight: "bold"}}> + </Text></TouchableOpacity>}
      </ImageBackground>
    </View>

  );
};


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems:'center',
    height:150,
    width:120,
    borderWidth: 2,
    borderRadius:10,
    borderColor: '#E8E8E8',

  },
  add:{

    justifyContent: 'center',
    alignItems:'center',
    width:30,
    height:30,
    opacity:0.5,
    backgroundColor:'#35E3FF',
    borderRadius:50,
  },
  remove:{
    position:'absolute',
    justifyContent: 'center',
    alignItems:'center',
    top:2,
    right:2,
    width:20,
    height:20,

    backgroundColor:'black',
    borderRadius:50,
  },
  image:{
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    overflow: 'hidden',
    borderColor:' #E8E8E8',
    borderWidth:0.1
  }
});

export default UploadImages;
