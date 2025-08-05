import React, { FC } from "react";
import { StyleSheet, Text, TextStyle } from "react-native";
import { s } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";
import { AppFonts } from "../../styles/fonts";

interface AppTextProps {
  children: React.ReactNode;
  style?: TextStyle | TextStyle[];
}

const AppText: FC<AppTextProps> = ({ children, style, ...rest }) => {
  return (
    <Text {...rest} style={[styles.base, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    fontSize: s(16),
    fontFamily: AppFonts.Regular,
    color: AppColors.textColor,
  },
});

export default AppText;
