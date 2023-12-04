import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";

import { StyleSheet } from "react-native";
import HomeScreen from "../components/home";
import Loader from "../components/loader";
import Login from "../components/login";
import Register from "../components/register";
import DrawerNavigator from "./drawerNavigation";
import Deposit from "../components/money/deposit";
import Withdraw from "../components/money/withdraw";
import Transfer from "../components/money/transfer";

const Stack = createNativeStackNavigator();
const StackNavigation = () => {
  const [initialRouteName, setInitialRouteName] = useState("");
  useEffect(() => {
    setTimeout(authUser, 2000);
  }, []);
  const authUser = async () => {
    try {
      let userData = await AsyncStorage.getItem("user");
      if (userData) {
        userData = JSON.parse(userData);
        if (userData?.token) {
          setInitialRouteName("home");
        } else {
          setInitialRouteName("login");
        }
      } else {
        setInitialRouteName("register");
      }
    } catch (error) {
      setInitialRouteName("register");
    }
  };

  return (
    // <NavigationContainer>
    <>
      {initialRouteName === "" ? (
        <Loader visible={true} />
      ) : (
        <>
          <Stack.Navigator
            initialRouteName={initialRouteName}
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="register" component={Register} />
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="home" component={HomeScreen} />

            <Stack.Screen name="deposit" component={Deposit} />
            <Stack.Screen name="withdraw" component={Withdraw} />
            <Stack.Screen name="transfer" component={Transfer} />
            {/* <Stack.Screen name="history" component={History} /> */}
          </Stack.Navigator>
        </>
      )}
    </>
    // </NavigationContainer>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({});
