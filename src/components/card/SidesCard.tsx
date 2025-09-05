import { AntDesign, Ionicons } from "@expo/vector-icons";
import { t } from "i18next";
import React, { FC, useState } from "react";
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
import CardTags from "../tags/CardTags";
import AppText from "../texts/AppText";

export interface Sides {
  id: string;
  name: string;
  image: string;
  description: string[];
  weight: number;
  volume: string[];
  price: number;
  tags: string[];
}

interface SidesCardProps {
  sides: Sides;
}

const SidesCard: FC<SidesCardProps> = ({ sides }) => {
  const [selected, setSelected] = useState(sides.volume[0]);

  const dispatch = useDispatch();
  const item = useSelector((state: RootState) =>
    state.cart.items.find((i) => i.id === sides.id)
  );

  return (
    <View style={styles.container}>
      <View key={sides.id} style={styles.card}>
        {sides.tags && sides.tags.length > 0 && <CardTags tags={sides.tags} />}
        <View>
          <Image
            source={{ uri: sides.image }}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.weight}>
            {sides.weight} {t("starters_weight_unit")}
          </Text>
        </View>
        <View style={styles.bottomPart}>
          <AppText style={styles.title}>{sides.name}</AppText>
          {sides.description && (
            <AppText style={styles.description}>{sides.description}</AppText>
          )}
          <View
            style={{ flexDirection: "row", gap: s(10), paddingVertical: s(20) }}
          >
            {sides.volume.map((side, index) => (
              <Pressable
                key={index}
                style={[
                  styles.button,
                  selected === side && styles.selectedButton,
                ]}
                onPress={() => setSelected(side)}
              >
                <AppText
                  style={[
                    styles.buttonText,
                    selected === side && styles.selectedText,
                  ]}
                >
                  {side}
                </AppText>
              </Pressable>
            ))}
          </View>
          <View style={styles.floor}>
            <AppText style={styles.price}>
              {sides.price}.00 {t("currency")}
            </AppText>
            {!item ? (
              <Pressable
                style={styles.addCartBtn}
                onPress={() => dispatch(addToCart(sides))}
              >
                <Ionicons
                  name="cart-outline"
                  size={s(32)}
                  color={AppColors.textColorWhite}
                />
                <Text style={styles.addCartBtnText}>{t("add_to_cart")}</Text>
              </Pressable>
            ) : (
              <View style={styles.countItemBtn}>
                <Pressable
                  onPress={() => dispatch(decrementQty({ id: sides.id }))}
                >
                  <AntDesign name="minus" size={16} color="black" />
                </Pressable>
                <Text>{item.qty}</Text>
                <Pressable
                  onPress={() => dispatch(incrementQty({ id: sides.id }))}
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
  description: {
    fontSize: s(14),
    fontFamily: AppFonts.Medium,
    textAlign: "center",
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
  button: {
    flex: 1,
    paddingVertical: vs(8),
    borderRadius: s(20),
    borderWidth: s(1),
    borderColor: AppColors.buttonBorderGray,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: AppColors.buttonDarkGray,
  },
  buttonText: {
    color: AppColors.textColor,
    fontFamily: AppFonts.Regular,
    fontSize: s(13),
  },
  selectedText: {
    color: AppColors.textColorWhite,
  },
});

export default SidesCard;
