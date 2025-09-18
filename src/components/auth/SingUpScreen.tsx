import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Alert, StyleSheet } from "react-native";
import { showMessage } from "react-native-flash-message";
import { s, vs } from "react-native-size-matters";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import AppButton from "../../components/buttons/AppButton";
import AppSaveView from "../../components/views/AppSaveView";
import { auth } from "../../config/firebase";
import { useModal } from "../../context/ModalContext";
import { setUserData } from "../../store/reducers/userSlice";
import { AppColors } from "../../styles/colors";
import AppTextInputController from "../inputs/AppTextInputController";

type FormData = yup.InferType<typeof schema>;

const SingUpScreen = () => {
  const { t } = useTranslation();
  const { hideModal } = useModal();

  const schema = yup
    .object({
      userName: yup
        .string()
        .required(t("sign_up_username_required"))
        .min(5, t("sign_up_username_min_length")),
      email: yup
        .string()
        .email(t("sign_up_email_invalid"))
        .required(t("sign_up_email_required")),
      password: yup
        .string()
        .required(t("sign_up_password_required"))
        .min(6, t("sign_up_password_min_length")),
    })
    .required();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onSingUpPress = async (data: FormData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(userCredential.user, {
        displayName: data.userName,
      });

      Alert.alert(t("sign_up_success"));
      hideModal();

      const currentUser = auth.currentUser;

      const userDataObj = {
        uid: currentUser?.uid,
        email: currentUser?.email,
        userName: currentUser?.displayName,
      };

      dispatch(setUserData(userDataObj));
    } catch (error: any) {
      let errorMessage = "";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = t("sign_up_error_email_in_use");
      } else if (error.code === "auth/invalid-email") {
        errorMessage = t("sign_up_error_invalid_email");
      } else if (error.code === "auth/weak-password") {
        errorMessage = t("sign_up_error_weak_password");
      } else {
        errorMessage = t("sign_up_error_default");
      }

      showMessage({
        message: errorMessage,
        type: "danger",
      });
    }
  };

  return (
    <AppSaveView style={styles.container}>
      <AppTextInputController
        control={control}
        styleInput={styles.input}
        placeholderTextColor={AppColors.cartBorderColor}
        name="userName"
        placeholder={t("sign_up_username_placeholder")}
      />
      <AppTextInputController
        control={control}
        styleInput={styles.input}
        placeholderTextColor={AppColors.cartBorderColor}
        name="email"
        placeholder={t("sign_up_email_placeholder")}
      />
      <AppTextInputController
        control={control}
        styleInput={styles.input}
        placeholderTextColor={AppColors.cartBorderColor}
        showPassword
        name="password"
        placeholder={t("sign_up_password_placeholder")}
        secureTextEntry
      />
      <AppButton
        title={t("sign_up_create_account_button")}
        onPress={handleSubmit(onSingUpPress)}
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
  logo: {
    height: s(150),
    width: s(150),
    marginBottom: vs(30),
  },
  singInButton: {
    backgroundColor: "#fff",
    borderColor: "#000",
    marginTop: vs(15),
    borderWidth: 1,
  },
  input: {
    borderWidth: 0,
    borderRadius: 0,
    borderBottomWidth: 1,
    paddingHorizontal: 0,
    borderBottomColor: AppColors.buttonBorderGray,
  },
  forgotPassword: {
    textAlign: "right",
    fontSize: s(13),
    textDecorationLine: "underline",
    color: "#39a9ff",
    marginBottom: vs(20),
  },
});

export default SingUpScreen;
