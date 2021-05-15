import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  ActivityIndicator,
  Alert,
} from "react-native";
import { COLORS } from "../constants/colors";
import Input from "../components/Input";
import Button from "../components/Button";
import * as Animatable from "react-native-animatable";
import { Formik } from "formik";
import { updateDetails, getUserInfo } from "../redux/actions/authActions";
import * as Yup from "yup";
const usernameRegex = /^[A-Za-z]+$/;
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
import { useSelector, useDispatch } from "react-redux";

const EditProfileScreen = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const emailRef = useRef(null);

  const getUser = useSelector((state) => state.auth.userDetails);
  const [_id, username, email] = getUser;

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
            <Text style={styles.title}>Update Profile</Text>
          </Animatable.View>
          {/* form */}

          <Formik
            initialValues={{
              username: username,
              email: email,
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
            })}
            onSubmit={async (values) => {
              setError(null);
              setIsLoading(true);
              try {
                await dispatch(updateDetails(values));
                setIsLoading(false);
                Alert.alert("Success", "Account updated successfuly", [
                  { text: "Okay", onPress: () => console.log("OK Pressed") },
                ]);
                await dispatch(getUserInfo());
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
                  label="Username"
                  returnKeyType="next"
                  onSubmitEditing={() => emailRef.current?.focus()}
                  name="account"
                  onChangeText={props.handleChange("username")}
                  onBlur={props.handleBlur("username")}
                  value={props.values.username}
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
                  onChangeText={props.handleChange("email")}
                  onBlur={props.handleBlur("email")}
                  value={props.values.email}
                  ref={emailRef}
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  selectionColor={COLORS.primaryColor}
                  onChangeText={(email) => props.setFieldValue("email", email)}
                  underlineColor={COLORS.primaryColor}
                />
                <Text style={styles.errors}>{props.errors.email}</Text>
                {isLoading ? (
                  <ActivityIndicator size="large" color={COLORS.accentColor} />
                ) : (
                  <Button title="Update" onPress={props.handleSubmit} />
                )}
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

export default EditProfileScreen;
