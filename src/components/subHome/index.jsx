import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ProfilePicture from "../profilePicture";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Card from "./card";
import AfterCard from "./sub1Home";
import Button from "../button";
import { makeRequest } from "../../../axios";
import { AuthContext } from "../../context/authContext";
import { abs } from "react-native-reanimated";

const PROFILE =
  "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load";

const SubHome = ({ navigation, userDetails, logout }) => {
  const [user, setUser] = useState([]);
  console.log("user", user);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getTheUser();
    });

    return unsubscribe;
  }, [navigation]);

  const getTheUser = async () => {
    setIsLoading(true);
    try {
      const res = await makeRequest.get(`/users/find/${userDetails.id}`);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logoutEver = () => {
    logout();
    navigation.navigate("login");
  };
  return (
    <View style={{ margin: 10 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 10,
        }}
      >
        <Icon name="menu" size={30} onPress={() => navigation.openDrawer()} />
        {user ? (
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "green" }}>
            {user?.username}
          </Text>
        ) : (
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "green" }}>
            WELCOME
          </Text>
        )}
        {/* <ProfilePicture
          image={PROFILE}
          size={40}
          height={50}
          width={50}
          borderRadius={50}
          borderWidth={2}
        /> */}
      </View>
      <Card userCard={user} isLoading={isLoading} />
      <AfterCard profile={PROFILE} afterUser={user} />
      <View
        style={{
          bottom: 50,
          position: "absolute",

          width: "100%",
        }}
      ></View>

      <View
        style={{
          marginHorizontal: 20,
          position: "absolute",
          bottom: -300,
          left: 0,
        }}
      >
        <Button title={"Logout"} onPress={logoutEver} />
      </View>
    </View>
  );
};

export default SubHome;

const styles = StyleSheet.create({});
