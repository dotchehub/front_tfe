import { AsyncStorage } from 'react-native';
import { StyleSheet, Text, View,ImageBackground  } from 'react-native';
import { useState, useLayoutEffect, useEffect } from "react";
import axios from 'axios';
const logo = require('../../images/vinder_logo.png');
const image = require('../../images/2.jpg');
const Settings = ()=>{
  const [userInfo,setUserInfo] = useState({});
  const [profileImg,setProfileImg] = useState("");

  useEffect(() => {
    //let idUser = await _retrieveData();
    async function fetchData() {
      const value = await AsyncStorage.getItem("id");
      const profile = await AsyncStorage.getItem("profileImage");
      setProfileImg(profile);
      console.log("hello "+value);

      let path = "https://vinderbe.azurewebsites.net/users/"+value;
      axios.get(path)
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
        console.log(error);
        });
    }


  }, []);
 /*{ uri: profileImg }*/
  return (
    <View style={styles.container}>

      <View style={styles.intro}>
        <View style={styles.profileImg}>
          <ImageBackground source={image} resizeMode="cover" style={styles.image}>
           </ImageBackground>
         </View>
      </View>
      <View>
        <Text>Hello</Text>
      </View>
  </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
  },
  image: {
    height:100,
    width:100,
    borderRadius:50,
    overflow: 'hidden',
    justifyContent: "center",
    alignItems:"center",

  },
  intro:{
    
    paddingTop:10
  },
  profileImg:{
    height:105,
    width:105,
    backgroundColor:"#C2C2C2",
    borderRadius:50,
    justifyContent:'center',
    alignItems:'center'
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0"
  },
  textInput:{
    borderColor: "black"
  }
});

export default Settings;
