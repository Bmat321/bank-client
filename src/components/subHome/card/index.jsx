import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Card = ({ userCard, isLoading }) => {
  const [hideAccount, setHideAccount] = useState(true);

  const hide = () => {
    setHideAccount(!hideAccount);
  };

  return (
    <View style={{ height: "30%" }}>
      <View style={{ marginHorizontal: 12 }}>
        <Text>MY CARDS</Text>
        <View style={styles.card}>
          <View>
            {hideAccount ? (
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: "bold",
                  marginHorizontal: 10,
                  marginVertical: 5,
                }}
              >
                Balance
              </Text>
            ) : (
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: "bold",
                  marginHorizontal: 10,
                  marginVertical: 5,
                }}
              >
                Account Number
              </Text>
            )}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "column" }}>
                {hideAccount ? (
                  <View>
                    {isLoading ? (
                      <Text
                        style={{
                          marginHorizontal: 10,
                          color: "white",
                          fontSize: 20,
                          fontWeight: "bold",
                        }}
                      >
                        ...
                      </Text>
                    ) : (
                      <Text
                        style={{
                          marginHorizontal: 10,
                          color: "white",
                          fontSize: 20,
                          fontWeight: "bold",
                        }}
                      >{`N ${userCard?.balance}.00 `}</Text>
                    )}
                  </View>
                ) : (
                  <Text
                    style={{
                      color: "white",
                      marginHorizontal: 10,
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    {`${userCard?.account_no}`}
                  </Text>
                )}
              </View>

              <TouchableOpacity onPress={hide}>
                {hideAccount ? (
                  <Icon
                    name="eye"
                    size={30}
                    color={"white"}
                    style={{ paddingRight: 10 }}
                  />
                ) : (
                  <Icon
                    name="eye-off"
                    size={30}
                    color={"white"}
                    style={{ paddingRight: 10 }}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: "70%",
    borderWidth: 2,
    borderRadius: 15,
    backgroundColor: "green",
    borderColor: "green",
    // marginTop: 5,
    elevation: 5,
    shadowColor: "blue",
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    borderBottomColor: "white",
    marginBottom: 10,
    marginTop: 10,
  },
});
