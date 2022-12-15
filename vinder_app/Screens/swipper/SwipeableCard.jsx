import React, { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Animated,
  Image,
  PanResponder,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ActualPicture from "./ActualPicture";

const SwipeableCard = ({ item, removeCard, swipedDirection }) => {
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const SCREEN_HEIGHT = Dimensions.get("window").height;
  const [fingerYPosition, newPosition] = useState(new Animated.Value(0));
  const [dragged, setDragged] = useState(false);
  let swipeDirection = "";
  let cardOpacity = new Animated.Value(1);

  const nbOfPicture = item.images.length;
  const [xPosition, setXPosition] = useState(new Animated.Value(0));
  const [yPosition, setYPosition] = useState(new Animated.Value(0));

  const [like, setlike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [counter, setCounter] = useState(0);
  const [isUpper, setIsUpper] = useState(false);

  const [rotateCardTop, setRotateCardTop] = useState(
    xPosition.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: ["-20deg", "0deg", "20deg"],
    })
  );
  const [rotateCardBottom, setrotateCardBottom] = useState(
    xPosition.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: ["20deg", "0deg", "-20deg"],
    })
  );

  const setTopRotationCardToZero = () => {
    setRotateCardTop(
      xPosition.interpolate({
        inputRange: [-200, 0, 200],
        outputRange: ["-10deg", "0deg", "10deg"],
      })
    );
  };
  const setBottomRotationCardToZero = () => {
    setrotateCardBottom(
      xPosition.interpolate({
        inputRange: [-200, 0, 200],
        outputRange: ["10deg", "0deg", "-10deg"],
      })
    );
  };

  let panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => false,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
    onPanResponderMove: (evt, gestureState) => {
      if (!like && !dislike) {
        xPosition.setValue(gestureState.dx);
        yPosition.setValue(gestureState.dy);
        fingerYPosition.setValue(evt.nativeEvent.locationY);

        if (fingerYPosition._value < SCREEN_HEIGHT / 2 && !dragged) {
          setIsUpper(true);
          setDragged(true);
        }
        if (fingerYPosition._value > SCREEN_HEIGHT / 2 && !dragged) {
          setIsUpper(false);
          setDragged(true);
        }
        if (gestureState.dx > SCREEN_WIDTH - 250) {
          swipeDirection = "Right";
        } else if (gestureState.dx < -SCREEN_WIDTH + 250) {
          swipeDirection = "Left";
        }
      } else {
        gestureState.dx = 0;
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (
        gestureState.dx < SCREEN_WIDTH - 250 &&
        gestureState.dx > -SCREEN_WIDTH + 250 &&
        !like &&
        !dislike &&
        gestureState.dx != 0
      ) {
        Animated.parallel([
          Animated.spring(xPosition, {
            toValue: 0,
            speed: 2.5,
            bounciness: 0,
            useNativeDriver: false,
          }),
          Animated.spring(yPosition, {
            toValue: 0,
            speed: 2.5,
            bounciness: 0,
            useNativeDriver: false,
          }),
        ]).start();
      } else if (gestureState.dx == 0 && !like && !dislike) {
        const onPressXPosition = evt.nativeEvent.locationX;
        //Switch the next image of the user
        if (onPressXPosition < SCREEN_WIDTH / 2) {
          if (counter != 0) {
            setCounter(counter - 1);
          }
        }
        //back to the previous image
        else {
          if (counter + 1 != nbOfPicture) {
            setCounter(counter + 1);
          }
        }
      } else if (gestureState.dx > SCREEN_WIDTH - 250) {
        if (isUpper) {
          setTopRotationCardToZero();
        } else {
          setBottomRotationCardToZero();
        }
        Animated.parallel([
          Animated.timing(xPosition, {
            toValue: SCREEN_WIDTH + SCREEN_WIDTH * 2,
            duration: 230,
            useNativeDriver: false,
          }),
          Animated.timing(cardOpacity, {
            toValue: 0,
            duration: 230,
            useNativeDriver: false,
          }),
        ]).start(() => {
          swipedDirection(swipeDirection);
          removeCard();
        });
      } else if (gestureState.dx < -SCREEN_WIDTH + 250) {
        if (isUpper) {
          setTopRotationCardToZero();
        } else {
          setBottomRotationCardToZero();
        }
        Animated.parallel([
          Animated.timing(xPosition, {
            toValue: -SCREEN_WIDTH - SCREEN_WIDTH * 2,
            duration: 230,
            useNativeDriver: false,
          }),
          Animated.timing(cardOpacity, {
            toValue: 0,
            duration: 230,
            useNativeDriver: false,
          }),
        ]).start(() => {
          swipedDirection(swipeDirection);
          removeCard();
        });
      }
      setDragged(false);
    },
  });

  const likeOpacity = xPosition.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [0, 0, 1],
    extrapolate: "clamp",
  });
  const nopeOpacity = xPosition.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0, 0],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.cardStyle,
        {
          transform: [
            { translateX: xPosition },
            { rotate: isUpper ? rotateCardTop : rotateCardBottom },
            { translateY: yPosition },
          ],
        },
      ]}
    >
      <View
        style={{
          zIndex: 100,
          position: "absolute",
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {[...Array(nbOfPicture)].map((_, i) => (
          <ActualPicture key={i} setOpacity={i == counter ? 1 : 0.3} />
        ))}
      </View>
      <Image style={styles.cardStyle} source={{ uri : item.images[counter]}}></Image>
      <View style={styles.profile_name}>
        <Text style={{ fontSize: 40, color: "white" }}>{item.firstname}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            style={{ height: 20, width: 15, marginRight: 10 }}
            source={require("../../images/localisation_logo.png")}
          ></Image>
          <Text style={{ fontSize: 20, color: "white" }}>
            {item.description}
          </Text>
        </View>
      </View>
      <View style={styles.btn_container}>
        <TouchableOpacity
          style={
            !dislike
              ? styles.btn_dislike_not_clicked
              : styles.btn_dislike_clicked
          }
          onPressIn={() => {
            if (!like){
            setDislike(true);
            setTopRotationCardToZero();
            setIsUpper(true);
            Animated.parallel([
              Animated.timing(xPosition, {
                toValue: -SCREEN_WIDTH - 200,
                duration: 350,
                useNativeDriver: false,
              }),
              Animated.timing(cardOpacity, {
                toValue: 0,
                duration: 350,
                useNativeDriver: false,
              }),
            ]).start(() => {
              swipedDirection("Left");
              removeCard();
            });
          }}
        }
        >
          <Ionicons
            name="close"
            style={{ padding: 2 }}
            size={43}
            color={!dislike ? "#e2504f" : "white"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={!like ? styles.btn_like_not_clicked : styles.btn_like_clicked}
          onPressIn={() => {
            if (!dislike) {
              setlike(true);
              setTopRotationCardToZero();
              setIsUpper(true);
              Animated.parallel([
                Animated.timing(xPosition, {
                  toValue: SCREEN_WIDTH + 200,
                  duration: 350,
                  useNativeDriver: false,
                }),
                Animated.timing(cardOpacity, {
                  toValue: 0,
                  duration: 350,
                  useNativeDriver: false,
                }),
              ]).start(() => {
                swipedDirection("Right");
                removeCard();
              });
            }
          }}>
          <MaterialCommunityIcons
            style={{ padding: 10 }}
            name="heart"
            size={30}
            color={!like ? "#68e674" : "white"}
          />
        </TouchableOpacity>
      </View>
      <Animated.View
        style={{
          transform: [{ rotate: "-30deg" }],
          position: "absolute",
          top: 50,
          left: 40,
          zIndex: 1000,
          opacity: likeOpacity,
        }}
      >
        <Text
          style={{
            borderWidth: 3,
            borderColor: "green",
            color: "green",
            fontSize: 38,
            fontWeight: "bold",
            padding: 5,
          }}
        >
          LIKE
        </Text>
      </Animated.View>
      <Animated.View
        style={{
          transform: [{ rotate: "30deg" }],
          position: "absolute",
          top: 50,
          right: 40,
          opacity: nopeOpacity,
        }}
      >
        <Text
          style={{
            borderWidth: 3,
            borderColor: "red",
            color: "red",
            fontSize: 38,
            fontWeight: "bold",
            padding: 5,
          }}
        >
          NOPE
        </Text>
      </Animated.View>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  profile_name: {
    paddingLeft: 20,
    position: "absolute",
    top: 0,
    bottom: 100,
    right: 0,
    left: 0,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  btn_container: {
    zIndex:9999,
    justifyContent: "center",
    alignItems: "flex-end",
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    flexDirection: "row",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 20,
  },
  cardStyle: {
    width: "100%",
    height: "100%",
    position: "absolute",
    borderRadius: 15,
  },
  btn_like_and_dislike: {
    borderWidth: 1.5,
    borderRadius: 50,
    zIndex: 1000,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
  },
  btn_like_not_clicked: {
    zIndex:9999,
    borderColor: "#68e674",
    borderWidth: 1.5,
    borderRadius: 50,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
  },
  btn_like_clicked: {
    backgroundColor: "#68e674",
    borderRadius: 50,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
  },
  btn_dislike_not_clicked: {
    borderColor: "#e2504f",
    borderWidth: 1.5,
    borderRadius: 50,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
  },
  btn_dislike_clicked: {
    backgroundColor: "#e2504f",
    borderRadius: 50,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
  },
});

export default SwipeableCard;
