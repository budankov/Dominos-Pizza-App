import React from "react";
import { StyleSheet, TextInput, ViewStyle } from "react-native";
import { s, vs } from "react-native-size-matters";

interface AppTextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType: "default" | "email-address" | "numeric";
  style?: ViewStyle | ViewStyle[];
  placeholderTextColor?: string;
}

const AppTextInput: React.FC<AppTextInputProps> = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  style,
  placeholderTextColor,
}) => {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      style={[styles.input, style]}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: vs(40),
    borderRadius: s(25),
    borderWidth: 1,
    borderColor: "#000",
    paddingHorizontal: s(15),
    fontSize: s(16),
    backgroundColor: "#fff",
    width: "100%",
    marginBottom: vs(10),
  },
});

export default AppTextInput;
