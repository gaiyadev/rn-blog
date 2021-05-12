import React from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS } from "../constants/colors";

const SettingsPopupMenu = () => {
  return (
    <View>
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
            color={Platform.OS === "android" ? COLORS.white : COLORS.white}
          />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption
            style={styles.container}
            onSelect={() => navigation.navigate("Account")}
          >
            <Text style={styles.title}>
              <Icon size={14} style={styles.icons} name="person-outline" />
              &nbsp; Account
            </Text>
          </MenuOption>
          <MenuOption
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
          </MenuOption>
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
                      Alert.alert("Deleted", "Account Deleted sucessfully"),
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
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 9,
    elevation: 10,
    backgroundColor: COLORS.white,
  },
  icons: {
    color: COLORS.white,
  },
  title: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
  },
});
export default SettingsPopupMenu;
