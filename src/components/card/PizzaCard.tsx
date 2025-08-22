import { Ionicons } from "@expo/vector-icons";
import React, { FC } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";
import { AppFonts } from "../../styles/fonts";
import AppButton from "../buttons/AppButton";
import PizzaCartRadioGroup from "../radio/PizzaCartRadioGroup";
import AppText from "../texts/AppText";

interface Pizza {
  id: string;
  name: string;
  image: string;
  ingredients: string[];
  weight: number;
  price: number;
}

interface PizzaCardProps {
  pizza: Pizza;
}

const PizzaCard: FC<PizzaCardProps> = ({
  pizza: { id, name, image, ingredients, weight, price },
}) => {
  return (
    <View style={styles.container}>
      <View key={id} style={styles.card}>
        <View>
          <Image
            source={{ uri: image }}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.weight}>{weight} г*</Text>
        </View>
        <View style={styles.bottomPart}>
          <AppText style={styles.title}>{name}</AppText>
          <AppText style={styles.ingredients}>{ingredients.join(", ")}</AppText>
          <AppButton
            style={styles.changeIngredientsBtn}
            styleTitle={styles.changeIngredientsTitle}
            title=" Замінити інгрідієнти"
            onPress={() => console.log("В розробці")}
          />
          <PizzaCartRadioGroup />
          <View style={styles.floor}>
            <AppText style={styles.price}>{price} грн</AppText>

            <Pressable
              style={styles.addCartBtn}
              onPress={() => console.log("В розробці")}
            >
              <Ionicons
                name="cart-outline"
                size={s(32)}
                color={AppColors.textColorWhite}
              />
              <Text style={styles.addCartBtnText}>В кошик</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    alignSelf: "center",
    paddingHorizontal: s(14),
  },
  card: {
    marginBottom: s(20),
    paddingBottom: s(30),
    borderRadius: s(16),
    borderWidth: s(1),
    borderColor: AppColors.lightGrey,
  },
  weight: {
    position: "absolute",
    bottom: 10,
    right: 10,
    borderRadius: s(15),
    fontSize: s(11),
    fontFamily: AppFonts.Bold,
    color: AppColors.lightGrey,
    padding: 5,
    backgroundColor: "#00000047",
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
    paddingVertical: vs(6),
  },
  ingredients: {
    fontSize: s(14),
    fontFamily: AppFonts.Medium,
    textAlign: "center",
  },
  changeIngredientsBtn: {
    backgroundColor: AppColors.buttonLightGray,
    marginVertical: vs(10),
    height: vs(34),
  },
  changeIngredientsTitle: {
    fontFamily: AppFonts.Regular,
    fontSize: s(13),
    color: AppColors.textColor,
  },
  floor: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  price: {
    fontSize: s(20),
    color: AppColors.textColor,
    marginRight: s(10),
  },
  addCartBtn: {
    flex: 1,
    backgroundColor: AppColors.red,
    borderRadius: s(25),
    height: vs(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: s(10),
    paddingHorizontal: s(14),
  },
  addCartBtnText: {
    color: AppColors.textColorWhite,
    fontSize: s(16),
  },
});

export default PizzaCard;
