import { View, Text, Pressable } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../../utils/styles";
import socket from "../../utils/socket"

const ChatComponent = ({ item }) => {
    const navigation = useNavigation();
    const [messages, setMessages] = useState({});
    
    //👇🏻 Retrieves the last message in the array from the item prop
    useLayoutEffect(() => {
        setMessages(item.messages[item.messages.length - 1]);
    }, []);

    ///👇🏻 Navigates to the Messaging screen
    const handleNavigation = () => {
        console.log("item : " , item)
        console.log("navigated to match : " + item.id_user2 + item.id_user );
        navigation.navigate("Messaging", {
            id1: item.id_user2,
            id2: item.id_user,
            firstname : item.firstname
        });
    };

    return (
        <Pressable style={styles.cchat} onPress={handleNavigation}>
            <Ionicons
                name='person-circle-outline'
                size={45}
                color='black'
                style={styles.cavatar}
            />

            <View style={styles.crightContainer}>
                <View>
                    <Text style={styles.cusername}>{item.name}</Text>

                    <Text style={styles.cmessage}>
                        {messages?.text ? messages.text : item.firstname}
                    </Text>
                </View>
                <View>
                    <Text style={styles.ctime}>
                        {messages?.time ? messages.time : "now"}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
};

export default ChatComponent;
