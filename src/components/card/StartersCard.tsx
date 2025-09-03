import { AntDesign, Ionicons } from "@expo/vector-icons";
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

export interface Starters {
  id: string;
  name: string;
  image: string;
  description: string[];
  weight: number;
  volume: string[];
  price: number;
  tags: string[];
}

interface StartersCardProps {
  starters: Starters;
}

const StartersCard: FC<StartersCardProps> = ({ starters }) => {
  const [selected, setSelected] = useState(starters.volume[0]);

  const dispatch = useDispatch();
  const item = useSelector((state: RootState) =>
    state.cart.items.find((i) => i.id === starters.id)
  );

  return (
    <View style={styles.container}>
      <View key={starters.id} style={styles.card}>
        {starters.tags && starters.tags.length > 0 && (
          <CardTags tags={starters.tags} />
        )}
        <View>
          <Image
            source={{ uri: starters.image }}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.weight}>{starters.weight} г*</Text>
        </View>
        <View style={styles.bottomPart}>
          <AppText style={styles.title}>{starters.name}</AppText>
          {starters.description && (
            <AppText style={styles.description}>{starters.description}</AppText>
          )}
          <View
            style={{ flexDirection: "row", gap: s(10), paddingVertical: s(20) }}
          >
            {starters.volume.map((starter, index) => (
              <Pressable
                key={index}
                style={[
                  styles.button,
                  selected === starter && styles.selectedButton,
                ]}
                onPress={() => setSelected(starter)}
              >
                <AppText
                  style={[
                    styles.buttonText,
                    selected === starter && styles.selectedText,
                  ]}
                >
                  {starter}
                </AppText>
              </Pressable>
            ))}
          </View>
          <View style={styles.floor}>
            <AppText style={styles.price}>{starters.price}.00 грн</AppText>
            {!item ? (
              <Pressable
                style={styles.addCartBtn}
                onPress={() => dispatch(addToCart(starters))}
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
                  onPress={() => dispatch(decrementQty({ id: starters.id }))}
                >
                  <AntDesign name="minus" size={16} color="black" />
                </Pressable>
                <Text>{item.qty}</Text>
                <Pressable
                  onPress={() => dispatch(incrementQty({ id: starters.id }))}
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

export default StartersCard;
