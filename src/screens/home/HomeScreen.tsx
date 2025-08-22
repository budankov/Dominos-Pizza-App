import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { s } from "react-native-size-matters";
import PizzaList from "../../components/card/PizzaList";
import NewsCarousel from "../../components/carousel/NewsCarousel";

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <NewsCarousel />
      <PizzaList />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: s(15),
    backgroundColor: "#fff",
  },
});

export default HomeScreen;
