import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const MyPage = ({ route }) => {
  const { customerId } = route.params;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch(`http://192.168.200.187:4000/mypage/${customerId}`)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data.data);
      })
      .catch((error) => {
        console.error("Error retrieving user data:", error);
      });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>My Page</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>사용자:</Text>
        <Text style={styles.info}>{customerId}</Text>
      </View>
      <Text style={styles.info}>예약 현황</Text>
      {userData &&
        userData.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>카페 이름:</Text>
              <Text style={styles.info}>{item.cafe_names}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>예약 테이블:</Text>
              <Text style={styles.info}>{item.table_id}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>예약 날짜:</Text>
              <Text style={styles.info}>{item.res_time}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>시작 시간:</Text>
              <Text style={styles.info}>{item.start_time}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>종료 시간:</Text>
              <Text style={styles.info}>{item.end_time}</Text>
            </View>
          </View>
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  infoLabel: {
    fontWeight: "bold",
    marginRight: 10,
  },
  info: {
    fontSize: 16,
  },
  itemContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
});

export default MyPage;
