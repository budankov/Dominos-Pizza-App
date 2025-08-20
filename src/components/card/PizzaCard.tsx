import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { s, vs } from "react-native-size-matters";
import pizzaArrUa from "../../data/pizza_ua.json";
import { AppColors } from "../../styles/colors";
import { AppFonts } from "../../styles/fonts";
import AppButton from "../buttons/AppButton";
import PizzaCartRadioGroup from "../radio/PizzaCartRadioGroup";
import AppText from "../texts/AppText";

const PizzaCard = () => {
  return (
    <View style={styles.container}>
      {pizzaArrUa.map(
        ({ id, name, image, ingredients, weight, price, category }) => (
          <View key={id} style={styles.card}>
            <Image
              source={{ uri: image }}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.bottomPart}>
              <AppText style={styles.title}>{name}</AppText>
              <AppText style={styles.ingredients}>
                {ingredients.join(", ")}
              </AppText>
              <AppButton
                style={styles.changeIngredientsBtn}
                styleTitle={styles.changeIngredientsTitle}
                title=" Замінити інгрідієнти"
                onPress={() => console.log("В розробці")}
              />
              <PizzaCartRadioGroup />
            </View>
          </View>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    paddingHorizontal: s(14),
    paddingVertical: vs(20),
  },
  card: {
    marginBottom: s(20),
    borderRadius: s(16),
    borderWidth: s(1),
    borderColor: AppColors.lightGrey,
  },
  bottomPart: {
    paddingHorizontal: s(14),
  },
  image: {
    width: "100%",
    height: 230,
    borderTopRightRadius: s(16),
    borderTopLeftRadius: s(16),
  },
  title: {
    fontSize: s(22),
    fontFamily: AppFonts.Medium,
    textAlign: "center",
    paddingVertical: vs(10),
  },
  ingredients: {
    fontSize: s(14),
    fontFamily: AppFonts.Medium,
    textAlign: "center",
  },
  changeIngredientsBtn: {
    backgroundColor: AppColors.lightGrey,
    marginVertical: vs(14),
    height: vs(34),
  },
  changeIngredientsTitle: {
    fontSize: s(12),
    color: AppColors.textColor,
  },
});

export default PizzaCard;
