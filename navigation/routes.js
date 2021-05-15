import * as React from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";

import { COLORS } from "../constants/colors";
import { View, Text, Alert, StyleSheet } from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import TopTabs from "../navigation/topTabs/TopTabs";
import SplashScreen from "../screens/SplashScreen";
import SigninScreen from "../screens/SigninScreen";
import SignupScreen from "../screens/SignupScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import ViewSinglePostScreen from "../screens/ViewSinglePostScreen";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
//import settingsPopupMenu from "../components/settingsPopupMenu";

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
          name="Details"
          component={ViewSinglePostScreen}
          options={({ route }) => ({
            title: route.params.title,
            headerShown: true,
            headerStyle: {
              elevation: 0,
              backgroundColor: COLORS.primaryColor,
            },
            headerTintColor: COLORS.white,
            headerTitleStyle: {
              fontFamily: "Karla-Bold",
              fontSize: 25,
            },
          })}
        />

        <Stack.Screen
          name="ChangePassword"
          component={ChangePasswordScreen}
          options={{
            headerShown: true,
            title: "",
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
          name="EditProfile"
          component={EditProfileScreen}
          options={{
            headerShown: true,
            title: "",
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
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: true,
            title: "",
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
          options={({ route, navigation }) => ({
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
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="user"
                  iconName="person-outline"
                  onPress={() => {
                    navigation.navigate("Profile");
                  }}
                ></Item>
                <Item
                  title="user"
                  iconName="moon-outline"
                  onPress={() => {
                    console.log("dark mood");
                    // navigation.navigate("Profile");
                  }}
                ></Item>
                <View
                  style={{
                    elevation: 5,
                  }}
                >
                  <Menu>
                    <MenuTrigger>
                      <Icon
                        style={{
                          paddingHorizontal: 10,
                        }}
                        name={
                          Platform.OS === "android"
                            ? "ellipsis-vertical-outline"
                            : "ellipsis-vertical-outline"
                        }
                        size={25}
                        color={
                          Platform.OS === "android"
                            ? COLORS.white
                            : COLORS.white
                        }
                      />
                    </MenuTrigger>
                    <MenuOptions>
                      <MenuOption
                        style={styles.container}
                        onSelect={() => navigation.navigate("Profile")}
                      >
                        <Text style={styles.title}>
                          <Icon
                            size={14}
                            style={styles.icons}
                            name="person-outline"
                          />
                          &nbsp; Account
                        </Text>
                      </MenuOption>

                      {/* <MenuOption
                        style={styles.container}
                        onSelect={() => {
                          console.log("d");
                          navigation.navigate("Help");
                        }}
                      >
                        <Text style={styles.title}>
                          <Icon
                            size={14}
                            style={styles.icons}
                            name="information-circle-outline"
                          />
                          &nbsp; Help
                        </Text>
                      </MenuOption> */}

                      <MenuOption
                        style={styles.container}
                        onSelect={() => {
                          Alert.alert(
                            "Account Deactivation",
                            "Are you sure you want to delete this account?",
                            [
                              {
                                text: "Cancel",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel",
                              },
                              {
                                text: "OK",
                                onPress: () =>
                                  Alert.alert(
                                    "Deleted",
                                    "Account Deleted sucessfully"
                                  ),
                              },
                            ]
                          );
                        }}
                      >
                        <Text style={styles.title}>
                          <Icon size={14} color="red" name="trash-outline" />
                          &nbsp; Delete Account
                        </Text>
                      </MenuOption>
                    </MenuOptions>
                  </Menu>
                </View>
              </HeaderButtons>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 19,
    paddingVertical: 12,
    elevation: 10,
    backgroundColor: COLORS.white,
  },
  icons: {
    color: COLORS.primaryColor,
  },
  title: {
    fontFamily: "Karla-Regular",
    color: COLORS.primaryColor,
    fontSize: 13,
  },
});
export default AppScreens;
