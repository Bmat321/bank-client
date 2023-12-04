import React from "react";
import { ToastProvider } from "react-native-toast-notifications";
import { AuthContextProvider } from "./src/context/authContext";
import DrawerNavigator from "./src/navigation/drawerNavigation";
import RootNavigation from "./src/navigation/RootNavigation";
import StackNavigation from "./src/navigation";
import { NavigationContainer } from "@react-navigation/native";

const App = () => {
  return (
    <AuthContextProvider>
      <ToastProvider>
        <NavigationContainer>
          {/* <RootNavigation /> */}
          <StackNavigation />
          {/* <DrawerNavigator /> */}
        </NavigationContainer>
      </ToastProvider>
    </AuthContextProvider>
  );
};

export default App;
