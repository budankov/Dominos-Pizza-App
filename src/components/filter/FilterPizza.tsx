import { EvilIcons } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import { s } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";
import { AppFonts } from "../../styles/fonts";
import AppText from "../texts/AppText";
import IngredientsFilter from "./IngredientsFilter";
import PriceFilter from "./PriceFilter";
import SizeFilter from "./SizeFilter";
import TagsFilter from "./TagsFilter";

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
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const { i18n, t } = useTranslation();

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
        <ScrollView showsVerticalScrollIndicator={false}>
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

            <SizeFilter size={size} setSize={setSize} />

            <PriceFilter
              minPrice={minPrice}
              maxPrice={maxPrice}
              onChange={(l, h) => {
                setLow(l);
                setHigh(h);
              }}
            />
            <TagsFilter
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
            />

            <IngredientsFilter
              selectedIngredients={selectedIngredients}
              setSelectedIngredients={setSelectedIngredients}
            />

            <Pressable onPress={handleApply}>
              <Text>Застосувати</Text>
            </Pressable>
          </View>
        </ScrollView>
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
});

export default FilterPizza;
