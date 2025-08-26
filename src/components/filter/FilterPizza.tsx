import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { s } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";
import { AppFonts } from "../../styles/fonts";

const FilterPizza = () => {
  return (
    <View style={styles.filterContainer}>
      <Pressable style={styles.filterButton}>
        <FontAwesome5 name="filter" size={24} color={"#636363"} />
        <Text style={styles.filterText}>Фільтр</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flex: 1,
  },
  filterButton: {
    flexDirection: "row",
    gap: s(10),
    height: s(50),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: s(1),
    borderRadius: s(25),
    borderColor: AppColors.buttonBorderGray,
  },
  filterText: {
    fontSize: s(17),
    fontFamily: AppFonts.Regular,
  },
});

export default FilterPizza;
