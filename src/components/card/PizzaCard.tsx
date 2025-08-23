import { AntDesign, Ionicons } from "@expo/vector-icons";
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
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrementQty,
  incrementQty,
} from "../../store/reducers/cartSlice";
import { RootState } from "../../store/store";
import { AppColors } from "../../styles/colors";
import { AppFonts } from "../../styles/fonts";
import AppButton from "../buttons/AppButton";
import PizzaCartRadioGroup from "../radio/PizzaCartRadioGroup";
import AppText from "../texts/AppText";

export interface Pizza {
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

const PizzaCard: FC<PizzaCardProps> = ({ pizza }) => {
  const dispatch = useDispatch();
  const item = useSelector((state: RootState) =>
    state.cart.items.find((i) => i.id === pizza.id)
  );

  return (
    <View style={styles.container}>
      <View key={pizza.id} style={styles.card}>
        <View>
          <Image
            source={{ uri: pizza.image }}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.weight}>{pizza.weight} г*</Text>
        </View>
        <View style={styles.bottomPart}>
          <AppText style={styles.title}>{pizza.name}</AppText>
          <AppText style={styles.ingredients}>
            {pizza.ingredients.join(", ")}
          </AppText>
          <AppButton
            style={styles.changeIngredientsBtn}
            styleTitle={styles.changeIngredientsTitle}
            title=" Замінити інгрідієнти"
            onPress={() => console.log("В розробці")}
          />
          <PizzaCartRadioGroup />
          <View style={styles.floor}>
            <AppText style={styles.price}>{pizza.price}.00 грн</AppText>
            {!item ? (
              <Pressable
                style={styles.addCartBtn}
                onPress={() => dispatch(addToCart(pizza))}
              >
                <Ionicons
                  name="cart-outline"
                  size={s(32)}
                  color={AppColors.textColorWhite}
                />
                <Text style={styles.addCartBtnText}>В кошик</Text>
              </Pressable>
            ) : (
              <View style={styles.countItemBtn}>
                <Pressable
                  onPress={() => dispatch(decrementQty({ id: pizza.id }))}
                >
                  <AntDesign name="minus" size={16} color="black" />
                </Pressable>
                <Text>{item.qty}</Text>
                <Pressable
                  onPress={() => dispatch(incrementQty({ id: pizza.id }))}
                >
                  <AntDesign name="plus" size={16} color="black" />
                </Pressable>
              </View>
            )}
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
  countItemBtn: {
    flex: 1,
    backgroundColor: AppColors.lightGrey,
    borderRadius: s(25),
    height: vs(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: s(40),
    paddingHorizontal: s(14),
  },
});

export default PizzaCard;
