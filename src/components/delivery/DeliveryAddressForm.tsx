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
      <AppText style={styles.title}>{t("delivery_address_title")}</AppText>

      <AppText>{t("delivery_address_city")}</AppText>
      <AppTextInputController
        control={control}
        name="city"
        placeholder={t("delivery_address_city_placeholder")}
        placeholderTextColor={AppColors.textColor}
        styleInput={styles.input}
      />

      <AppText>{t("delivery_address_street")}</AppText>
      <AppTextInputController
        control={control}
        name="street"
        placeholder={t("delivery_address_street_placeholder")}
        placeholderTextColor={AppColors.textColor}
        styleInput={styles.input}
      />

      <AppText>{t("delivery_address_house_number")}</AppText>
      <AppTextInputController
        control={control}
        name="houseNumber"
        placeholder={t("delivery_address_house_number_placeholder")}
        placeholderTextColor={AppColors.textColor}
        styleInput={styles.input}
      />

      <AppText>{t("delivery_address_entrance")}</AppText>
      <AppTextInputController
        control={control}
        name="entranceNumber"
        placeholder={t("delivery_address_entrance_placeholder")}
        placeholderTextColor={AppColors.textColor}
        styleInput={styles.input}
        keyboardType="numeric"
      />

      <AppText>{t("delivery_address_apartment")}</AppText>
      <AppTextInputController
        control={control}
        name="apartmentNumber"
        placeholder={t("delivery_address_apartment_placeholder")}
        placeholderTextColor={AppColors.textColor}
        styleInput={styles.input}
        keyboardType="numeric"
      />

      <AppText>{t("delivery_address_floor")}</AppText>
      <AppTextInputController
        control={control}
        name="floor"
        placeholder={t("delivery_address_floor_placeholder")}
        placeholderTextColor={AppColors.textColor}
        styleInput={styles.input}
        keyboardType="numeric"
      />

      <AppText>{t("delivery_address_intercom")}</AppText>
      <AppTextInputController
        control={control}
        name="intercomCode"
        placeholder={t("delivery_address_intercom_placeholder")}
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
