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

const ChangePasswordScreen = (props) => {
  const { navigation } = props;

  const [showPassword, setShowPassword] = useState(false);
  const [showComfirmPassword, setShowComfirmPassword] = useState(false);

  const comfirmedPasswordRef = useRef(null);

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
            <Text style={styles.title}>Change Password</Text>
          </Animatable.View>
          {/* form */}
          <Animatable.View
            style={styles.form}
            animation="fadeInUpBig"
            duration={1500}
          >
            <Input
              label="Password"
              name="lock"
              returnKeyType="next"
              onSubmitEditing={() => comfirmedPasswordRef.current?.focus()}
              leftIcon={showPassword ? "eye" : "eye-off"}
              onPress={() => setShowPassword(!showPassword)}
              keyboardType="default"
              textContentType="password"
              selectionColor={COLORS.primaryColor}
              secureTextEntry={!showPassword}
              onCha
              onChangeText={(password) =>
                props.setFieldValue("password", password)
              }
              ngeText={(text) => setPassword(text)}
              underlineColor={COLORS.primaryColor}
            />
            <Text style={styles.errors}>{props.errors.password}</Text>

            <Input
              label="Comfirm Password"
              name="lock"
              ref={comfirmedPasswordRef}
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

            <Button title="Update" onPress={props.handleSubmit} />
          </Animatable.View>
          {/*  */}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  errors: {
    fontFamily: "Karla-Regular",
    color: "red",
  },
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
});

export default withFormik({
  mapPropsToValues: () => ({
    password: "",
    comfirmPassword: "",
  }),
  validate: (values, props) => {
    const passwordRegex = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    const errors = {};

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
})(ChangePasswordScreen);
