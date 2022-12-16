import React, { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import SwipeableCard from "./SwipeableCard";
import MatchScreen from "./MatchScreen";
import { likeAUser,dislikeUser } from "../../utils/api";
import socket from "../../utils/socket";
import { AsyncStorage } from "react-native";

const SwipperScreen = ({navigation}) => {

const [meId, setMeID] = useState();

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
  //Changer pour choper depuis l'asyncstorage

  useLayoutEffect(() => {
    function fetchProfiles() {
      (getUsername()).then((id)=>fetch("https://vinderbe.azurewebsites.net/users/userstolike/"+id)).then((res) => res.json()).then((data) => {setSampleCardArray(data.reverse()); return data;}).then( (data) => data.length == 0 ? setNoMoreCard(true): "")
      .catch((err) => console.log(err))
    }
    return fetchProfiles();
  },[]);

  const [noMoreCard, setNoMoreCard] = useState(false);
  const [sampleCardArray, setSampleCardArray] = useState([]);
  const [swipeDirection, setSwipeDirection] = useState("");
  const [match, setNewMatch] = useState(false);

  const [lastItemSwiped, setLastItemSwiped] = useState();
  let lastSwipDirection = "";

  const removeCard = async(profile) => {
    setLastItemSwiped(profile);
    sampleCardArray.splice(
      sampleCardArray.findIndex((item) => item.id == profile.id),
      1
    );
    setSampleCardArray(sampleCardArray);
    if (sampleCardArray.length == 0) {
      setNoMoreCard(true);
    }
    if (lastSwipDirection === "Right") {
      //check if it's a match between the 2 person if yes insert new match
      if (await likeAUser(meId, profile.id)){
        //Create the chat room witj id : meId_profile.id
        socket.emit("createRoom", meId, profile.id, profile.firstname);
        console.log("we created room" + meId + " --- " + profile.id);
        //Emit event that we matched with someone and he needs to update is ChatRooms
        socket.emit("roomList")
        setNewMatch(true);

      }
    } else {
      // insert in dislike table
      await dislikeUser(meId, profile.id)
    }
  };

  const lastSwipedDirection = (swip) => {
    setSwipeDirection(swip);
    lastSwipDirection = swip;
  };


  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        {match ? (
          <MatchScreen
          navigation={navigation}
            matchProfile={lastItemSwiped}
            myProfile = {meId}
            liked={() => setNewMatch(false)}
          />
        ) : (
          ""
        )}
        {sampleCardArray.map((item, key) => (
          <SwipeableCard
            key={key}
            item={item}
            removeCard={() => removeCard(item)}
            swipedDirection={lastSwipedDirection}
          />
        ))}
        {noMoreCard ? (
          <Text>Plus aucune personne disponible autour de vous</Text>
        ) : (
          ""
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 20,
  },
});

export default SwipperScreen;