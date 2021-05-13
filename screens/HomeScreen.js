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
import DateTimePicker from "@react-native-community/datetimepicker";
import { withFormik } from "formik";
const HomeScreen = (props) => {
  const { navigation } = props;

  // date picker

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const bodyRef = useRef(null);

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
          <Animatable.View
            style={styles.form}
            animation="fadeInUpBig"
            duration={1500}
          >
            <Input
              label="Title"
              name="account"
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

            <Button title="Submit" onPress={props.handleSubmit} />
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

export default withFormik({
  mapPropsToValues: () => ({
    title: "",
    body: "",
  }),

  validate: (values, props) => {
    const errors = {};
    // Title validator
    if (!values.title) {
      errors.title = "Title is required";
    } else if (values.title.length < 4) {
      errors.title = "Title must be atleast 4 characters";
    }

    //Body validation
    if (!values.body) {
      errors.body = "Body is required";
    } else if (values.body.length < 14) {
      errors.body = "Body must be atleast 14 characters";
    }
    return errors;
  },

  handleSubmit: (values, { props }) => {
    console.log(values.title);
  },
})(HomeScreen);
