import { StyleSheet, Text, View } from "react-native";

export default function Theme() {
  return (
    <View style={styles.container}>
      <Text>Toasty Mood Theme Page!!!</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
