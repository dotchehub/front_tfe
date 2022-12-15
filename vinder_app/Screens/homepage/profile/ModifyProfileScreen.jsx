import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  Dimensions
} from "react-native";
import React, { useState, useEffect } from "react";
import { AsyncStorage } from "react-native";
import axios from "axios";
import InputModifyProfile from "./InputModifyProfile";
import InputModifyProfileAboutMe from "./InputModifyProfileAboutMe";

const actualYear = new Date().getFullYear();

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ModifyProfileScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState({});
  const [userImages,setUserImages] = useState([]);
  const [valid, setValid] = useState(false);
  const [data, setData] = useState(false);
  const [profileImg, setProfileImg] = useState("");

  useEffect(() => {
    //let idUser = await _retrieveData();
    async function fetchData() {
      const value = await AsyncStorage.getItem("id");
      const profile = await AsyncStorage.getItem("profileImage");

      setProfileImg(profile);
      console.log("hello " + value);
      console.log("url profile " + profile);

      let path = "https://vinderbe.azurewebsites.net/users/" + value;
      let path2 = "https://vinderbe.azurewebsites.net/users/images/" + value;
      axios
        .get(path2)
        .then(function (response) {
          console.log("PROFILE IMAGES :");
          console.log(response.data);
          setUserImages(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });

      axios
        .get(path)
        .then(function (response) {
          console.log("USER Birthday : " + response.data.birthdate);
          console.log(response.data);
          setUserInfo(response.data[0]);
          setData(true);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    fetchData();
  }, []);

  return (
    <View style={styles.container1}>
      <ScrollView style={styles.container2}>
        <View style={styles.intro}>
          <View style={styles.profileImg}>
            <ImageBackground
              source={{ uri: profileImg }}
              resizeMode="cover"
              style={styles.image_profile}
            ></ImageBackground>
          </View>
        </View>
        <View style={styles.nameView}>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            {" "}
            {data
              ? userInfo.firstname +
                ", " +
                (actualYear - parseInt(userInfo.birthdate.substr(0, 4)))
              : ""}{" "}
          </Text>
        </View>
        <View style={styles.imgBox}>
        <ImageBackground  source={{ uri: userImages.length>0 ? userImages[0].url :"d" }} resizeMode="cover" style={[styles.image,{  height:100,width:windowWidth/5 }]}>
        </ImageBackground>
        <ImageBackground  source={{ uri: userImages.length>1? userImages[1].url :"d" }} resizeMode="cover" style={[styles.image,{  height:100,width:windowWidth/5 }]}>
        </ImageBackground>
        <ImageBackground  source={{ uri: userImages.length>2? userImages[1].url :"d"  }} resizeMode="cover" style={[styles.image,{  height:100,width:windowWidth/5 }]}>
        </ImageBackground>
        <ImageBackground  source={{ uri: userImages.length>3? userImages[1].url :"d" }} resizeMode="cover" style={[styles.image,{  height:100,width:windowWidth/5 }]}>
        </ImageBackground>
        <ImageBackground  source={{ uri: userImages.length>4? userImages[1].url :"d" }} resizeMode="cover" style={[styles.image,{  height:100,width:windowWidth/5 }]}>
        </ImageBackground>
        <ImageBackground  source={{ uri: userImages.length>5? userImages[1].url :"d" }} resizeMode="cover" style={[styles.image,{  height:100,width:windowWidth/5 }]}>
        </ImageBackground>

        </View>

        <View style={styles.container}>
          <InputModifyProfileAboutMe label={"À propos de moi"} />
          <InputModifyProfile label={"Entreprise"} isMale={false} />
          <InputModifyProfile label={"Sexe"} isMale={true} />
          <InputModifyProfile label={"numero de télephone"} isMale={false} />
          <InputModifyProfile label={"Entreprise"} isMale={false} />
        </View>
      </ScrollView>
      <View style={styles.buttonValid}>
        <TouchableOpacity
          style={styles.buttonIn}
          onPress={() => {
            sexeHandler("F");
          }}
        >
          <Text style={styles.inputStyleIn}>SAUVER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonValid: {
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  image:{
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    overflow: 'hidden',
    borderColor:' #E8E8E8',
    borderWidth:0.1
  },
  container1: {
    flex: 1,
  },
  container2: {
    flex: 1,
  },
  images_container: {
    padding: 15,
  },
  image_profile: {
    height: 90,
    width:90,
    borderRadius: 50,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  nameView: {
    justifyContent: "center",
    alignItems: "center",
  },
  intro: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
  },
  profileImg: {
    height: 105,
    width: 105,
    marginBottom: 20,
    backgroundColor: "#C2C2C2",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
  imgBox:{
    flex:2,
    justifyContent:'center',
    alignItems:'center',
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft:40,
    marginRight:40,
  },
  textInput: {
    borderColor: "black",
  },
  button: {
    marginTop: 50,
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    padding: 15,
    borderRadius: 30,
    width: 300,
    shadowColor: "#000000",
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 2,
    },
  },
  input: {
    height: 10,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "black",
  },
  inputStyle: {
    color: "#C2BFBF",
    fontWeight: "bold",
  },
  inputStyleIn: {
    color: "white",
    fontWeight: "bold",
  },
  buttonIn: {
    marginTop: 50,
    alignItems: "center",
    backgroundColor: "#35E3FF",
    padding: 15,
    borderRadius: 30,
    width: 300,
    shadowColor: "#000000",
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 2,
    },
  },

});
export default ModifyProfileScreen;
