import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import { s } from "react-native-size-matters";
import { useSelector } from "react-redux";
import * as yup from "yup";
import MapMarkerIcon from "../../assets/icons/MapMarkerIcon";
import citiesArrEn from "../../components/location/cities-en.json";
import citiesArrUa from "../../components/location/cities-ua.json";
import { RootState } from "../../store/store";
import { AppColors } from "../../styles/colors";
import { AppFonts } from "../../styles/fonts";
import AppText from "../texts/AppText";

const restaurantAddresses = [
  { label: "Виберіть ресторан", value: 0 },
  { label: "вул. Алматиньска, 17", value: 1 },
  { label: "вул. Антоновича, 165", value: 2 },
  { label: "вул. Ахматової Анни, 49", value: 3 },
  { label: "вул. Басейнаб, 17", value: 4 },
  { label: "вул. Борщагівська, 212", value: 5 },
  { label: "вул. Васильківська, 100А", value: 6 },
  { label: "вул. Васильківська, 8", value: 7 },
  { label: "вул. Вишгородська, 31", value: 8 },
  { label: "вул. Георгія Кірпи, 3", value: 9 },
  { label: "вул. Гната Юри, 6", value: 10 },
];

const ChooseRestaurant = () => {
  const { i18n, t } = useTranslation();

  const { control } = useForm({
    resolver: yupResolver(
      yup.object({
        restaurant: yup.number().optional(),
      })
    ),
    defaultValues: {
      restaurant: 0,
    },
  });

  const citiesData =
    i18n.language === "en" ? citiesArrEn.cities : citiesArrUa.cities;
  const cityCodes = Object.keys(citiesData) as (keyof typeof citiesData)[];

  type CityCode = keyof typeof citiesData;

  const selectedCityCode = useSelector(
    (state: RootState) => state.location.userCity
  ) as CityCode;

  return (
    <ScrollView style={styles.container}>
      <AppText style={styles.title}>Виберіть ресторан</AppText>
      <View style={styles.cityContainer}>
        <MapMarkerIcon color="red" />
        <Text style={styles.cityTitle}>{citiesData[selectedCityCode]}</Text>
      </View>
      <AppText style={styles.subTitle}>Ресторан</AppText>
      <Controller
        control={control}
        name="restaurant"
        render={({ field: { onChange, value } }) => (
          <Menu>
            <MenuTrigger
              customStyles={{
                TriggerTouchableComponent: TouchableOpacity,
                triggerWrapper: styles.input,
              }}
            >
              <Text style={{ fontSize: s(15) }}>
                {restaurantAddresses.find((p) => p.value === value)?.label ||
                  "---"}
              </Text>
              <Ionicons name="chevron-down" size={16} color="black" />
            </MenuTrigger>
            <MenuOptions
              customStyles={{
                optionsContainer: [styles.optionsContainer, { width: "100%" }],
              }}
            >
              <ScrollView>
                {restaurantAddresses.map((address) => (
                  <MenuOption
                    key={address.value}
                    onSelect={() => onChange(address.value)}
                    text={address.label}
                    customStyles={{
                      optionWrapper: {
                        paddingVertical: 10,
                        paddingHorizontal: 15,
                      },
                      optionText: {
                        fontSize: s(16),
                        color: "#000",
                      },
                    }}
                  />
                ))}
              </ScrollView>
            </MenuOptions>
          </Menu>
        )}
      />
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
    fontFamily: AppFonts.SemiBold,
    fontSize: s(20),
    paddingBottom: s(20),
  },
  subTitle: {
    fontFamily: AppFonts.Regular,
    fontSize: s(16),
  },
  optionsContainer: {
    overflow: "hidden",
    fontSize: s(20),
    borderRadius: s(15),
    backgroundColor: "#fff",
    padding: s(5),
    maxHeight: s(200),
    maxWidth: "84%",
  },
  input: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    height: s(40),
    borderBottomWidth: s(1),
    borderWidth: 0,
    borderRadius: 0,
    paddingHorizontal: 0,
    backgroundColor: AppColors.cartFormGrey,
    borderBottomColor: AppColors.cartBorderColor,
  },
  cityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: s(8),
    paddingVertical: s(20),
  },
  cityTitle: {
    fontSize: s(16),
  },
});

export default ChooseRestaurant;
