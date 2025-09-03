import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { s } from "react-native-size-matters";
import StartersList from "../../components/card/StartersList";

const StarterScreen = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StartersList />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: s(15),
    backgroundColor: "#fff",
  },
});

export default StarterScreen;
