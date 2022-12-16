import { View, StyleSheet, TextInput, Text } from "react-native";

const InputModifyProfile = ({ label, isMale,value,onChange }) => {
  return (
    <View style={styles.container}>
      <View style={styles.label_container}>
        <View style={styles.btn_left_label}></View>
        <Text style={styles.label_text}>{label}</Text>
      </View>
      <TextInput
        placeholder={
          `Choisissez ${isMale ? "un " : "une "}` + `${label.toLowerCase()}`
        }
        style={styles.input}
        value={value}
        onChangeText={onChange}
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
  },
  btn_left_label: {
    borderRadius: 90,
    padding: 2,
    backgroundColor: "red",
    marginRight: 6,
  },
});
export default InputModifyProfile;
