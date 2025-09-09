import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileAddressScreen from "../screens/profile/ProfileAddressScreen";
import ProfileBankCardsScreen from "../screens/profile/ProfileBankCardsScreen";
import ProfileGroupScreen from "../screens/profile/ProfileGroupScreen";
import ProfileLeaveReviewScreen from "../screens/profile/ProfileLeaveReviewScreen";
import ProfileMainScreen from "../screens/profile/ProfileMainScreen";
import ProfileMessage from "../screens/profile/ProfileMessage";
import ProfileOrdersScreen from "../screens/profile/ProfileOrdersScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator
      initialRouteName="ProfileMainScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="ProfileMainScreen"
        component={ProfileMainScreen}
        options={{ title: "Основний скрін" }}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ title: "Профіль" }}
      />
      <Stack.Screen
        name="ProfileGroupScreen"
        component={ProfileGroupScreen}
        options={{ title: "Групи" }}
      />
      <Stack.Screen
        name="ProfileAddressScreen"
        component={ProfileAddressScreen}
        options={{ title: "Адреси" }}
      />
      <Stack.Screen
        name="ProfileOrdersScreen"
        component={ProfileOrdersScreen}
        options={{ title: "Замовлення" }}
      />
      <Stack.Screen
        name="ProfileBankCardsScreen"
        component={ProfileBankCardsScreen}
        options={{ title: "Банківські картки" }}
      />
      <Stack.Screen
        name="ProfileLeaveReviewScreen"
        component={ProfileLeaveReviewScreen}
        options={{ title: "Залишити відгук" }}
      />
      <Stack.Screen
        name="ProfileMessage"
        component={ProfileMessage}
        options={{ title: "Повідомлення" }}
      />
    </Stack.Navigator>
  );
}
