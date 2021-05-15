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
import DateTimePicker from "@react-native-community/datetimepicker";
import { Formik } from "formik";
import { getUserInfo, totalPosts } from "../redux/actions/authActions";
import { fetchPost, fetchUserPost } from "../redux/actions/postActions";

import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { addPost } from "../redux/actions/postActions";

const HomeScreen = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  // date picker

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [error, setError] = useState();

  const bodyRef = useRef(null);

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error, [{ text: "Okay" }]);
    }
  }, [error]);

  useEffect(() => {
    const loaded = async () => {
      try {
        setIsLoading(true);
        await dispatch(getUserInfo());
        setIsLoading(false);
      } catch (er) {
        console.log("ER", er.message);
        setIsLoading(false);
      }
    };
    loaded();
  }, [dispatch]);

  // fetch users post
  useEffect(() => {
    const loadedUserPost = async () => {
      try {
        setIsLoading(true);
        await dispatch(fetchUserPost());
        setIsLoading(false);
      } catch (er) {
        console.log("ER", er.message);
        setIsLoading(false);
      }
    };
    loadedUserPost();
  }, [dispatch]);

  useEffect(() => {
    const loadedTotal = async () => {
      try {
        setIsLoading(true);
        await dispatch(totalPosts());
        setIsLoading(false);
      } catch (er) {
        console.log("ER", er.message);
        setIsLoading(false);
      }
    };
    loadedTotal();
  }, [dispatch]);

  useEffect(() => {
    const loadedPost = async () => {
      try {
        setIsLoading(true);
        await dispatch(fetchPost());
        setIsLoading(false);
      } catch (er) {
        console.log("ER", er.message);
        setIsLoading(false);
      }
    };
    loadedPost();
  }, [dispatch]);

  // const loadedPostXtime = async () => {
  //   try {
  //     setIsLoading(true);
  //     await dispatch(fetchPost());
  //     setIsLoading(false);
  //   } catch (er) {
  //     console.log("ER", er.message);
  //     setIsLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   setInterval(() => loadedPostXtime(), 30000);
  //   console.log("LOADED4", loadedPostXtime);
  // });

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    console.log(date);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

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
            <Text style={styles.title}>Create Post</Text>
          </Animatable.View>
          {/* form */}

          <Formik
            initialValues={{
              tile: "",
              body: "",
            }}
            validationSchema={Yup.object({
              title: Yup.string()
                .min(4, "Title must be atleast 6 characters")
                .required("Title is required"),
              body: Yup.string()
                .min(6, "Body must be atleast 6 characters")
                .required("Body is required"),
            })}
            onSubmit={async (values) => {
              setError(null);
              setIsLoading(true);
              try {
                await dispatch(addPost(values));
                setIsLoading(false);
                Alert.alert("Success", "Post added sucessfuly", [
                  { text: "OK", onPress: () => console.log("OK Pressed") },
                ]);
                await dispatch(fetchPost());
                await dispatch(fetchUserPost());
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
                  label="Title"
                  name="account"
                  onChangeText={props.handleChange("title")}
                  onBlur={props.handleBlur("title")}
                  value={props.values.title}
                  returnKeyType="next"
                  onSubmitEditing={() => bodyRef.current?.focus()}
                  keyboardType="default"
                  selectionColor={COLORS.primaryColor}
                  onChangeText={(title) => props.setFieldValue("title", title)}
                  underlineColor={COLORS.primaryColor}
                />
                <Text style={styles.errors}>{props.errors.title}</Text>

                <Input
                  label="Body"
                  onChangeText={props.handleChange("body")}
                  onBlur={props.handleBlur("body")}
                  value={props.values.body}
                  name="information"
                  multiline={true}
                  numberOfLines={4}
                  returnKeyType="done"
                  ref={bodyRef}
                  selectionColor={COLORS.primaryColor}
                  onChangeText={(body) => props.setFieldValue("body", body)}
                  underlineColor={COLORS.primaryColor}
                />
                <Text style={styles.errors}>{props.errors.body}</Text>

                <Button title="Add Date" onPress={showDatepicker} />
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                  />
                )}
                {isLoading ? (
                  <ActivityIndicator size="large" color={COLORS.accentColor} />
                ) : (
                  <Button title="Submit" onPress={props.handleSubmit} />
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
  errors: {
    fontFamily: "Karla-Regular",
    color: "red",
  },
});

export default HomeScreen;
