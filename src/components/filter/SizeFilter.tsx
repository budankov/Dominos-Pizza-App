import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { s } from "react-native-size-matters";
import sizesEn from "../../data/sizes-en.json";
import sizesUa from "../../data/sizes-ua.json";
import { AppColors } from "../../styles/colors";
import { AppFonts } from "../../styles/fonts";

interface SizeFilterProps {
  size: string;
  setSize: (setSize: string) => void;
}

const SizeFilter: FC<SizeFilterProps> = ({ size, setSize }) => {
  const { i18n, t } = useTranslation();

  const sizesData = i18n.language === "en" ? sizesEn.sizes : sizesUa.sizes;
  const sizeOptions = Object.entries(sizesData).map(([value, label]) => ({
    label,
    value,
  }));
  const firstSizes = sizeOptions.slice(0, 3);
  const lastSize = sizeOptions[sizeOptions.length - 1];

  const handleSizeChange = (newSize: string) => {
    setSize(newSize);
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
    paddingVertical: s(8),
    borderRadius: s(20),
    borderWidth: s(1),
    borderColor: AppColors.buttonBorderGray,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonSmall: {
    flex: 1,
    paddingVertical: s(8),
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
    marginTop: s(10),
    paddingVertical: s(10),
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

export default SizeFilter;
