import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { s } from "react-native-size-matters";
import PaymentWithBonusForm from "../../components/bonus/PaymentWithBonusForm";
import AppButton from "../../components/buttons/AppButton";
import DeliveryAddressForm from "../../components/delivery/DeliveryAddressForm";
import ChooseRestaurant from "../../components/restaurant/СhooseRestaurant";
import AppText from "../../components/texts/AppText";
import { AppColors } from "../../styles/colors";
import { AppFonts } from "../../styles/fonts";

const CartScreen = () => {
  const [deliveryTypeButton, setDeliveryTypeButton] = useState("delivery");
  const deliveryTypeGroup = [
    { title: "Доставка", value: "delivery" },
    { title: "З собою", value: "takeOut" },
  ];

  const handleDeliveryType = (newDeliveryType: string) => {
    setDeliveryTypeButton(newDeliveryType);
  };

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
    paddingVertical: s(20),
  },
  title: {
    textAlign: "center",
    fontSize: s(20),
    fontFamily: AppFonts.SemiBold,
  },
  button: {
    backgroundColor: AppColors.buttonLightGray,
  },
  buttonTitle: {
    color: AppColors.textColor,
  },
  deliveryContainer: {
    flexDirection: "row",
    gap: s(20),
  },
  deliveryBtn: {
    flex: 1,
    alignItems: "center",
    borderWidth: s(1),
    borderRadius: s(40),
    paddingVertical: s(16),
  },
  deliveryTitle: {},
  selectedButton: {
    backgroundColor: AppColors.buttonDarkGray,
  },
  selectedTitle: {
    color: AppColors.textColorWhite,
  },
});

export default CartScreen;
