import React, { useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { COLORS } from "../constants/colors";
import Input from "../components/Input";
import Button from "../components/Button";
import * as Animatable from "react-native-animatable";
import { withFormik } from "formik";
const EditProfileScreen = (props) => {
  const { navigation } = props;

  const emailRef = useRef(null);

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
      }}
      onPress={Keyboard.dismiss}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <ScrollView style={{ flex: 1, backgroundColor: COLORS.white }}>
        <View style={styles.main}>
          <Animatable.View
            style={styles.header}
            animation="lightSpeedIn"
            duration={1500}
          >
            <Text style={styles.title}>Update Profile</Text>
          </Animatable.View>
          {/* form */}
          <Animatable.View
            style={styles.form}
            animation="fadeInUpBig"
            duration={1500}
          >
            <Input
              label="Username"
              returnKeyType="next"
              onSubmitEditing={() => emailRef.current?.focus()}
              name="account"
              keyboardType="default"
              textContentType="username"
              selectionColor={COLORS.primaryColor}
              onChangeText={(username) =>
                props.setFieldValue("username", username)
              }
              underlineColor={COLORS.primaryColor}
            />
            <Text style={styles.errors}>{props.errors.username}</Text>

            <Input
              label="Email"
              name="email"
              ref={emailRef}
              keyboardType="email-address"
              textContentType="emailAddress"
              selectionColor={COLORS.primaryColor}
              onChangeText={(email) => props.setFieldValue("email", email)}
              underlineColor={COLORS.primaryColor}
            />
            <Text style={styles.errors}>{props.errors.email}</Text>

            <Button title="Update" onPress={props.handleSubmit} />
          </Animatable.View>
          {/*  */}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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

export default withFormik({
  mapPropsToValues: () => ({
    username: "",
    email: "",
  }),
  validate: (values, props) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const usernameRegex = /^[A-Za-z]+$/;
    const errors = {};

    // Username validator
    if (!values.username) {
      errors.username = "Username is required";
    } else if (values.username.length < 4) {
      errors.username = "Username must be atleast 4 characters";
    } else if (!usernameRegex.test(values.username)) {
      errors.username = "Username can only contain alphbet";
    } else if (values.username.length >= 15) {
      errors.username = "Username length is too much";
    }

    // Email validator
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Email is invalid";
    }

    return errors;
  },

  handleSubmit: (values, { props }) => {
    console.log(values);
    console.log(props);
  },
})(EditProfileScreen);
