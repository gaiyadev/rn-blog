import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";
import { List, Divider } from "react-native-paper";

import * as Animatable from "react-native-animatable";

const MyPostsScreen = ({ navigation }) => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.main}>
        <Animatable.View
          style={styles.header}
          animation="lightSpeedIn"
          duration={1500}
        >
          <Text style={styles.title}>Posts </Text>
        </Animatable.View>
        {/* form */}
        <Animatable.View
          style={styles.form}
          animation="fadeInUpBig"
          duration={1500}
        >
          <View
            style={{
              flex: 1,
            }}
          >
            <List.Item
              onPress={() => {
                console.log("details");
              }}
              title="Post Title"
              description="Item description"
              right={(props) => (
                <List.Icon {...props} icon="eye" color={COLORS.primaryColor} />
              )}
            />
            <Divider />
            <List.Item
              onPress={() => {
                console.log("details");
              }}
              title="Post Title"
              description="Item description"
              right={(props) => (
                <List.Icon {...props} icon="eye" color={COLORS.primaryColor} />
              )}
            />
          </View>
        </Animatable.View>
      </View>
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
    justifyContent: "flex-end",
    flex: 1,
  },
  title: {
    color: COLORS.white,
    fontSize: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontFamily: "Karla-Regular",
    textAlign: "center",
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
    // borderTopLeftRadius: 20,
  },
});

export default MyPostsScreen;
