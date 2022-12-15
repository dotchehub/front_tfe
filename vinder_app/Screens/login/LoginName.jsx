import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button,TouchableOpacity,TextInput } from 'react-native';
import CustomInput from './CustomInput'
import CustomButton from './CustomButton'


const LoginName = ({ navigation,name,setName })=>{
  const [valid,setValid] = React.useState(false);

  const onChangeName = (name)=>{
    setName(name);
    if(name.length>4){
      setValid(true);
    }else{
      setValid(false);
    }
  }
  const moveNextScreen = ()=>{

    //navigation.navigate('NotLoggedScreen');
    navigation.navigate('Birthday');
    //navigation.navigate('Upload');
    //navigation.navigate('Test');

  }
  return (
    <View style={styles.container}>
      <Text style={{fontWeight:"bold",fontSize:30,marginBotton:40}}> Quel est votre prénom ?</Text>
      <CustomInput value={name} onChangeName={onChangeName}/>
      <CustomButton valid={valid} onpress={moveNextScreen} title="CONTINUER"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'start',
    paddingTop:30,
  },
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

export default LoginName;
