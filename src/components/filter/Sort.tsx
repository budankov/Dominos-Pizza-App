import { Ionicons } from "@expo/vector-icons";
import React, { FC, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import { s } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";
import { AppFonts } from "../../styles/fonts";

interface SortProps {
  onSort: (type: "priceAsc" | "priceDesc") => void;
  reset: () => void;
}

const Sort: FC<SortProps> = ({ onSort, reset }) => {
  const [selected, setSelected] = useState<string>("Сортувати");

  const screenWidth = Dimensions.get("window").width;
  const menuWidth = screenWidth * 0.5 - s(18);

  const handleSelect = (type: "priceAsc" | "priceDesc", label: string) => {
    if (selected === label) {
      reset();
      setSelected("Сортувати");
    } else {
      setSelected(label);
      onSort(type);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Menu>
        <MenuTrigger style={styles.menu}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.menuTitle}>
            {selected}
          </Text>
          <Ionicons name="chevron-down" size={16} color={"#808080"} />
        </MenuTrigger>
        <MenuOptions
          customStyles={{
            optionsContainer: [{ maxWidth: menuWidth }, styles.menuContainer],
          }}
        >
          <MenuOption
            style={
              selected === "Ціна низька-висока" && {
                backgroundColor: AppColors.buttonFilterChooseGray,
              }
            }
            onSelect={() => handleSelect("priceAsc", "Ціна низька-висока")}
          >
            <Text style={styles.optionalTitle}>Ціна низька-висока</Text>
          </MenuOption>
          <MenuOption
            style={
              selected === "Ціна висока-низька" && {
                backgroundColor: AppColors.buttonFilterChooseGray,
              }
            }
            onSelect={() => handleSelect("priceDesc", "Ціна висока-низька")}
          >
            <Text style={styles.optionalTitle}>Ціна висока-низька</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  menu: {
    flexDirection: "row",
    gap: s(10),
    height: s(50),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: s(1),
    borderRadius: s(25),
    paddingHorizontal: s(25),
    borderColor: AppColors.buttonBorderGray,
  },
  menuContainer: {
    marginTop: s(52),
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: s(10),
    borderBottomRightRadius: s(10),
  },
  menuTitle: {
    fontSize: s(17),
    fontFamily: AppFonts.Regular,
    overflow: "hidden",
  },
  optionalTitle: {
    fontSize: s(15),
    padding: s(10),
    fontFamily: AppFonts.Regular,
  },
});

export default Sort;
