import React from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";

const CustomInput = (props) => {

  const changeHandler =(e)=>{
    props.onChangeName(e);
  }
  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={(e) => changeHandler(e)}
        value={props.value}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    width:300,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor:"#C2BFBF",
    borderRadius: 10,
  },
});

export default CustomInput;
