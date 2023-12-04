import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { makeRequest } from "../../../../axios";
import Button from "../../button";
import Input from "../../input";
import Loader from "../../loader";
import Arrowback from "../backArrow";
import { Platform } from "react-native";
import { Icon } from "react-native-elements";

const Transfer = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { params } = useRoute();
  const [userAccount, setUserAccount] = useState([]);
  const [inputs, setInputs] = useState({
    scrId: params?.afterUser?.account_no,
    destId: "",
    amount: 0,
  });
  const [errors, setErrors] = useState({});
  const [err, setErr] = useState(false);
  const toast = useToast();
  // const ref = useRef();

  useEffect(() => {
    setIsLoading(true);
    const getUsersAccount = async () => {
      try {
        const res = await makeRequest.get(`/users?m=${inputs.destId}`);
        setUserAccount(res.data);
      } catch (error) {}
    };
    if (
      inputs.destId.toString().length === 0 ||
      inputs.destId.toString().length > 7
    )
      getUsersAccount();
    // setHide(true);
    setIsLoading(false);
  }, [inputs.destId]);

  const handleChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: +text }));
  };
  const validate = () => {
    let valid = true;
    if (
      !inputs.destId ||
      (inputs.destId.toString().length > 0 &&
        inputs.destId.toString().length <= 7)
    ) {
      handleError(
        "Please enter your beneficiary account and must be 8 digit",
        "destId"
      );
      valid = false;
    }

    if (!inputs.amount || inputs.amount < 0) {
      handleError(
        "Please input amount and amount must be greater than 0 ",
        "amount"
      );
      valid = false;
    }
    if (valid) {
      transfer();
    }
  };

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  const transfer = async () => {
    setIsLoading(true);
    try {
      const res = await makeRequest.put("/auth/transfer", inputs);

      if (res.request.status === 200) {
        toast.show(
          res.data.map((item) => (
            <View key={item.id}>
              <Text>{`Youve transfer ${item.deposit} to ${item.fullname}`}</Text>
            </View>
          ))
        );
      }
      setTimeout(
        () =>
          navigation.navigate({
            name: "home",
            params: { funds: res.data },
            merge: true,
          }),
        4000
      );
    } catch (error) {
      setErr(error.response.data);
    }
    setIsLoading(false);
  };

  const finder = userAccount
    .filter((val) => {
      if (inputs.destId.toString() !== "") {
        return val;
      } else if (
        val.account_no.toLowerCase().includes(inputs.destId.toString())
      ) {
        return val;
      }
    })
    .map((item) => (
      <View key={item.id} style={{ marginTop: 2 }}>
        <Text style={{ textAlign: "right", color: "green" }}>
          {item.fullname}
        </Text>
      </View>
    ));
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
          //   alignItems: "center",
          width: "100%",
          height: "70%",
        }}
      >
        <Input
          value={inputs.scrId}
          onChangeText={(text) => handleChange(text, inputs.scrId)}
          editable={false}
          display={inputs.scrId && "none"}
        />

        <Input
          // value={ref}
          placeholder="Enter your beneficiary"
          keyboardType="numeric"
          returnKeyType="done"
          minLength="4"
          error={errors.destId}
          onFocus={() => {
            handleError(null, "destId");
          }}
          onChangeText={(text) => handleChange(text, "destId")}
        />
        {isLoading ? (
          <View>
            <Text></Text>
          </View>
        ) : userAccount.length > 0 && inputs.destId.toString().length > 7 ? (
          finder
        ) : inputs.destId.toString().length > 7 ? (
          <Text style={{ color: "red" }}>
            No beneficiary found with this account number
          </Text>
        ) : (
          <Text style={{ textAlign: "right" }}></Text>
        )}

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
        <Button
          title="Transfer"
          onPress={validate}
          disabled={inputs.destId.toString().length > 7 && finder.length !== 1}
        />
      </View>
    </SafeAreaView>
  );
};

export default Transfer;

const styles = StyleSheet.create({});
