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
import AppText from "../texts/AppText";

export interface Drinks {
  id: string;
  name: string;
  image: string;
  ingredients: string[];
  volume: number;
  price: number;
}

interface DrinksCardProps {
  drinks: Drinks;
}

const DrinksCard: FC<DrinksCardProps> = ({ drinks }) => {
  const dispatch = useDispatch();
  const item = useSelector((state: RootState) =>
    state.cart.items.find((i) => i.id === drinks.id)
  );

  return (
    <View style={styles.container}>
      <View key={drinks.id} style={styles.card}>
        <Image
          source={{ uri: drinks.image }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.bottomPart}>
          <AppText style={styles.title}>{drinks.name}</AppText>
          <>
            <View style={styles.volume}>
              <AppText style={styles.volumeTitle}>{drinks.volume} ml</AppText>
            </View>
          </>
          <View style={styles.floor}>
            <AppText style={styles.price}>{drinks.price}.00 грн</AppText>
            {!item ? (
              <Pressable
                style={styles.addCartBtn}
                onPress={() => dispatch(addToCart(drinks))}
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
                  onPress={() => dispatch(decrementQty({ id: drinks.id }))}
                >
                  <AntDesign name="minus" size={16} color="black" />
                </Pressable>
                <Text>{item.qty}</Text>
                <Pressable
                  onPress={() => dispatch(incrementQty({ id: drinks.id }))}
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
  volume: {
    width: "100%",
    height: vs(30),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: s(25),
    backgroundColor: AppColors.darkGrey,
    marginVertical: s(20),
  },
  volumeTitle: {
    fontSize: s(16),
    color: AppColors.textColorWhite,
  },
});

export default DrinksCard;
