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

function UserLogin({ navigation }) {
  const [customerId, setCustomerId] = useState("");
  const [customerPw, setCustomerPw] = useState("");

  const adminPressed = () => {
    if (!customerId) {
      Alert.alert("아이디를 입력해주세요");
      return;
    }
    if (!customerPw) {
      Alert.alert("패스워드를 입력해주세요");
      return;
    }

    axios
      .post("http://192.168.200.187 :4000/customlogin", null, {
        params: {
          c_nick: customerId,
          c_pw: customerPw,
        },
      })
      .then((res) => {
        // console.log(res);
        if (res.data.customerId === undefined) {
          // id 일치하지 않는 경우 userId = undefined, msg = '입력하신 id 가 일치하지 않습니다.'
          Alert.alert("아이디가 일치하지 않습니다.");
        } else if (res.data.customerId === null) {
          // id는 있지만, pw 는 다른 경우 userId = null , msg = undefined
          Alert.alert("Password가 일치하지 않습니다.");
        } else if (res.data.customerId === customerId) {
          // id, pw 모두 일치 userId = userId1, msg = undefined
          AsyncStorage.setItem("c_nick", customerId);
          //AsyncStorage.setItem("cafeInfo", cafeInfo);
          // { "table_a": 2, "table_b": 5 }
          //Alert.alert("관리자 페이지로 이동합니다.");
          navigation.navigate("Category", {customerId});
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:4000/login")
  //     .then((res) => console.log(res))
  //     .catch();
  // }, []);

  return (
    <View style={styles.total}>
      <ImageBackground
        source={require("../assets/background1_1.jpg")}
        style={styles.bgImage}
      >
        <View style={styles.form}>
          <View style={styles.signInTextContainer}>
            <Text style={styles.signInTextS}>Log in</Text>
          </View>
          <View>
            <TextInput
              style={[styles.textInput, { marginTop: 40 }]}
              placeholder="아이디"
              value={customerId}
              onChangeText={setCustomerId}
            />
            <TextInput
              style={[styles.textInput, { marginTop: 0.1 }]}
              placeholder="비밀번호"
              value={customerPw}
              onChangeText={setCustomerPw}
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
            onPress={adminPressed}
          >
            <Text style={[styles.loginButtonText, { color: "white" }]}>
              로그인
            </Text>
          </TouchableOpacity>
        </View>
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
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default UserLogin;
