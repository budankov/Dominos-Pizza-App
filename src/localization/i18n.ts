import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import uk from "./uk.json";

const LANGUAGES = {
  en: {
    translation: en,
  },
  uk: {
    translation: uk,
  },
};

const LANGUAGE_DETECTOR = {
  type: "languageDetector",
  async: true,

  detect: async (callback: (lang: string) => void) => {
    try {
      const savedLanguage = await AsyncStorage.getItem("LANGUAGE");

      if (savedLanguage) {
        callback(savedLanguage);
        return;
      }
    } catch (error) {
      console.log("Error Reading Language", error);
    }
    callback("uk");
  },

  cacheUserLanguage: async (lang: string) => {
    try {
      await AsyncStorage.setItem("LANGUAGE", lang);
    } catch (error) {
      console.log("Error Saving Language", error);
    }
  },
};

i18n
  .use(LANGUAGE_DETECTOR as any)
  .use(initReactI18next)
  .init({
    resources: LANGUAGES,
    fallbackLng: "uk",
    defaultNS: "translation",
    ns: ["translation"],
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
