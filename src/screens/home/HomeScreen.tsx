import React from "react";
import { StyleSheet, View } from "react-native";
import { s } from "react-native-size-matters";
import NewsCarousel from "../../components/carousel/NewsCarousel";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <NewsCarousel />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: s(15),
  },
});

export default HomeScreen;
