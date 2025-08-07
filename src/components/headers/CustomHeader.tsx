import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { StackHeaderProps } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AppColors } from "../../styles/colors";

const CustomHeader = ({ navigation, route }: StackHeaderProps) => {
  const showBackButton = navigation.canGoBack();

  const isDrawerScreen = route.name === "DrawerScreens";

  const handleLeftPress = () => {
    if (isDrawerScreen) {
      navigation.navigate("MainTabs", { screen: "Home" });
    } else {
      navigation.dispatch(DrawerActions.toggleDrawer());
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLeftPress}>
        <Ionicons
          name={showBackButton ? "arrow-back-outline" : "menu-outline"}
          size={28}
          color="#fff"
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => console.log("Go to Cart")}>
        <Ionicons name="cart-outline" size={26} color="#fff" />
      </TouchableOpacity>
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
});

export default CustomHeader;
