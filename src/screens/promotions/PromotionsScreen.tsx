import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Dimensions, FlatList, Image, StyleSheet, View } from "react-native";
import { s, vs } from "react-native-size-matters";
import AppButton from "../../components/buttons/AppButton";
import AppText from "../../components/texts/AppText";
import promotionsArrUa from "../../data/promotions-ua.json";
import { AppColors } from "../../styles/colors";
import { AppFonts } from "../../styles/fonts";

const PromotionsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <FlatList
        data={promotionsArrUa}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View key={item.id} style={styles.card}>
            <View>
              <Image
                source={{ uri: item.image }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>

            <View style={styles.bottomPart}>
              <AppText style={styles.title}>{item.title}</AppText>
              <AppText style={styles.date}>{item.date}</AppText>
              <AppText style={styles.description}>
                {item.description.split("\n").slice(0, 2).join("\n")}
              </AppText>

              <AppButton
                title="Деталі"
                onPress={() => navigation.navigate("News", { item: item })}
                styleTitle={styles.titleBtn}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    alignSelf: "center",
    paddingVertical: s(40),
    paddingHorizontal: s(14),
  },
  card: {
    marginBottom: s(20),
    paddingBottom: s(30),
    borderRadius: s(16),
    borderWidth: s(1),
    borderColor: AppColors.lightGrey,
  },
  bottomPart: {
    paddingHorizontal: s(14),
  },
  image: {
    width: "100%",
    height: 230,
    borderTopRightRadius: s(16),
    borderTopLeftRadius: s(16),
  },
  title: {
    fontSize: s(22),
    fontFamily: AppFonts.Medium,
    textAlign: "center",
    paddingVertical: vs(6),
  },
  date: {
    fontSize: s(12),
  },
  description: {
    fontSize: s(12),
  },
  titleBtn: {
    fontSize: s(15),
  },
});

export default PromotionsScreen;
