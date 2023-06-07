import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

function Start() {
  const navigation = useNavigation();

  const handleSignUp = () => {
    navigation.navigate("SignSelect");
  };

  const handleLogin = () => {
    navigation.navigate("LoginSelect");
  };

  return (
    <View style={[styles.container]}>
      <ImageBackground
        source={require("../assets/background1.jpg")}
        style={styles.bgImage}
      >
        <View style={styles.under}>
          <View style={styles.under_in}>
            <Text style={styles.Text}>Welcome to</Text>
            <Text style={styles.Text1}>Holy seat</Text>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>시작하기</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={handleLogin}>
            <Text>로그인</Text>
          </TouchableOpacity> */}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: { width: "100%", height: "100%" },
  under: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "32%",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#131724",
    paddingBottom: 30,
    borderRadius: 30,
    opacity: 0.9,
  },
  under_in: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "white",
    padding: 10,
    margin: 30,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 60,
  },
  buttonText: {
    color: "#131724",
    fontSize: 18,
    fontWeight: "bold",
  },
  Text: {
    color: "white",
    fontSize: 28,
    paddingBottom: 8,
    fontWeight: "bold",
  },
  Text1: {
    color: "white",
    fontSize: 15,
    paddingBottom: 35,
    fontWeight: "bold",
  },
});

export default Start;
