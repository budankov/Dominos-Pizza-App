// navigation/DrawerScreensStack.tsx

import { createStackNavigator } from "@react-navigation/stack";
import CustomHeader from "../components/headers/CustomHeader";
import WorkAndCareerScreen from "../screens/career/WorkAndCareerScreen";
import DominosClubScreen from "../screens/club/DominosClubScreen";
import HomeScreen from "../screens/home/HomeScreen";
import PizzaMakerScreen from "../screens/maker/PizzaMakerScreen";
import NewsScreen from "../screens/news/NewsScreen";
import PizzeriasScreen from "../screens/pizzerias/PizzeriasScreen";
import LeaveReviewScreen from "../screens/review/LeaveReviewScreen";
import PizzaTrackerScreen from "../screens/tracker/PizzaTrackerScreen";

const Stack = createStackNavigator();

export default function DrawerScreensStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <CustomHeader {...props} />,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="PizzaMaker" component={PizzaMakerScreen} />
      <Stack.Screen name="PizzaTracker" component={PizzaTrackerScreen} />
      <Stack.Screen name="Pizzerias" component={PizzeriasScreen} />
      <Stack.Screen name="WorkAndCareer" component={WorkAndCareerScreen} />
      <Stack.Screen name="DominosClub" component={DominosClubScreen} />
      <Stack.Screen name="LeaveReview" component={LeaveReviewScreen} />
      <Stack.Screen name="News" component={NewsScreen} />
    </Stack.Navigator>
  );
}
