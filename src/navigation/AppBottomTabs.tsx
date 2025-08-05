import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: AppColors.red,
        tabBarInactiveTintColor: AppColors.lightGrey,
        tabBarLabelStyle: {
          marginTop: vs(4),
          fontSize: s(12),
        },
        tabBarStyle: IS_ANDROID && {
          height: vs(60),
        },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Promotions" component={PromotionsScreen} />
      <Tab.Screen name="Pizza" component={PizzaScreen} />
      <Tab.Screen name="Drinks" component={DrinksScreen} />
      <Tab.Screen name="Sides" component={SidesScreen} />
      <Tab.Screen name="Starter" component={StarterScreen} />
    </Tab.Navigator>
  );
}
