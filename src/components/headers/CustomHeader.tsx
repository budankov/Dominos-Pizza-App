import { Ionicons } from "@expo/vector-icons";
import { DrawerHeaderProps } from "@react-navigation/drawer";
import {
  DrawerActions,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { s } from "react-native-size-matters";
import { useSelector } from "react-redux";
import DominosPizzaLogoIcon from "../../assets/icons/DominosPizzaLogoIcon";
import { RootState } from "../../store/store";
import { AppColors } from "../../styles/colors";
import LocationButton from "../location/LocationButton";
import SocialMediaDropDownMenu from "../social-media/SocialMediaDropDownMenu";

const CustomHeader = ({ navigation, route }: DrawerHeaderProps) => {
  const currentRouteName = getFocusedRouteNameFromRoute(route) ?? route.name;

  const isOnRoot =
    currentRouteName === "Home" || currentRouteName === "MainTabs";

  const handleLeftPress = () => {
    if (isOnRoot) {
      navigation.dispatch(DrawerActions.toggleDrawer());
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const totalQtyValue = useSelector((state: RootState) => state.cart.totalQty);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLeftPress}>
        <Ionicons
          name={isOnRoot ? "menu-outline" : "arrow-back-outline"}
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
        <View style={{ position: "relative" }}>
          {totalQtyValue > 0 && (
            <View style={styles.totalQtyCircle}>
              <Text style={styles.totalQtyText}>{totalQtyValue}</Text>
            </View>
          )}
          <TouchableOpacity onPress={() => navigation.navigate("CartScreen")}>
            <Ionicons name="cart-outline" size={s(30)} color="#fff" />
          </TouchableOpacity>
        </View>
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
  totalQtyCircle: {
    position: "absolute",
    top: s(2),
    right: -s(2),
    backgroundColor: "#fff",
    width: s(12),
    height: s(12),
    borderRadius: s(6),
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },

  totalQtyText: {
    fontSize: s(10),
    color: AppColors.red,
  },
});

export default CustomHeader;
