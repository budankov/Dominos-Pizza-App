import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { s } from "react-native-size-matters";
import PizzaCard from "../../components/card/PizzaCard";
import NewsCarousel from "../../components/carousel/NewsCarousel";

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <NewsCarousel />
      <PizzaCard />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: s(15),
  },
});

export default HomeScreen;
