import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button,TouchableOpacity,TextInput } from 'react-native';

const CustomButton = (props)=>{

  return(
    <TouchableOpacity style={props.valid ? styles.buttonIn : styles.button}
     onPress={props.onpress}>
        <Text style={props.valid? styles.inputStyleIn : styles.inputStyle}>{props.title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

  button: {
    marginTop:50,
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    padding: 15,
    borderRadius: 30,
    width:300,
    shadowColor: "#000000",
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 2
    },
  },
  input: {

  height: 10,
  margin: 12,
  borderWidth: 1,
  padding: 10,
  borderColor:"black"
  },
  inputStyle:{
    color:"#C2BFBF",
    fontWeight:"bold"
  },
  inputStyleIn :{
    color:"white",
    fontWeight:"bold"
  },
  buttonIn:{
    marginTop:50,
    alignItems: "center",
    backgroundColor: "#35E3FF",
    padding: 15,
    borderRadius: 30,
    width:300,
    shadowColor: "#000000",
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 2
    },
  }
});

export default CustomButton;
