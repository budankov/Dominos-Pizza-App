import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import StubScreen from "../screens/stub/StubScreen";
import AppBottomTabs from "./AppBottomTabs";

const Drawer = createDrawerNavigator();

export default function AppDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="MainTabs"
        component={AppBottomTabs}
        // options={{ title: "Меню" }}
      />
      <Drawer.Screen name="Contact" component={StubScreen} />
      <Drawer.Screen name="About" component={StubScreen} />
    </Drawer.Navigator>
  );
}
