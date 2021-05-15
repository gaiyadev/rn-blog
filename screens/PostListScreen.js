import React from "react";
import { View, Text, ScrollView, StyleSheet, FlatList } from "react-native";
import { COLORS } from "../constants/colors";
import { List, Divider } from "react-native-paper";
import { useSelector } from "react-redux";

import * as Animatable from "react-native-animatable";

const PostListScreen = ({ navigation }) => {
  const posts = useSelector((state) => state.posts.posts);

  const renderItemDoc = (itemData) => {
    return (
      <View>
        <List.Item
          onPress={() => {
            navigation.navigate("Details", {
              _id: itemData.item._id,
              title: itemData.item.title,
              body: itemData.item.body,
              createdAt: itemData.item.createdAt,
            });
          }}
          title={itemData.item.title}
          description={itemData.item.createdAt.slice(0, 10)}
          right={(props) => (
            <List.Icon {...props} icon="eye" color={COLORS.primaryColor} />
          )}
        />
        <Divider />
      </View>
    );
  };

  return (
    <View style={styles.main}>
      <Animatable.View
        style={styles.header}
        animation="lightSpeedIn"
        duration={1500}
      >
        <Text style={styles.title}>All Posts </Text>
      </Animatable.View>
      {/* form */}
      <Animatable.View
        style={styles.form}
        animation="fadeInUpBig"
        duration={1500}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <FlatList
            data={posts}
            keyExtractor={(item) => item._id}
            renderItem={renderItemDoc}
          />
          {/*  */}
        </View>
      </Animatable.View>
    </View>
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
});

export default PostListScreen;
