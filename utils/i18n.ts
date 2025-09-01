import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslations from "../locales/en.json";
import hiTranslations from "../locales/hi.json";

const LANGUAGE_STORAGE_KEY = "user_language";

const resources = {
  en: {
    translation: enTranslations,
  },
  hi: {
    translation: hiTranslations,
  },
};

const getStoredLanguage = async (): Promise<string> => {
  try {
    const storedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (storedLanguage) {
      return storedLanguage;
    }
  } catch (error) {
    console.error("Error getting stored language:", error);
  }

  // Fallback to device locale
  return "en";
};

const initI18n = async () => {
  const language = await getStoredLanguage();

  i18n.use(initReactI18next).init({
    compatibilityJSON: "v4",
    resources,
    lng: language,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
};

export const changeLanguage = async (language: string) => {
  try {
    await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    await i18n.changeLanguage(language);
  } catch (error) {
    console.error("Error changing language:", error);
  }
};

export const getCurrentLanguage = () => i18n.language;

export const getSupportedLanguages = () => Object.keys(resources);

// Initialize i18n
initI18n();

export default i18n;
