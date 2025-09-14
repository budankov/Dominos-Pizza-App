import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { s, vs } from "react-native-size-matters";
import { useDispatch, useSelector } from "react-redux";
import PaymentWithBonusForm from "../../components/bonus/PaymentWithBonusForm";
import AppButton from "../../components/buttons/AppButton";
import DeliveryAddressForm from "../../components/delivery/DeliveryAddressForm";
import ChooseRestaurant from "../../components/restaurant/СhooseRestaurant";
import AppText from "../../components/texts/AppText";
import doughEn from "../../data/dough-en.json";
import doughUa from "../../data/dough-ua.json";
import sizesEn from "../../data/sizes-en.json";
import sizesUa from "../../data/sizes-ua.json";
import {
  decreaseQty,
  increaseQty,
  removeFromCart,
} from "../../store/reducers/cartSlice";
import { RootState } from "../../store/store";
import { AppColors } from "../../styles/colors";
import { AppFonts } from "../../styles/fonts";

const CartScreen = () => {
  const { i18n } = useTranslation();

  const sizesData = i18n.language === "en" ? sizesEn.sizes : sizesUa.sizes;
  const doughData = i18n.language === "en" ? doughEn.dough : doughUa.dough;

  const [deliveryTypeButton, setDeliveryTypeButton] = useState("delivery");

  const deliveryTypeGroup = [
    { title: "Доставка", value: "delivery", icon: "delivery-dining" },
    { title: "З собою", value: "takeOut", icon: "shopping-bag" },
  ];

  const handleDeliveryType = (newDeliveryType: string) => {
    setDeliveryTypeButton(newDeliveryType);
  };

  const dispatch = useDispatch();

  const items = useSelector((state: RootState) => state.cart.items);

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <AppText style={styles.title}>Кошик</AppText>
        <View style={styles.deliveryContainer}>
          {deliveryTypeGroup.map((option) => (
            <Pressable
              key={option.value}
              style={[
                styles.deliveryBtn,
                deliveryTypeButton === option.value && styles.selectedButton,
              ]}
              onPress={() => handleDeliveryType(option.value)}
            >
              <MaterialIcons
                name={option.icon as any}
                size={20}
                color={deliveryTypeButton === option.value ? "#fff" : "#000"}
              />
              <Text
                style={[
                  styles.deliveryTitle,
                  deliveryTypeButton === option.value && styles.selectedTitle,
                ]}
              >
                {option.title}
              </Text>
            </Pressable>
          ))}
        </View>
        <AppText style={styles.subTitle}>Ваше замовлення</AppText>
        {deliveryTypeButton === "delivery" && (
          <AppText
            style={{
              fontSize: s(14),
              marginTop: s(-15),
            }}
          >
            Мінімальна сума для безшкоштовної доставки 295 грн.
          </AppText>
        )}

        <View style={{ flexDirection: "column", gap: s(20) }}>
          {items &&
            items.map((item) => (
              <View
                key={`${item.id}_${item.size ?? ""}_${item.dough ?? ""}`}
                style={styles.ordersPreview}
              >
                <View style={styles.ordersLeftSide}>
                  <Image
                    style={styles.ordersImg}
                    source={{ uri: item.image }}
                  />
                </View>
                <View style={styles.ordersRightSide}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: s(20),
                        fontFamily: AppFonts.Regular,
                        flex: 1,
                      }}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {item.name}
                    </Text>
                    <Pressable
                      onPress={() =>
                        dispatch(
                          removeFromCart({
                            id: item.id,
                            size: item.size ?? "",
                            dough: item.dough ?? "",
                          })
                        )
                      }
                      style={{ marginLeft: s(12) }}
                    >
                      <FontAwesome name="trash-o" size={20} color="#7E7E7E" />
                    </Pressable>
                  </View>

                  <Text
                    style={{ fontSize: s(12), fontFamily: AppFonts.Regular }}
                  >
                    {item.ingredients.join(", ")}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      gap: s(10),
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: s(12),
                        fontFamily: AppFonts.Regular,
                        flexShrink: 1,
                      }}
                    >
                      {sizesData[item.size]}
                    </Text>
                    <Text
                      style={{
                        fontSize: s(12),
                        fontFamily: AppFonts.Regular,
                        flexShrink: 1,
                      }}
                    >
                      {doughData[item.dough]}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: s(20),
                    }}
                  >
                    <View style={styles.countItemBtn}>
                      <Pressable
                        onPress={() =>
                          dispatch(
                            decreaseQty({
                              id: item.id,
                              size: item.size ?? "",
                              dough: item.dough ?? "",
                            })
                          )
                        }
                      >
                        <AntDesign name="minus" size={16} color="black" />
                      </Pressable>
                      <Text>{item.qty}</Text>
                      <Pressable
                        onPress={() =>
                          dispatch(
                            increaseQty({
                              id: item.id,
                              size: item.size ?? "",
                              dough: item.dough ?? "",
                            })
                          )
                        }
                      >
                        <AntDesign name="plus" size={16} color="black" />
                      </Pressable>
                    </View>

                    <Text
                      style={{ fontSize: s(14), fontFamily: AppFonts.SemiBold }}
                    >
                      {item.price * item.qty}.00 грн
                    </Text>
                  </View>
                </View>
              </View>
            ))}
        </View>

        {deliveryTypeButton === "delivery" ? (
          <DeliveryAddressForm />
        ) : (
          <ChooseRestaurant />
        )}
        <PaymentWithBonusForm />
        <AppButton
          style={styles.button}
          textColor={styles.buttonTitle}
          title="Додати Sorry Card"
          onPress={() => {}}
        />
        <View style={{ alignItems: "flex-end" }}>
          <AppText style={{ paddingBottom: s(10) }}>
            Товарів на сумму: 0 грн
          </AppText>
          <AppText>
            Сумма до сплати:{" "}
            <AppText style={{ color: AppColors.red, fontSize: s(20) }}>
              0 грн
            </AppText>
          </AppText>
        </View>
        <AppButton title="Оформити замовлення" onPress={() => {}} />
        <AppButton
          style={styles.button}
          textColor={styles.buttonTitle}
          title="Повернутись до меню"
          onPress={() => {}}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    gap: s(20),
    paddingHorizontal: s(14),
    paddingVertical: s(30),
  },
  title: {
    textAlign: "center",
    fontSize: s(20),
    fontFamily: AppFonts.SemiBold,
  },
  subTitle: {
    fontSize: s(20),
    fontFamily: AppFonts.Regular,
  },
  button: {
    backgroundColor: AppColors.buttonLightGray,
  },
  buttonTitle: {
    color: "#000",
  },
  deliveryContainer: {
    flexDirection: "row",
    gap: s(20),
  },
  deliveryBtn: {
    flex: 1,
    flexDirection: "row",
    gap: s(10),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: s(1),
    borderRadius: s(40),
    borderColor: AppColors.cartBorderColor,
    paddingVertical: s(16),
  },
  deliveryTitle: {},
  selectedButton: {
    backgroundColor: AppColors.buttonDarkGray,
  },
  selectedTitle: {
    color: AppColors.textColorWhite,
  },
  ordersPreview: {
    flexDirection: "row",
    gap: s(20),
    alignItems: "center",
  },
  ordersLeftSide: {},
  ordersRightSide: {
    flex: 1,
    flexDirection: "column",
    gap: s(5),
  },
  ordersImg: {
    width: s(75),
    height: s(75),
    borderRadius: s(10),
  },
  countItemBtn: {
    backgroundColor: AppColors.lightGrey,
    borderRadius: s(10),
    height: vs(20),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: s(10),
    paddingHorizontal: s(10),
  },
});

export default CartScreen;
