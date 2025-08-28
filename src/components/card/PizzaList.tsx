import React, { useState } from "react";
import { Dimensions, SectionList, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { s, vs } from "react-native-size-matters";
import pizzaArrUa from "../../data/pizza-ua.json";
import { AppFonts } from "../../styles/fonts";
import FilterPizza from "../filter/FilterPizza";
import Sort from "../filter/Sort";
import PizzaCard from "./PizzaCard";

const PizzaList = () => {
  const [mode, setMode] = useState<"section" | "flat">("section");
  const [filteredPizzas, setFilteredPizzas] = useState(pizzaArrUa);

  const prices = filteredPizzas.map((p) => p.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const sections = Object.values(
    filteredPizzas.reduce((acc: Record<string, any>, pizza: any) => {
      const cat = (pizza.category || "Без категорії").trim();
      if (!acc[cat]) acc[cat] = { title: cat, data: [] };
      acc[cat].data.push(pizza);
      return acc;
    }, {})
  ).sort((a, b) => a.title.localeCompare(b.title));

  const handleSort = (type: "priceAsc" | "priceDesc") => {
    const sorted = [...filteredPizzas];
    if (type === "priceAsc") sorted.sort((a, b) => a.price - b.price);
    if (type === "priceDesc") sorted.sort((a, b) => b.price - a.price);

    setFilteredPizzas(sorted);
    setMode("flat");
  };

  const handleReset = () => {
    setFilteredPizzas(pizzaArrUa);
    setMode("section");
  };

  const handleApplyFilters = (filters: {
    size: string;
    low: number;
    high: number;
  }) => {
    let result = pizzaArrUa;

    result = result.filter(
      (p) => p.price >= filters.low && p.price <= filters.high
    );

    if (filters.size && filters.size !== "standard") {
      result = result.filter((p) => p.size === filters.size);
    }

    setFilteredPizzas(result);
    setMode("flat");
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <FilterPizza
          minPrice={minPrice}
          maxPrice={maxPrice}
          onApplyFilters={handleApplyFilters}
        />
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
          renderItem={({ item }) => <PizzaCard pizza={item} />}
        />
      ) : (
        <FlatList
          scrollEnabled={false}
          data={filteredPizzas}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PizzaCard pizza={item} />}
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
    paddingVertical: s(14),
  },
  categoryTitle: {
    textAlign: "center",
    fontSize: s(23),
    fontFamily: AppFonts.SemiBold,
    marginBottom: vs(10),
  },
  filterContainer: {
    flexDirection: "row",
    gap: s(10),
    paddingTop: vs(25),
    paddingBottom: vs(20),
  },
});

export default PizzaList;
