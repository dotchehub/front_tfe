import React, { useState } from 'react'
import {DatePickerIOS, View, StyleSheet,Text} from 'react-native';
import CustomButton from './CustomButton'
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { venus } from '@fortawesome/free-solid-svg-icons/faMugSaucer'

LoginBirthday = ({ navigation,chosenDate,setChosenDate })=>{

  const [valid,setValid] = useState(false);
  const [messageError,setMessageError] = useState("");
  const actualYear = new Date().getFullYear();
  const moveNextScreen = ()=>{
    if(valid){
      navigation.navigate('Sexe');
    }else{
      setMessageError("Vous devez avoir minimun 18ans.")
    }

  }

  const onChangeDate =(e,value)=>{
    if(actualYear-value.getFullYear()>18){
      setValid(true);
      setMessageError("")
    }else{
      setValid(false);
    }
    setChosenDate(e,value);
  }
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={{fontWeight:"bold",fontSize:30,marginBotton:90, color:'#A5A5A5'}}> Date de naissance :</Text>
        <Text style={{color:'#35E3FF'}}>{messageError}</Text>
      </View>
          <DateTimePicker
            value={chosenDate}
            mode={'date'}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            is24Hour={true}
            onChange={onChangeDate}

          />
      <View style={styles.container2}>
        <CustomButton  valid={valid} onpress={moveNextScreen} title="CONTINUER"/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:'white'

  },
  container2:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'

  },
  datePicker: {
   justifyContent: 'center',
   alignItems: 'center',
   width: 320,
   height: 260,

 },
});

export default LoginBirthday;
