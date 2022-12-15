import React from "react";
import { SafeAreaView, StyleSheet, TextInput,View,Text,ScrollView } from "react-native"
import UploadImages from './UploadImages'
import { NavigationContainer } from '@react-navigation/native';
import CustomButton from './CustomButton';
import { LinearGradient } from 'expo-linear-gradient';


const LoginAddImages = ({navigation,register,firstImage, setFirstImage,secondImage, setSecondImage,thirdImage, setThirdImage,fourthImage, setFourthImage,fifthImage, setFifthImage,sixthImage, setSixthImage}) => {

  const moveNextScreen =()=>{
    register();
    navigation.navigate('HomeScreen');
    navigation.reset({
      index: 0,
      routes: [{ name: "HomeScreen" }],
    });
  }

  return (
      <View style={styles.container}>
      <LinearGradient
       // Background Linear Gradient
       colors={['rgba(0,0,0,0.8)', 'transparent']}
       style={styles.background}
     />
        <View style={styles.introduction}>
          <View style={{marginTop:20}}>
              <Text style={{fontWeight:"bold",fontSize:30}}>Mes photos</Text>
          </View>
          <View style={{marginTop:5, width:'80%',color:'red'}}>
            <Text >Plus votre profile est complet, plus vous augmentez vos chances de discuter et de rencontrer quelqu'un.</Text>
          </View>
        </View>
        <View style={styles.imgBox}>
          <UploadImages navigation = {navigation} pickedImagePath={firstImage} setPickedImagePath={setFirstImage}/>
          <UploadImages navigation = {navigation} pickedImagePath={secondImage} setPickedImagePath={setSecondImage}/>
          <UploadImages navigation = {navigation} pickedImagePath={thirdImage} setPickedImagePath={setThirdImage}/>
          <UploadImages navigation = {navigation} pickedImagePath={fourthImage} setPickedImagePath={setFourthImage}/>
          <UploadImages navigation = {navigation} pickedImagePath={fifthImage} setPickedImagePath={setFifthImage}/>
          <UploadImages navigation = {navigation} pickedImagePath={sixthImage} setPickedImagePath={setSixthImage}/>
        </View>
        <View style={styles.next}>
          <CustomButton valid={false} onpress={moveNextScreen} title="CONTINUER"/>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:10,
    backgroundColor:'white'
  },
  imgBox:{
    flex:2,
    justifyContent:'center',
    alignItems:'center',
    flexDirection: "row",
    flexWrap: "wrap",
  },
  introduction:{
    justifyContent:'start',
    alignItems:'center',
    flex:1,
  },
  next:{
    justifyContent:'start',
    alignItems:'center',
    flex:1,
  }
});

export default LoginAddImages ;
