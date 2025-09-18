import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { s, vs } from "react-native-size-matters";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import FacebookIcon from "../../assets/icons/FacebookIcon";
import GoogleIcon from "../../assets/icons/GoogleIcon";
import AppButton from "../../components/buttons/AppButton";
import AppSaveView from "../../components/views/AppSaveView";
import { auth } from "../../config/firebase";
import { useFacebookSignIn, useGoogleSignIn } from "../../config/socialAuth";
import { useModal } from "../../context/ModalContext";
import { setUserData } from "../../store/reducers/userSlice";
import { AppColors } from "../../styles/colors";
import { AppFonts } from "../../styles/fonts";
import AppTextInputController from "../inputs/AppTextInputController";
import AppText from "../texts/AppText";
import SingUpScreen from "./SingUpScreen";

type FormData = yup.InferType<typeof schema>;

const SingInScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { showModal, hideModal } = useModal();

  const { promptAsync: googleSignIn } = useGoogleSignIn();
  const { promptAsync: facebookSignIn } = useFacebookSignIn();

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
      <AppText style={styles.title}>{t("sign_in_title")}</AppText>
      <AppText style={styles.subTitle}>{t("sign_in_login_label")}</AppText>
      <AppTextInputController<FormData>
        control={control}
        styleInput={styles.input}
        placeholderTextColor={AppColors.cartBorderColor}
        name="email"
        placeholder={t("sign_in_placeholder_email")}
      />
      <AppText style={styles.subTitle}>{t("sign_in_password_label")}</AppText>
      <AppTextInputController<FormData>
        control={control}
        styleInput={styles.input}
        placeholderTextColor={AppColors.cartBorderColor}
        showPassword
        name="password"
        placeholder={t("sign_in_placeholder_password")}
        secureTextEntry
      />
      <Pressable onPress={() => {}}>
        <AppText style={styles.forgotPassword}>
          {t("sign_in_forgot_password")}
        </AppText>
      </Pressable>
      <AppButton
        title={t("sign_in_login_button")}
        onPress={handleSubmit(onLoginPress)}
      />
      <AppButton
        title={t("sign_in_signup_button")}
        style={styles.registerButton}
        textColor={AppColors.textColor}
        onPress={() => showModal(<SingUpScreen />)}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: vs(25),
        }}
      >
        <View
          style={{
            flex: 1,
            borderBottomWidth: 1,
            borderColor: AppColors.buttonBorderGray,
          }}
        />
        <AppText style={{ paddingHorizontal: s(10), color: "grey" }}>
          {t("sign_in_or")}
        </AppText>
        <View
          style={{
            flex: 1,
            borderBottomWidth: 1,
            borderColor: AppColors.buttonBorderGray,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: s(40),
          justifyContent: "center",
          marginTop: vs(20),
        }}
      >
        <Pressable onPress={() => googleSignIn()}>
          <GoogleIcon width={70} height={80} />
        </Pressable>

        <Pressable onPress={() => facebookSignIn()}>
          <FacebookIcon width={80} height={80} />
        </Pressable>
      </View>
    </AppSaveView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  title: {
    textAlign: "center",
    fontSize: s(26),
    fontFamily: AppFonts.Bold,
  },
  subTitle: {
    fontSize: s(18),
    fontFamily: AppFonts.Regular,
  },
  registerButton: {
    backgroundColor: AppColors.buttonLightGray,
    marginTop: vs(15),
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

export default SingInScreen;
