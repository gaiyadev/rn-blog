import React, { useState, forwardRef } from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { COLORS } from "../constants/colors";
import { withTheme } from "react-native-paper";

const Input = forwardRef((props, ref) => {
  const {
    label,
    selectionColor,
    underlineColor,
    value,
    onChangeText,
    textContentType,
    keyboardType,
    secureTextEntry,
    name,
    leftIcon,
    onPress,
  } = props;
  const [focused, setFocus] = useState(false);
  const { colors } = props.theme;

  return (
    <TextInput
      ref={ref}
      {...props}
      style={{
        marginVertical: 5,
        borderColor: COLORS.primaryColor,
      }}
      type="outlined"
      textContentType={textContentType}
      left={
        <TextInput.Icon
          name={name}
          size={28}
          color={focused ? COLORS.primaryColor : COLORS.primaryColor}
        />
      }
      right={
        <TextInput.Icon
          onPress={onPress}
          name={leftIcon}
          size={28}
          color={focused ? COLORS.primaryColor : COLORS.primaryColor}
        />
      }
      mode="outlined"
      onFocus={() => {
        setFocus(true);
      }}
      autoCorrect={true}
      onBlur={() => setFocus(false)}
      keyboardType={keyboardType}
      selectionColor={selectionColor}
      underlineColor={underlineColor}
      label={label}
      secureTextEntry={secureTextEntry}
      value={value}
      onChangeText={onChangeText}
    />
  );
});

const styles = StyleSheet.create({});

export default withTheme(Input);
