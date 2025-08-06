import React, { FC, ReactNode } from "react";
import { StatusBar, StyleSheet, View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IS_ANDROID } from "../../constants/constants";
import { AppColors } from "../../styles/colors";

interface AppSaveViewProps {
  children: ReactNode;
  style?: ViewStyle;
}

const AppSaveView: FC<AppSaveViewProps> = ({ children, style }) => {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar barStyle="light-content" />
      <View style={[styles.container, style]}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AppColors.backgroundGrey,
    // paddingTop: IS_ANDROID ? StatusBar.currentHeight || 0 : 0,
  },
  container: {
    flex: 1,
  },
});

export default AppSaveView;
