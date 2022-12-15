import { StatusBar } from 'expo-status-bar';
import {useState} from 'react';
import { StyleSheet, Text, View,Button,TouchableOpacity } from 'react-native';
import CustomButton from './CustomButton';

const LoginSexe = ({ navigation,onChangeSexe })=>{
   const [sexe,setSexe] = useState('');
   
  const sexeHandler = (mySexe)=>{
    onChangeSexe(mySexe);
    navigation.navigate('LokingFor')
  }


  return (
    <View style={styles.container}>

      <Text style={{fontWeight:"bold",fontSize:30,marginBotton:90, color:'#A5A5A5'}}> Mon Sexe : </Text>
        <TouchableOpacity style={styles.button}
         onPress={()=>{sexeHandler('F')}}>
            <Text style={styles.inputStyle}>FEMME</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}
         onPress={()=>{sexeHandler('M')}}>
            <Text style={styles.inputStyle}>HOMME</Text>
        </TouchableOpacity>

      <StatusBar style="auto" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
export default LoginSexe;
