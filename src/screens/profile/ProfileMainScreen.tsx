import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { useTranslation } from "react-i18next";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { auth } from "../../config/firebase";

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
    <View style={{ paddingHorizontal: 14 }}>
      <Text>ProfileMainScreen</Text>
      <View style={styles.navList}>
        <Pressable
          style={styles.navLink}
          onPress={() => navigation.navigate("ProfileScreen")}
        >
          <Text>Профіль</Text>
        </Pressable>
        <Pressable
          style={styles.navLink}
          onPress={() => navigation.navigate("ProfileGroupScreen")}
        >
          <Text>Групи</Text>
        </Pressable>
        <Pressable
          style={styles.navLink}
          onPress={() => navigation.navigate("ProfileAddressScreen")}
        >
          <Text>Адреси</Text>
        </Pressable>
        <Pressable
          style={styles.navLink}
          onPress={() => navigation.navigate("ProfileOrdersScreen")}
        >
          <Text>Замовлення</Text>
        </Pressable>
        <Pressable
          style={styles.navLink}
          onPress={() => navigation.navigate("ProfileBankCardsScreen")}
        >
          <Text>Банківські картки</Text>
        </Pressable>
        <Pressable
          style={styles.navLink}
          onPress={() => navigation.navigate("ProfileLeaveReviewScreen")}
        >
          <Text>Залишити відгук</Text>
        </Pressable>
        <Pressable
          style={styles.navLink}
          onPress={() => navigation.navigate("ProfileMessage")}
        >
          <Text>Повідомлення</Text>
        </Pressable>
      </View>
      <Button title="Вийти" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  navList: {
    flexDirection: "column",
    gap: 10,
  },
  navLink: {
    fontSize: 16,
  },
});

export default ProfileMainScreen;
