import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { s } from "react-native-size-matters";
import SidesList from "../../components/card/SidesList";

const SidesScreen = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <SidesList />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: s(15),
    backgroundColor: "#fff",
  },
});

export default SidesScreen;
