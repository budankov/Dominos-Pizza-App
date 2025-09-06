import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { useTranslation } from "react-i18next";
import { Button, StyleSheet, Text, View } from "react-native";
import { auth } from "../../config/firebase";

const ProfileScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const handleLogout = async () => {
    await AsyncStorage.removeItem("USER_DATA");
    navigation.navigate("MainTabs", { screen: "Home" });
    await signOut(auth);
  };

  return (
    <View style={{ paddingHorizontal: 14 }}>
      <Text>ProfileScreen</Text>
      <Button title="Вийти" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ProfileScreen;
