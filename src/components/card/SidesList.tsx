import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, SectionList, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { s, vs } from "react-native-size-matters";
import sidesArrEn from "../../data/sides-en.json";
import sidesArrUa from "../../data/sides-ua.json";
import { AppFonts } from "../../styles/fonts";
import Sort from "../filter/Sort";
import SidesCard from "./SidesCard";

const SidesList = () => {
  const { i18n } = useTranslation();
  const language = i18n.language;

  const [mode, setMode] = useState<"section" | "flat">("section");
  const [filteredSides, setFilteredSides] = useState(
    language === "en" ? sidesArrEn : sidesArrUa
  );

  const sides = language === "en" ? sidesArrEn : sidesArrUa;

  useEffect(() => {
    setFilteredSides(sides);
  }, [language]);

  const sections = Object.values(
    filteredSides.reduce((acc: Record<string, any>, drink: any) => {
      const cat = (drink.category || "Без категорії").trim();
      if (!acc[cat]) acc[cat] = { title: cat, data: [] };
      acc[cat].data.push(drink);
      return acc;
    }, {})
  ).sort((a, b) => a.title.localeCompare(b.title));

  const handleSort = (type: "priceAsc" | "priceDesc") => {
    const sorted = [...filteredSides];
    if (type === "priceAsc") sorted.sort((a, b) => a.price - b.price);
    if (type === "priceDesc") sorted.sort((a, b) => b.price - a.price);

    setFilteredSides(sorted);
    setMode("flat");
  };

  const handleReset = () => {
    setFilteredSides(sides);
    setMode("section");
  };

  return (
    <View style={styles.container}>
      <View style={styles.sortContainer}>
        <Sort onSort={handleSort} reset={handleReset} />
      </View>

      {mode === "section" ? (
        <SectionList
          scrollEnabled={false}
          sections={sections}
          stickySectionHeadersEnabled={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderSectionHeader={({ section }) => (
            <Text style={styles.categoryTitle}>{section.title}</Text>
          )}
          renderItem={({ item }) => <SidesCard sides={item} />}
        />
      ) : (
        <FlatList
          scrollEnabled={false}
          data={filteredSides}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <SidesCard sides={item} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    alignSelf: "center",
    paddingHorizontal: s(14),
    backgroundColor: "#fff",
  },
  categoryTitle: {
    textAlign: "center",
    fontSize: s(23),
    fontFamily: AppFonts.SemiBold,
    marginBottom: vs(10),
  },
  sortContainer: {
    width: "50%",
    alignSelf: "flex-end",
    gap: s(10),
    paddingBottom: vs(20),
  },
  emptyBox: {
    padding: 20,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SidesList;
