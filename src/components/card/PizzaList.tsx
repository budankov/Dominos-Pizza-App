import React, { useState } from "react";
import {
  Button,
  Dimensions,
  SectionList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { s, vs } from "react-native-size-matters";
import pizzaArrUa from "../../data/pizza_ua.json";
import { AppFonts } from "../../styles/fonts";
import PizzaCard from "./PizzaCard";

const PizzaList = () => {
  const [mode, setMode] = useState<"section" | "flat">("section");
  const [filteredPizzas, setFilteredPizzas] = useState(pizzaArrUa);

  const sections = Object.values(
    filteredPizzas.reduce((acc: Record<string, any>, pizza: any) => {
      const cat = (pizza.category || "Без категорії").trim();
      if (!acc[cat]) acc[cat] = { title: cat, data: [] };
      acc[cat].data.push(pizza);
      return acc;
    }, {})
  ).sort((a, b) => a.title.localeCompare(b.title));

  const handleSort = (type: any) => {
    const sorted = [...pizzaArrUa];
    if (type === "priceAsc") sorted.sort((a, b) => a.price - b.price);
    if (type === "priceDesc") sorted.sort((a, b) => b.price - a.price);

    setFilteredPizzas(sorted);
    setMode("flat");
  };

  const handleFilter = (filters: any) => {
    const result = pizzaArrUa.filter((pizza) => {
      return pizza.price >= filters.minPrice && pizza.price <= filters.maxPrice;
    });

    setFilteredPizzas(result);
    setMode("flat");
  };

  const handleReset = () => {
    setFilteredPizzas(pizzaArrUa);
    setMode("section");
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          paddingBottom: 30,
        }}
      >
        <Button title="Сортувати ↑" onPress={() => handleSort("priceAsc")} />
        <Button title="Сортувати ↓" onPress={() => handleSort("priceDesc")} />
        <Button title="Скинути" onPress={handleReset} />
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
});

export default PizzaList;
