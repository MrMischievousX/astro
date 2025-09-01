import { Colors } from "@/constants/Colors";
import { FontFamily } from "@/constants/Fonts";
import { changeLanguage, getCurrentLanguage } from "@/utils/i18n";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, StyleSheet, Text, View } from "react-native";
import { HapticTab } from "./HapticTab";

interface LanguageSelectorProps {
  visible: boolean;
  onClose: () => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ visible, onClose }) => {
  const { t } = useTranslation();
  const [currentLang, setCurrentLang] = useState(getCurrentLanguage());

  const languages = [
    { code: "en", name: t("settings.english"), nativeName: "English" },
    { code: "hi", name: t("settings.hindi"), nativeName: "हिंदी" },
  ];

  const handleLanguageChange = async (languageCode: string) => {
    try {
      await changeLanguage(languageCode);
      setCurrentLang(languageCode);
      onClose();
    } catch (error) {
      console.error("Failed to change language:", error);
    }
  };

  return (
    <Modal visible={visible} transparent animationType='fade' onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{t("settings.selectLanguage")}</Text>

          <View style={styles.languageList}>
            {languages.map((language) => (
              <HapticTab
                key={language.code}
                style={[styles.languageItem, currentLang === language.code && styles.selectedLanguageItem]}
                onPress={() => handleLanguageChange(language.code)}
              >
                <Text style={[styles.languageText, currentLang === language.code && styles.selectedLanguageText]}>
                  {language.nativeName}
                </Text>
                {currentLang === language.code && (
                  <View style={styles.checkmark}>
                    <Text style={styles.checkmarkText}>✓</Text>
                  </View>
                )}
              </HapticTab>
            ))}
          </View>

          <HapticTab style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>{t("common.cancel")}</Text>
          </HapticTab>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: Colors.overlayBackground,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: Colors.modalBackground,
    borderRadius: 12,
    padding: 20,
    width: "80%",
    maxWidth: 300,
  },
  title: {
    fontFamily: FontFamily.Recoleta.SemiBold,
    fontSize: 20,
    color: Colors.white,
    textAlign: "center",
    marginBottom: 20,
    includeFontPadding: false,
  },
  languageList: {
    marginBottom: 20,
  },
  languageItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: Colors.buttonBackground,
  },
  selectedLanguageItem: {
    backgroundColor: Colors.buttonBackgroundSelected,
  },
  languageText: {
    fontFamily: FontFamily.Recoleta.Regular,
    fontSize: 16,
    color: Colors.whiteTransparent,
    includeFontPadding: false,
  },
  selectedLanguageText: {
    color: Colors.white,
    fontFamily: FontFamily.Recoleta.Medium,
  },
  checkmark: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  checkmarkText: {
    color: Colors.primaryBackground,
    fontSize: 12,
    fontFamily: FontFamily.Recoleta.Bold,
    includeFontPadding: false,
  },
  cancelButton: {
    backgroundColor: Colors.buttonBackgroundCancel,
    borderRadius: 8,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButtonText: {
    fontFamily: FontFamily.Recoleta.Medium,
    fontSize: 16,
    color: Colors.white,
    includeFontPadding: false,
  },
});

export default LanguageSelector;
