import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import UserLogin from "./screens/UserLogin";
import Cafe_list from "./screens/Cafe_list";
import AdminPage from "./screens/AdminPage";
import Res from "./screens/Res";
import CafeDetails from "./screens/CafeDetails";
import Category from "./screens/Category";
import UserSign from "./screens/UserSign";
import CafeInfo from "./screens/CafeInfo";
import Start from "./screens/Start";
import LoginSelect from "./screens/LoginSelect";
import CafeLogin from "./screens/CafeLogin";
import MyPage from "./screens/MyPage";
import TableRes from "./screens/TableRes";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen
          name="UserSign"
          component={UserSign}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Cafe_list" component={Cafe_list} />
        <Stack.Screen name="AdminPage" component={AdminPage} />
        <Stack.Screen name="Res" component={Res} options={{ headerShown: false }}/>
        <Stack.Screen name="CafeDetails">
          {() => <CafeDetails cafeName="1" />}
        </Stack.Screen>
        <Stack.Screen
          name="UserLogin"
          component={UserLogin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Category"
          component={Category}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CafeInfo"
          component={CafeInfo}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Start"
          component={Start}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginSelect"
          component={LoginSelect}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CafeLogin"
          component={CafeLogin}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="MyPage" component={MyPage} />
        <Stack.Screen name="TableRes" component={TableRes} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
