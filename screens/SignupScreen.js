import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { COLORS } from "../constants/colors";
import Input from "../components/Input";
import Button from "../components/Button";
import * as Animatable from "react-native-animatable";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { signup } from "../redux/actions/authActions";
import * as Yup from "yup";
const usernameRegex = /^[A-Za-z]+$/;
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const passwordRegex = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
// ^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$

const SignupScreen = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [showPassword, setShowPassword] = useState(false);
  const [showComfirmPassword, setShowComfirmPassword] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const comfirmedPasswordRef = useRef(null);

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

          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              comfirmPassword: "",
            }}
            validationSchema={Yup.object({
              username: Yup.string()
                .min(4, "Username must be atleast 4 characters")
                .max(20, "Username is too Long!")
                .matches(
                  usernameRegex,
                  "Only alphabets are allowed for this field "
                )
                .required("Username is required"),

              email: Yup.string()
                .email("Email is invalid")
                .matches(emailRegex, "Email is invalid ")
                .required("Email is required"),
              password: Yup.string()
                .min(6, "Password must be atleast 6 characters")
                .matches(
                  passwordRegex,
                  "Password shold contain atleast one number and one uppercase"
                )
                .required("Password is required"),
              comfirmPassword: Yup.string().oneOf(
                [Yup.ref("password"), null],
                "Password comfirmation fail"
              ),
            })}
            onSubmit={async (values, formikActions) => {
              setError(null);
              setIsLoading(true);
              try {
                await dispatch(signup(values));
                setIsLoading(false);
                Alert.alert("Success", "Account created sucessfuly", [
                  { text: "OK", onPress: () => console.log("OK Pressed") },
                ]);
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
                  returnKeyType="next"
                  onSubmitEditing={() => emailRef.current?.focus()}
                  label="Username"
                  name="account"
                  keyboardType="default"
                  textContentType="username"
                  selectionColor={COLORS.primaryColor}
                  onChangeText={props.handleChange("username")}
                  onBlur={props.handleBlur("username")}
                  value={props.values.username}
                  underlineColor={COLORS.primaryColor}
                />
                <Text style={styles.errors}>{props.errors.username}</Text>
                <Input
                  label="Email"
                  ref={emailRef}
                  returnKeyType="next"
                  onChangeText={props.handleChange("email")}
                  onBlur={props.handleBlur("email")}
                  value={props.values.email}
                  onSubmitEditing={() => passwordRef.current?.focus()}
                  name="email"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  selectionColor={COLORS.primaryColor}
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
                  onChangeText={props.handleChange("password")}
                  onBlur={props.handleBlur("password")}
                  value={props.values.password}
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
                  onChangeText={props.handleChange("comfirmPassword")}
                  onBlur={props.handleBlur("comfirmPassword")}
                  value={props.values.comfirmPassword}
                  selectionColor={COLORS.primaryColor}
                  secureTextEntry={!showComfirmPassword}
                  underlineColor={COLORS.primaryColor}
                />
                <Text style={styles.errors}>
                  {props.errors.comfirmPassword}
                </Text>
                {isLoading ? (
                  <ActivityIndicator size="large" color={COLORS.accentColor} />
                ) : (
                  <Button title="Sign Up" onPress={props.handleSubmit} />
                )}
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
            )}
          </Formik>

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

export default SignupScreen;
