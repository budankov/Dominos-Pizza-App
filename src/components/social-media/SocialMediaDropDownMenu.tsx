import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import { s } from "react-native-size-matters";
import FacebookIcon from "../../assets/icons/FacebookIcon";
import InstagramIcon from "../../assets/icons/InstagramIcon";
import TelegramIcon from "../../assets/icons/TelegramIcon";
import ViberIcon from "../../assets/icons/ViberIcon";
import { AppColors } from "../../styles/colors";

const SocialMediaDropDownMenu = () => {
  return (
    <Menu>
      <MenuTrigger>
        <View style={styles.socialWrapper}>
          <MaterialCommunityIcons
            name="message-processing"
            size={30}
            color="white"
          />
          <Ionicons name="chevron-down" size={16} color="white" />
        </View>
      </MenuTrigger>

      <MenuOptions
        customStyles={{
          optionsContainer: styles.menuContainer,
        }}
      >
        <MenuOption
          customStyles={{
            optionWrapper: styles.menuItem,
          }}
        >
          <TouchableOpacity
            onPress={() =>
              WebBrowser.openBrowserAsync(
                "https:/www.instagram.com/dominos_ua/"
              )
            }
          >
            <InstagramIcon />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              WebBrowser.openBrowserAsync(
                "https://m.facebook.com/@DominosPizzaUkraine/?wtsid=rdr_0jQj34BYpwjAk45KU&hr=1"
              );
            }}
          >
            <FacebookIcon />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              WebBrowser.openBrowserAsync("https://www.viber.com/ua/");
            }}
          >
            <ViberIcon />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              WebBrowser.openBrowserAsync("https://t.me/dominosukraine");
            }}
          >
            <TelegramIcon />
          </TouchableOpacity>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
};

const styles = StyleSheet.create({
  socialWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: s(3),
  },
  triggerText: {
    fontSize: s(16),
    marginRight: s(4),
    color: AppColors.textColorWhite,
  },
  menuContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: s(4),
    borderRadius: s(8),
    width: s(52),
    marginTop: s(28),
  },
  menuItem: {
    // paddingVertical: s(8),
    // paddingHorizontal: s(4),
    // backgroundColor: "green",
    gap: s(6),
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

export default SocialMediaDropDownMenu;
