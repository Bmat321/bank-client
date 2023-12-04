import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../../../../global/styles";

const CircleIcon = ({ style, children }) => {
  return <View style={styles.container}>{children}</View>;
};

export default CircleIcon;

const styles = StyleSheet.create({
  container: {
    width: 35,
    borderLeftWidth: 5,
    height: 35,
    borderRadius: 15,
    justifyContent: "center",
    borderWidth: 1,
    backgroundColor: colors.grey10,
    borderColor: colors.mainColo,

    alignItems: "center",
    overflow: "hidden",
    marginHorizontal: 10,
    marginVertical: 10,
  },
});
