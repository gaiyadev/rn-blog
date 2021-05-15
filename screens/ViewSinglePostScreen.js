import React, { useRef, useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";
import Moment from "react-moment";
import "moment-timezone";

import * as Animatable from "react-native-animatable";

const ViewSinglePostScreen = (props) => {
  const { title, body, _id, createdAt } = props.route.params;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.main}>
        <Animatable.View
          style={styles.header}
          animation="lightSpeedIn"
          duration={1500}
        >
          <Text style={styles.title}>{title} </Text>
        </Animatable.View>
        <View style={styles.form}>
          <Text> {body} </Text>
          <Text
            style={{
              fontFamily: "Karla-Regular",
              fontSize: 12,
              color: COLORS.primaryColor,
              paddingTop: 23,
            }}
          >
            <Moment format="D MMM YYYY" withTitle element={Text}>
              {createdAt}
            </Moment>
          </Text>
        </View>
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
    fontSize: 25,
    paddingVertical: 50,
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
  errors: {
    fontFamily: "Karla-Regular",
    color: "red",
  },
});

export default ViewSinglePostScreen;
