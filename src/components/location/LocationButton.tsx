import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import AppText from "../texts/AppText";
import citiesArrEn from "./cities-en.json";
import citiesArrUa from "./cities-ua.json";

import { useTranslation } from "react-i18next";

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
    padding: 10,
    backgroundColor: "#444",
    borderRadius: 6,
    alignSelf: "center",
  },
  selectedCity: {
    fontSize: 20,
    color: "#fff",
  },
  sheetContainer: {
    padding: 20,
  },
  cityItem: {
    paddingVertical: 10,
  },
  cityItemActive: {
    backgroundColor: "#ddd",
    borderRadius: 6,
  },
  cityText: {
    fontSize: 18,
    color: "#000",
  },
  cityTextActive: {
    fontWeight: "bold",
  },
});

export default LocationButton;
