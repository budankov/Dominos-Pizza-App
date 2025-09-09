import { Entypo, EvilIcons, FontAwesome } from "@expo/vector-icons";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { s, vs } from "react-native-size-matters";
import DominosPizzaLogoIcon from "../assets/icons/DominosPizzaLogoIcon";
import MasterCardIcon from "../assets/icons/MasterCardIcon";
import PizzaTrackerIcon from "../assets/icons/PizzaTrackerIcon";
import VisaIcon from "../assets/icons/VisaIcon";
import SingInScreen from "../components/auth/SingInScreen";
import AppButton from "../components/buttons/AppButton";
import DrawerHeaderClose from "../components/close-drawer/DrawerHeaderClose";
import LanguageDropDownMenu from "../components/language/LanguageDropDownMenu";
import LocationButton from "../components/location/LocationButton";
import { useModal } from "../components/modal/ModalContext";
import AppText from "../components/texts/AppText";
import { auth } from "../config/firebase";
import { AppColors } from "../styles/colors";
import { AppFonts } from "../styles/fonts";

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { showModal } = useModal();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<object | null>(null);

  console.log(userData);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userDataFromFireBase) => {
      if (userDataFromFireBase) {
        console.log("User is Signed In");
        setUserData(userDataFromFireBase);
      } else {
        console.log("User is Signed Out");
        setUserData(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          backgroundColor: "white",
        }}
      >
        <ActivityIndicator size={"large"} color={AppColors.textColor} />
      </View>
    );
  }
  return (
    <DrawerContentScrollView
      {...props}
      freact-react-i18next
      contentContainerStyle={{
        paddingTop: s(7),
      }}
    >
      <View style={styles.container}>
        <View style={styles.headerTopContainer}>
          <View style={styles.logoContainer}>
            <DominosPizzaLogoIcon width="30px" height="30px" />
            <AppText style={styles.logo}>Domino's Pizza</AppText>
          </View>
          <LanguageDropDownMenu />
          <DrawerHeaderClose />
        </View>
        <View style={styles.headerBottomContainer}>
          <LocationButton
            sheetId="LOCALS_SHEET_DRAWER"
            markerSize={18}
            titleSize={22}
          />
          {userData ? (
            <AppButton
              title={(userData as any).displayName || "User"}
              onPress={() => navigation.navigate("ProfileStack")}
              style={styles.singInButton}
              styleTitle={styles.singInButtonText}
            />
          ) : (
            <AppButton
              title={t("drawer_sign_in")}
              onPress={() => showModal(<SingInScreen />)}
              style={styles.singInButton}
              styleTitle={styles.singInButtonText}
            />
          )}
        </View>
        <DrawerItem
          label={t("drawer_home")}
          onPress={() =>
            props.navigation.navigate("MainTabs", { screen: "Home" })
          }
          labelStyle={styles.label}
          style={styles.item}
        />
        <DrawerItem
          label={t("drawer_pizza_maker")}
          onPress={() => props.navigation.navigate("PizzaMaker")}
          labelStyle={styles.label}
          style={styles.item}
        />
        <DrawerItem
          label={t("drawer_pizza_tracker")}
          onPress={() => props.navigation.navigate("PizzaTracker")}
          icon={() => <PizzaTrackerIcon width={23} height={23} />}
          labelStyle={styles.label}
          style={styles.item}
        />
        <DrawerItem
          label={t("drawer_pizzerias")}
          onPress={() => props.navigation.navigate("Pizzerias")}
          labelStyle={styles.label}
          style={styles.item}
        />
        <DrawerItem
          label={t("drawer_career")}
          onPress={() => props.navigation.navigate("Pizzerias")}
          labelStyle={styles.label}
          style={styles.item}
        />
        <DrawerItem
          label={t("drawer_franchising")}
          onPress={() => {
            WebBrowser.openBrowserAsync("https://biz.dominos.ua/");
          }}
          labelStyle={styles.label}
          style={styles.item}
        />
        <DrawerItem
          label={t("drawer_club")}
          onPress={() => props.navigation.navigate("DominosClub")}
          labelStyle={styles.label}
          style={styles.item}
        />
        <DrawerItem
          label={t("drawer_leave_review")}
          onPress={() => props.navigation.navigate("LeaveReview")}
          labelStyle={styles.label}
          style={styles.item}
        />
        <DrawerItem
          label={t("drawer_news")}
          onPress={() => props.navigation.navigate("News")}
          labelStyle={styles.label}
          style={styles.item}
        />
        <View style={styles.underline} />
        <AppText style={styles.text}>{t("drawer_call_us")}</AppText>
        <TouchableOpacity
          style={styles.phone}
          onPress={() => Linking.openURL("tel:0442221111")}
        >
          <AppText style={styles.phoneText}>0442221111</AppText>
        </TouchableOpacity>
        <AppText style={styles.text}>{t("drawer_working_hours")}</AppText>
        <TouchableOpacity
          onPress={() => Linking.openURL("mailto:info@dominos.ua")}
        >
          <AppText
            style={[
              styles.text,
              { fontFamily: AppFonts.SemiBold, paddingBottom: s(30) },
            ]}
          >
            info@dominos.ua
          </AppText>
        </TouchableOpacity>
        <AppText style={styles.infoTitle}>{t("drawer_useful_info")}</AppText>
        <TouchableOpacity
          style={styles.text}
          onPress={() => {
            WebBrowser.openBrowserAsync(
              "https://media-v3.dominos.ua/Files/LIST-ALLERGENS-UKR-3.pdf"
            );
          }}
        >
          <AppText style={styles.label}>{t("drawer_allergens_info")}</AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.text}
          onPress={() => {
            WebBrowser.openBrowserAsync(
              "https://storage.googleapis.com/static.dominos.ua/dominos_product_policy.pdf"
            );
          }}
        >
          <AppText style={styles.label}>
            {t("drawer_food_safety_policy")}
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.text}
          onPress={() => {
            WebBrowser.openBrowserAsync(
              "https://media-v3.dominos.ua/Files/privacy-policy-uk.pdf"
            );
          }}
        >
          <AppText style={styles.label}>{t("drawer_privacy_policy")}</AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.text}
          onPress={() => {
            WebBrowser.openBrowserAsync(
              "https://media-v3.dominos.ua/Files/information-policy-uk.pdf"
            );
          }}
        >
          <AppText style={styles.label}>
            {t("drawer_information_policy")}
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            WebBrowser.openBrowserAsync(
              "https://media-v3.dominos.ua/Files/public-offer-agreement-kyiv.pdf"
            );
          }}
        >
          <AppText style={styles.label}>{t("drawer_public_offer")}</AppText>
        </TouchableOpacity>
        <View style={styles.underline} />
        <AppText style={styles.titleFollow}>{t("drawer_follow_us")}</AppText>
        <View style={styles.socialContainer}>
          <TouchableOpacity
            onPress={() => {
              WebBrowser.openBrowserAsync("https://t.me/dominosukraine");
            }}
          >
            <EvilIcons name="sc-telegram" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              WebBrowser.openBrowserAsync(
                "https:/www.instagram.com/dominos_ua/"
              )
            }
          >
            <Entypo name="instagram" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              WebBrowser.openBrowserAsync(
                "https://m.facebook.com/@DominosPizzaUkraine/?wtsid=rdr_0jQj34BYpwjAk45KU&hr=1"
              );
            }}
          >
            <FontAwesome name="facebook" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <AppText style={styles.titleSupport}>
          {t("drawer_payment_support")}
        </AppText>
        <View style={styles.paymentContainer}>
          <MasterCardIcon width="80px" height="80px" />
          <VisaIcon width="80px" height="80px" fill={"#fff"} />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#fff",
  },
  item: {
    borderRadius: s(0),
    marginLeft: s(-10),
  },
  label: {
    fontSize: s(18),
    fontFamily: AppFonts.Regular,
    color: AppColors.textColorWhite,
  },
  underline: {
    borderColor: AppColors.darkGrey,
    borderBottomWidth: s(0.5),
    marginVertical: s(10),
  },
  text: {
    color: AppColors.textColorWhite,
    paddingBottom: vs(10),
  },
  phone: {
    paddingTop: vs(3),
    paddingBottom: vs(10),
  },
  phoneText: {
    fontSize: s(22),
    fontFamily: AppFonts.SemiBold,
    color: AppColors.textColorWhite,
  },
  infoTitle: {
    fontSize: s(18),
    fontFamily: AppFonts.Bold,
    color: AppColors.textColorWhite,
    paddingBottom: vs(10),
  },
  titleFollow: {
    fontSize: s(15),
    fontFamily: AppFonts.Bold,
    color: AppColors.textColorWhite,
    textAlign: "center",
  },
  titleSupport: {
    fontSize: s(17),
    fontFamily: AppFonts.Bold,
    color: AppColors.textColorWhite,
    textAlign: "center",
  },
  socialContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: s(30),
    paddingTop: vs(15),
    paddingBottom: vs(30),
  },
  paymentContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    fontSize: s(14),
    fontFamily: AppFonts.Logo,
    color: AppColors.textColorWhite,
    textAlign: "center",
  },
  headerTopContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  headerBottomContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: s(20),
    paddingTop: vs(25),
    paddingBottom: vs(10),
  },
  singInButton: {
    width: s(120),
    backgroundColor: AppColors.darkGrey,
  },
  singInButtonText: { fontFamily: AppFonts.Bold },
});

export default CustomDrawerContent;
