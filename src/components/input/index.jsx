import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import { colors } from "../../../global/styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Input = ({
  label,
  iconName,
  error,
  password,
  onFocus = () => {},
  display,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(password);
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: error
              ? colors.red
              : isFocused
              ? colors.darkBlue
              : colors.grey6,
          },
        ]}
      >
        <Icon
          name={iconName}
          style={{ fontSize: 22, color: colors.darkBlue, marginRight: 10 }}
        />
        <TextInput
          secureTextEntry={hidePassword}
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          style={{ color: colors.darkBlue, flex: 1, display: display }}
          {...props}
        />
        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
          />
        )}
      </View>
      {error && (
        <Text style={{ color: colors.red, fontSize: 12, marginTop: 7 }}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: colors.grey,
  },
  inputContainer: {
    height: 55,
    backgroundColor: colors.grey6,
    flexDirection: "row",
    paddingHorizontal: 15,
    borderWidth: 0.5,
    alignItems: "center",
  },
});
