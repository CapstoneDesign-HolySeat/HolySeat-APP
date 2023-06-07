import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, createRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Alert,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-elements";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";

function UserSign({ navigation }) {
  const [adminId, setadminId] = useState("");
  const [adminPw, setadminPw] = useState("");
  const [adminPhone, setadminPhone] = useState("");

  const signUpPressed = () => {
    // 데이터를 서버로 전송
    axios
      .post("http://192.168.200.187:4000/signup", {
        c_nick: adminId,
        c_pw: adminPw,
        phone_number: adminPhone,
      })
      .then((res) => {
        console.log(res);
        // 서버 응답에 따른 처리
        if (res.data.success) {
          // 회원가입 성공 시 처리할 내용
          Alert.alert("회원가입이 완료되었습니다.");
          navigation.navigate("UserLogin");
        } else {
          // 회원가입 실패 시 처리할 내용
          Alert.alert("회원가입에 실패했습니다.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.total}>
      <ImageBackground
        source={require("../assets/background1_1.jpg")}
        style={styles.bgImage}
      >
        <ScrollView>
        <View style={styles.form}>
          <View style={styles.signInTextContainer}>
            <Text style={styles.signInTextS}>Create New Account</Text>
          </View>
          <View>
            <TextInput
              style={[styles.textInput, { marginTop: 40 }]}
              placeholder="Enter your email address"
              value={adminId}
              onChangeText={setadminId}
            />
            <TextInput
              style={[styles.textInput, { marginTop: 0.1 }]}
              placeholder="Enter your Password"
              value={adminPw}
              onChangeText={setadminPw}
            />
            <TextInput
              style={[styles.textInput, { marginTop: 0.1 }]}
              placeholder="Enter your Phone number"
              value={adminPhone}
              onChangeText={setadminPhone}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            //style={[styles.backButton, { backgroundColor: "black" }]}
            onPress={() => navigation.goBack()}
          >
            {/* <Text style={[styles.backButtonText, { color: "white" }]}>
              뒤로가기
            </Text> */}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.loginButton, { backgroundColor: "#16171E" }]}
            onPress={signUpPressed}
          >
            <Text style={[styles.loginButtonText, { color: "white" }]}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  bgImage: { width: "100%", height: "100%" },
  form: {
    alignItems: "center",
    justifyContent: "center",
  },
  total: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  signInTextContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "55%",
  },
  signInTextS: {
    fontSize: 25,
    marginBottom: 100,
    color: "white",
    fontWeight: "bold",
  },
  signInTextA: {
    fontSize: 15,
    color: "white",
  },
  textInput: {
    margin: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    width: 300,
    height: 50,
    borderColor: "white",
    backgroundColor: "white",
    borderWidth: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  backButton: {
    width: 130,
    height: 50,
    marginRight: 15,
    backgroundColor: "black",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonText: {
    color: "white",
  },
  loginButton: {
    width: 180,
    height: 50,
    marginLeft: 15,
    backgroundColor: "black",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  loginButtonText: {
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default UserSign;
