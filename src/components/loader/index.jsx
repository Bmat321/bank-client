import {
  ActivityIndicator,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import { colors, parameters } from "../../../global/styles";

const Loader = ({ visible = false }) => {
  const { height, width } = useWindowDimensions();
  return (
    visible && (
      <View style={[styles.container, { height, width }]}>
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={parameters.buttonTitle} />
          <Text style={{ marginRight: 15, fontSize: 16 }}>Loading ...</Text>
        </View>
      </View>
    )
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
  },
  loader: {
    height: 70,
    marginHorizontal: 50,
    backgroundColor: colors.white,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
});
