import {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Messaging from "./Messaging";
import Chat from "./Chat";

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

export default ChatNavigator;
