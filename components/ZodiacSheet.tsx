import { LineSvg, ZodiacContainerSvg } from "@/assets/svgs";
import { Colors } from "@/constants/Colors";
import { FontFamily } from "@/constants/Fonts";
import { zodiacSigns } from "@/constants/Zodiac";
import { Image } from "expo-image";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { HapticTab } from "./HapticTab";

interface ZodiacSheetProps {
  updateCurrentZodiacIndex: (currentIndex: number) => void;
}

const ZodiacSheet = ({ updateCurrentZodiacIndex }: ZodiacSheetProps) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <LineSvg />
        <Text style={styles.headerText}>{t("home.selectYourSign")}</Text>
        <LineSvg style={styles.rotatedLine} />
      </View>
      <View style={styles.gridContainer}>
        {zodiacSigns.map((zodiac, index) => {
          return (
            <HapticTab style={styles.zodiacButton} key={zodiac.id} onPress={() => updateCurrentZodiacIndex(index)}>
              <ZodiacContainerSvg style={StyleSheet.absoluteFillObject} />
              <Image source={zodiac.image} style={styles.zodiacImage} />
              <Text style={styles.zodiacName}> {t(`zodiac.${zodiac.name.toLowerCase()}`)}</Text>
            </HapticTab>
          );
        })}
      </View>
    </View>
  );
};

export default ZodiacSheet;

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 24,
  },
  headerText: {
    fontFamily: FontFamily.Recoleta.Bold,
    fontSize: 20,
    color: Colors.white,
    includeFontPadding: false,
  },
  rotatedLine: {
    transform: [{ rotate: "180deg" }],
  },
  gridContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    justifyContent: "center",
    marginTop: 16,
  },
  zodiacButton: {
    width: 108,
    height: 128,
    justifyContent: "space-evenly",
    alignItems: "center",
    position: "relative",
  },
  zodiacImage: {
    width: 84,
    height: 84,
  },
  zodiacName: {
    fontFamily: FontFamily.Recoleta.Regular,
    fontSize: 12,
    color: Colors.whiteTransparent,
    includeFontPadding: false,
  },
});
