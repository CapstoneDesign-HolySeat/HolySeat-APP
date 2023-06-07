import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  handleUserIconPress,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export const List = [
  {
    id: 1,
    category: "#조용한, #공부하기 좋은",
    name: "투썸플레이스 경산하양점",
    address: "경북 경산시 하양읍 하양로 58 투썸플레이스",
    hours: "오전 10:00~오후 10:00",
    tableA: 3,
    tableB: 3,
    coordinates: { latitude: 35.910430, longitude: 128.815693 },
  },
  {
    id: 2,
    category: "#공부하기 좋은",
    name: "투썸플레이스 하양광장메디컬점",
    address: "경북 경산시 하양읍 서사도리9로 27",
    hours: "오전 08:00~오후 10:00",
    tableA: 3,
    tableB: 4,
    coordinates: { latitude: 35.916646, longitude: 128.812621 },
  },
  {
    id: 3,
    category: "#디저트 맛집",
    name: "커피홀베이커리 경산하양점",
    address: "경북 경산시 하양읍 문화로 20-2 2층 커피홀",
    hours: "오전 10:00~오후 10:00",
    tableA: 3,
    tableB: 2,
    coordinates: { latitude: 35.910944, longitude: 128.812723 },
  },
  {
    id: 4,
    category: "#공부하기 좋은",
    name: "파스쿠찌 경산하양점",
    address: "경북 경산시 하양읍 하양로 52 파스쿠찌",
    hours: "오전 10:00~오후 10:00",
    tableA: 4,
    tableB: 3,
    coordinates: { latitude: 35.912122, longitude: 128.817491 },
  },
  {
    id: 5,
    category: "#디저트 맛집",
    name: "마사커피 하양점",
    address: "경북 경산시 하양읍 대학로 1527 마사커피",
    hours: "오전 11:00~오후 09:30",
    tableA: 3,
    tableB: 3,
    coordinates: { latitude: 35.914223, longitude: 128.820716 },
  },
  {
    id: 6,
    category: "#가격이 착한",
    name: "빽다방 경산하양중앙점",
    address: "경북 경산시 하양읍 하양로 72",
    hours: "오전 10:00~오후 10:00",
    tableA: 3,
    tableB: 2,
    coordinates: { latitude: 35.911565, longitude: 128.816768 },
  },
  {
    id: 7,
    category: "#자연의 #독특한",
    name: "블루샥 하양점",
    address: "경북 경산시 하양읍 서사도리9로 25 107호",
    hours: "오전 08:00~오후 09:00",
    tableA: 3,
    tableB: 5,
    coordinates: { latitude: 35.916950, longitude: 128.813271 },
  },
  {
    id: 8,
    category: "#디저트 맛집",
    name: "요거트월드 하양점",
    address: "경북 경산시 하양읍 대학로305길 51-2 2층 요거트월드 ",
    hours: "오전 11:00~오전 12:05",
    tableA: 4,
    tableB: 4,
    coordinates: { latitude: 35.910817, longitude: 128.816836 },
  },
  {
    id: 9,
    category: "#가격이 착한",
    name: "텐퍼센트커피 경산하양점",
    address: "경북 경산시 하양읍 하양로 55",
    hours: "오전 09:00~오후 10:00",
    tableA: 4,
    tableB: 2,
    coordinates: { latitude: 35.910467, longitude: 128.815071 },
  },
  {
    id: 10,
    category: "#가격이 착한",
    name: "이디야커피 경산하양금락점",
    address: "경북 경산시 하양읍 대학로295길 14",
    hours: "오전 09:30~오후 10:00",
    tableA: 5,
    tableB: 3,
    coordinates: { latitude: 35.909606, longitude: 128.821909 },
  },
  // {
  //   id: 11,
  //   category: "#디저트 맛집",
  //   name: "구스켓 인 더 크로플 하양점",
  //   address: "경북 경산시 하양읍 금송로 2-1 1층 구스켓인더크로플 하양점",
  //   hours: "오전 10:00~오후 11:00",
  //   tableA: 4,
  //   tableB: 4,
  //   coordinates: { latitude: 35.914115, longitude: 128.819159 },
  // },
  // {
  //   id: 12,
  //   category: "#가격이 착한",
  //   name: "매머드익스프레스 경산하양점",
  //   address: "경북 경산시 하양읍 서사도리9로 17 드림스퀘어2 1층 110호",
  //   hours: "오전 08:00~오후 09:30",
  //   tableA: 3,
  //   tableB: 3,
  //   coordinates: { latitude: 35.917718, longitude: 128.813276 },
  // },
  // {
  //   id: 13,
  //   category: "#디저트 맛집",
  //   name: "핸즈커피 하양점",
  //   address: "경북 경산시 하양읍 동서리 878-1",
  //   hours: "오전 08:00~오후 11:00",
  //   tableA: 4,
  //   tableB: 4,
  //   coordinates: { latitude: 35.918625, longitude: 128.831027 },
  // },
  // {
  //   id: 14,
  //   category: "#조용한",
  //   name: "아틀리에빈 하양점",
  //   address: "경북 경산시 하양읍 하양로 199-1",
  //   hours: "오전 10:00~오후 09:00",
  //   tableA: 4,
  //   tableB: 2,
  //   coordinates: { latitude: 35.918014, longitude: 128.827157 },    
  // },
  // {
  //   id: 15,
  //   category: "#조용한 #공부하기좋은",
  //   name: "스텀프하우스",
  //   address: "경북 경산시 하양읍 대경로 669",
  //   hours: "오전 10:00~오후 12:00",
  //   tableA: 3,
  //   tableB: 3,
  //   coordinates: { latitude: 35.908479, longitude: 128.814703 },
  // },
];


export default function Category({ navigation, route }) {
  const {customerId} = route.params;
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredCafes, setFilteredCafes] = useState([]);
 
  const handleSearch = () => {
    const filtered = List.filter((cafe) =>
      cafe.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredCafes(filtered);
  };

  // const handleCategorySelect = (category) => {
  //   setSelectedCategory(category);
  //   const filtered = List.filter((cafe) => cafe.category.includes("#조용한"));
  //   setFilteredCafes(filtered);
  // };
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    const filtered = List.filter((cafe) => cafe.category.includes(category));
    setFilteredCafes(filtered);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ padding: 16 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("MyPage", {customerId})}
            style={styles.userIconContainer}
          >
            <FontAwesome name="user" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.categoryContainer}>
          <ScrollView horizontal={true}>
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() => handleCategorySelect("#전체")}
            >
              <Text style={styles.categoryButtonText}>전체</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() => handleCategorySelect("#조용한")}
            >
              <Text style={styles.categoryButtonText}>조용한</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() => handleCategorySelect("공부하기 좋은")}
            >
              <Text style={styles.categoryButtonText}>공부하기 좋은</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() => handleCategorySelect("디저트 맛집")}
            >
              <Text style={styles.categoryButtonText}>디저트 맛집</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() => handleCategorySelect("독특한")}
            >
              <Text style={styles.categoryButtonText}>독특한</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() => handleCategorySelect("자연의")}
            >
              <Text style={styles.categoryButtonText}>자연의</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() => handleCategorySelect("가격이 착한")}
            >
              <Text style={styles.categoryButtonText}>가격이 착한</Text>
            </TouchableOpacity>
            {/* 카테고리 추가 */}
          </ScrollView>
        </View>

        <ScrollView>
          {filteredCafes.length > 0
            ? filteredCafes.map((cafe) => (
                <TouchableOpacity
                  style={styles.cafeContainer}
                  key={cafe.id}
                  onPress={() =>
                    navigation.navigate("CafeInfo", { 
                      customerId: customerId, 
                      cafeId: cafe.id,
                    })
                  }
                >
                  <Text style={styles.cafeName}>{cafe.name}</Text>
                  <Text style={styles.cafeAddress}>{cafe.address}</Text>
                  <Text style={styles.cafeCategory}>{cafe.category}</Text>
                </TouchableOpacity>
              ))
            : List.map((cafe) => (
                <TouchableOpacity
                  style={styles.cafeContainer}
                  key={cafe.id}
                  onPress={() =>
                    navigation.navigate("CafeInfo", { 
                      customerId: customerId,
                      cafeId: cafe.id,
                     })
                  }
                >
                  <Text style={styles.cafeName}>{cafe.name}</Text>
                  <Text style={styles.cafeAddress}>{cafe.address}</Text>
                  <Text style={styles.cafeCategory}>{cafe.category}</Text>
                </TouchableOpacity>
              ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#101113",
  },
  searchContainer: {
    //backgroundColor: "#101113",
    padding: 10,
    margin: 10,
    borderRadius: 20,
  },
  searchInput: {
    fontSize: 16,
  },
  cafeContainer: {
    backgroundColor: "#fff",
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  cafeName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cafeAddress: {
    fontSize: 16,
    marginBottom: 5,
  },
  cafeCategory: {
    fontSize: 16,
    color: "#757575",
  },
  container: {
    flex: 1,
    backgroundColor: "#23282F",
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 5,
  },
  searchInput: {
    backgroundColor: "white",
    borderRadius: 5,
    paddingVertical: 7,
    paddingHorizontal: 10,
    width: "80%",
  },
  searchButton: {
    backgroundColor: "white",
    borderRadius: 5,
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
  searchButtonText: {
    color: "black",
    fontWeight: "bold",
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 5,
  },
  categoryButton: {
    backgroundColor: "white",
    borderRadius: 5,
    paddingVertical: 7,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  categoryButtonText: {
    color: "#5D5D5D",
    fontWeight: "bold",
  },
  ListContainer: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  cafeCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  cafeName: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  cafeInfo: {
    color: "#5D5D5D",
    marginBottom: 5,
  },
  cafeImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 5,
  },
  noCafeText: {
    textAlign: "center",
    marginTop: 50,
    color: "#5D5D5D",
  },
  userIconContainer: {
    position: "absolute",
    top: -15,
    right: 16,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
});
