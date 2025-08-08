import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { ActivityIndicator } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppDrawer from "./src/navigation/AppDrawer";

export default function App() {
  const [fontsLoaded] = useFonts({
    "OpenSans-Regular": require("./src/assets/fonts/OpenSans-Regular.ttf"),
    "OpenSans-Medium": require("./src/assets/fonts/OpenSans-Medium.ttf"),
    "OpenSans-SemiBold": require("./src/assets/fonts/OpenSans-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size={"large"} />;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppDrawer />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
