import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";
import { AppFonts } from "../../styles/fonts";

const sizeOptions = [
  { label: "Стандарт", value: "standard" },
  { label: "Велика", value: "large" },
  { label: "Екстра", value: "xlarge" },
  { label: "Найбільша", value: "xxl" },
];

const doughOptions = [
  { label: "Тісто Пухке", value: "thick" },
  { label: "Тісто Тонке", value: "thin" },
  { label: "Борт Сирний", value: "cheese" },
  { label: "Борт Хот-Дог", value: "sausages" },
];

const PizzaCartRadioGroup = () => {
  const [size, setSize] = useState("standard");
  const [dough, setDough] = useState("thick");

  const handleSizeChange = (newSize: string) => {
    setSize(newSize);

    if (newSize === "xxl" && dough === "thick") {
      setDough("thin");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {sizeOptions.slice(0, 3).map((option) => (
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
          size === "xxl" && styles.selectedButton,
        ]}
        onPress={() => handleSizeChange("xxl")}
      >
        <Text
          style={[styles.buttonText, size === "xxl" && styles.selectedText]}
        >
          Найбільша
        </Text>
      </Pressable>

      <View style={styles.rowWithLabel}>
        <Text style={styles.sideLabel}>Тісто</Text>
        <View style={styles.rowButtons}>
          {doughOptions
            .filter((o) => o.value === "thick" || o.value === "thin")
            .map((option) => (
              <Pressable
                key={option.value}
                style={[
                  styles.buttonSmall,
                  dough === option.value && styles.selectedButton,
                  option.value === "thick" && size === "xxl"
                    ? { opacity: 0.4 }
                    : {},
                ]}
                onPress={() =>
                  !(option.value === "thick" && size === "xxl") &&
                  setDough(option.value)
                }
                disabled={option.value === "thick" && size === "xxl"}
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

      <View style={styles.rowWithLabel}>
        <Text style={styles.sideLabel}>Борт</Text>
        <View style={styles.rowButtons}>
          {doughOptions
            .filter((o) => o.value === "cheese" || o.value === "sausages")
            .map((option) => (
              <Pressable
                key={option.value}
                style={[
                  styles.buttonSmall,
                  dough === option.value && styles.selectedButton,
                ]}
                onPress={() => setDough(option.value)}
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
    gap: s(10),
  },
  rowWithLabel: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: s(15),
  },
  sideLabel: {
    width: s(70),
    fontSize: s(16),
    fontFamily: AppFonts.Medium,
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
    borderColor: AppColors.lightGrey,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonSmall: {
    flex: 1,
    paddingVertical: vs(8),
    borderRadius: s(20),
    borderWidth: 1,
    borderColor: AppColors.lightGrey,
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
    borderColor: AppColors.lightGrey,
  },
  selectedButton: {
    backgroundColor: AppColors.backgroundGrey,
  },
  buttonText: {
    color: AppColors.textColor,
    fontFamily: AppFonts.Medium,
  },
  selectedText: {
    color: AppColors.textColorWhite,
  },
});

export default PizzaCartRadioGroup;
