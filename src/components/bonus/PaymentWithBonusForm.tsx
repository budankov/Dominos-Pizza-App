import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import { s, vs } from "react-native-size-matters";
import * as yup from "yup";
import { AppColors } from "../../styles/colors";
import { AppFonts } from "../../styles/fonts";
import AppTextInputController from "../inputs/AppTextInputController";
import AppText from "../texts/AppText";

const schema = yup
  .object({
    bonus: yup.number().optional(),
    promotion: yup.number().optional(),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const promotions = [
  { label: "---", value: 0 },
  { label: "Більше піц!", value: 30 },
  { label: "2й буріто's зі знижкою", value: 30 },
  { label: "2 Kroneburg і велика піца", value: 20 },
  { label: "Red Bull і стандартна піца", value: 20 },
];

const PaymentWithBonusForm = () => {
  const { t } = useTranslation();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      promotion: 0,
    },
  });

  return (
    <ScrollView style={styles.container}>
      <AppText style={styles.title}>{t("promotions_title")}</AppText>

      <Controller<FormData>
        control={control}
        name="promotion"
        render={({ field: { onChange, value } }) => (
          <Menu>
            <MenuTrigger
              customStyles={{
                TriggerTouchableComponent: TouchableOpacity,
                triggerWrapper: [
                  styles.selectInput,
                  {
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center",
                  },
                ],
              }}
            >
              <Text>{promotions.find((p) => p.value === value)?.label}</Text>
              <Ionicons name="chevron-down" size={16} color="black" />
            </MenuTrigger>

            <MenuOptions
              customStyles={{
                optionsContainer: [styles.optionsContainer, { width: "100%" }],
              }}
            >
              {promotions.map((promo) => (
                <MenuOption
                  key={promo.label}
                  onSelect={() => onChange(promo.value)}
                  text={promo.label}
                  customStyles={{
                    optionWrapper: {
                      paddingVertical: vs(10),
                      paddingHorizontal: s(10),
                    },
                    optionText: {
                      fontSize: s(16),
                      color: "#000",
                    },
                  }}
                />
              ))}
            </MenuOptions>
          </Menu>
        )}
      />

      <AppText style={styles.title}>{t("bonus_payment_title")}</AppText>
      <AppTextInputController<FormData>
        control={control}
        name="bonus"
        placeholder={t("bonus_placeholder")}
        placeholderTextColor={AppColors.textColor}
        styleInput={styles.input}
        keyboardType="numeric"
      />
      <AppText style={styles.title}>{t("bonus_available")}</AppText>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: s(20),
    paddingHorizontal: s(14),
    paddingVertical: s(20),
    backgroundColor: AppColors.cartFormGrey,
  },
  title: {
    fontFamily: AppFonts.Regular,
    fontSize: s(14),
    paddingBottom: s(10),
  },
  input: {
    borderWidth: 1,
    borderColor: AppColors.cartBorderColor,
  },
  selectInput: {
    borderWidth: 1,
    borderColor: AppColors.cartBorderColor,
    borderRadius: s(25),
    paddingHorizontal: s(15),
    fontSize: s(16),
    backgroundColor: "#fff",
    marginBottom: vs(10),
    height: vs(40),
    paddingRight: s(10),
  },
  optionsContainer: {
    fontSize: s(20),
    borderRadius: s(15),
    backgroundColor: "#fff",
    padding: s(5),
    maxHeight: vs(200),
    maxWidth: "84%",
  },
});

export default PaymentWithBonusForm;
