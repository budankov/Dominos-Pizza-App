import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { s } from "react-native-size-matters";

import plus18Icon from "../../assets/icons/18plus-icon.png";
import broccoliIcon from "../../assets/icons/broccoli-icon.png";
import cheeseIcon from "../../assets/icons/cheese-icon.png";
import chiliIcon from "../../assets/icons/chili-icon.png";
import newIcon from "../../assets/icons/new-icon.png";

const TAG_ICONS: Record<string, any> = {
  New: newIcon,
  "18+": plus18Icon,
  Vegetarian: broccoliIcon,
  Cheesy: cheeseIcon,
  Spicy: chiliIcon,
};

const CardTags = ({ tags = [] }: { tags?: string[] }) => {
  if (!tags || tags.length === 0) return null;

  return (
    <View style={styles.wrapper}>
      {tags.map((tag, index) => {
        const icon = TAG_ICONS[tag];
        if (!icon) return null;

        return (
          <View key={index} style={styles.iconBcg}>
            <Image source={icon} style={styles.icon} resizeMode="cover" />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    top: s(15),
    right: s(15),
    flexDirection: "column",
    gap: s(6),
  },
  iconBcg: {
    justifyContent: "center",
    alignItems: "center",
    width: s(30),
    height: s(30),
    borderRadius: 50,
    backgroundColor: "#fff",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.27,
    shadowRadius: s(5),

    elevation: s(5),
    zIndex: 1,
  },
  icon: {
    width: s(18),
    height: s(18),
  },
});

export default CardTags;
