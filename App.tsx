import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { I18nextProvider } from "react-i18next";
import { ActivityIndicator } from "react-native";
import FlashMessage from "react-native-flash-message";
import { MenuProvider } from "react-native-popup-menu";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { AuthProvider } from "./src/context/AuthContext";
import { ModalProvider } from "./src/context/ModalContext";
import i18n from "./src/localization/i18n";
import AppDrawer from "./src/navigation/AppDrawer";
import { persistor, store } from "./src/store/store";

export default function App() {
  const [fontsLoaded] = useFonts({
    "OpenSans-Light": require("./src/assets/fonts/OpenSans-Light.ttf"),
    "OpenSans-Regular": require("./src/assets/fonts/OpenSans-Regular.ttf"),
    "OpenSans-Medium": require("./src/assets/fonts/OpenSans-Medium.ttf"),
    "OpenSans-SemiBold": require("./src/assets/fonts/OpenSans-SemiBold.ttf"),
    "OpenSans-Bold": require("./src/assets/fonts/OpenSans-Bold.ttf"),
    "OpenSans-ExtraBold": require("./src/assets/fonts/OpenSans-ExtraBold.ttf"),
    "FuturaLT-Bold": require("./src/assets/fonts/FuturaLT-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size={"large"} />;
  }

  return (
    <Provider store={store}>
      <PersistGate
        loading={<ActivityIndicator size={"large"} />}
        persistor={persistor}
      >
        <SafeAreaProvider>
          <I18nextProvider i18n={i18n}>
            <MenuProvider>
              <AuthProvider>
                <NavigationContainer>
                  <FlashMessage position={"top"} statusBarHeight={50} />
                  <ModalProvider>
                    <AppDrawer />
                  </ModalProvider>
                </NavigationContainer>
              </AuthProvider>
            </MenuProvider>
          </I18nextProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
