import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { StyleSheet } from "react-native";
import { s, vs } from "react-native-size-matters";
import AppText from "../texts/AppText";
import AppTextInput from "./AppTextInput";

interface AppTextInputControllerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  rules?: object;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric";
  styleInput?: object[];
}

const AppTextInputController = <T extends FieldValues>({
  control,
  name,
  rules,
  placeholder,
  secureTextEntry,
  keyboardType,
  styleInput,
}: AppTextInputControllerProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <AppTextInput
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            style={[styleInput, error ? styles.errorInput : undefined]}
          />
          {error && <AppText style={styles.textError}>{error.message}</AppText>}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  errorInput: {
    borderColor: "red",
  },
  textError: {
    color: "red",
    fontSize: s(12),
    textAlign: "center",
    marginTop: -vs(5),
    marginBottom: vs(10),
  },
});

export default AppTextInputController;
