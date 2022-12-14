import * as React from "react";
import { useEffect, useState } from "react";

//👇🏻 app screens
import Messaging from "./messagerie/Messaging";
import Chat from "./messagerie/Chat";

//👇🏻 React Navigation configurations
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  ImageBackground,
  StyleSheet,
  TextInput,
  Text,
  View,
  Touch,
  Button,
  Dimensions,
} from "react-native";
import axios from "axios";
import LoginScreen from "./screens/LoginScreen";

const image = require("./images/train.jpeg");

const Stack = createStackNavigator();

const ChatNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{
          title: "Chats",
          headerShown: false,
        }}
      />
      <Stack.Screen name="Messaging" component={Messaging} />
    </Stack.Navigator>
  );
};

function HomeScreen() {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={styles.image}
      ></ImageBackground>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings</Text>
    </View>
  );
}

function LoginScreenTab() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    axios
      .post("https://vinderbe.azurewebsites.net/users", {
        username: userName,
        password: password,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={(text) => setUserName(text)}
          placeholder="Username"
        />
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={(text) => setPassword(text)}
          placeholder="password"
        />
        <Button title="Register" onPress={handleRegister} />
      </View>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
        <Tab.Screen name="Login" component={LoginScreenTab} />
        <Tab.Screen
          name="Chats"
          component={ChatNavigator}
          options={{ headerShown: false }}
        />
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
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
  textInput: {
    borderColor: "black",
  },
});
