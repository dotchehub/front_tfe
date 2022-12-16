import * as React from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { AsyncStorage } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

const  NotLoggedScreen = ({navigation,setName}) =>{

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "906155875047-schn0506hslporvu2j5anb5ate867lm2.apps.googleusercontent.com",
  });

  const handleGoogleCLick = async () => {
     //AsyncStorage.clear();
    const value = await AsyncStorage.getItem("id");
    if(value){
      navigation.navigate("HomeScreen");
      navigation.reset({
        index: 0,
        routes: [{ name: "HomeScreen" }],
      });
    }else {
      const googleResp = await promptAsync();
      if (googleResp.type === "success") {
        let access_token = JSON.stringify(googleResp.params.access_token);
        const token = "Bearer " + access_token.replace(/['"]+/g, "");
        const endPoint = "https://www.googleapis.com/userinfo/v2/me";

        const response = await fetch(endPoint, {
          method: "GET",
          headers: {
            Authorization: token,
          },
        });
        const userData = await response.json();

        console.log(userData);
        setName(userData.given_name);

        // TODO
        // post userData in the dateBase if not exist
        // that prevent user to not going back to home page after login
        navigation.navigate("Birthday");
        navigation.reset({
          index: 0,
          routes: [{ name: "Birthday" }],
        });

      }
    }

  };

  const handleCreateAccount= ()=>{
    navigation.navigate('Name')
  }

  return (
    <LinearGradient style={styles.container} colors={["#FF4890", "#84E6F8"]}>
      <View style={styles.width_container}>
        <View style={styles.logo_container}>
          <View style={styles.logo_row}>
            <Image source={require("../../images/vinder_logo.png")} />
            <Text style={styles.logo_text}>INDER</Text>
          </View>
        </View>
        <View style={styles.cautionary_and_buttons}>
          <View style={styles.container_connection_box}>
            <TouchableOpacity style={styles.connection_box_btn}>
              <Image
                style={styles.icon_img}
                source={require("../../images/fb_logo.png")}
              />
              <View style={styles.box_txt_connection}>
                <Text style={styles.button_text}>Connexion avec facebook</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.connection_box_btn} onPress={handleGoogleCLick}>
              <Image
                style={styles.icon_img}
                source={require("../../images/google_logo.png")}
              />
              <View style={styles.box_txt_connection}>
                <Text style={styles.button_text}>Connexion avec google</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.connection_box_btn} onPress={handleCreateAccount}>
              <Image
                style={styles.icon_img}
                source={require("../../images/register_logo.png")}
              />
              <View style={styles.box_txt_connection}>
                <Text style={styles.button_text}>Créer un compte vinder</Text>
              </View>
            </TouchableOpacity>
            <Text style={{ color: "white",fontSize:10,marginTop:20,paddingLeft:10,paddingRight:10}}>
            En appuyant sur se connecter vous acceptez qu'on vole toute votre
            data et qu'on l'utilise a des fins démocratique du congo pour
            devenir riche et celèbre
            En appuyant sur se connecter vous acceptez qu'on vole toute votre
          </Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  box_txt_connection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  container: {
    padding: 20,
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
  },
  cautionary_and_buttons: {
    flex: 3,
    justifyContent: "flex-end",
    flexDirection: "column",
  },
  width_container: {
    flex: 1,
  },
  logo_container: {
    flexDirection: "column",
    justifyContent: "flex-end",
    flex: 2,
  },
  logo_row: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  logo_text: {
    fontSize: 60,
    color: "white",
  },

  container_connection_box: {},
  connection_box_btn: {
    borderRadius: 90,
    backgroundColor: "white",
    marginTop: 20,
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  icon_img: {
    width: 20,
    height: 20,
  },
  button_text: {
    fontSize: 18,
    color:"#3E505B"
  },
});

export default NotLoggedScreen;
