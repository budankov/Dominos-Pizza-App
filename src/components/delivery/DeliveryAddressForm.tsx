import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { s } from "react-native-size-matters";
import * as yup from "yup";
import { AppColors } from "../../styles/colors";
import { AppFonts } from "../../styles/fonts";
import AppTextInputController from "../inputs/AppTextInputController";
import AppText from "../texts/AppText";

type FormData = yup.InferType<typeof schema>;

const DeliveryAddressForm = () => {
  const { t } = useTranslation();

  const schema = yup
    .object({
      city: yup.string().required("Це обовʼязкове поле"),
      street: yup.string().required("Це обовʼязкове поле"),
      houseNumber: yup.string().required("Це обовʼязкове поле"),
      entranceNumber: yup.string().optional(),
      apartmentNumber: yup.string().optional(),
      floor: yup.number().required("Це обовʼязкове поле"),
      intercomCode: yup.string().optional(),
    })
    .required();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <View style={styles.container}>
      <AppText style={styles.title}>Адреса доставки</AppText>
      <AppText>Місто*</AppText>
      <AppTextInputController<FormData>
        control={control}
        name="city"
        placeholder="Введіть місто"
        placeholderTextColor={AppColors.textColor}
        styleInput={styles.input}
      />
      <AppText>Вулиця*</AppText>
      <AppTextInputController<FormData>
        control={control}
        name="street"
        placeholder="Введіть вулицю"
        placeholderTextColor={AppColors.textColor}
        styleInput={styles.input}
      />
      <AppText>Номер дому*</AppText>
      <AppTextInputController<FormData>
        control={control}
        name="houseNumber"
        placeholder="Введіть номер дому"
        placeholderTextColor={AppColors.textColor}
        styleInput={styles.input}
      />
      <AppText>Підʼїзд</AppText>
      <AppTextInputController<FormData>
        control={control}
        name="entranceNumber"
        placeholder="Введіть номер підʼїзду"
        placeholderTextColor={AppColors.textColor}
        styleInput={styles.input}
        keyboardType="numeric"
      />
      <AppText>Номер квартири</AppText>
      <AppTextInputController<FormData>
        control={control}
        name="apartmentNumber"
        placeholder="Введіть номер квартири"
        placeholderTextColor={AppColors.textColor}
        styleInput={styles.input}
        keyboardType="numeric"
      />
      <AppText>Поверх*</AppText>
      <AppTextInputController<FormData>
        control={control}
        name="floor"
        placeholder="Введіть поверх"
        placeholderTextColor={AppColors.textColor}
        styleInput={styles.input}
        keyboardType="numeric"
      />
      <AppText>Код домофону</AppText>
      <AppTextInputController<FormData>
        control={control}
        name="intercomCode"
        placeholder="Введіть код"
        placeholderTextColor={AppColors.textColor}
        styleInput={styles.input}
        keyboardType="numeric"
      />
    </View>
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
    fontFamily: AppFonts.SemiBold,
    fontSize: s(20),
    paddingBottom: s(20),
  },
  input: {
    borderBottomWidth: 1,
    borderWidth: 0,
    borderRadius: 0,
    paddingHorizontal: 0,
    backgroundColor: AppColors.cartFormGrey,
    borderBottomColor: AppColors.cartBorderColor,
  },
});

export default DeliveryAddressForm;
