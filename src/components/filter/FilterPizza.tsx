import { EvilIcons } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";
import { AppFonts } from "../../styles/fonts";
import AppButton from "../buttons/AppButton";
import AppText from "../texts/AppText";
import IngredientsFilter from "./IngredientsFilter";
import PriceFilter from "./PriceFilter";
import SizeFilter from "./SizeFilter";
import TagsFilter from "./TagsFilter";

interface FilterPizzaProps {
  minPrice: number;
  maxPrice: number;
  onApplyFilters: (filters: {
    size: "standard" | "large" | "xlarge" | "xxl";
    low: number;
    high: number;
    selectedTags: string[];
    selectedIngredients: string[];
  }) => void;
  onReset: () => void;
}

const FilterPizza: FC<FilterPizzaProps> = ({
  minPrice,
  maxPrice,
  onApplyFilters,
  onReset,
}) => {
  const [size, setSize] = useState<
    "standard" | "large" | "xlarge" | "xxl" | ""
  >("");
  const [low, setLow] = useState(minPrice);
  const [high, setHigh] = useState(maxPrice);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const { i18n, t } = useTranslation();

  const handleApply = () => {
    onApplyFilters({ size, low, high, selectedTags, selectedIngredients });
    SheetManager.hide("filterSheet");
  };

  const handleReset = () => {
    setSize("");
    setSelectedTags([]);
    setSelectedIngredients([]);
    onReset();
  };

  return (
    <>
      <View style={styles.filterContainer}>
        <Pressable
          style={styles.filterButton}
          onPress={() => SheetManager.show("filterSheet")}
        >
          <FontAwesome5 name="filter" size={24} color={"#636363"} />
          <Text style={styles.filterText}>{t("filter_title")}</Text>
        </Pressable>
      </View>

      <ActionSheet id="filterSheet">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.sheetContainer}>
            <View style={styles.sheetHeader}>
              <AppText style={styles.title}>{t("filter_title")}</AppText>
              <Pressable
                onPress={() => SheetManager.hide("filterSheet")}
                style={styles.closeBtn}
              >
                <EvilIcons name="close" size={s(36)} color="#000000" />
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
          </View>
          <View style={styles.buttonContainer}>
            <AppButton
              title={t("filter_clear")}
              backgroundColor={AppColors.buttonLightGray}
              textColor={AppColors.textColor}
              styleTitle={{ fontSize: s(15) }}
              onPress={handleReset}
            />
            <AppButton
              title={t("filter_apply")}
              onPress={handleApply}
              styleTitle={{ fontSize: s(15) }}
            />
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
    paddingVertical: vs(65),
    paddingBottom: vs(10),
  },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: AppFonts.SemiBold,
    fontSize: s(22),
    textAlign: "center",
  },
  buttonContainer: {
    paddingHorizontal: s(14),
    gap: s(10),
    paddingBottom: vs(50),
    marginBottom: vs(15),
  },
});

export default FilterPizza;
