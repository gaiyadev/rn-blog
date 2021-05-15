import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { COLORS } from "../constants/colors";
import Input from "../components/Input";
import Button from "../components/Button";
import * as Animatable from "react-native-animatable";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { signin } from "../redux/actions/authActions";
import * as Yup from "yup";
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const passwordRegex = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

const SigninScreen = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const passwordRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const emailRef = useRef(null);

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
            <Text style={styles.title}>Sign in</Text>
          </Animatable.View>
          {/* form */}

          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={Yup.object({
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
            })}
            onSubmit={async (values) => {
              setError(null);
              setIsLoading(true);
              try {
                await dispatch(signin(values));
                setIsLoading(false);
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Home" }],
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

                {isLoading ? (
                  <ActivityIndicator size="large" color={COLORS.accentColor} />
                ) : (
                  <Button title="Sign In" onPress={props.handleSubmit} />
                )}
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
            )}
          </Formik>
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

export default SigninScreen;
