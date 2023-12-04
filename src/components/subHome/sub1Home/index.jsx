import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { boxs } from "../../../../data";

const AfterCard = ({ afterUser }) => {
  const navigation = useNavigation();

  const { params } = useRoute();
  const fundTransfer = params ? params.funds : null;

  useEffect(() => {
    // storeHistory();
  }, [fundTransfer]);

  const handleNavigation = (navi) => {
    if (navi === "deposit1") {
      return navigation.navigate("deposit", { afterUser });
    }
    if (navi === "withdraw1") {
      return navigation.navigate("withdraw", { afterUser });
    }
    if (navi === "transfer1") {
      return navigation.navigate("transfer", { afterUser });
    }
    if (navi === "history") {
      return navigation.navigate("history");
    }
  };

  return (
    <View>
      <View>
        <View>
          {boxs.map((box) => (
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                marginTop: 15,
                marginHorizontal: 15,
              }}
              key={box.id}
            >
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => handleNavigation("deposit1")}
              >
                <View style={[styles.transfer, { backgroundColor: "green" }]}>
                  <Text style={{ color: "white" }}>{box.deposit}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => handleNavigation("withdraw1")}
              >
                <View style={[styles.transfer, { backgroundColor: "red" }]}>
                  <Text style={{ color: "white" }}>{box.withdraw}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => handleNavigation("transfer1")}
              >
                <View style={[styles.transfer, { backgroundColor: "blue" }]}>
                  <Text style={{ color: "white" }}>{box.transfer}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => handleNavigation("history")}
              >
                <View
                  style={[styles.transfer, { backgroundColor: "lightgreen" }]}
                >
                  <Text style={{ color: "white" }}>{box.history}</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default AfterCard;

const styles = StyleSheet.create({
  transfer: {
    display: "flex",
    borderWidth: 1,
    height: 50,
    width: 90,
    borderRadius: 15,
    flexDirection: "row",
    margin: 2,
    justifyContent: "center",
    alignItems: "center",
  },

  item: {
    borderWidth: 2,
    height: 40,
    width: 40,
    borderRadius: 50,
    borderColor: "green",
    marginVertical: 10,
    resizeMode: "cover",
  },
});
