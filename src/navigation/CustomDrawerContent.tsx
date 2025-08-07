import { Ionicons } from "@expo/vector-icons";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import { StyleSheet, View } from "react-native";
import { AppColors } from "../styles/colors";
import { AppFonts } from "../styles/fonts";

export default function CustomDrawerContent(
  props: DrawerContentComponentProps
) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <DrawerItem
          label="ДОМАШНЯ СТОРІНКА"
          onPress={() =>
            props.navigation.navigate("MainTabs", {
              screen: "Home",
            })
          }
          labelStyle={styles.label}
          style={styles.item}
        />
        <DrawerItem
          label="КОНСТРУКТОР ПІЦИ"
          onPress={() =>
            props.navigation.navigate("DrawerScreens", {
              screen: "PizzaMaker",
            })
          }
          labelStyle={styles.label}
          style={styles.item}
        />
        <DrawerItem
          label="PIZZA TRACKER"
          onPress={() =>
            props.navigation.navigate("DrawerScreens", {
              screen: "PizzaTracker",
            })
          }
          icon={({ size }) => (
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={size}
              color={AppColors.red}
            />
          )}
          labelStyle={styles.label}
          style={styles.item}
        />
        <DrawerItem
          label="ПІЦЕРІЇ"
          onPress={() =>
            props.navigation.navigate("DrawerScreens", {
              screen: "Pizzerias",
            })
          }
          labelStyle={styles.label}
          style={styles.item}
        />
        <DrawerItem
          label="РОБОТА ТА КАРʼЄРА"
          onPress={() =>
            props.navigation.navigate("DrawerScreens", {
              screen: "WorkAndCareerScreen",
            })
          }
          labelStyle={styles.label}
          style={styles.item}
        />
        <DrawerItem
          label="ФРАЙЧАЙЗИНГ"
          onPress={async () => {
            await WebBrowser.openBrowserAsync("https://biz.dominos.ua/");
          }}
          labelStyle={styles.label}
          style={styles.item}
        />
        <DrawerItem
          label="DOMINO'S CLUB"
          onPress={() =>
            props.navigation.navigate("DrawerScreens", {
              screen: "DominosClub",
            })
          }
          labelStyle={styles.label}
          style={styles.item}
        />
        <DrawerItem
          label="ЗАЛИШИТИ ВІГДУК"
          onPress={() =>
            props.navigation.navigate("DrawerScreens", {
              screen: "LeaveReview",
            })
          }
          labelStyle={styles.label}
          style={styles.item}
        />
        <DrawerItem
          label="НОВИНИ"
          onPress={() =>
            props.navigation.navigate("DrawerScreens", {
              screen: "News",
            })
          }
          labelStyle={styles.label}
          style={styles.item}
        />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
  item: {},
  label: {
    fontSize: 18,
    fontFamily: AppFonts.Regular,
    color: "#ffffff",
  },
});
