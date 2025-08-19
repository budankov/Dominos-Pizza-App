import { useRoute } from "@react-navigation/native";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { s, vs } from "react-native-size-matters";

const NewsScreen = () => {
  const route = useRoute<any>();
  const { item } = route.params;
  const { width } = Dimensions.get("window");
  const description = item.description.split("\n");

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: item.image }}
        style={[styles.image, { width: width }]}
        resizeMode="contain"
      />
      <View style={{ paddingHorizontal: s(14) }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{item.date}</Text>
        {description.map((description, i) => (
          <Text key={i}>{description}</Text>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: s(20),
  },
  image: {
    height: s(230),
  },
  title: {
    paddingTop: vs(20),
    fontSize: s(22),
  },
  date: {
    color: "gray",
    paddingBottom: s(20),
  },
});

export default NewsScreen;
