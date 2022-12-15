import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const LoadingScreen = ({navigation,done}) => {


    setTimeout(() => {
      navigation.navigate('HomeScreen');
      navigation.reset({
        index: 0,
        routes: [{ name: "HomeScreen" }],
      });
    }, 4000);
    return(
      <View style={[styles.container]}>
        <ActivityIndicator size="large" color="#35E3FF" />
        <Text>Chargement...</Text>
      </View>
    )
};





const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems:"center"
  },

});

export default LoadingScreen;
