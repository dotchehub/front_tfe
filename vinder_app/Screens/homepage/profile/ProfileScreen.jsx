import {View,  StyleSheet,TouchableOpacity} from 'react-native';

const ProfileScreen = ({navigation}) => {
    const handleModifyProfile = () => {
        navigation.navigate("ModifyProfileScreen")
    }

  return(
    <View style={styles.container}>
        <TouchableOpacity onPress={handleModifyProfile} style={{padding:20,backgroundColor:"red"}}>
        </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
    container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
    }
})
export default ProfileScreen;
