import React, { useState } from 'react';
import { View, Text,TextInput } from "react-native"

const LoginScreen = ()=>{

   const [text, setText] = useState('');

   return(
     <View>
       <TextInput
         onChangeText={text => setText(text)}
         placeHolder="Username"
       />
     </View>
   )
}

export default LoginScreen;
