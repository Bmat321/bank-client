import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import CircleIcon from "./circle";

const Arrowback = ({ navigation }) => {
  return (
    <CircleIcon>
      <View>
        <Icon
          name="arrow-back"
          size={30}
          color={"green"}
          onPress={() => navigation.goBack()}
        />
      </View>
    </CircleIcon>
  );
};

export default Arrowback;

const styles = StyleSheet.create({});
