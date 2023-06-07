import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { useNavigation } from '@react-navigation/native';

export default function TableRes({ route }) {
  const { customerId, cafeName, tableNum, tableA, tableB } = route.params;
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const navigation = useNavigation();
  
  const handleStartTimeChange = (index, value) => {
    setStartTime(value);
  };

  const handleEndTimeChange = (index, value) => {
    setEndTime(value);
  };

  const handleReservation = () => {
    const url = 'http://192.168.200.187:4000/tableres';
    const data = {
      c_nick: customerId,
      cafe_names: cafeName,
      table_id: tableNum,
      start_time: startTime,
      end_time: endTime,
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(responseData => {
        console.log('Reservation successful:', responseData);
        Alert.alert('예약이 완료되었습니다.', '', [
          {
            text: '확인',
            onPress: () => navigation.navigate('Category', {customerId: customerId}),
          },
        ]);
      })
      .catch(error => {
        console.log(data);
        console.error('Reservation failed', error);
        Alert.alert('예약에 실패했습니다.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text1}>{cafeName}</Text>
      <Text style={styles.text}>사용자 ID : {customerId}</Text>
      <Text style={styles.text}>예약 번호 : {tableNum}</Text>

      <View style={styles.dropdownContainer}>
        <Text style={styles.dropdownLabel}>예약 시작 시간</Text>
        <ModalDropdown
          options={[
            '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM'
            , '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'
          ]}
          defaultValue={startTime}
          style={styles.dropdown}
          textStyle={styles.dropdownText}
          dropdownStyle={styles.dropdownList}
          onSelect={handleStartTimeChange}
        />
      </View>

      <View style={styles.dropdownContainer}>
        <Text style={styles.dropdownLabel}>예약 종료 시간</Text>
        <ModalDropdown
          options={[
            '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM'
            , '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'
          ]}
          defaultValue={endTime}
          style={styles.dropdown}
          textStyle={styles.dropdownText}
          dropdownStyle={styles.dropdownList}
          onSelect={handleEndTimeChange}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleReservation}>
        <Text style={styles.buttonText}>예약</Text>
      </TouchableOpacity>
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
  text: {
    fontSize: 24,
    // fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFFFFF',
  },
  text1: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#FFFFFF',
  },
  dropdownContainer: {
    marginTop: 30,
  },
  dropdownLabel: {
    fontSize: 18,
    // fontWeight: 'bold',
    marginBottom: 5,
    color: '#FFFFFF',
  },
  dropdown: {
    width: 250,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
    borderRadius: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  dropdownText: {
    fontSize: 20,
  },
  dropdownList: {
    width: 200,
    backgroundColor: '#FFFFFF',
  },
  button: {
    marginTop: 80,
    backgroundColor: '#dddddd',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
