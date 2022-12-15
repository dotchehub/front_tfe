import {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import { EAzureBlobStorageFile } from 'react-native-azure-blob-storage';

import LoginName from './LoginName';
import LoginSexe from './LoginSexe';
import LoginBirthday from './LoginBirthday'
import LoginFacebook from './LoginFacebook'
import LoginLokingFor from './LoginLokingFor'
import UploadImages from './UploadImages'
import UploadOption from './UploadOption'
import LoginAddImages from './LoginAddImages'
import MapScreen from './MapScreen'
import NotLoggedScreen from './NotLoggedScreen'

import Home from '../homepage/Home';

const Stack = createStackNavigator();

function MyStack() {
  const [chosenDate, setChosenDate] = useState(new Date());
  const [name, setName] = useState("");
  const [sexe,setSexe] = useState('');
  const [lokingFor,setLokingFor] = useState('');
  // Images
  const [firstImage, setFirstImage] = useState([]);
  const [secondImage, setSecondImage] = useState([]);
  const [thirdImage, setThirdImage] = useState([]);
  const [fourthImage, setFourthImage] = useState([]);
  const [fifthImage, setFifthImage] = useState([]);
  const [sixthImage, setSixthImage] = useState([]);
  const allImages = [firstImage,secondImage,thirdImage,fourthImage,fifthImage,sixthImage];

  const nameHandler = (newName)=>{
    setName(newName);
  }
  const onChangeSexe = (newSexe)=>{
    setSexe(newSexe);
  }
  const onChangeLookingFor = (newLookingFor)=>{
    setLokingFor(newLookingFor);
  }

  const uploadProfileImg = (idUser)=>{
    let path = "https://vinderbe.azurewebsites.net/users/profile/"+idUser;
    axios.post(path,{
      url:firstImage[0].fileName
    } )
      .then(function (response) {
          console.log(response.data);
      })
      .catch(function (error) {
      console.log(error);
      });
  }

  const uploadAllImages = ()=>{
    const formData = new FormData();

    allImages.forEach((item,i) => {
      if(item.length!=0){
        formData.append("file"+i,{
          uri:Platform.OS === "android"
                    ? item[0].uri
                    : item[0].uri.replace("file://", ""),
          type:item[0].type,
          name:item[0].fileName
        })
      }
    });

    axios.post('https://vinderbe.azurewebsites.net/users/images/', formData,{
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    } )
      .then(function (response) {
      console.log(response.data);
      })
      .catch(function (error) {
      console.log(error);
      });
  }

  const addImagesPath = (idUser)=>{
    allImages.forEach((item,i) => {
      if(item.length!=0){

        let path = "https://vinderbe.azurewebsites.net/users/imagepath/"+idUser;
        axios.post(path,{
          url:item[0].fileName
        } )
          .then(function (response) {
              console.log(response.data);
          })
          .catch(function (error) {
          console.log(error);
          });
      }
    });
  }


  const register = ()=>{

    axios.post('https://vinderbe.azurewebsites.net/users/register', {
      firstname:name,
      birthdate:  chosenDate.getFullYear()+"-"+chosenDate.getDay()+"-"+chosenDate.getDate(),
      gender:sexe,
      description:"my name",
      choice:lokingFor,
      number:"1234",
      score:0
    })
    .then(function (response) {
      let userId = response.data.id_user
      uploadAllImages();
      addImagesPath(userId);
      uploadProfileImg(userId);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <Stack.Navigator
      initialRouteName="NotLoggedScreen"
      screenOptions={{
        headerVisible: false,
        headerMode: 'screen',
        headerTintColor: 'black',
        headerShadowVisible: false, // applied here
        headerBackTitleVisible: false,
      }}
    >

      <Stack.Screen name="Name"
        options={{
          title:"Créer un compte",
        }}>
        {props => <LoginName {...props} setName={nameHandler} name={name}/>}
        </Stack.Screen>

        <Stack.Screen
          name="NotLoggedScreen"
          options={{
            title:"Créer un compte",
            headerShown: false
          }}>
          {props => <NotLoggedScreen {...props} />}
        </Stack.Screen>

        <Stack.Screen
          name="Birthday"
          options={{
            title:"Créer un compte"
          }}>
            {props => <LoginBirthday {...props} setChosenDate={setChosenDate} chosenDate={chosenDate}/>}
        </Stack.Screen>

      <Stack.Screen
        name="Sexe"
        options={{
          title:"Créer un compte"
        }}>
          {props => <LoginSexe {...props} onChangeSexe={onChangeSexe } />}
      </Stack.Screen>

      <Stack.Screen
        name="AddImages"
        options={{
          title:"Créer un compte"
        }}>
        {props => <LoginAddImages {...props} register={register} firstImage={firstImage} setFirstImage={setFirstImage}
        secondImage={secondImage} setSecondImage={setSecondImage} thirdImage={thirdImage} setThirdImage={setThirdImage}
        fourthImage={fourthImage} setFourthImage={setFourthImage} fifthImage={fifthImage} setFifthImage={setFifthImage} sixthImage={sixthImage} setSixthImage={setSixthImage} />}
      </Stack.Screen>

      <Stack.Screen
        name="LokingFor"
        options={{
          title:"Créer un compte"
        }}>
        {props => <LoginLokingFor {...props} onChangeLookingFor={onChangeLookingFor} register={register} />}
      </Stack.Screen>


      <Stack.Screen
        name="Upload"
        options={{
          title:"Créer un compte"
        }}>
        {props => <UploadImages {...props} />}
      </Stack.Screen>

      <Stack.Screen  options={{headerShown: false}}  name="HomeScreen" >
        {props => <Home {...props}/>}
      </Stack.Screen>





      <Stack.Screen
      name="UploadOption"
      options={{
        title:"",
        headerLeft: ()=> null
      }}
      >
        {props => <UploadOption {...props}/>}
      </Stack.Screen>

    </Stack.Navigator>
  );
}
export default MyStack;
