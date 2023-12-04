import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { parameters } from "../../../global/styles";
import SubHome from "../subHome";
import { AuthContext } from "../../context/authContext";
import { Platform } from "react-native";

const HomeScreen = ({ navigation }) => {
  const { userDetails, logout } = useContext(AuthContext);
  console.log("first", userDetails);
  return (
    <SafeAreaView
      style={[
        parameters.headerHeight,
        { flex: 1, marginTop: Platform.OS === "android" ? 30 : 0 },
      ]}
    >
      <View style={{ height: "100%" }}>
        <SubHome
          navigation={navigation}
          userDetails={userDetails}
          logout={logout}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
