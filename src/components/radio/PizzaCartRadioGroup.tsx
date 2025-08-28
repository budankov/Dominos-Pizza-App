import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { s, vs } from "react-native-size-matters";
import doughEn from "../../data/dough-en.json";
import doughUa from "../../data/dough-ua.json";
import sizesEn from "../../data/sizes-en.json";
import sizesUa from "../../data/sizes-ua.json";
import { AppColors } from "../../styles/colors";
import { AppFonts } from "../../styles/fonts";

const PizzaCartRadioGroup = () => {
  const [size, setSize] = useState("standard");
  const [dough, setDough] = useState("thick");

  const { i18n, t } = useTranslation();

  const sizesData = i18n.language === "en" ? sizesEn.sizes : sizesUa.sizes;
  const doughData = i18n.language === "en" ? doughEn.dough : doughUa.dough;

  const sizeOptions = Object.entries(sizesData).map(([value, label]) => ({
    label,
    value,
  }));
  const firstSizes = sizeOptions.slice(0, 3);
  const lastSize = sizeOptions[sizeOptions.length - 1];

  const doughOptions = Object.entries(doughData).map(([value, label]) => ({
    value,
    label,
  }));

  const doughGroups = [
    { title: t("pizzaDough"), types: ["thick", "thin"] },
    { title: t("pizzaCrust"), types: ["cheese", "sausages"] },
  ];
  const handleSizeChange = (newSize: string) => {
    setSize(newSize);

    if (newSize === "xxl" && dough === "thick") {
      setDough("thin");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {firstSizes.map((option) => (
          <Pressable
            key={option.value}
            style={[
              styles.button,
              size === option.value && styles.selectedButton,
            ]}
            onPress={() => handleSizeChange(option.value)}
          >
            <Text
              style={[
                styles.buttonText,
                size === option.value && styles.selectedText,
              ]}
            >
              {option.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        style={[
          styles.fullWidthButton,
          size === lastSize.value && styles.selectedButton,
        ]}
        onPress={() => handleSizeChange(lastSize.value)}
      >
        <Text
          style={[
            styles.buttonText,
            size === lastSize.value && styles.selectedText,
          ]}
        >
          {lastSize.label}
        </Text>
      </Pressable>

      {doughGroups.map((group) => (
        <View key={group.title} style={styles.rowWithLabel}>
          <Text style={styles.sideLabel}>{group.title}</Text>
          <View style={styles.rowButtons}>
            {doughOptions
              .filter((o) => group.types.includes(o.value))
              .map((option) => (
                <Pressable
                  key={option.value}
                  style={[
                    styles.buttonSmall,
                    dough === option.value && styles.selectedButton,
                    group.types[0] === "thick" &&
                    size === lastSize.value &&
                    option.value === "thick"
                      ? { opacity: 0.4 }
                      : {},
                  ]}
                  onPress={() =>
                    !(
                      group.types[0] === "thick" &&
                      size === lastSize.value &&
                      option.value === "thick"
                    ) && setDough(option.value)
                  }
                  disabled={
                    group.types[0] === "thick" &&
                    size === lastSize.value &&
                    option.value === "thick"
                  }
                >
                  <Text
                    style={[
                      styles.buttonText,
                      dough === option.value && styles.selectedText,
                    ]}
                  >
                    {option.label}
                  </Text>
                </Pressable>
              ))}
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: s(30),
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: s(10),
    gap: s(5),
  },
  rowWithLabel: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: s(12),
  },
  sideLabel: {
    width: s(50),
    fontSize: s(13),
    fontFamily: AppFonts.Regular,
  },
  rowButtons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: s(5),
  },
  button: {
    flex: 1,
    paddingVertical: vs(8),
    borderRadius: s(20),
    borderWidth: s(1),
    borderColor: AppColors.buttonBorderGray,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonSmall: {
    flex: 1,
    paddingVertical: vs(8),
    borderRadius: s(20),
    borderWidth: 1,
    borderColor: AppColors.buttonBorderGray,
    justifyContent: "center",
    alignItems: "center",
  },
  fullWidthButton: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: vs(10),
    paddingVertical: vs(10),
    borderRadius: s(20),
    borderWidth: s(1),
    borderColor: AppColors.buttonBorderGray,
  },
  selectedButton: {
    backgroundColor: AppColors.buttonDarkGray,
  },
  buttonText: {
    color: AppColors.textColor,
    fontFamily: AppFonts.Regular,
    fontSize: s(13),
  },
  selectedText: {
    color: AppColors.textColorWhite,
  },
});

export default PizzaCartRadioGroup;
