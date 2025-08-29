import Checkbox from "expo-checkbox";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { s } from "react-native-size-matters";
import tagsEn from "../../data/tags-en.json";
import tagsUa from "../../data/tags-ua.json";
import { AppColors } from "../../styles/colors";
import { AppFonts } from "../../styles/fonts";

type TagsFilterProps = {
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
};

const TagsFilter: React.FC<TagsFilterProps> = ({
  selectedTags,
  setSelectedTags,
}) => {
  const { i18n } = useTranslation();
  const tagsData = i18n.language === "en" ? tagsEn.tags : tagsUa.tags;

  const tagOptions = Object.entries(tagsData).map(([value, label]) => ({
    value,
    label,
  }));

  const toggleTag = (value: string) => {
    setSelectedTags((prev) =>
      prev.includes(value)
        ? prev.filter((tag) => tag !== value)
        : [...prev, value]
    );
  };

  return (
    <View>
      {tagOptions.map((tag) => (
        <View key={tag.value} style={styles.container}>
          <Checkbox
            value={selectedTags.includes(tag.value)}
            onValueChange={() => toggleTag(tag.value)}
            color={
              selectedTags.includes(tag.value)
                ? AppColors.buttonCheckedBox
                : undefined
            }
            style={styles.checkbox}
          />
          <Text style={styles.checkTitle}>{tag.label}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: s(7),
    padding: s(5),
    alignItems: "center",
  },
  checkbox: {
    width: s(22),
    height: s(22),
    borderColor: AppColors.buttonCheckBoxBorder,
    borderWidth: s(1),
    borderRadius: s(5),
  },
  checkTitle: {
    fontSize: s(15),
    fontFamily: AppFonts.Regular,
  },
});

export default TagsFilter;
