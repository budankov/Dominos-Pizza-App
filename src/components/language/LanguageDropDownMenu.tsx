import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import { s } from "react-native-size-matters";
import { useDispatch, useSelector } from "react-redux";
import i18n from "../../localization/i18n";
import { languagesArr } from "../../localization/languagesList";
import { setLanguage } from "../../store/reducers/languageSlice";
import { RootState } from "../../store/store";
import { AppColors } from "../../styles/colors";
import AppText from "../texts/AppText";

const LanguageDropDownMenu = () => {
  const dispatch = useDispatch();

  const selectedLang = useSelector(
    (state: RootState) => state.language.userLanguage
  );

  useEffect(() => {
    i18n.changeLanguage(selectedLang);
  }, [selectedLang]);

  return (
    <Menu>
      <MenuTrigger>
        <View style={styles.trigger}>
          <AppText style={styles.triggerText}>
            {selectedLang === "en" ? "Eng" : "Укр"}
          </AppText>
          <Ionicons name="chevron-down" size={16} color="white" />
        </View>
      </MenuTrigger>

      <MenuOptions
        customStyles={{
          optionsContainer: styles.menuContainer,
        }}
      >
        {languagesArr.map((lang) => (
          <MenuOption
            key={lang.code}
            onSelect={() => dispatch(setLanguage(lang.code))}
            customStyles={{
              optionWrapper: [
                styles.menuItem,
                lang.code === selectedLang && styles.menuItemActive,
              ],
            }}
          >
            <AppText
              style={[
                styles.menuItemText,
                lang.code === selectedLang && styles.menuItemTextActive,
              ]}
            >
              {lang.label}
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
