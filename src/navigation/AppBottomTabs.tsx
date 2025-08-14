import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTranslation } from "react-i18next";
import { s, vs } from "react-native-size-matters";
import { IS_ANDROID } from "../constants/constants";
import DrinksScreen from "../screens/drinks/DrinksScreen";
import HomeScreen from "../screens/home/HomeScreen";
import PizzaScreen from "../screens/pizza/PizzaScreen";
import PromotionsScreen from "../screens/promotions/PromotionsScreen";
import SidesScreen from "../screens/sides/SidesScreen";
import StarterScreen from "../screens/starter/StarterScreen";
import { AppColors } from "../styles/colors";

const Tab = createBottomTabNavigator();

export default function AppBottomTabs() {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: AppColors.red,
        tabBarInactiveTintColor: AppColors.lightGrey,
        tabBarLabelStyle: {
          fontSize: s(10),
          fontWeight: "400",
        },
        tabBarStyle: IS_ANDROID && {
          height: vs(60),
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
          title: t("tab_home"),
        }}
      />
      <Tab.Screen
        name="Promotions"
        component={PromotionsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="pricetags-outline" size={size} color={color} />
          ),
          title: t("tab_promotions"),
        }}
      />
      <Tab.Screen
        name="Pizza"
        component={PizzaScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="pizza-outline" size={size} color={color} />
          ),
          title: t("tab_pizza"),
        }}
      />
      <Tab.Screen
        name="Drinks"
        component={DrinksScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="beer-outline"
              size={size}
              color={color}
            />
          ),
          title: t("tab_drinks"),
        }}
      />
      <Tab.Screen
        name="Sides"
        component={SidesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="french-fries"
              size={size}
              color={color}
            />
          ),
          title: t("tab_sides"),
        }}
      />
      <Tab.Screen
        name="Starter"
        component={StarterScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cupcake" size={size} color={color} />
          ),
          title: t("tab_starter"),
        }}
      />
    </Tab.Navigator>
  );
}
