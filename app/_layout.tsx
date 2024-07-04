import { router, Slot } from "expo-router";
import { Image, Pressable, StyleSheet } from "react-native";

const backIcon = require("../assets/icons/back.png");

export default function RootLayout() {
  return (
    <>
      <Pressable onPress={router.back} style={styles.backButton}>
        <Image source={backIcon} style={styles.img} />
      </Pressable>
      <Slot />
    </>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: 30,
    left: 10,
    padding: 15,
    zIndex: 1,
  },
  img: {
    height: 20,
    width: 15,
  },
});
