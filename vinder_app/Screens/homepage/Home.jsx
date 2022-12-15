import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,ImageBackground  } from 'react-native';
import MapScreen from '../login/MapScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import SwipperScreen from '../swipper/SwipperScreen'
import ChatNavigator  from '../messagerie/ChatNavigator'
const Tab = createBottomTabNavigator();
const image = require('../../images/2.jpg');
const logo = require('../../images/vinder_logo.png');

const Home =()=> {

  function HomeScreen() {
  return (
    <View style={styles.container}>
   <ImageBackground source={image} resizeMode="cover" style={styles.image}>
   </ImageBackground>
 </View>
  );
}

  return (
      <Tab.Navigator>
        <Tab.Screen
            name="Vinder"
            component={SwipperScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
               <MaterialCommunityIcons name="home" color={color} size={size} />
             ),
              headerTitle :()=> <ImageBackground source={logo} resizeMode="cover" style={{height:50,width:50}}>
              </ImageBackground>
            }} />

            <Tab.Screen
                name="Message"
                component={ChatNavigator}
                options={{
                  tabBarIcon: ({ color, size }) => (
                   <AntDesign name="message1" size={24} color="black" />
                 ),
                  headerShown:false
            }} />

          <Tab.Screen
              name="Map"
              component={MapScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <AntDesign name="find" size={24} color="black" />
               ),
                headerTitle :()=> <Text> Custom</Text>
              }} />

            <Tab.Screen
              name="Profil"
              component={HomeScreen} options={{
              tabBarIcon: ({ color, size }) => (
               <MaterialCommunityIcons name="account" size={24} color="black" />
             ),
              headerTitle :()=> <Text> Profil</Text>
            }}/>
      </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems:"center",

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

export default Home;
