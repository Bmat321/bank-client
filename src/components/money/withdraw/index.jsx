import { useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, Keyboard, SafeAreaView, StyleSheet, View } from "react-native";
import { makeRequest } from "../../../../axios";
import Button from "../../button";
import Input from "../../input";
import Arrowback from "../backArrow";
import Loader from "../../loader";
import { useToast } from "react-native-toast-notifications";
import { Platform } from "react-native";
import { Icon } from "react-native-elements";

const Withdraw = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { params } = useRoute();

  const [inputs, setInputs] = useState({
    account_no: params?.afterUser?.account_no,
    amount: 0,
  });

  const [errors, setErrors] = useState({});
  const [err, setErr] = useState(false);
  const toast = useToast();

  const handleChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: +text }));
  };
  const validate = () => {
    let valid = true;
    if (!inputs.amount || inputs.amount < 0) {
      handleError(
        "Please input amount and amount must be greater than 0 ",
        "amount"
      );
      valid = false;
    }
    if (valid) {
      withdraw();
    }
  };

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  const withdraw = async () => {
    setIsLoading(true);
    try {
      const res = await makeRequest.put("/auth/withdraw", inputs);

      if (res.request.status === 200) {
        toast.show(res.data);
      }
      setTimeout(() => navigation.goBack(), 8000);
    } catch (error) {
      setErr(error.response.data);
    }
    setIsLoading(false);
  };
  return (
    <SafeAreaView style={{ marginTop: Platform.OS === "android" ? 30 : 0 }}>
      <Loader visible={isLoading} />
      <View style={{ alignItems: "flex-start", paddingLeft: 8 }}>
        <Icon
          name="arrow-back"
          size={30}
          onPress={() => navigation.navigate("home")}
        />
      </View>
      {/* <Arrowback navigation={navigation} /> */}
      <View
        style={{
          padding: 10,
          justifyContent: "center",

          width: "100%",
          height: "70%",
        }}
      >
        <Input
          value={inputs.account_no}
          onChangeText={(text) => handleChange(text, inputs.account_no)}
          editable={false}
          display={inputs.account_no && "none"}
        />

        <Input
          placeholder="Enter amount"
          keyboardType="numeric"
          returnKeyType="done"
          error={errors.amount}
          onFocus={() => {
            handleError(null, "amount");
          }}
          onChangeText={(text) => handleChange(text, "amount")}
        />
        {err && (
          <Text
            style={{ marginHorizontal: 5, paddingHorizontal: 5, color: "red" }}
          >
            {err}
          </Text>
        )}
        <Button title="Withdraw" onPress={validate} />
      </View>
    </SafeAreaView>
  );
};

export default Withdraw;

const styles = StyleSheet.create({});
