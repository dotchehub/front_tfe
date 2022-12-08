import * as React from 'react';
import { ImageBackground,StyleSheet,TextInput,Text, View,Touch,Button,Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {useEffect} from 'react'
import axios from "axios"
import { useState } from 'react';
import LoginScreen from './screens/LoginScreen'


const image = require('./images/train.jpeg')

function HomeScreen() {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  return (
    <View style={styles.container}>
   <ImageBackground source={image} resizeMode="cover" style={styles.image}>

   </ImageBackground>
 </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings</Text>
    </View>
  );
}

function LoginScreenTab() {
  const [userName, setUserName] = useState('');
  const [password,setPassword] =  useState('');

  const handleRegister = ()=>{

    axios.post('https://vinderbe.azurewebsites.net/users', {
    username: userName,
    password: password
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  }

  return(
    <View style={styles.container}>
      <View>
        <TextInput
         style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => setUserName(text)}
          placeholder="Username"
        />
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => setPassword(text)}
          placeholder="password"
        />
        <Button title="Register" onPress={handleRegister}/>
      </View>
    </View>
  )
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
        <Tab.Screen name="Login" component={LoginScreenTab}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems:"center"
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
