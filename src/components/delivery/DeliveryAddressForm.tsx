import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { s } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";
import { AppFonts } from "../../styles/fonts";
import AppTextInputController from "../inputs/AppTextInputController";
import AppText from "../texts/AppText";

type Props = {
  control: any;
};

const DeliveryAddressForm = ({ control }: Props) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <AppText style={styles.title}>Адреса доставки</AppText>

      <AppText>Місто*</AppText>
      <AppTextInputController
        control={control}
        name="city"
        placeholder="Введіть місто"
        placeholderTextColor={AppColors.textColor}
        styleInput={styles.input}
      />

      <AppText>Вулиця*</AppText>
      <AppTextInputController
        control={control}
        name="street"
        placeholder="Введіть вулицю"
        placeholderTextColor={AppColors.textColor}
        styleInput={styles.input}
      />

      <AppText>Номер дому*</AppText>
      <AppTextInputController
        control={control}
        name="houseNumber"
        placeholder="Введіть номер дому"
        placeholderTextColor={AppColors.textColor}
        styleInput={styles.input}
      />

      <AppText>Підʼїзд</AppText>
      <AppTextInputController
        control={control}
        name="entranceNumber"
        placeholder="Введіть номер підʼїзду"
        placeholderTextColor={AppColors.textColor}
        styleInput={styles.input}
        keyboardType="numeric"
      />

      <AppText>Номер квартири</AppText>
      <AppTextInputController
        control={control}
        name="apartmentNumber"
        placeholder="Введіть номер квартири"
        placeholderTextColor={AppColors.textColor}
        styleInput={styles.input}
        keyboardType="numeric"
      />

      <AppText>Поверх*</AppText>
      <AppTextInputController
        control={control}
        name="floor"
        placeholder="Введіть поверх"
        placeholderTextColor={AppColors.textColor}
        styleInput={styles.input}
        keyboardType="numeric"
      />

      <AppText>Код домофону</AppText>
      <AppTextInputController
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
