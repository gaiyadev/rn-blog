import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";
import { List, Divider } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import * as Animatable from "react-native-animatable";
import {Swipeable} from "react-native-gesture-handler";

const MyPostsScreen = ({ navigation }) => {
  // const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.userPosts);

  React.useEffect(() => {
    console.log("PS", posts);
  }, []);

  const LeftSwipeActions = () => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#ccffbd",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: "#40394a",
            paddingHorizontal: 10,
            fontWeight: "600",
            paddingHorizontal: 30,
            paddingVertical: 20,
          }}
        >
          Bookmark
        </Text>
      </View>
    );
  };
  const rightSwipeActions = () => {
    return (
      <View
        style={{
          backgroundColor: "#ff8303",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <Text
          style={{
            color: "#1b1a17",
            paddingHorizontal: 10,
            fontWeight: "600",
            paddingHorizontal: 30,
            paddingVertical: 20,
          }}
        >
          Delete
        </Text>
      </View>
    );
  };
  const swipeFromLeftOpen = () => {
    alert("Swipe from left");
  };
  const swipeFromRightOpen = () => {
    alert("Swipe from right");
  };
  const renderItemDoc = (itemData) => {
    return (
      <Swipeable
        renderLeftActions={LeftSwipeActions}
        renderRightActions={rightSwipeActions}
        onSwipeableRightOpen={swipeFromRightOpen}
        onSwipeableLeftOpen={swipeFromLeftOpen}
      >
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
            description={itemData.item.body}
            right={(props) => (
              <List.Icon {...props} icon="eye" color={COLORS.primaryColor} />
            )}
          />
          <Divider />
        </View>
      </Swipeable>
    );
  };

  return (
    <View style={styles.main}>
      <Animatable.View
        style={styles.header}
        animation="lightSpeedIn"
        duration={1500}
      >
        <Text style={styles.title}>Posts </Text>
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

export default MyPostsScreen;
