import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  navigation,
} from "react-native";
import { Button } from "react-native-elements";
import {
  createStackNavigator,
  NavigationContainer,
} from "@react-navigation/stack";
import axios from "axios";
import Res from "./Res";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="cafe_list">
        <Stack.Screen name="cafe_list" component={Cafe_list} />
        <Stack.Screen name="Res" component={Res} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Cafe_list({ navigation }) {
  const [cafeList, setCafeList] = useState([]);

  useEffect(() => {
    axios
      .get("http://192.168.200.187:4000/cafe")
      .then((response) => {
        const data = Object.values(response.data);
        setCafeList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={cafeList}
        renderItem={({ item }) => (
          <View style={[styles.listItem, { backgroundColor: "white" }]}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemLocation}>주소 : {item.address}</Text>
            </View>
            <View style={styles.itemSeats}>
              <Text style={styles.itemSeatsText}>
                {item.table === 0 ? "예약 불가" : `잔여석: ${item.table}`}
              </Text>
              <Button
                title="예약하기"
                disabled={item.table === 0}
                buttonStyle={styles.buttonStyle}
                titleStyle={styles.titleStyle}
                onPress={() => navigation.navigate("Res", { cafe: item })}
              />
            </View>
          </View>
        )}
        keyExtractor={(item, index) => String(index)}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5EAD7",
    padding: 16,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  itemLocation: {
    fontSize: 14,
    color: "gray",
  },
  itemSeats: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "40%",
  },
  itemSeatsText: {
    fontSize: 14,
    marginRight: 8,
  },
  buttonStyle: {
    backgroundColor: "#FEF4D7",
  },
  titleStyle: {
    fontSize: 14,
    color: "black",
  },
});

export default Cafe_list;
