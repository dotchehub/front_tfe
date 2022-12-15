import React from "react";
import { View, Text, Pressable, SafeAreaView, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useState, useLayoutEffect, useEffect } from "react";
import ChatComponent from "./ChatComponent";
import { styles } from "../../utils/styles";
import socket from "../../utils/socket";
import Modal from "./Modal";
import Messaging from "./Messaging";
import { createStackNavigator } from "@react-navigation/stack";

const options = {
  method: "GET",
  headers: {},
};

const Chat = () => {
  const [visible, setVisible] = useState(false);
  //👇🏻 Dummy list of rooms
  const [rooms, setRooms] = useState([]);
  //👇🏻 Runs when the component mounts
  useLayoutEffect(() => {
    function fetchGroups() {
      fetch("https://vinderbe.azurewebsites.net/messages/api", options)
        .then((res) => res.json())
        .then((data) => setRooms(data))
        .catch((err) => console.error(err));
    }
    return fetchGroups();
  }, []);

  //Runs whenever there is new trigger from the backend
  useEffect(() => {
    socket.on("roomsList", (rooms) => {
      setRooms(rooms);
    });
  }, [socket]);

  return (
    <SafeAreaView style={styles.chatscreen}>
      <View style={styles.chattopContainer}>
        <View style={styles.chatheader}>
          <Text style={styles.chatheading}>Chats</Text>

          {/* Displays the Modal component when clicked */}
          <Pressable onPress={() => setVisible(true)}>
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
            <Text style={styles.chatemptyText}>No rooms created!</Text>
            <Text>Click the icon above to create a Chat room</Text>
          </View>
        )}
        {/*
                Pass setVisible as prop in order to toggle
                the display within the Modal component.
            */}
        {visible ? <Modal setVisible={setVisible} /> : ""}
      </View>

      {visible ? <Modal setVisible={setVisible} /> : ""}
    </SafeAreaView>
  );
};

export default Chat;
