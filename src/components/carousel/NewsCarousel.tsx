import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Dimensions, Image, Pressable, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import { s } from "react-native-size-matters";
import newsArr from "../../data/promotions_ua.json";
import { AppColors } from "../../styles/colors";

const NewsCarousel = () => {
  const progress = useSharedValue<number>(0);
  const ref = React.useRef<ICarouselInstance>(null);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  const { width } = Dimensions.get("window");
  const navigation = useNavigation();

  return (
    <View>
      <Carousel
        loop
        ref={ref}
        onProgressChange={progress}
        width={width}
        height={230}
        autoPlay
        data={newsArr}
        autoPlayInterval={3000}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate("News", { item: item })}
            style={{
              flex: 1,
              marginHorizontal: s(14),
              borderRadius: s(16),
              overflow: "hidden",
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={{ width: "100%", height: "100%", borderRadius: s(16) }}
              resizeMode="cover"
            />
          </Pressable>
        )}
      />
      <Pagination.Basic<{ id: string }>
        progress={progress}
        data={newsArr.map((item) => ({ id: item.id }))}
        size={s(8)}
        dotStyle={{
          borderRadius: 100,
          backgroundColor: AppColors.lightGrey,
        }}
        activeDotStyle={{
          borderRadius: 100,
          overflow: "hidden",
          backgroundColor: AppColors.red,
        }}
        containerStyle={[
          {
            gap: s(15),
            marginTop: s(30),
          },
        ]}
        horizontal
        onPress={onPressPagination}
      />
    </View>
  );
};

export default NewsCarousel;
