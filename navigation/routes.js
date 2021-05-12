import * as React from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { COLORS } from "../constants/colors";

import TopTabs from "../navigation/topTabs/TopTabs";
import SplashScreen from "../screens/SplashScreen";
import SigninScreen from "../screens/SigninScreen";
import SignupScreen from "../screens/SignupScreen";

const Stack = createStackNavigator();

const AppScreens = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        barStyle={{}}
        headerMode={Platform.OS === "android" ? "screen" : "float"}
      >
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{
            headerShown: false,
            title: "Codepedia",
            headerStyle: {
              elevation: 0,
              backgroundColor: COLORS.primaryColor,
            },
            headerTintColor: COLORS.white,
            headerTitleStyle: {
              fontFamily: "Karla-Bold",
              fontSize: 25,
            },
          }}
        />

        <Stack.Screen
          name="Signin"
          component={SigninScreen}
          options={{
            headerShown: true,
            title: "Codepedia",
            headerStyle: {
              elevation: 0,
              backgroundColor: COLORS.primaryColor,
            },
            headerTintColor: COLORS.white,
            headerTitleStyle: {
              fontFamily: "Karla-Bold",
              fontSize: 25,
            },
          }}
        />

        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{
            headerShown: true,
            title: "Codepedia",
            headerStyle: {
              elevation: 0,
              backgroundColor: COLORS.primaryColor,
            },
            headerTintColor: COLORS.white,
            headerTitleStyle: {
              fontFamily: "Karla-Bold",
              fontSize: 25,
            },
          }}
        />

        <Stack.Screen
          name="Home"
          component={TopTabs}
          options={{
            headerShown: true,
            title: "Codepedia",
            headerStyle: {
              elevation: 0,
              backgroundColor: COLORS.primaryColor,
            },
            headerTintColor: COLORS.white,
            headerTitleStyle: {
              fontFamily: "Karla-Bold",
              fontSize: 25,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppScreens;
