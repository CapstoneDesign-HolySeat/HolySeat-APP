import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useState, useEffect } from "react";

export default function Res({ navigation, route }) {
  const { customerId, tableA, tableB, cafeName } = route.params;
  const [tableStatus, setTableStatus] = useState([]);

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

  const handleTableClick = (tableNum) => {
    navigation.navigate('TableRes', { customerId, tableNum, cafeName, tableA, tableB });
    console.log(`Table ${tableNum} clicked!`);
    console.log(customerId);
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

  return (
    <View style={styles.container}>
      <Text style={styles.cafeName}>{cafeName}</Text>
      <View style={styles.tablesContainer}>{renderTablesGrid()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#23282F",
    alignItems: 'center',
    justifyContent: 'center',
  },
  cafeName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF',
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
});
