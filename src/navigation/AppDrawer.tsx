import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { Dimensions } from "react-native";
import AppSaveView from "../components/views/AppSaveView";
import { AppColors } from "../styles/colors";
import AppBottomTabs from "./AppBottomTabs";
import CustomDrawerContent from "./CustomDrawerContent";
import DrawerScreensStack from "./DrawerScreensStack";

const Drawer = createDrawerNavigator();

export default function AppDrawer() {
  return (
    <AppSaveView>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerType: "front",
          drawerStyle: {
            width: Dimensions.get("window").width,
            backgroundColor: AppColors.backgroundGrey,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          },
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="MainTabs" component={AppBottomTabs} />
        <Drawer.Screen name="DrawerScreens" component={DrawerScreensStack} />
      </Drawer.Navigator>
    </AppSaveView>
  );
}
