import {View,  StyleSheet} from 'react-native';

const ActualPicture = ({ setOpacity}) => {
  return(
    <View style={[styles.actualPicture_header, {
      opacity:setOpacity,
    }
    ]}
      ></View>
  );
}
const styles = StyleSheet.create({
actualPicture_header:{
  margin:7,
  borderRadius:100,
  padding:5,
  height:0,
  backgroundColor:"white"
}
})
export default ActualPicture;