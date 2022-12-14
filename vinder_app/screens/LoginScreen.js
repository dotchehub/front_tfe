import React, { useState } from 'react';
import { View, Text,TextInput } from "react-native"

const LoginScreen = ()=>{

   const [text, setText] = useState('');

   return(
     <View>
       <Text> Login page</Text>
     </View>
   )
}

export default LoginScreen;
