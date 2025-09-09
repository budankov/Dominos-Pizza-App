import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { showMessage } from "react-native-flash-message";
import { s, vs } from "react-native-size-matters";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import AppButton from "../../components/buttons/AppButton";
import AppSaveView from "../../components/views/AppSaveView";
import { auth } from "../../config/firebase";
import { setUserData } from "../../store/reducers/userSlice";
import { AppColors } from "../../styles/colors";
import AppTextInputController from "../inputs/AppTextInputController";
import { useModal } from "../modal/ModalContext";
import SingUpScreen from "./SingUpScreen";

type FormData = yup.InferType<typeof schema>;

const SingInScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { showModal, hideModal } = useModal();

  const schema = yup
    .object({
      email: yup
        .string()
        .email(t("sign_in_email_invalid"))
        .required(t("sign_in_email_required")),
      password: yup
        .string()
        .required(t("sign_in_password_required"))
        .min(6, t("sign_in_password_min_length")),
    })
    .required();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const onLoginPress = async (data: FormData) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      hideModal();
      navigation.navigate("ProfileStack");

      const userDataObj = {
        uid: userCredential.user.uid,
      };

      dispatch(setUserData(userDataObj));
    } catch (error: any) {
      let errorMessage = "";
      if (error.code === "auth/user-not-found") {
        errorMessage = t("sign_in_error_user_not_found");
      } else if (error.code === "auth/invalid-credential") {
        errorMessage = t("sign_in_error_invalid_credential");
      } else {
        errorMessage = t("sign_in_error_default");
      }

      showMessage({
        message: errorMessage,
        type: "danger",
      });
    }
  };

  return (
    <AppSaveView style={styles.container}>
      <AppTextInputController<FormData>
        control={control}
        name="email"
        placeholder={t("sign_in_email_placeholder")}
      />
      <AppTextInputController<FormData>
        control={control}
        name="password"
        placeholder={t("sign_in_password_placeholder")}
        secureTextEntry
      />
      <AppButton
        title={t("sign_in_login_button")}
        onPress={handleSubmit(onLoginPress)}
      />
      <AppButton
        title={t("sign_in_signup_button")}
        style={styles.registerButton}
        textColor="#fff"
        onPress={() => showModal(<SingUpScreen />)}
      />
    </AppSaveView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: s(14),
    backgroundColor: "#fff",
  },
  registerButton: {
    backgroundColor: AppColors.buttonDarkGray,
    borderColor: "#000",
    marginTop: vs(15),
    borderWidth: 1,
  },
});

export default SingInScreen;
