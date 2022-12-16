import React from "react";
import { View, Text, Pressable, SafeAreaView, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useState, useLayoutEffect, useEffect } from "react";
import ChatComponent from "./ChatComponent";
import { styles } from "../../utils/styles";
import socket from "../../utils/socket";
import Messaging from "./Messaging";
import { createStackNavigator } from "@react-navigation/stack";
import { AsyncStorage } from "react-native";

const options = {
  method: "GET",
  headers: {},
};

const Chat = () => {
  const [visible, setVisible] = useState(false);
  //👇🏻 Dummy list of rooms
  const [rooms, setRooms] = useState([]);

  //On doit le set via async storage
  const [user, setUser] = useState();

  const getUsername = async () => {

    try {
  
      const value = await AsyncStorage.getItem("id");
  
      console.log("IDDDDDD :" +value)
  
      if (value !== null) {
  
        setMeID(value);
  
        return value;
  
      }
  
  
  
    } catch (e) {
  
      console.error(e);
  
    }
  
  };
  //👇🏻 Runs when the component mounts
  //Fetching the profile of all matches he's had
  useLayoutEffect(() => {

    function fetchProfiles() {

      (getUsername()).then((id)=>fetch("https://vinderbe.azurewebsites.net/messages/matchs/" + id)).then((res) => res.json()).then((data) => {setSampleCardArray(data.reverse()); return data;}).then( (data) => data.length == 0 ? setNoMoreCard(true): "")

      .catch((err) => console.log(err))

    }

    return fetchProfiles();

  },[]);

  //Runs whenever there is new trigger from the backend
  useEffect(() => {
    socket.on("roomsList", (rooms) => {
      console.log("someone matched with me rerender rooms");
      console.log("we fetched data :", rooms);
      setRooms(rooms);
    });
  }, [socket]);

  return (
    <SafeAreaView style={styles.chatscreen}>
      <View style={styles.chattopContainer}>
        <View style={styles.chatheader}>
          <Text style={styles.chatheading}>Chats</Text>

          {/* 👇🏻 Logs "ButtonPressed" to the console when the icon is clicked */}
          <Pressable onPress={() => console.log("Button Pressed!")}>
            <Feather name="edit" size={24} color="green" />
          </Pressable>
        </View>
      </View>

      <View style={styles.chatlistContainer}>
        {rooms.length > 0 ? (
          <FlatList
            data={rooms}
            renderItem={({ item }) => <ChatComponent item={item} />}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <View style={styles.chatemptyContainer}>
            <Text style={styles.chatemptyText}>No Matchs Yet!</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Chat;
