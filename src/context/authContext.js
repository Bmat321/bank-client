import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import { makeRequest } from "../../axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState("");
  const [keepUserLoggedIn, setKeepUserLoggedIn] = useState(false);

  useEffect(() => {
    const getUserDetails = async () => {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        setUserDetails(JSON.parse(userData));
      }
      // const keepLoggedInUser = await AsyncStorage.getItem("keepLoggedIn");
      // if (keepLoggedInUser) {
      //   setKeepUserLoggedIn(keepLoggedInUser);
      // }
    };

    getUserDetails();
  }, []);
  const logout = async () => {
    await makeRequest.get("/auth/logout");
    AsyncStorage.setItem("keepLoggedIn", "");
    AsyncStorage.setItem("user", JSON.stringify({ ...userDetails, token: "" }));
  };
  return (
    <AuthContext.Provider
      value={{
        userDetails,
        keepUserLoggedIn,

        setUserDetails,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
