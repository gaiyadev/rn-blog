import React, { useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../constants/colors";
import Input from "../components/Input";
import Button from "../components/Button";
import * as Animatable from "react-native-animatable";
import { withFormik } from "formik";

const SignupScreen = (props) => {
  const { navigation } = props;

  const [showPassword, setShowPassword] = useState(false);
  const [showComfirmPassword, setShowComfirmPassword] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const comfirmedPasswordRef = useRef(null);

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
      }}
      onPress={Keyboard.dismiss}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={60}
    >
      <ScrollView style={{ flex: 1, backgroundColor: COLORS.white }}>
        <View style={styles.main}>
          <Animatable.View
            style={styles.header}
            animation="lightSpeedIn"
            duration={1500}
          >
            <Text style={styles.title}>Sign Up</Text>
          </Animatable.View>
          {/* form */}
          <Animatable.View
            style={styles.form}
            animation="fadeInUpBig"
            duration={1500}
          >
            <Input
              returnKeyType="next"
              onSubmitEditing={() => emailRef.current?.focus()}
              label="Username"
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
              ref={emailRef}
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current?.focus()}
              name="email"
              keyboardType="email-address"
              textContentType="emailAddress"
              selectionColor={COLORS.primaryColor}
              onChangeText={(email) => props.setFieldValue("email", email)}
              underlineColor={COLORS.primaryColor}
            />
            <Text style={styles.errors}>{props.errors.email}</Text>

            <Input
              label="Password"
              name="lock"
              returnKeyType="next"
              onSubmitEditing={() => comfirmedPasswordRef.current?.focus()}
              ref={passwordRef}
              leftIcon={showPassword ? "eye" : "eye-off"}
              onPress={() => setShowPassword(!showPassword)}
              keyboardType="default"
              textContentType="password"
              selectionColor={COLORS.primaryColor}
              secureTextEntry={!showPassword}
              onChangeText={(password) =>
                props.setFieldValue("password", password)
              }
              underlineColor={COLORS.primaryColor}
            />
            <Text style={styles.errors}>{props.errors.password}</Text>

            <Input
              ref={comfirmedPasswordRef}
              label="Comfirm Password"
              name="lock"
              leftIcon={showComfirmPassword ? "eye" : "eye-off"}
              onPress={() => setShowComfirmPassword(!showComfirmPassword)}
              keyboardType="default"
              //  textContentType="emailAddress"
              selectionColor={COLORS.primaryColor}
              secureTextEntry={!showComfirmPassword}
              onChangeText={(comfirmPassword) =>
                props.setFieldValue("comfirmPassword", comfirmPassword)
              }
              underlineColor={COLORS.primaryColor}
            />
            <Text style={styles.errors}>{props.errors.comfirmPassword}</Text>

            <Button title="Sign Up" onPress={props.handleSubmit} />
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Signin");
                }}
              >
                <Text
                  style={{
                    fontFamily: "Karla-Regular",
                    fontSize: 13,
                    marginTop: 10,
                  }}
                >
                  already have an acount? &nbsp; Signin
                </Text>
              </TouchableOpacity>
            </View>
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
    paddingVertical: 19,
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
    password: "",
    comfirmPassword: "",
  }),
  validate: (values, props) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const usernameRegex = /^[A-Za-z]+$/;
    const passwordRegex = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
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

    // password Validator
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be atleast 6 characters";
    } else if (!passwordRegex.test(values.password)) {
      errors.password =
        "Password shold contain atleast one number and one uppercase";
    }

    // comfirm password validator
    if (!values.comfirmPassword) {
      errors.comfirmPassword = "Comfirm password is required";
    } else if (values.comfirmPassword !== values.password) {
      errors.comfirmPassword = "Password comfirmation fail";
    }
    return errors;
  },

  handleSubmit: (values, { props }) => {
    console.log(values);
    console.log(props);
  },
})(SignupScreen);
