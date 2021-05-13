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

const SigninScreen = (props) => {
  const { navigation } = props;

  const [showPassword, setShowPassword] = useState(false);
  const passwordRef = useRef(null);

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
            <Text style={styles.title}>Sign in</Text>
          </Animatable.View>
          {/* form */}
          <Animatable.View
            style={styles.form}
            animation="fadeInUpBig"
            duration={1500}
          >
            <Input
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current?.focus()}
              label="Email"
              name="email"
              keyboardType="email-address"
              textContentType="emailAddress"
              selectionColor={COLORS.primaryColor}
              onChangeText={(email) => props.setFieldValue("email", email)}
              underlineColor={COLORS.primaryColor}
            />
            <Text style={styles.errors}>{props.errors.email}</Text>

            <Input
              ref={passwordRef}
              label="Password"
              name="lock"
              leftIcon={showPassword ? "eye" : "eye-off"}
              onPress={() => setShowPassword(!showPassword)}
              keyboardType="default"
              maxLength={10}
              minLength={6}
              selectionColor={COLORS.primaryColor}
              secureTextEntry={!showPassword}
              onChangeText={(password) =>
                props.setFieldValue("password", password)
              }
              underlineColor={COLORS.primaryColor}
            />
            <Text style={styles.errors}>{props.errors.password}</Text>
            <Button title="Sign in" onPress={props.handleSubmit} />
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Signup");
                }}
              >
                <Text
                  style={{
                    fontFamily: "Karla-Regular",
                    fontSize: 13,
                    marginTop: 10,
                  }}
                >
                  Don't have an acount yet? &nbsp; SignUp
                </Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
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
    email: "",
    password: "",
  }),

  validate: (values, props) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    const errors = {};
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Email is invalid";
    }

    // password
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be atleast 6 characters";
    }
    return errors;
  },

  handleSubmit: (values, { props }) => {
    console.log(values);
    props.navigation.navigate("Home");
  },
})(SigninScreen);
