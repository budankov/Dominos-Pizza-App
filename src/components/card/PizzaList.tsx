import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, SectionList, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { s, vs } from "react-native-size-matters";
import pizzaIngredientsEn from "../../data/ingredients-en.json";
import pizzaIngredientsUa from "../../data/ingredients-ua.json";
import pizzaArrEn from "../../data/pizza-en.json";
import pizzaArrUa from "../../data/pizza-ua.json";
import pizzaTagsEn from "../../data/tags-en.json";
import pizzaTagsUa from "../../data/tags-ua.json";
import { AppFonts } from "../../styles/fonts";
import FilterPizza from "../filter/FilterPizza";
import Sort from "../filter/Sort";
import PizzaCard from "./PizzaCard";

const PizzaList = () => {
  const { i18n } = useTranslation();
  const language = i18n.language; // "en" або "ua"

  const [mode, setMode] = useState<"section" | "flat">("section");
  const [filteredPizzas, setFilteredPizzas] = useState(
    language === "en" ? pizzaArrEn : pizzaArrUa
  );
  const [selectedSize, setSelectedSize] = useState<
    "standard" | "large" | "xlarge" | "xxl"
  >("standard");

  const pizzas = language === "en" ? pizzaArrEn : pizzaArrUa;
  const tagsData = language === "en" ? pizzaTagsEn : pizzaTagsUa;
  const ingredientsData =
    language === "en" ? pizzaIngredientsEn : pizzaIngredientsUa;

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
    setFilteredPizzas(pizzas);
    setMode("section");
  };

  const handleApplyFilters = (filters: {
    size: "standard" | "large" | "xlarge" | "xxl";
    low: number;
    high: number;
    selectedTags: string[];
    selectedIngredients: string[];
  }) => {
    setSelectedSize(filters.size);

    let result = pizzas;

    // Фільтр по ціні
    result = result.filter(
      (p) => p.price >= filters.low && p.price <= filters.high
    );

    const selectedTagsLocalized = filters.selectedTags
      .map((tag) => tagsData.tags[tag])
      .filter(Boolean) as string[];

    const selectedIngredientsLocalized = filters.selectedIngredients
      .map((ing) => ingredientsData.ingredients[ing])
      .filter(Boolean) as string[];

    // OR-фільтр: тег або інгредієнт
    if (
      selectedTagsLocalized.length > 0 ||
      selectedIngredientsLocalized.length > 0
    ) {
      result = result.filter(
        (p) =>
          selectedTagsLocalized.some((tag) => p.tags?.includes(tag)) ||
          selectedIngredientsLocalized.some((ing) =>
            p.ingredients?.includes(ing)
          )
      );
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
          onReset={handleReset}
        />
        <Sort onSort={handleSort} reset={handleReset} />
      </View>

      {filteredPizzas.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>Нічого не знайдено</Text>
        </View>
      ) : mode === "section" ? (
        <SectionList
          scrollEnabled={false}
          sections={sections}
          stickySectionHeadersEnabled={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderSectionHeader={({ section }) => (
            <Text style={styles.categoryTitle}>{section.title}</Text>
          )}
          renderItem={({ item }) => (
            <PizzaCard pizza={item} selectedSize={selectedSize} />
          )}
        />
      ) : (
        <FlatList
          scrollEnabled={false}
          data={filteredPizzas}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PizzaCard pizza={item} selectedSize={selectedSize} />
          )}
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
    backgroundColor: "#fff",
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
  emptyBox: {
    padding: 20,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PizzaList;
