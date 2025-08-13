import { Entypo, EvilIcons, FontAwesome, Ionicons } from "@expo/vector-icons";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import { Linking, StyleSheet, TouchableOpacity, View } from "react-native";
import { s, vs } from "react-native-size-matters";
import DominosPizzaLogoIcon from "../assets/icons/DominosPizzaLogoIcon";
import MasterCardIcon from "../assets/icons/MasterCardIcon";
import VisaIcon from "../assets/icons/VisaIcon";
import AppButton from "../components/buttons/AppButton";
import DrawerHeaderClose from "../components/close-drawer/DrawerHeaderClose";
import LanguageDropDownMenu from "../components/language/LanguageDropDownMenu";
import LocationButton from "../components/location/LocationButton";
import AppText from "../components/texts/AppText";
import { AppColors } from "../styles/colors";
import { AppFonts } from "../styles/fonts";

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
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
          <AppButton
            title="Увійти"
            onPress={() => {}}
            style={styles.singInButton}
            styleTitle={styles.singInButtonText}
          />
        </View>
        <DrawerItem
          label="ДОМАШНЯ СТОРІНКА"
          onPress={() =>
            props.navigation.navigate("MainTabs", { screen: "Home" })
          }
          labelStyle={styles.label}
          style={styles.item}
        />
        <DrawerItem
          label="КОНСТРУКТОР ПІЦИ"
          onPress={() => props.navigation.navigate("PizzaMaker")}
          labelStyle={styles.label}
          style={styles.item}
        />
        <DrawerItem
          label="PIZZA TRACKER"
          onPress={() => props.navigation.navigate("PizzaTracker")}
          icon={({ size }) => (
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={size}
              color={AppColors.red}
            />
          )}
          labelStyle={styles.label}
          style={styles.item}
        />
        <DrawerItem
          label="ПІЦЕРІЇ"
          onPress={() => props.navigation.navigate("Pizzerias")}
          labelStyle={styles.label}
          style={styles.item}
        />
        <DrawerItem
          label="РОБОТА ТА КАРʼЄРА"
          onPress={() => props.navigation.navigate("Pizzerias")}
          labelStyle={styles.label}
          style={styles.item}
        />
        <DrawerItem
          label="ФРАЙЧАЙЗИНГ"
          onPress={() => {
            WebBrowser.openBrowserAsync("https://biz.dominos.ua/");
          }}
          labelStyle={styles.label}
          style={styles.item}
        />
        <DrawerItem
          label="DOMINO'S CLUB"
          onPress={() => props.navigation.navigate("DominosClub")}
          labelStyle={styles.label}
          style={styles.item}
        />
        <DrawerItem
          label="ЗАЛИШИТИ ВІГДУК"
          onPress={() => props.navigation.navigate("LeaveReview")}
          labelStyle={styles.label}
          style={styles.item}
        />
        <DrawerItem
          label="НОВИНИ"
          onPress={() => props.navigation.navigate("News")}
          labelStyle={styles.label}
          style={styles.item}
        />
        <View style={styles.underline} />
        <AppText style={styles.text}>Зателефонуйте нам:</AppText>
        <TouchableOpacity
          style={styles.phone}
          onPress={() => Linking.openURL("tel:0442221111")}
        >
          <AppText style={styles.phoneText}>0442221111</AppText>
        </TouchableOpacity>
        <AppText style={styles.text}>Без вихідних з 10:00 до 22:00</AppText>
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
        <AppText style={styles.infoTitle}>Корисна інформація</AppText>
        <TouchableOpacity
          style={styles.text}
          onPress={() => {
            WebBrowser.openBrowserAsync(
              "https://media-v3.dominos.ua/Files/LIST-ALLERGENS-UKR-3.pdf"
            );
          }}
        >
          <AppText style={styles.label}>
            Вміст алергерів і харчова цінність
          </AppText>
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
            Політика безпеки харчових продуктів
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
          <AppText style={styles.label}>Політика конфіденційності</AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.text}
          onPress={() => {
            WebBrowser.openBrowserAsync(
              "https://media-v3.dominos.ua/Files/information-policy-uk.pdf"
            );
          }}
        >
          <AppText style={styles.label}>Інформаційна політика</AppText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            WebBrowser.openBrowserAsync(
              "https://media-v3.dominos.ua/Files/public-offer-agreement-kyiv.pdf"
            );
          }}
        >
          <AppText style={styles.label}>Публічна оферта</AppText>
        </TouchableOpacity>
        <View style={styles.underline} />
        <AppText style={styles.titleFollow}>Слідкуйте за нами</AppText>
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
        <AppText style={styles.titleSupport}>Підтримка платежів</AppText>
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
