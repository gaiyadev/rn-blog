import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../constants/colors";
import * as Animatable from "react-native-animatable";

const Onboarding = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Animatable.Image
          animation="bounce"
          source={{
            uri:
              "https://www.transparentpng.com/thumb/technology/technology-simple-17.png",
          }}
          resizeMode="contain"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </View>

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={{ alignItems: "center", marginHorizontal: 12 }}>
          <Animatable.Text
            animation="flash"
            style={{
              fontFamily: "OpenSansCondensed-Light",
              fontSize: 25,
              color: COLORS.primaryColor,
            }}
          >
            Codepedia
          </Animatable.Text>
          <Animatable.Text
            animation="bounceInRight"
            style={{
              color: "#000",
              marginTop: 23,
              textAlign: "center",
              fontFamily: "Karla-Regular",
              paddingHorizontal: 3,
            }}
          >
            Easy solution to all your tech carrer questions. Codepedia is a
            platform for execellence in the tech industryyatn
          </Animatable.Text>
        </View>

        <TouchableOpacity
          style={[
            styles.shadow,
            {
              marginTop: 12,
              width: "70%",
              height: 50,
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
          onPress={() => navigation.navigate("Signin")}
        >
          <LinearGradient
            style={{
              height: "100%",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 15,
            }}
            colors={[COLORS.primaryColor, COLORS.inActive]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text
              style={{
                fontSize: 20,
                color: COLORS.white,
                fontFamily: "OpenSansCondensed-Light",
              }}
            >
              Get Started
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Onboarding;
