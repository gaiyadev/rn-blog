import * as React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from "../../screens/HomeScreen";
import PostListScreen from "../../screens/PostListScreen";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showIcon: true,
        labelStyle: {
          fontSize: 12,
          color: COLORS.white,
          fontFamily: "Karla-Regular",
        },
        tabStyle: {},
        style: {
          backgroundColor: COLORS.primaryColor,
        },
        activeTintColor: COLORS.white,
        inactiveTintColor: COLORS.inActive,
        indicatorStyle: {
          borderBottomWidth: 2,
          borderColor: "#fff",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Create",
          // headerTintColor: COLORS.white,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={
                Platform.OS === "android" ? "create-outline" : "create-outline"
              }
              size={focused ? 26 : 25}
              color={focused ? COLORS.white : COLORS.inActive}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Post"
        component={PostListScreen}
        options={{
          title: "Posts",

          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={Platform.OS === "android" ? "apps-outline" : "apps-outline"}
              size={focused ? 26 : 25}
              color={focused ? COLORS.white : COLORS.inActive}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
