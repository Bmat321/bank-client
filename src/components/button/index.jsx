import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { parameters } from "../../../global/styles";

const Button = ({
  title,
  style = style,
  onPress = () => {},

  ...props
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={parameters.styledButton}
      {...props}
    >
      <Text style={parameters.buttonTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
