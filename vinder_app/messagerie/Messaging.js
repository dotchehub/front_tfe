import React, { useLayoutEffect, useState, useEffect, useId } from "react";
import { View, TextInput, Text, FlatList, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MessageComponent from "./MessageComponent";
import { styles } from "../utils/styles";
import socket from "../utils/socket";
import { useFocusEffect } from "@react-navigation/native";

const Messaging = ({ route, navigation }) => {
  const { name, id } = route.params;
  console.log("----------------------------- " + id);

  const [chatMessages, setChatMessages] = useState({});
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");

  //👇🏻 This function gets the username saved on AsyncStorage
  const getUsername = async () => {
    try {
      const value = await AsyncStorage.getItem("username");
      if (value !== null) {
        setUser(value);
      }
    } catch (e) {
      console.error("Error while loading username!");
    }
  };

  //👇🏻 This runs only initial mount
  useLayoutEffect(() => {
    navigation.setOptions({ title: name });

    console.log("emit findroom = " + id);
    socket.emit("findRoom", id);
    socket.on("foundRoom", (roomChats) => setChatMessages(roomChats));
  }, []);

  //👇🏻 This runs when the messages are updated.
  useEffect(() => {
    socket.on("foundRoom", (roomChats) => setChatMessages(roomChats));
  }, [socket]);

  /*👇🏻 
        This function gets the time the user sends a message, then 
        logs the username, message, and the timestamp to the console.
     */
  const handleNewMessage = () => {
    const hour =
      new Date().getHours() < 10
        ? `0${new Date().getHours()}`
        : `${new Date().getHours()}`;

    const mins =
      new Date().getMinutes() < 10
        ? `0${new Date().getMinutes()}`
        : `${new Date().getMinutes()}`;

    socket.emit("newMessage", {
      message,
      room_id: id,
      user,
      timestamp: { hour, mins },
    });
  };
  socket.on("newMessage", (data) => {
    //👇🏻 Destructures the property from the object
    const { room_id, message, user, timestamp } = data;
    //👇🏻 Finds the room where the message was sent
    let result = chatRooms.filter((room) => room.id == room_id);

    //👇🏻 Create the data structure for the message
    const newMessage = {
      id: generateID(),
      text: message,
      user,
      time: `${timestamp.hour}:${timestamp.mins}`,
    };
    //👇🏻 Updates the chatroom messages
    socket.to(result[0].name).emit("roomMessage", newMessage);
    result[0].messages.push(newMessage);

    //👇🏻 Trigger the events to reflect the new changes
    socket.emit("roomsList", chatRooms);
    socket.emit("foundRoom", result[0].messages);
  });

  return (
    <View style={styles.messagingscreen} onPress={() => {}}>
      <View
        style={[
          styles.messagingscreen,
          { paddingVertical: 15, paddingHorizontal: 10 },
        ]}
      >
        {chatMessages[0] ? (
          <FlatList
            data={chatMessages}
            renderItem={({ item }) => (
              <MessageComponent item={item} user={user} />
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          ""
        )}
      </View>

      <View style={styles.messaginginputContainer}>
        <TextInput
          style={styles.messaginginput}
          onChangeText={(value) => setMessage(value)}
        />
        <Pressable
          style={styles.messagingbuttonContainer}
          onPress={handleNewMessage}
        >
          <View>
            <Text style={{ color: "#f2f0f1", fontSize: 20 }}>SEND</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default Messaging;
