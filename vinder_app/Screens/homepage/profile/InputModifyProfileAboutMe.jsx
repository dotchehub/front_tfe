import { View, StyleSheet, TextInput, Text } from "react-native";

const InputModifyProfileAboutMe = ({ label }) => {
  return (
    <View style={styles.container}>
      <View style={styles.label_container}>
        <Text style={styles.label_text}>{label}</Text>
      </View>
      <TextInput
        multiline={true}
        placeholder={`${label}`}
        style={styles.input}
      ></TextInput>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  label_container: {
    paddingLeft: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 5,
  },
  label_text: {
    fontWeight: "bold",
    fontSize: 15,
  },
  input: {
    paddingLeft: 15,
    backgroundColor: "white",
    padding: 10,
    paddingBottom: 30,
  },
  btn_left_label: {
    borderRadius: 90,
    padding: 2,
    backgroundColor: "red",
    marginRight: 6,
  },
});
export default InputModifyProfileAboutMe;
