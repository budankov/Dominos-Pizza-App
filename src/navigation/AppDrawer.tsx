import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { Dimensions } from "react-native";
import CustomHeader from "../components/headers/CustomHeader";
import AppSaveView from "../components/views/AppSaveView";
import WorkAndCareerScreen from "../screens/career/WorkAndCareerScreen";
import CartScreen from "../screens/cart/CartScreen";
import DominosClubScreen from "../screens/club/DominosClubScreen";
import HomeScreen from "../screens/home/HomeScreen";
import PizzaMakerScreen from "../screens/maker/PizzaMakerScreen";
import NewsScreen from "../screens/news/NewsScreen";
import PizzeriasScreen from "../screens/pizzerias/PizzeriasScreen";
import LeaveReviewScreen from "../screens/review/LeaveReviewScreen";
import PizzaTrackerScreen from "../screens/tracker/PizzaTrackerScreen";
import { AppColors } from "../styles/colors";
import AppBottomTabs from "./AppBottomTabs";
import CustomDrawerContent from "./CustomDrawerContent";
import PromotionsScreen from "../screens/promotions/PromotionsScreen";

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
            backgroundColor: AppColors.backgroundGrey,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            paddingLeft: 0,
          },
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="MainTabs" component={AppBottomTabs} />
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="PizzaMaker" component={PizzaMakerScreen} />
        <Drawer.Screen name="PizzaTracker" component={PizzaTrackerScreen} />
        <Drawer.Screen name="Pizzerias" component={PizzeriasScreen} />
        <Drawer.Screen name="WorkAndCareer" component={WorkAndCareerScreen} />
        <Drawer.Screen name="DominosClub" component={DominosClubScreen} />
        <Drawer.Screen name="LeaveReview" component={LeaveReviewScreen} />
        <Drawer.Screen name="Promotions" component={PromotionsScreen} />
        <Drawer.Screen name="News" component={NewsScreen} />
        <Drawer.Screen name="CartScreen" component={CartScreen} />
      </Drawer.Navigator>
    </AppSaveView>
  );
}
