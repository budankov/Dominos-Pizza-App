import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { s } from "react-native-size-matters";
import { auth } from "../../config/firebase";

import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { AppFonts } from "../../styles/fonts";

const ProfileMainScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const handleLogout = async () => {
    await AsyncStorage.removeItem("USER_DATA");
    navigation.reset({
      index: 0,
      routes: [{ name: "MainTabs", params: { screen: "Home" } }],
    });
    await signOut(auth);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.profileImg}>
          <FontAwesome name="user-circle-o" size={50} color="#6E6D6E" />
        </View>
        <View>
          <Text style={styles.profileNickname}>{t("profile_nickname")}</Text>
          <Text style={styles.profileBonus}>0 {t("profile_bonus")}</Text>
        </View>
      </View>
      <View style={styles.navList}>
        <Pressable
          style={styles.navLink}
          onPress={() => navigation.navigate("ProfileScreen")}
        >
          <View style={styles.navLinkItem}>
            <Feather name="user" size={24} color="#6E6D6E" />
            <Text style={styles.navLinkTitle}>{t("profile_nav_profile")}</Text>
          </View>
          <Entypo name="chevron-thin-right" size={16} color="#6E6D6E" />
        </Pressable>
        <Pressable
          style={styles.navLink}
          onPress={() => navigation.navigate("ProfileGroupScreen")}
        >
          <View style={styles.navLinkItem}>
            <Feather name="users" size={24} color="#6E6D6E" />
            <Text style={styles.navLinkTitle}>{t("profile_nav_groups")}</Text>
          </View>
          <Entypo name="chevron-thin-right" size={16} color="#6E6D6E" />
        </Pressable>
        <Pressable
          style={styles.navLink}
          onPress={() => navigation.navigate("ProfileAddressScreen")}
        >
          <View style={styles.navLinkItem}>
            <MaterialCommunityIcons
              name="map-marker-circle"
              size={24}
              color="#6E6D6E"
            />
            <Text style={styles.navLinkTitle}>
              {t("profile_nav_addresses")}
            </Text>
          </View>
          <Entypo name="chevron-thin-right" size={16} color="#6E6D6E" />
        </Pressable>
        <Pressable
          style={styles.navLink}
          onPress={() => navigation.navigate("ProfileOrdersScreen")}
        >
          <View style={styles.navLinkItem}>
            <SimpleLineIcons name="social-dropbox" size={24} color="#6E6D6E" />
            <Text style={styles.navLinkTitle}>{t("profile_nav_orders")}</Text>
          </View>
          <Entypo name="chevron-thin-right" size={16} color="#6E6D6E" />
        </Pressable>
        <Pressable
          style={styles.navLink}
          onPress={() => navigation.navigate("ProfileBankCardsScreen")}
        >
          <View style={styles.navLinkItem}>
            <AntDesign name="credit-card" size={24} color="#6E6D6E" />
            <Text style={styles.navLinkTitle}>
              {t("profile_nav_bank_cards")}
            </Text>
          </View>
          <Entypo name="chevron-thin-right" size={16} color="#6E6D6E" />
        </Pressable>
        <Pressable
          style={styles.navLink}
          onPress={() => navigation.navigate("ProfileLeaveReviewScreen")}
        >
          <View style={styles.navLinkItem}>
            <AntDesign name="like" size={24} color="#6E6D6E" />
            <Text style={styles.navLinkTitle}>
              {t("profile_nav_leave_review")}
            </Text>
          </View>
          <Entypo name="chevron-thin-right" size={16} color="#6E6D6E" />
        </Pressable>
        <Pressable
          style={[styles.navLink, { borderBottomWidth: 0 }]}
          onPress={() => navigation.navigate("ProfileMessage")}
        >
          <View style={styles.navLinkItem}>
            <Ionicons name="notifications-outline" size={24} color="#6E6D6E" />
            <Text style={styles.navLinkTitle}>
              {t("profile_nav_notifications")}
            </Text>
          </View>
          <Entypo name="chevron-thin-right" size={16} color="#6E6D6E" />
        </Pressable>
      </View>
      <Pressable style={styles.logOutBtn} onPress={handleLogout}>
        <View style={styles.navLinkItem}>
          <Feather name="log-out" size={30} color="#6E6D6E" />
          <Text style={styles.logOutBtnTitle}>{t("profile_log_out")}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    paddingHorizontal: s(14),
    flexDirection: "row",
    gap: s(10),
    alignItems: "center",
    paddingVertical: s(30),
    borderBottomWidth: s(16),
    borderBottomColor: "#F1F1F1",
  },
  profileImg: {
    width: s(50),
    height: s(50),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: s(50),
    backgroundColor: "#CCCBCB",
  },
  profileNickname: {
    fontSize: s(14),
    fontFamily: AppFonts.Bold,
  },
  profileBonus: {
    fontSize: s(12),
    fontFamily: AppFonts.Regular,
  },
  navList: {
    paddingHorizontal: s(14),
    paddingTop: s(7),
    paddingBottom: s(35),
    flexDirection: "column",
    gap: 10,
  },
  navLink: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: s(8),
    borderBottomWidth: s(2),
    borderBlockColor: "#F2F2F1",
  },
  navLinkItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: s(10),
  },
  navLinkTitle: {
    fontSize: s(17),
    fontFamily: AppFonts.Regular,
    color: "#6B6B6B",
  },
  logOutBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: s(10),
    paddingHorizontal: s(14),
  },
  logOutBtnTitle: {
    fontSize: s(17),
    fontFamily: AppFonts.Regular,
    textDecorationLine: "underline",
    color: "#6B6B6B",
  },
});

export default ProfileMainScreen;
