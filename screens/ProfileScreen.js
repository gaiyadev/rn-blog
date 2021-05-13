import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { COLORS } from "../constants/colors";
import { Avatar, List } from "react-native-paper";

import * as Animatable from "react-native-animatable";

const ProfileScreen = (props) => {
  const { navigation } = props;
  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Animatable.View style={styles.main}>
        <Animatable.View
          style={styles.header}
          animation="lightSpeedIn"
          duration={1500}
        >
          <Avatar.Text
            style={{
              backgroundColor: COLORS.white,
            }}
            color={COLORS.white}
            labelStyle={{
              fontFamily: "Karla-Regular",
              fontSize: 30,
              color: COLORS.primaryColor,
            }}
            size={80}
            label="GO"
          />
          <View style={{ justifyContent: "space-around" }}>
            <Text
              style={{
                color: COLORS.white,
                fontSize: 16,
                paddingTop: 10,
                paddingBottom: -15,
                textAlign: "center",
                paddingHorizontal: 20,
                fontFamily: "Karla-Regular",
              }}
            >
              gaiyadev@yahoo.com
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Text style={styles.title}>gaiyadev</Text>
            <Text style={styles.title}>48 Posts</Text>
          </View>
        </Animatable.View>

        {/* Body */}
        <Animatable.View
          style={styles.form}
          animation="fadeInUpBig"
          duration={1500}
        >
          <List.Item
            onPress={() => {
              navigation.navigate("ChangePassword");
            }}
            title="Change Password"
            left={(props) => (
              <List.Icon {...props} icon="lock" color={COLORS.primaryColor} />
            )}
          />

          <List.Item
            onPress={() => {
              navigation.navigate("EditProfile");
            }}
            title="Edit Profile"
            left={(props) => (
              <List.Icon
                {...props}
                icon="account"
                color={COLORS.primaryColor}
              />
            )}
          />

          <List.Item
            onPress={() => {
              // navigation.navigate("EditProfile");
              console.log("Logout");
            }}
            title="Logout"
            left={(props) => (
              <List.Icon {...props} icon="logout" color={COLORS.primaryColor} />
            )}
          />
        </Animatable.View>
      </Animatable.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: COLORS.primaryColor,
    flex: 1,
  },
  container: {
    // flex: 1,
  },
  header: {
    //justifyContent: "flex-end",
    flex: 1,
    flexDirection: "column",
    // justifyContent: "space-around",
    alignItems: "center",
  },
  title: {
    color: COLORS.white,
    fontSize: 16,
    paddingVertical: 29,
    textAlign: "center",
    paddingHorizontal: 20,
    fontFamily: "Karla-Regular",
  },
  form: {
    elevation: 5,
    backgroundColor: COLORS.white,
    flex: 3,
    padding: 20,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingTop: 50,
    alignContent: "center",
  },
});
export default ProfileScreen;
