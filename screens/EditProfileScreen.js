import React, { useState } from "react";
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

const EditProfileScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = React.useState("");

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
              name="account"
              value={username}
              keyboardType="default"
              textContentType="username"
              selectionColor={COLORS.primaryColor}
              onChangeText={(text) => setUsername(text)}
              underlineColor={COLORS.primaryColor}
            />
            <Input
              label="Email"
              name="email"
              value={email}
              keyboardType="email-address"
              textContentType="emailAddress"
              selectionColor={COLORS.primaryColor}
              onChangeText={(text) => setEmail(text)}
              underlineColor={COLORS.primaryColor}
            />

            <Button title="Update" onPress={() => console.log("d")} />
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

export default EditProfileScreen;
