import { Alert, Keyboard, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";

import { colors, parameters, titler } from "../../../global/styles";
import Input from "../input";
import Button from "../button";
import Loader from "../loader";
import { makeRequest } from "../../../axios";

const Register = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    fullname: "",
    username: "",
  });

  const [errors, setErrors] = useState({});
  const validate = () => {
    Keyboard.dismiss;
    let valid = true;
    if (!inputs.email) {
      handleError("Please input email", "email");
      valid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("Please input valid email", "email");
      valid = false;
    }
    if (!inputs.password) {
      handleError("Please input password", "password");
      valid = false;
    } else if (inputs.password.length < 4) {
      handleError("Min length of 4", "password");
      valid = false;
    }
    if (!inputs.fullname) {
      handleError("Please input fullname", "fullname");
      valid = false;
    }
    if (!inputs.username) {
      handleError("Please input username", "username");
      valid = false;
    }
    if (valid) {
      register();
    }
  };
  const register = async () => {
    setIsLoading(true);

    try {
      const res = await makeRequest.post("/auth/register", inputs);

      if (res.status === 201) {
        navigation.replace("login");
      }
    } catch (error) {
      Alert.alert("Error", error.message, [{ text: "OK" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <Loader visible={isLoading} />
      <ScrollView
        contentContainerStyle={{ padding: 50, paddingHorizontal: 20 }}
      >
        <Text style={{ color: colors.black, fontSize: 40, fontWeight: "bold" }}>
          Register
        </Text>
        <Text style={{ color: colors.grey, fontSize: 18, marginVertical: 10 }}>
          Enter Your Details to Register
        </Text>
        <View style={{ marginVertical: 20 }}>
          <Input
            placeholder="Enter your email"
            label="Email"
            iconName="email-outline"
            error={errors.email}
            onFocus={() => {
              handleError(null, "email");
            }}
            onChangeText={(text) => handleChange(text, "email")}
          />
          <Input
            placeholder="Enter your password"
            label="Password"
            iconName="lock-outline"
            password
            onChangeText={(text) => handleChange(text, "password")}
            error={errors.password}
            onFocus={() => {
              handleError(null, "password");
            }}
          />
          {/* <Input
            placeholder="Enter your confirm Password"
            label="Confirm Password"
            iconName="lock-outline"
            password
          /> */}
          <Input
            placeholder="Enter your fullname"
            label="Fullname"
            iconName="account-outline"
            onChangeText={(text) => handleChange(text, "fullname")}
            error={errors.fullname}
            onFocus={() => {
              handleError(null, "fullname");
            }}
          />
          <Input
            // keyboardType="numeric"
            placeholder="Enter your username"
            label="username"
            iconName="account-outline"
            onChangeText={(text) => handleChange(text, "username")}
            error={errors.username}
            onFocus={() => {
              handleError(null, "username");
            }}
          />
        </View>
        <Button onPress={validate} title="Register" />
        <Text
          onPress={() => navigation.navigate("login")}
          style={{
            color: colors.black,
            fontSize: 16,
            textAlign: "center",
            fontWeight: "bold",
            marginTop: 10,
          }}
        >
          Already have an account ?Login
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;

// const styles = StyleSheet.create({});
