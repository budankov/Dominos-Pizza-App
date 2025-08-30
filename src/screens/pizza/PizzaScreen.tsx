import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { s } from "react-native-size-matters";
import PizzaList from "../../components/card/PizzaList";

const PizzaScreen = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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

export default PizzaScreen;
