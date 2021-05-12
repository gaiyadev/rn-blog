import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { COLORS } from "../constants/colors";

const PaperButton = (props) => {
  const { onPress, title } = props;
  return (
    <View
      style={{
        marginTop: 12,
      }}
    >
      <Button style={styles.btn} mode="contained" onPress={onPress}>
        {title}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    padding: 8,
    backgroundColor: COLORS.primaryColor,
    elevation: 0,
  },
});

export default PaperButton;
