import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
  ActivityIndicator,
} from "react-native";
import { COLORS } from "../constants/colors";
import Input from "../components/Input";
import Button from "../components/Button";
import * as Animatable from "react-native-animatable";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { changePassword } from "../redux/actions/authActions";
import * as Yup from "yup";

const passwordRegex = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

const ChangePasswordScreen = (props) => {
  const { navigation } = props;

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [showPassword, setShowPassword] = useState(false);
  const [showComfirmPassword, setShowComfirmPassword] = useState(false);

  const comfirmedPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error, [{ text: "Okay" }]);
    }
  }, [error]);
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

          <Formik
            initialValues={{
              password: "",
              newPassword: "",
              comfirmPassword: "",
            }}
            validationSchema={Yup.object({
              password: Yup.string()
                .min(6, "Password must be atleast 6 characters")
                .matches(
                  passwordRegex,
                  "Password shold contain atleast one number and one uppercase"
                )
                .required("Password is required"),

              newPassword: Yup.string()
                .min(6, "New Password must be atleast 6 characters")
                .matches(
                  passwordRegex,
                  "Password shold contain atleast one number and one uppercase"
                )
                .required("New Password is required"),

              comfirmPassword: Yup.string().oneOf(
                [Yup.ref("newPassword"), null],
                "Password comfirmation fail"
              ),
            })}
            onSubmit={async (values) => {
              setError(null);
              setIsLoading(true);
              try {
                await dispatch(changePassword(values));
                setIsLoading(false);
                Alert.alert("Success", "Password changed successfuly", [
                  { text: "Okay", onPress: () => console.log("OK Pressed") },
                ]);
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Signin" }],
                });
              } catch (err) {
                setError(err.message);
                setIsLoading(false);
              }
            }}
          >
            {(props) => (
              <Animatable.View
                style={styles.form}
                animation="fadeInUpBig"
                duration={1500}
              >
                <Input
                  label="Current Password"
                  name="lock"
                  returnKeyType="next"
                  onSubmitEditing={() => newPasswordRef.current?.focus()}
                  leftIcon={showPassword ? "eye" : "eye-off"}
                  onPress={() => setShowPassword(!showPassword)}
                  keyboardType="default"
                  textContentType="password"
                  selectionColor={COLORS.primaryColor}
                  secureTextEntry={!showPassword}
                  onChangeText={props.handleChange("password")}
                  onBlur={props.handleBlur("password")}
                  value={props.values.password}
                  underlineColor={COLORS.primaryColor}
                />
                <Text style={styles.errors}>{props.errors.password}</Text>

                <Input
                  ref={newPasswordRef}
                  label="New Password"
                  name="lock"
                  leftIcon={showComfirmPassword ? "eye" : "eye-off"}
                  onPress={() => setShowComfirmPassword(!showComfirmPassword)}
                  keyboardType="default"
                  onSubmitEditing={() => comfirmedPasswordRef.current?.focus()}
                  onChangeText={props.handleChange("newPassword")}
                  onBlur={props.handleBlur("newPassword")}
                  value={props.values.newPassword}
                  selectionColor={COLORS.primaryColor}
                  secureTextEntry={!showComfirmPassword}
                  underlineColor={COLORS.primaryColor}
                />
                <Text style={styles.errors}>{props.errors.newPassword}</Text>

                <Input
                  label="Comfirm Password"
                  name="lock"
                  ref={comfirmedPasswordRef}
                  leftIcon={showComfirmPassword ? "eye" : "eye-off"}
                  onPress={() => setShowComfirmPassword(!showComfirmPassword)}
                  keyboardType="default"
                  selectionColor={COLORS.primaryColor}
                  secureTextEntry={!showComfirmPassword}
                  onChangeText={props.handleChange("comfirmPassword")}
                  onBlur={props.handleBlur("comfirmPassword")}
                  value={props.values.comfirmPassword}
                  underlineColor={COLORS.primaryColor}
                />
                <Text style={styles.errors}>
                  {props.errors.comfirmPassword}
                </Text>
                {isLoading ? (
                  <ActivityIndicator size="large" color={COLORS.accentColor} />
                ) : (
                  <Button title="Update" onPress={props.handleSubmit} />
                )}
              </Animatable.View>
            )}
          </Formik>

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

export default ChangePasswordScreen;
