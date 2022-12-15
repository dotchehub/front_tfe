import React, { useState } from 'react'
import {DatePickerIOS, View, StyleSheet,Text} from 'react-native';
import CustomButton from './CustomButton'
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { venus } from '@fortawesome/free-solid-svg-icons/faMugSaucer'

LoginBirthday = ({ navigation,chosenDate,setChosenDate })=>{

  const [valid,setValid] = useState(false);

  const moveNextScreen = ()=>{
    console.log(chosenDate);
    navigation.navigate('Sexe');
  }
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={{fontWeight:"bold",fontSize:30,marginBotton:90, color:'#A5A5A5'}}> Date de naissance :</Text>
      </View>
      <DatePickerIOS
        mode='date'
        date={chosenDate}
        onDateChange={setChosenDate}
      />

      
      <View style={styles.container2}>
        <CustomButton  valide={valid} onpress={moveNextScreen} title="CONTINUER"/>
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

  }
});

export default LoginBirthday;
