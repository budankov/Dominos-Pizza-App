import React, { FC, ReactNode } from "react";
import { StatusBar, StyleSheet, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IS_ANDROID } from "../../constants/constants";
import { AppColors } from "../../styles/colors";

interface AppSaveViewProps {
  children: ReactNode;
  style?: ViewStyle;
}

const AppSaveView: FC<AppSaveViewProps> = ({ children, style }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: IS_ANDROID ? StatusBar.currentHeight || 0 : insets.top,
          paddingBottom: 0,
        },
        style,
      ]}
    >
      <StatusBar barStyle="light-content" />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.backgroundGrey,
  },
});

export default AppSaveView;
