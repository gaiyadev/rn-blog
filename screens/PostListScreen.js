import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";

const PostListScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Hi</Text>
      <Button
        icon="camera"
        mode="contained"
        onPress={() => console.log("Pressed")}
      >
        Press me
      </Button>
    </View>
  );
};

export default PostListScreen;
