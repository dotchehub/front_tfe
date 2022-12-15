import React, { useLayoutEffect, useState, useEffect, useId } from "react";
import { View, TextInput, Text, FlatList, Pressable } from "react-native";
import { AsyncStorage } from "@react-native-async-storage/async-storage";
import MessageComponent from "./MessageComponent";
import { styles } from "../../utils/styles";
import socket from "../../utils/socket";
import { useFocusEffect } from "@react-navigation/native";

const Messaging = ({ route, navigation }) => {
  const { id1, id2, firstname } = route.params;

  console.log("-- " + +" " + id1 + " " + id2 + "  " + firstname);

  const [chatMessages, setChatMessages] = useState([]);

  const [message, setMessage] = useState("");

  //A CHANGER POUR CHOPER LE BON USERNAME
  const [user, setUser] = useState();

  // This function gets the username saved on AsyncStorage

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
  // This runs only initial mount

  useLayoutEffect(() => {
    navigation.setOptions({ title: firstname });
    getUsername();
    if (id1 == undefined) {
      socket.emit("findRoom", user + "_" + id2);
      console.log("emit findroom " + user + "_" + id2);
    } else {
      socket.emit("findRoom", id1 + "_" + id2);
      console.log("emit findroom " + id1 + "_" + id2);
    }
    socket.on("foundRoom", (roomChats) => setChatMessages(roomChats));
  }, [socket]);

  // This runs when the messages are updated.

  useEffect(() => {
    socket.on("foundRoom", (roomChats) => setChatMessages(roomChats));
  }, [socket]);

  /*

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

    //ENVOIE DU MESSAGE A LA ROOM DE USER ET ID DE LAUTRE
    if (id1 == undefined) {
      socket.emit("newMessage", {
        id_user1: user,
        id_user2: id2,
        message,
        timestamp: { hour, mins },
      });
      console.log("new message " + message + " to " + id2 + " from " + user);
    } else {
      socket.emit("newMessage", {
        id_user1: id1,
        id_user2: id2,
        message,
        timestamp: { hour, mins },
      });
      console.log("new message " + message + " to " + id2 + " from " + id1);
    }
  };

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
            keyExtractor={(item) => item.id + "_" + user}
          />
        ) : (
          ""
        )}
      </View>

      {
        // MESSAGE INPUT
      }

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
