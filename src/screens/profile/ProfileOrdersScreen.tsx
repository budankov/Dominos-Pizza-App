import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { s, vs } from "react-native-size-matters";
import CurrentOrdersIcon from "../../assets/icons/CurrentOrdersIcon";
import AppButton from "../../components/buttons/AppButton";
import AppText from "../../components/texts/AppText";
import { fetchUserOrders } from "../../config/ordersData";
import doughEn from "../../data/dough-en.json";
import doughUa from "../../data/dough-ua.json";
import sizesEn from "../../data/sizes-en.json";
import sizesUa from "../../data/sizes-ua.json";
import { getDateFromFireStoreTimeStampObject } from "../../helpers/dateTimeHelper";
import { AppColors } from "../../styles/colors";
import { AppFonts } from "../../styles/fonts";

const ProfileOrdersScreen = () => {
  const [typeOrdersBtn, setTypeOrdersBtn] = useState("current");
  const [ordersList, setOrdersList] = useState([]);
  const [openDetailsIds, setOpenDetailsIds] = useState([]);
  const { i18n, t } = useTranslation();
  const sizesData = i18n.language === "en" ? sizesEn.sizes : sizesUa.sizes;
  const doughData = i18n.language === "en" ? doughEn.dough : doughUa.dough;

  const getOrders = async () => {
    const response = await fetchUserOrders();
    setOrdersList(response);
  };

  useEffect(() => {
    getOrders();
  }, []);

  const handleToggleDetails = (id) => {
    if (openDetailsIds.includes(id)) {
      setOpenDetailsIds(openDetailsIds.filter((openId) => openId !== id));
    } else {
      setOpenDetailsIds([...openDetailsIds, id]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <AppText style={styles.title}>Мої замовлення</AppText>
      <View style={styles.btnContainer}>
        <Pressable
          style={[
            styles.button,
            typeOrdersBtn === "current" && styles.selectedButton,
          ]}
          onPress={() => setTypeOrdersBtn("current")}
        >
          <AppText
            style={[
              styles.btnTitle,
              typeOrdersBtn === "current" && styles.selectedTitle,
            ]}
          >
            Поточні
          </AppText>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            typeOrdersBtn === "archive" && styles.selectedButton,
          ]}
          onPress={() => setTypeOrdersBtn("archive")}
        >
          <AppText
            style={[
              styles.btnTitle,
              typeOrdersBtn === "archive" && styles.selectedTitle,
            ]}
          >
            Архів ({ordersList.length})
          </AppText>
        </Pressable>
      </View>
      {typeOrdersBtn === "current" ? (
        <View style={styles.currentContainer}>
          <CurrentOrdersIcon width={180} height={180} />
          <AppText style={styles.currentTitle}>
            У вас немає поточних замовлень
          </AppText>
          <AppText style={styles.currentSubTitle}>
            Щоб побачити список поточних замовлень, потрібно оформити замовлення
          </AppText>
        </View>
      ) : (
        <View style={styles.archiveContainer}>
          {/* <AppText style={styles.archiveTitle}>
            Статус замовлення може некоректно відображатись. Але не
            переймайтесь, доставка буде за адресою, яку ви вказали в замовленні.
            Вибачте за тимчасові незручності.
          </AppText> */}
          <FlatList
            data={ordersList}
            scrollEnabled={false}
            inverted={true}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.archiveCard}>
                <View style={styles.archiveCardLine}>
                  <AppText style={styles.archiveCardTitle}>
                    Номер замовлення
                  </AppText>
                  <AppText style={styles.archiveCardValue}>
                    {item.orderNumber}
                  </AppText>
                </View>

                <View style={styles.archiveCardLine}>
                  <AppText style={styles.archiveCardTitle}>
                    Дата та час замовлення
                  </AppText>
                  <AppText style={styles.archiveCardValue}>
                    {getDateFromFireStoreTimeStampObject(
                      item.createdAt,
                      i18n.language
                    )}
                  </AppText>
                </View>

                <View style={styles.archiveCardLine}>
                  <AppText style={styles.archiveCardTitle}>Адреса</AppText>
                  <AppText style={styles.archiveCardValue}>
                    {item.deliveryAddress
                      ? `${item.deliveryAddress.city}, ${item.deliveryAddress.street}, ${item.deliveryAddress.houseNumber}` +
                        (item.deliveryAddress.entranceNumber
                          ? `, підʼїзд ${item.deliveryAddress.entranceNumber}`
                          : "") +
                        (item.deliveryAddress.apartmentNumber
                          ? `, квартира ${item.deliveryAddress.apartmentNumber}`
                          : "") +
                        (item.deliveryAddress.floor
                          ? `, поверх ${item.deliveryAddress.floor}`
                          : "") +
                        (item.deliveryAddress.intercomCode
                          ? `, домофон ${item.deliveryAddress.intercomCode}`
                          : "")
                      : "Самовивіз"}
                  </AppText>
                </View>

                <View style={styles.archiveCardLine}>
                  <AppText style={styles.archiveCardTitle}>Почта</AppText>
                  <AppText style={styles.archiveCardValue}>
                    {item.userEmail}
                  </AppText>
                </View>

                <View style={styles.archiveCardLine}>
                  <AppText style={styles.archiveCardTitle}>Сума</AppText>
                  <AppText style={styles.archiveCardValue}>
                    {item.totalPrice} грн
                  </AppText>
                </View>

                <View style={styles.archiveCardLine}>
                  <AppText style={styles.archiveCardTitle}>
                    Статус замовлення
                  </AppText>
                  <AppText style={styles.archiveCardValue}>Завершено</AppText>
                </View>
                <AppButton
                  title="Повторити замовлення"
                  onPress={() => {}}
                  backgroundColor={AppColors.darkGrey}
                  textColor={AppColors.textColorWhite}
                />
                <Pressable
                  style={styles.detailsBtn}
                  onPress={() => handleToggleDetails(item.id)}
                >
                  <AppText style={styles.detailsBtnTitle}>Деталі</AppText>
                </Pressable>

                {openDetailsIds.includes(item.id) && (
                  <View>
                    <View
                      style={{
                        borderTopWidth: 1,
                        borderColor: AppColors.darkGrey,
                        paddingVertical: s(10),
                      }}
                    ></View>
                    <View style={styles.detailsContainer}>
                      {item.items.map((item) => (
                        <View
                          key={`${item.id}-${item.size}-${item.dough}-${item.qty}`}
                        >
                          <View style={styles.detailsCard}>
                            <View style={styles.detailsImg}>
                              <Image
                                style={{ width: s(150), height: s(100) }}
                                source={{ uri: item.image }}
                              />
                            </View>
                            <View style={styles.detailsDescription}>
                              <AppText style={styles.detailsTitle}>
                                {item.name}
                              </AppText>
                              <View style={styles.detailsString}>
                                <AppText style={styles.detailsText}>
                                  Розмір
                                </AppText>
                                <AppText style={styles.detailsText}>
                                  {sizesData[item.size]}
                                </AppText>
                              </View>
                              <View style={styles.detailsString}>
                                <AppText style={styles.detailsText}>
                                  Борт
                                </AppText>
                                <AppText style={styles.detailsText}>
                                  {doughData[item.dough]}
                                </AppText>
                              </View>
                              <View style={styles.detailsString}>
                                <AppText style={styles.detailsText}>
                                  К-ть
                                </AppText>
                                <AppText style={styles.detailsText}>
                                  {item.qty}
                                </AppText>
                              </View>
                            </View>
                          </View>
                        </View>
                      ))}
                    </View>
                  </View>
                )}
              </View>
            )}
          />
        </View>
      )}
    </ScrollView>
  );
};

// [[{"category": "Бестселери і новинки", "dough": "thick", "id": "pizza_3", "image": "https://dominos.ua/_next/image/?url=https%3A%2F%2Fmedia-v3.dominos.ua%2FProducts%2FPitsa%2FPitsy%2FSalami%2Fpizza-salami-website-main-ukr.webp&w=1560&q=75", "ingredients": [Array], "name": "Піца Салямі", "price": 305, "qty": 1, "size": "standard", "weight": 501}], [{"category": "Бестселери і новинки", "dough": "sausages", "id": "pizza_4", "image": "https://dominos.ua/_next/image/?url=https%3A%2F%2Fmedia-v3.dominos.ua%2FProducts%2FPitsa%2FPitsy%2FPitsa%20z%20vialenymy%20tomatamy%2Fdriedtomato-pieces.webp&w=1560&q=75", "ingredients": [Array], "name": "Піца з в’яленими томатами та куркою", "price": 455, "qty": 3, "size": "large", "weight": 550}, {"category": "Бестселери і новинки", "dough": "cheese", "id": "pizza_5", "image": "https://dominos.ua/_next/image/?url=https%3A%2F%2Fmedia-v3.dominos.ua%2FProducts%2FPitsa%2FPitsy%2FHrusha%2Fpearandbluecheese-pieces.webp&w=1560&q=75", "ingredients": [Array], "name": "Піца з грушею і блакитним сиром", "price": 461, "qty": 2, "size": "xxl", "weight": 502}], [{"category": "Бестселери і новинки", "dough": "thick", "id": "pizza_3", "image": "https://dominos.ua/_next/image/?url=https%3A%2F%2Fmedia-v3.dominos.ua%2FProducts%2FPitsa%2FPitsy%2FSalami%2Fpizza-salami-website-main-ukr.webp&w=1560&q=75", "ingredients": [Array], "name": "Піца Салямі", "price": 305, "qty": 2, "size": "standard", "weight": 501}, {"category": "Бестселери і новинки", "dough": "sausages", "id": "pizza_3", "image": "https://dominos.ua/_next/image/?url=https%3A%2F%2Fmedia-v3.dominos.ua%2FProducts%2FPitsa%2FPitsy%2FSalami%2Fpizza-salami-website-main-ukr.webp&w=1560&q=75", "ingredients": [Array], "name": "Піца Салямі", "price": 397, "qty": 2, "size": "large", "weight": 501}]]

const styles = StyleSheet.create({
  container: {
    paddingVertical: vs(10),
    paddingHorizontal: s(14),
  },
  btnContainer: {
    flexDirection: "row",
    gap: s(10),
    paddingVertical: vs(20),
  },
  title: {
    fontSize: s(20),
    fontFamily: AppFonts.Bold,
  },
  button: {
    flex: 1,
    alignItems: "center",
    borderWidth: s(1),
    borderRadius: s(5),
    paddingVertical: vs(12),
    borderColor: AppColors.cartBorderColor,
  },
  btnTitle: {
    fontSize: s(16),
    fontFamily: AppFonts.Regular,
    color: AppColors.darkGrey,
  },
  selectedButton: {
    borderWidth: 0,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 9,
    elevation: 9,
  },

  selectedTitle: {
    fontFamily: AppFonts.SemiBold,
    color: AppColors.red,
  },
  currentContainer: {
    alignItems: "center",
    paddingTop: vs(30),
  },
  currentTitle: {
    textAlign: "center",
    fontSize: s(24),
    fontFamily: AppFonts.Bold,
  },
  currentSubTitle: {
    fontSize: s(14),
    textAlign: "center",
  },
  archiveContainer: {},
  archiveTitle: {
    fontSize: s(14),
  },
  archiveCard: {
    backgroundColor: "#fff",
    padding: s(14),
    marginBottom: vs(20),
  },
  archiveCardLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: vs(10),
  },
  archiveCardTitle: {
    flex: 1,
    fontSize: s(14),
    color: AppColors.darkGrey,
  },
  archiveCardValue: {
    flex: 1,
    fontSize: s(14),
    textAlign: "right",
    color: AppColors.textColor,
  },
  detailsContainer: {
    gap: s(15),
  },
  detailsBtn: {
    alignItems: "center",
    marginTop: vs(20),
    marginBottom: vs(10),
  },
  detailsBtnTitle: {},
  detailsCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: s(15),
  },
  detailsDescription: {
    flex: 1,
  },
  detailsTitle: {
    fontSize: s(14),
    fontFamily: AppFonts.SemiBold,
  },
  detailsString: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailsText: {
    flex: 1,
    fontSize: s(12),
  },
});

export default ProfileOrdersScreen;
