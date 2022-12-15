import React, { useState } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";

const MatchScreen = ({profile,liked}) => {
    const handleContinueClick = () => {
      liked(profile.id);
    }
    const handleAddNewMatch = () => {
    }

    return (
      <View style={styles.matched_container}>
        <View style={{justifyContent:"center",alignItems:"center"}}>
          <Text style={{color:"white",fontSize:50,fontWeight:"600"}}>IT'S A MATCH !</Text>
          </View>
      <View style={{ padding:15, flexDirection:"row",justifyContent:"space-evenly"}}>
                                  {/* CHANGE QUIDAM IMG BY LOCALSTORAGE IMG  */}
        <Image style={styles.matched_images} source={require("../../images/quidam.jpg")}>
        </Image>
        <Image style={styles.matched_images} source={profile.images[0].uri}>
        </Image>
        </View>
        <View style={{ justifyContent:"center",alignItems:"center"}}>
          <TouchableOpacity style={{padding:20}} onPress={handleContinueClick}>
            <LinearGradient colors={[ '#84E6F8','#FF4890']}
              start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}
              } style={{borderRadius:90}}>
                <Text style={styles.btn_on_match}>
                  Continuer
                </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAddNewMatch} >
            <LinearGradient colors={[ '#84E6F8','#FF4890']}
              start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}
              } style={{borderRadius:90}}>
              <Text style={styles.btn_on_match}>
                Envoyer un message
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
const styles = StyleSheet.create({
matched_images:{
    padding:20,borderRadius:90, maxWidth:80,maxHeight:80
},
btn_on_match:{
    borderWidth:0.5,borderColor:"white", padding:15,borderRadius:90,color:"white"
},
matched_container: {
    borderRadius:15,
    flexDirection:"column",width:"100%",height:"100%",position:"absolute", justifyContent:"center", zIndex:1000,backgroundColor:"grey",opacity:0.8
}, 
container: {
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    paddingLeft:8,
    paddingRight:8,
    paddingBottom:20,
}
});

export default MatchScreen