import React, { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import SwipeableCard from "./SwipeableCard";
import MatchScreen from "./MatchScreen";
import { likeAUser,dislikeUser } from "../../utils/api";
import socket from "../../utils/socket";

const SwipperScreen = ({navigation}) => {
  //Changer pour choper depuis l'asyncstorage
  const me = {
    id:20,
    firstname:"mehdi",
    description:"that's my description BTW",
    images : [
      "https://blobvinder.blob.core.windows.net/images/1671040576123IMG_0003.jpg"
    ],
    birthdate:"2022-03-13T23:00:00.000Z",
  }

  useLayoutEffect(() => {
    function fetchProfiles() {
      fetch(`https://vinderbe.azurewebsites.net/users/userstolike/${me.id}`).then((res) => res.json()).then((data) => {setSampleCardArray(data.reverse()); return data;}).then( (data) => data.length == 0 ? setNoMoreCard(true): "")
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
      if (await likeAUser(me.id, profile.id)){
        //Create the chat room witj id : me.id_profile.id
        socket.emit("createRoom", me.id, profile.id, profile.firstname);
        console.log("we created room" + me.id + " --- " + profile.id);
        //Emit event that we matched with someone and he needs to update is ChatRooms
        socket.emit("roomList")
        setNewMatch(true);
    
      }
    } else {
      // insert in dislike table
      await dislikeUser(me.id, profile.id)
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
            myProfile = {me.id}
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
