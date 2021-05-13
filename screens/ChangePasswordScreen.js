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

const ChangePasswordScreen = ({ navigation }) => {
  const [password, setPassword] = React.useState("");
  const [comfirmPassword, setcomfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showComfirmPassword, setShowComfirmPassword] = useState(false);

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
              leftIcon={showPassword ? "eye" : "eye-off"}
              onPress={() => setShowPassword(!showPassword)}
              value={password}
              keyboardType="default"
              textContentType="password"
              selectionColor={COLORS.primaryColor}
              secureTextEntry={!showPassword}
              onChangeText={(text) => setPassword(text)}
              underlineColor={COLORS.primaryColor}
            />

            <Input
              label="Comfirm Password"
              name="lock"
              leftIcon={showComfirmPassword ? "eye" : "eye-off"}
              onPress={() => setShowComfirmPassword(!showComfirmPassword)}
              value={comfirmPassword}
              keyboardType="default"
              //  textContentType="emailAddress"
              selectionColor={COLORS.primaryColor}
              secureTextEntry={!showComfirmPassword}
              onChangeText={(text) => setcomfirmPassword(text)}
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
