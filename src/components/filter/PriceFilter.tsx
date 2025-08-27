import MultiSlider from "@ptomasroos/react-native-multi-slider";
import React, { FC, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { s } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";
import { AppFonts } from "../../styles/fonts";

interface PriceFilterProps {
  minPrice: number;
  maxPrice: number;
  onChange?: (low: number, high: number) => void;
}

const PriceFilter: FC<PriceFilterProps> = ({
  minPrice,
  maxPrice,
  onChange,
}) => {
  const [values, setValues] = useState<[number, number]>([minPrice, maxPrice]);

  const screenWidth = Dimensions.get("window").width;

  const handleValuesChange = (vals: number[]) => {
    const [low, high] = vals as [number, number];
    setValues([low, high]);
    onChange?.(low, high);
  };

  return (
    <>
      <View style={styles.labelContainer}>
        <Text style={styles.sideLabel}>{values[0]}</Text>
        <Text style={styles.sideLabel}>{values[1]}</Text>
      </View>
      <MultiSlider
        values={values}
        min={minPrice}
        max={maxPrice}
        step={1}
        onValuesChange={handleValuesChange}
        allowOverlap={false}
        snapped
        selectedStyle={styles.railSelected}
        unselectedStyle={styles.rail}
        markerStyle={styles.thumb}
        containerStyle={styles.slider}
        sliderLength={screenWidth - 52}
      />
    </>
  );
};

const styles = StyleSheet.create({
  slider: {
    padding: s(14),
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sideLabel: {
    fontSize: s(12),
    fontFamily: AppFonts.Regular,
    paddingHorizontal: s(5),
    borderRadius: s(2),
    backgroundColor: AppColors.buttonFilterChooseGray,
  },
  rail: {
    backgroundColor: AppColors.buttonFilterChooseGray,
    height: s(4),
  },
  railSelected: {
    backgroundColor: AppColors.red,
    height: s(4),
  },
  thumb: {
    height: s(20),
    width: s(20),
    borderRadius: s(10),
    backgroundColor: AppColors.red,
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
});

export default PriceFilter;
