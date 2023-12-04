import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { makeRequest } from "../../../axios";

import { colors } from "../../../global/styles";
import Button from "../button";
import Input from "../input";
import Loader from "../loader";

const Login = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const validate = () => {
    Keyboard.dismiss;
    let valid = true;
    if (!inputs.username.trim()) {
      handleError("Please input username", "username");
      valid = false;
    }

    if (!inputs.password.trim()) {
      handleError("Please input password", "password");
      valid = false;
    }

    if (valid) {
      login();
    }
  };

  const login = async () => {
    setIsLoading(true);

    try {
      const res = await makeRequest.post("/auth/login", inputs);

      if (res.status === 201) {
        const userData = res.data;
        await AsyncStorage.setItem("keepLoggedIn", JSON.stringify(true));
        await AsyncStorage.setItem(
          "user",
          JSON.stringify({ ...userData, token: userData.token })
        );
        navigation.replace("home");
      }
    } catch (error) {
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
    <SafeAreaView>
      <Loader visible={isLoading} />
      <ScrollView
        contentContainerStyle={{ padding: 50, paddingHorizontal: 20 }}
      >
        <Text style={{ color: colors.black, fontSize: 40, fontWeight: "bold" }}>
          Login
        </Text>
        <Text style={{ color: colors.grey, fontSize: 18, marginVertical: 10 }}>
          Enter Your Details to Login
        </Text>
        <View style={{ marginVertical: 20 }}>
          <Input
            placeholder="Enter your username"
            label="username"
            iconName="account-outline"
            error={errors.username}
            onFocus={() => {
              handleError(null, "username");
            }}
            onChangeText={(text) => handleChange(text, "username")}
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
        </View>
        <Button onPress={validate} title="Login" />
        <Text
          onPress={() => navigation.navigate("register")}
          style={{
            color: colors.black,
            fontSize: 16,
            textAlign: "center",
            fontWeight: "bold",
            marginTop: 10,
          }}
        >
          Dont have an account ?Register
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
