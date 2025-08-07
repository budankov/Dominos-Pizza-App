import { Ionicons } from "@expo/vector-icons";
import { DrawerHeaderProps } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AppColors } from "../../styles/colors";

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

      <View style={{ flex: 1, alignItems: "center" }}>
        {/* <Image
          source={require("../assets/logo.png")}
          style={{ height: 30, resizeMode: "contain" }}
        /> */}
      </View>

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
