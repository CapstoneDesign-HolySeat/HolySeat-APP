import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="CafeDetails"
          component={CafeDetails}
          options={{ title: "Cafe Details" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function CafeDetails({ navigation, route }) {
  const [cafeName, setCafeName] = useState("");
  const [cafeAddress, setCafeAddress] = useState("");
  const [tableA, setTableA] = useState("");
  const [tableB, setTableB] = useState("");

  useEffect(() => {
    navigation.setOptions({
      title: "New Cafe",
      headerRight: () => (
        <TouchableOpacity style={styles.button} onPress={addCafe}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      ),
    });
  }, [cafeName, cafeAddress, tableA, tableB]);

  const addCafe = () => {
    const data = {
      name: cafeName,
      address: cafeAddress,
      horizTableCount: tableA,
      vertTableCount: tableB,
    };
    fetch("http://192.168.200.187:4000/cafes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        Alert.alert("Cafe added successfully");
        navigation.goBack();
      })
      .catch((error) => {
        console.error("There was a problem adding the cafe:", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={cafeName}
        onChangeText={setCafeName}
      />

      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.input}
        value={cafeAddress}
        onChangeText={setCafeAddress}
      />

      <Text style={styles.label}>Table A</Text>
      <TextInput
        style={styles.input}
        value={tableA}
        onChangeText={setTableA}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Table B</Text>
      <TextInput
        style={styles.input}
        value={tableB}
        onChangeText={setTableB}
        keyboardType="numeric"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    fontSize: 16,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 4,
    marginRight: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
