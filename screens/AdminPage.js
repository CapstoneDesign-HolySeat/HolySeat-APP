import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, ScrollView, Text, View, FlatList } from "react-native";

export default function AdminPage({ route }) {
  const { adminId } = route.params;
  const [seats, setSeats] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [tableStatus, setTableStatus] = useState([]);
  //admin1
  let tableA = 3;
  let tableB = 3;
  const cafeName = '투썸플레이스 경산하양점';

  useEffect(() => {
    // 서버에서 테이블 상태 정보를 조회하는 함수
    const fetchTableStatus = async () => {
      try {
        const response = await fetch(`http://192.168.200.187:4000/cafe-tables?cafeName=${cafeName}`);
        const data = await response.json();
        setTableStatus(data);
      } catch (error) {
        console.error('Error fetching table status:', error);
      }
    };

    fetchTableStatus();
  }, [cafeName]);

  useEffect(() => {
    // 서버에서 예약 현황 정보를 조회하는 함수
    const fetchReservations = async () => {
      try {
        const response = await fetch('http://192.168.200.187:4000/adminres');
        const data = await response.json();
        setReservations(data);
      } catch (error) {
        console.error('Error fetching reservation details:', error);
      }
    };

    fetchReservations();
  }, []);

  const handleTableClick = (tableNum) => {
    console.log(`Table ${tableNum} clicked!`);
  };

  const renderTable = (tableNum) => {
    // tableNum에 해당하는 테이블의 상태 정보 가져오기
    const table = tableStatus.find((t) => t.table_id === tableNum);
    const isTableAvailable = table && table.table_status === 0;

    const tableStyle = isTableAvailable ? styles.tableEnabled : styles.tableDisabled;
    const tableTextStyle = isTableAvailable ? styles.tableTextEnabled : styles.tableTextDisabled;
    const onPress = isTableAvailable ? () => handleTableClick(tableNum) : null;

    return (
      <TouchableOpacity
        key={tableNum}
        style={[styles.table, tableStyle]}
        onPress={onPress}
      >
        <Text style={[styles.tableText, tableTextStyle]}>{tableNum}</Text>
      </TouchableOpacity>
    );
  };

  const renderTablesGrid = () => {
    const tables = [];

    for (let i = 1; i <= tableB; i++) {
      const row = [];
      for (let j = 1; j <= tableA; j++) {
        const tableNum = (i - 1) * tableA + j;
        row.push(renderTable(tableNum));
      }
      tables.push(
        <View key={`row_${i}`} style={styles.tableRow}>
          {row}
        </View>
      );
    }
    return tables;
  };

  const renderReservationItem = ({ item }) => (
    <View style={styles.reservation}>
      <View style={styles.reservationDetails}>
        <Text style={styles.reservationTitle}>사용자</Text>
        <Text style={styles.reservationText}>{item.c_nick}</Text>
      </View>
      <View style={styles.reservationDetails}>
        <Text style={styles.reservationTitle}>전화번호</Text>
        <Text style={styles.reservationText}>{item.phone_number}</Text>
      </View>
      <View style={styles.reservationDetails}>
        <Text style={styles.reservationTitle}>예약 테이블</Text>
        <Text style={styles.reservationText}>{item.table_id}</Text>
      </View>
      <View style={styles.reservationDetails}>
        <Text style={styles.reservationTitle}>시작 시간</Text>
        <Text style={styles.reservationText}>{item.start_time}</Text>
      </View>
      <View style={styles.reservationDetails}>
        <Text style={styles.reservationTitle}>종료 시간</Text>
        <Text style={styles.reservationText}>{item.end_time}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>관리자 페이지입니다</Text>
        <Text style={styles.title}>{adminId}</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>남은 좌석</Text>
          <View style={styles.tablesContainer}>{renderTablesGrid()}</View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>에약 현황</Text>
          <FlatList
            data={reservations}
            renderItem={renderReservationItem}
            keyExtractor={(item, index) => index.toString()}
            style={styles.reservationList}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    marginTop: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  seats: {
    fontSize: 24,
    fontWeight: "bold",
  },
  reservation: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  reservationName: {
    fontSize: 16,
    marginRight: 10,
  },
  reservationSeat: {
    fontSize: 16,
    fontWeight: "bold",
  },
  tablesContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  table: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#9B928D',
    margin: 10,
  },
  tableText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  tableEnabled: {
    backgroundColor: '#3D3A36',
  },
  tableDisabled: {
    backgroundColor: '#C4C4C4',
  },
  tableTextEnabled: {
    color: '#FFFFFF',
  },
  tableTextDisabled: {
    color: '#9B928D',
  },
  reservation: {
    flexDirection: "column",
    marginBottom: 10,
    backgroundColor: "#F8F8F8",
    padding: 10,
    borderRadius: 10,
  },
  reservationDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  reservationTitle: {
    fontSize: 16,
    marginRight: 5,
    fontWeight: "bold",
  },
  reservationText: {
    fontSize: 16,
  },
  reservationList: {
    maxHeight: 300,
    marginBottom: 10,
  },
});
