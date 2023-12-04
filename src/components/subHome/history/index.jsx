import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
} from "react-native";
import Arrowback from "../../money/backArrow";
import { AuthContext } from "../../../context/authContext";
import { makeRequest } from "../../../../axios";
import Loader from "../../loader";

const History = ({ navigation }) => {
  const { userDetails } = useContext(AuthContext);

  const [transfers, setTransfers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(false);

  useEffect(() => {
    const transferHistory = async () => {
      setIsLoading(true);
      try {
        const res = await makeRequest.get("/users/summary");

        setTransfers(res.data);
      } catch (error) {
        setErr(res.response.message);
      }
    };

    transferHistory();
    setIsLoading(false);
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, marginTop: Platform.OS === "android" ? 30 : 0 }}
    >
      <View style={{ flex: 1 }}>
        <Arrowback navigation={navigation} />
        <Text style={{ textAlign: "center", color: "grey" }}>
          Transfer History
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            margin: 20,
            borderWidth: 1,
            padding: 2,
            borderRadius: 4,
          }}
        >
          <Text>Fullname</Text>
          <Text>Date</Text>
          <Text>Amount</Text>
        </View>
        <View>{err}</View>
        {isLoading ? (
          <Loader />
        ) : (
          <ScrollView>
            {transfers.map((transfer) => (
              <View key={transfer.id}>
                {userDetails.id === transfer.account_id ? (
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginHorizontal: 20,
                      borderRadius: 10,
                      borderWidth: 2,
                      marginTop: 10,
                      padding: 8,
                      backgroundColor: "green",
                      borderColor: "green",
                    }}
                  >
                    <Text style={{ fontSize: 10 }}>Cr:</Text>
                    <Text>{transfer.fullname}</Text>
                    <Text style={{ fontSize: 10 }}>
                      {transfer.date_withdrawn}
                    </Text>

                    <Text> {`N ${transfer.transfer_amount}.00`}</Text>
                  </View>
                ) : (
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginHorizontal: 20,
                      borderRadius: 10,
                      borderWidth: 2,
                      marginTop: 10,
                      padding: 8,
                      backgroundColor: "red",
                      borderColor: "red",
                    }}
                  >
                    <Text style={{ fontSize: 10 }}>Db:</Text>
                    <Text>{transfer.fullname}</Text>
                    <Text>{transfer.date_withdrawn.slice(11, 16)}</Text>

                    <Text>{`N ${transfer.transfer_amount}.00`}</Text>
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default History;

const styles = StyleSheet.create({});
