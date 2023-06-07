import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapView from "react-native-maps";
import { List } from './Category'

const CafeInfo = ({ navigation, route }) => {
  const { customerId, cafeId } = route.params;
  const [cafeName, setCafeName] = useState("");
  const [cafeAddress, setCafeAddress] = useState("");
  const [cafeTables, setCafeTables] = useState("");
  const [cafeCoordinates, setCafeCoordinates] = useState("");
  const [cafeHours, setCafeHours] = useState("");
  const [tableA, setTableA] = useState("");
  const [tableB, setTableB] = useState("");

  // const tableA = cafe.tableA;
  // const tableB = cafe.tableB;
  // const capacity = tableA * tableB;

  // const [reservationTime, setReservationTime] = useState("");
  // const [numberOfPeople, setNumberOfPeople] = useState("");

  useEffect(() => {
    // 카페 데이터 배열에서 해당 ID에 맞는 카페를 찾아 이름과 주소를 설정합니다.
    const cafe = List.find((cafe) => cafe.id === cafeId);
    if (cafe) {
      setCafeName(cafe.name);
      setCafeAddress(cafe.address);
      setCafeHours(cafe.hours)
      setCafeCoordinates(cafe.coordinates);
      setTableA(cafe.tableA);
      setTableB(cafe.tableB);
    }
    tableCount(cafe.name)
  }, [cafeId]);

  const tableCount = (cafeName) => {
    // Send a request to the server to fetch the count of available tables
    fetch("http://192.168.200.187:4000/tablecount", {
      method: "POST",
      body: JSON.stringify({ cafeName }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the count of available tables
        setCafeTables(data.count);
      })
      .catch((error) => {
        console.error("Error fetching available tables:", error);
      });
  };
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: cafeCoordinates.latitude,
          longitude: cafeCoordinates.longitude,
          latitudeDelta: 0.0035,
          longitudeDelta: 0.0001,
        }}
        provider={PROVIDER_GOOGLE}
      >
        {cafeCoordinates.latitude && cafeCoordinates.longitude && (
          <Marker
            coordinate={{
              latitude: cafeCoordinates.latitude,
              longitude: cafeCoordinates.longitude,
            }}
            title={cafeName}
            description={cafeAddress}
          />
        )}
      </MapView>
      <View style={styles.detailsContainer}>
        <Text style={styles.cafeName}>{cafeName}</Text>
        <Text style={styles.cafeAddress}>{cafeAddress}</Text>
        <Text style={styles.cafeHours}>영업시간: {cafeHours}</Text>
        <Text style={styles.cafeTables}>여석 수: {cafeTables}</Text>
        <View style={styles.inputContainer}>
        </View>
        <TouchableOpacity
          style={styles.reserveButton}
          onPress={() => navigation.navigate("Res", { customerId: customerId, tableA, tableB, cafeName })}
        >
          <Text style={styles.reserveButtonText}>Reserve</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  detailsContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cafeName: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 5,
  },
  cafeAddress: {
    fontSize: 16,
    color: "gray",
    marginBottom: 10,
  },
  cafeHours: {
    fontSize: 16,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
  },
  reserveButton: {
    backgroundColor: "#23282F",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  reserveButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default CafeInfo;