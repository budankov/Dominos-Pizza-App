import { EvilIcons, Fontisto } from "@expo/vector-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import { s } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";
import { AppFonts } from "../../styles/fonts";
import AppText from "../texts/AppText";
import citiesArrEn from "./cities-en.json";
import citiesArrUa from "./cities-ua.json";

const LocationButton = ({ sheetId, markerSize, titleSize }) => {
  const { i18n } = useTranslation();

  const citiesData =
    i18n.language === "en" ? citiesArrEn.cities : citiesArrUa.cities;

  type CityCode = keyof typeof citiesData;
  const cityCodes = Object.keys(citiesData) as CityCode[];
  const [selectedCityCode, setSelectedCityCode] = React.useState<CityCode>(
    cityCodes[0]
  );

  const openSheet = () => {
    SheetManager.show(sheetId);
  };

  const handleConfirm = (code: string) => {
    setSelectedCityCode(code);
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
            <AppText style={styles.title}>Де ви знаходитесь?</AppText>
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
