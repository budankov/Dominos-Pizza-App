import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { Dimensions } from "react-native";
import CustomHeader from "../components/headers/CustomHeader";
import AppSaveView from "../components/views/AppSaveView";
import StubScreen from "../screens/stub/StubScreen";
import AppBottomTabs from "./AppBottomTabs";

const Drawer = createDrawerNavigator();

export default function AppDrawer() {
  return (
    <AppSaveView>
      <Drawer.Navigator
        screenOptions={{
          header: (props) => <CustomHeader {...props} />,
          drawerType: "front",
          drawerStyle: {
            width: Dimensions.get("window").width,
          },
        }}
        // drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="MainTabs"
          component={AppBottomTabs}
          // options={{ title: "Меню" }}
        />
        <Drawer.Screen name="Contact" component={StubScreen} />
        <Drawer.Screen name="About" component={StubScreen} />
      </Drawer.Navigator>
    </AppSaveView>
  );
}
