import { Fontisto } from "@expo/vector-icons";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import { s } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";
import AppText from "../texts/AppText";
import citiesArrEn from "./cities-en.json";
import citiesArrUa from "./cities-ua.json";

const LocationButton = () => {
  const { i18n } = useTranslation();

  const citiesData =
    i18n.language === "en" ? citiesArrEn.cities : citiesArrUa.cities;

  const cityCodes = Object.keys(citiesData);
  const [selectedCityCode, setSelectedCityCode] = useState(cityCodes[0] || "");

  const openSheet = () => {
    SheetManager.show("LOCALS_SHEET");
  };

  const handleConfirm = (code: string) => {
    setSelectedCityCode(code);
    SheetManager.hide("LOCALS_SHEET");
  };

  return (
    <>
      <TouchableOpacity onPress={openSheet} style={styles.button}>
        <Fontisto
          name="map-marker-alt"
          size={18}
          color={AppColors.textColorWhite}
          style={{ paddingRight: s(5) }}
        />
        <AppText style={styles.selectedCity}>
          {citiesData[selectedCityCode]}
        </AppText>
      </TouchableOpacity>

      <ActionSheet id="LOCALS_SHEET">
        <View style={styles.sheetContainer}>
          {cityCodes.map((code) => (
            <TouchableOpacity
              key={code}
              onPress={() => handleConfirm(code)}
              style={[
                styles.cityItem,
                code === selectedCityCode && styles.cityItemActive,
              ]}
            >
              <AppText
                style={[
                  styles.cityText,
                  code === selectedCityCode && styles.cityTextActive,
                ]}
              >
                {citiesData[code]}
              </AppText>
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
    fontSize: s(22),
    color: "#fff",
  },
  sheetContainer: {
    padding: s(20),
  },
  cityItem: {
    paddingVertical: s(10),
  },
  cityItemActive: {
    backgroundColor: "#ddd",
    borderRadius: s(6),
  },
  cityText: {
    fontSize: s(18),
    color: "#000",
  },
  cityTextActive: {
    fontWeight: "bold",
  },
});

export default LocationButton;
