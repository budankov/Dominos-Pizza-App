import { Ionicons } from "@expo/vector-icons";
import { DrawerHeaderProps } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AppColors } from "../../styles/colors";

const CustomHeader = ({ navigation }: DrawerHeaderProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      >
        <Ionicons name="menu-outline" size={28} color={"#fff"} />
      </TouchableOpacity>
      <View style={{ flex: 1, alignItems: "center" }}>
        {/* <Image
          source={require("../assets/logo.png")}
          style={{ height: 30, resizeMode: "contain" }}
        /> */}
      </View>
      <TouchableOpacity onPress={() => console.log("Go to Cart")}>
        <Ionicons name="cart-outline" size={26} color={"#fff"} />
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
  },
});

export default CustomHeader;
