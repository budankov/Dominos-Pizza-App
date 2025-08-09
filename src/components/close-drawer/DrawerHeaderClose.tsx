import { EvilIcons } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { s } from "react-native-size-matters";

const DrawerHeaderClose = () => {
  const navigation = useNavigation();

  const closeDrawer = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  return (
    <TouchableOpacity onPress={closeDrawer} style={{ marginHorizontal: s(10) }}>
      <EvilIcons name="close" size={28} color="#fff" />
    </TouchableOpacity>
  );
};

export default DrawerHeaderClose;
