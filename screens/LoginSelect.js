import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";

export default function LoginSelect({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.bgImage}
        source={require("../assets/background1_1.jpg")}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("CafeLogin")}
          >
            <View style={styles.buttonImageContainer}>
              <Image
                source={require("../assets/admin1.jpg")}
                style={styles.buttonImage}
              />
            </View>
            <Text style={styles.buttonText}>관리자</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("UserLogin")}
          >
            <View style={styles.buttonImageContainer}>
              <Image
                source={require("../assets/user.jpg")}
                style={styles.buttonImage}
              />
            </View>
            <Text style={styles.buttonText}>사용자</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signupContainer}>
          <Text style={styles.signupText1}>Don't have an account?</Text>
          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => navigation.navigate("UserSign")}
          >
            <Text style={styles.signupText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row", // 수정된 부분
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  buttonText: {
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    paddingVertical: 20,
    //width: 100,
    //backgroundColor: "black",
  },
  buttonImageContainer: {
    backgroundColor: "black", // 수정된 부분
    borderRadius: 3,
  },
  buttonImage: {
    width: 150,
    height: 200,
    borderRadius: 3,
  },
  signupContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: "row",
  },
  signupText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
  signupText1: {
    color: "white",
    //fontWeight: "bold",
    fontSize: 13,
  },
  signupButton: {
    marginLeft: 5,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 3,
    //backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
