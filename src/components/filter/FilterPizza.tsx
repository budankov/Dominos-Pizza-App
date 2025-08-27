import { EvilIcons } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React, { FC, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import { s } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";
import { AppFonts } from "../../styles/fonts";
import AppText from "../texts/AppText";
import PriceFilter from "./PriceFilter";

const sizeOptions = [
  { label: "Стандарт", value: "standard" },
  { label: "Велика", value: "large" },
  { label: "Екстравелика", value: "xlarge" },
  { label: "Найбільша", value: "xxl" },
];

interface FilterPizzaProps {
  minPrice: number;
  maxPrice: number;
  onApplyFilters: (low: number, high: number, size: string) => void;
}

const FilterPizza: FC<FilterPizzaProps> = ({
  minPrice,
  maxPrice,
  onApplyFilters,
}) => {
  const [size, setSize] = useState("");
  const [low, setLow] = useState(minPrice);
  const [high, setHigh] = useState(maxPrice);

  const handleSizeChange = (newSize: string) => {
    setSize(newSize);
  };

  const handleApply = () => {
    onApplyFilters({ size, low, high });
    SheetManager.hide("filterSheet");
  };

  return (
    <>
      <View style={styles.filterContainer}>
        <Pressable
          style={styles.filterButton}
          onPress={() => SheetManager.show("filterSheet")}
        >
          <FontAwesome5 name="filter" size={24} color={"#636363"} />
          <Text style={styles.filterText}>Фільтр</Text>
        </Pressable>
      </View>

      <ActionSheet id="filterSheet">
        <View style={styles.sheetContainer}>
          <View style={styles.sheetHeader}>
            <AppText style={styles.title}>Фільтр</AppText>
            <Pressable
              onPress={() => SheetManager.hide("filterSheet")}
              style={styles.closeBtn}
            >
              <EvilIcons name="close" size={s(30)} color="#000000" />
            </Pressable>
          </View>
          <View style={styles.container}>
            <View style={styles.row}>
              {sizeOptions.slice(0, 3).map((option) => (
                <Pressable
                  key={option.value}
                  style={[
                    styles.button,
                    size === option.value && styles.selectedButton,
                  ]}
                  onPress={() => handleSizeChange(option.value)}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      size === option.value && styles.selectedText,
                    ]}
                  >
                    {option.label}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Pressable
              style={[
                styles.fullWidthButton,
                size === "xxl" && styles.selectedButton,
              ]}
              onPress={() => handleSizeChange("xxl")}
            >
              <Text
                style={[
                  styles.buttonText,
                  size === "xxl" && styles.selectedText,
                ]}
              >
                Найбільша
              </Text>
            </Pressable>
          </View>

          <PriceFilter
            minPrice={minPrice}
            maxPrice={maxPrice}
            onChange={(l, h) => {
              setLow(l);
              setHigh(h);
            }}
          />
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Pressable onPress={handleApply}>
            <Text>Застосувати</Text>
          </Pressable>
        </View>
      </ActionSheet>
    </>
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
  closeBtn: {
    alignItems: "flex-end",
  },
  sheetContainer: {
    width: "100%",
    paddingHorizontal: s(10),
    paddingVertical: s(20),
  },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: s(10),
  },
  title: {
    fontFamily: AppFonts.SemiBold,
    fontSize: s(18),
    textAlign: "center",
  },
  container: {
    paddingBottom: s(30),
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: s(10),
    gap: s(5),
  },
  rowWithLabel: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: s(12),
  },
  sideLabel: {
    width: s(50),
    fontSize: s(13),
    fontFamily: AppFonts.Regular,
  },
  rowButtons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: s(5),
  },
  button: {
    flex: 1,
    paddingVertical: s(8),
    borderRadius: s(20),
    borderWidth: s(1),
    borderColor: AppColors.buttonBorderGray,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonSmall: {
    flex: 1,
    paddingVertical: s(8),
    borderRadius: s(20),
    borderWidth: 1,
    borderColor: AppColors.buttonBorderGray,
    justifyContent: "center",
    alignItems: "center",
  },
  fullWidthButton: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: s(10),
    paddingVertical: s(10),
    borderRadius: s(20),
    borderWidth: s(1),
    borderColor: AppColors.buttonBorderGray,
  },
  selectedButton: {
    backgroundColor: AppColors.buttonDarkGray,
  },
  buttonText: {
    color: AppColors.textColor,
    fontFamily: AppFonts.Regular,
    fontSize: s(13),
  },
  selectedText: {
    color: AppColors.textColorWhite,
  },
});

export default FilterPizza;
