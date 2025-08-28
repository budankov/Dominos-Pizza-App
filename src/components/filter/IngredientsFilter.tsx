import Checkbox from "expo-checkbox";
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { s } from "react-native-size-matters";
import ingredientsEn from "../../data/ingredients-en.json";
import ingredientsUa from "../../data/ingredients-ua.json";
import { AppColors } from "../../styles/colors";
import { AppFonts } from "../../styles/fonts";
import { groupIngredientsMap } from "./GroupIngredientsMap";

type IngredientsFilterProps = {
  selectedIngredients: string[];
  setSelectedIngredients: React.Dispatch<React.SetStateAction<string[]>>;
};

const IngredientsFilter: React.FC<IngredientsFilterProps> = ({
  selectedIngredients,
  setSelectedIngredients,
}) => {
  const { i18n } = useTranslation();
  const ingredientsData =
    i18n.language === "en" ? ingredientsEn : ingredientsUa;

  const ingredientGroups = Object.entries(ingredientsData.groups).map(
    ([groupKey, groupTitle]) => ({
      title: groupTitle,
      data: groupIngredientsMap[groupKey].map((ingredientKey) => ({
        label: ingredientsData.ingredients[ingredientKey],
        value: ingredientKey,
      })),
    })
  );

  const toggleIngredients = (value: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(value)
        ? prev.filter((ingredient) => ingredient !== value)
        : [...prev, value]
    );
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      {ingredientGroups.map((group) => (
        <View key={group.title} style={styles.groupContainer}>
          <Text style={styles.groupTitle}>{group.title}</Text>
          {group.data.map((ingredient) => (
            <View key={ingredient.value} style={styles.container}>
              <Checkbox
                value={selectedIngredients.includes(ingredient.value)}
                onValueChange={() => toggleIngredients(ingredient.value)}
                color={
                  selectedIngredients.includes(ingredient.value)
                    ? AppColors.buttonCheckedBox
                    : undefined
                }
                style={styles.checkbox}
              />
              <Text style={styles.checkTitle}>{ingredient.label}</Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  groupContainer: {
    marginBottom: s(15),
  },
  groupTitle: {
    fontSize: s(18),
    fontFamily: AppFonts.SemiBold,
    marginBottom: s(7),
  },
  container: {
    flexDirection: "row",
    gap: s(7),
    padding: s(5),
    alignItems: "center",
  },
  checkbox: {
    width: s(24),
    height: s(24),
    borderColor: AppColors.buttonCheckBoxBorder,
    borderWidth: s(1),
    borderRadius: s(5),
  },
  checkTitle: {
    fontSize: s(16),
    fontFamily: AppFonts.Regular,
  },
});

export default IngredientsFilter;
