import { EvilIcons, Fontisto } from "@expo/vector-icons";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import { s } from "react-native-size-matters";
import { useDispatch, useSelector } from "react-redux";
import { setCity } from "../../store/reducers/locationSlice";
import { RootState } from "../../store/store";
import { AppColors } from "../../styles/colors";
import { AppFonts } from "../../styles/fonts";
import AppText from "../texts/AppText";
import citiesArrEn from "./cities-en.json";
import citiesArrUa from "./cities-ua.json";

interface LocationButtonProps {
  sheetId: string;
  markerSize: number;
  titleSize: number;
}

const LocationButton: FC<LocationButtonProps> = ({
  sheetId,
  markerSize,
  titleSize,
}) => {
  const { i18n, t } = useTranslation();
  const dispatch = useDispatch();

  const citiesData =
    i18n.language === "en" ? citiesArrEn.cities : citiesArrUa.cities;
  const cityCodes = Object.keys(citiesData) as (keyof typeof citiesData)[];

  type CityCode = keyof typeof citiesData;

  const selectedCityCode = useSelector(
    (state: RootState) => state.location.userCity
  ) as CityCode;

  const openSheet = () => {
    SheetManager.show(sheetId);
  };

  const handleConfirm = (code: keyof typeof citiesData) => {
    dispatch(setCity(code));
    SheetManager.hide(sheetId);
  };

  return (
    <>
      <TouchableOpacity onPress={openSheet} style={styles.button}>
        <Fontisto
          name="map-marker-alt"
          size={s(markerSize)}
          color={AppColors.textColorWhite}
          style={{ paddingRight: s(5) }}
        />
        <AppText style={[styles.selectedCity, { fontSize: s(titleSize) }]}>
          {citiesData[selectedCityCode]}
        </AppText>
      </TouchableOpacity>

      <ActionSheet id={sheetId}>
        <View style={styles.sheetContainer}>
          <View style={styles.sheetHeader}>
            <TouchableOpacity
              onPress={() => SheetManager.hide(sheetId)}
              style={styles.closeBtn}
            >
              <EvilIcons name="close" size={s(40)} color="#000000" />
            </TouchableOpacity>
            <AppText style={styles.title}>{t("location_title")}</AppText>
          </View>
          {cityCodes.map((code) => (
            <TouchableOpacity
              key={code}
              onPress={() => handleConfirm(code)}
              style={[
                styles.cityItem,
                code === selectedCityCode && styles.cityItemActive,
              ]}
            >
              {code === selectedCityCode ? (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Fontisto
                    name="map-marker-alt"
                    size={18}
                    color={AppColors.red}
                    style={{ marginRight: s(10) }}
                  />
                  <AppText style={styles.cityText}>{citiesData[code]}</AppText>
                </View>
              ) : (
                <AppText style={styles.cityText}>{citiesData[code]}</AppText>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ActionSheet>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  selectedCity: {
    color: "#fff",
  },
  sheetContainer: {
    padding: s(20),
  },
  sheetHeader: {
    paddingBottom: 20,
  },
  cityItem: {
    paddingVertical: s(5),
  },
  cityItemActive: {
    borderRadius: s(6),
  },
  cityText: {
    fontSize: s(20),
    color: "#000",
  },
  title: {
    fontFamily: AppFonts.SemiBold,
    fontSize: s(20),
    textAlign: "center",
  },
  closeBtn: {
    alignItems: "flex-end",
  },
});

export default LocationButton;
