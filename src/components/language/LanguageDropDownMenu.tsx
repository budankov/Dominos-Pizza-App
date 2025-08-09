import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import { s } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";
import AppText from "../texts/AppText";

const LanguageDropDownMenu = () => {
  const [lang, setLang] = useState("Укр");

  const options = ["Укр", "Eng"];

  return (
    <Menu>
      <MenuTrigger>
        <View style={styles.trigger}>
          <AppText style={styles.triggerText}>{lang}</AppText>
          <Ionicons name="chevron-down" size={16} color="white" />
        </View>
      </MenuTrigger>

      <MenuOptions
        customStyles={{
          optionsContainer: styles.menuContainer,
        }}
      >
        {options.map((item) => (
          <MenuOption
            key={item}
            onSelect={() => setLang(item)}
            customStyles={{
              optionWrapper: [
                styles.menuItem,
                item === lang && styles.menuItemActive,
              ],
            }}
          >
            <AppText
              style={[
                styles.menuItemText,
                item === lang && styles.menuItemTextActive,
              ]}
            >
              {item}
            </AppText>
          </MenuOption>
        ))}
      </MenuOptions>
    </Menu>
  );
};

const styles = StyleSheet.create({
  trigger: {
    flexDirection: "row",
    alignItems: "center",
  },
  triggerText: {
    fontSize: s(16),
    marginRight: s(4),
    color: AppColors.textColorWhite,
  },
  menuContainer: {
    padding: s(4),
    borderRadius: s(8),
    width: s(61),
    marginTop: s(28),
  },
  menuItem: {
    paddingVertical: s(8),
    paddingHorizontal: s(12),
  },
  menuItemActive: {
    backgroundColor: "#eee",
    borderRadius: s(6),
  },
  menuItemText: {
    fontSize: s(16),
    color: AppColors.textColor,
  },
  menuItemTextActive: {
    color: AppColors.red,
  },
});

export default LanguageDropDownMenu;
