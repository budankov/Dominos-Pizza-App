import { Ionicons } from "@expo/vector-icons";
import { DrawerHeaderProps } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { s } from "react-native-size-matters";
import DominosPizzaLogoIcon from "../../assets/icons/DominosPizzaLogoIcon";
import { AppColors } from "../../styles/colors";
import LocationButton from "../location/LocationButton";
import SocialMediaDropDownMenu from "../social-media/SocialMediaDropDownMenu";

const CustomHeader = ({ navigation, route }: DrawerHeaderProps) => {
  const isOnMainTabs = route.name === "MainTabs";

  const handleLeftPress = () => {
    if (isOnMainTabs) {
      navigation.dispatch(DrawerActions.toggleDrawer());
    } else {
      navigation.navigate("MainTabs", { screen: "Home" });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLeftPress}>
        <Ionicons
          name={isOnMainTabs ? "menu-outline" : "arrow-back-outline"}
          size={28}
          color="#fff"
        />
      </TouchableOpacity>

      <View style={styles.logoLocationContainer}>
        <DominosPizzaLogoIcon height={44} />
        <LocationButton
          sheetId="LOCALS_SHEET_HEADER"
          markerSize={16}
          titleSize={14}
        />
      </View>
      <View style={styles.socialCartContainer}>
        <SocialMediaDropDownMenu />
        <TouchableOpacity onPress={() => navigation.navigate("CartScreen")}>
          <Ionicons name="cart-outline" size={s(30)} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: AppColors.backgroundGrey,
    justifyContent: "space-between",
  },
  logoLocationContainer: {
    flexDirection: "row",
  },
  socialCartContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: s(10),
  },
});

export default CustomHeader;
