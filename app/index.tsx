import { GradientBg } from "@/assets/images";
import { LanguageSvg } from "@/assets/svgs";
import { HapticTab } from "@/components/HapticTab";
import LanguageSelector from "@/components/LanguageSelector";
import ZodiacSheet from "@/components/ZodiacSheet";
import { Colors } from "@/constants/Colors";
import { FontFamily } from "@/constants/Fonts";
import { zodiacSigns } from "@/constants/Zodiac";
import { getTodayHoroscope } from "@/services/NetworkManager";
import { ScreenHeight } from "@/utils/dimen";
import i18n from "@/utils/i18n";
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetView } from "@gorhom/bottom-sheet";
import dayjs from "dayjs";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Easing } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HomeScreen = () => {
  const { t } = useTranslation();
  const [currentZodiacIndex, setCurrentZodiacIndex] = useState(0);
  const [horoscope, setHoroscope] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  const currentZodiac = zodiacSigns[currentZodiacIndex];

  const inset = useSafeAreaInsets();
  const router = useRouter();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop opacity={0.9} appearsOnIndex={0} disappearsOnIndex={-1} pressBehavior='none' {...props} />
    ),
    []
  );

  const fetchZodiac = async () => {
    setIsLoading(true);
    try {
      const data = await getTodayHoroscope(currentZodiac.name);
      setHoroscope(data.data.horoscope_data);
    } catch (error) {
      console.error("Error in fetchZodiac", error);
    }
    setIsLoading(false);
  };

  const updateCurrentZodiacIndex = (index: number) => {
    setCurrentZodiacIndex(index);
    bottomSheetRef.current?.close();
  };

  useEffect(() => {
    fetchZodiac();
  }, [currentZodiac, i18n.language]);

  return (
    <View style={[styles.container, { paddingTop: inset.top + 8 }]}>
      <Image source={GradientBg} contentFit='cover' style={StyleSheet.absoluteFillObject} />

      <View style={styles.headerContainer}>
        <Text style={styles.greetingText}>{t("home.greeting")}</Text>

        <HapticTab onPress={() => setShowLanguageSelector(true)}>
          <LanguageSvg width={24} height={24} />
        </HapticTab>

        <Text
          onPress={() =>
            bottomSheetRef.current?.expand({
              duration: 150,
              easing: Easing.linear,
            })
          }
          style={styles.changeText}
        >
          {t("common.change")}
        </Text>
      </View>
      <View style={[styles.mainContent, { marginBottom: inset.bottom }]}>
        <View style={styles.zodiacContainer}>
          <Image style={styles.zodiacImage} source={currentZodiac.image} />
          <Text style={styles.zodiacName}>{t(`zodiac.${currentZodiac.name.toLowerCase()}`)}</Text>
          <Text style={styles.dateText}>{dayjs().format("MMM DD, YYYY")}</Text>
          <View style={styles.horoscopeContainer}>
            {isLoading ? (
              <ActivityIndicator color={Colors.white} style={styles.loadingIndicator} size={"large"} />
            ) : (
              <Text style={styles.horoscopeText}>{horoscope}</Text>
            )}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <HapticTab style={styles.journalButton} onPress={() => router.navigate("/journalscreen")}>
            <Text style={styles.journalButtonText}>{t("home.writeJournal")}</Text>
          </HapticTab>
        </View>
      </View>
      <BottomSheet
        backgroundStyle={styles.bottomSheetBackground}
        ref={bottomSheetRef}
        index={-1}
        handleComponent={null}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView style={styles.contentContainer}>
          <ZodiacSheet updateCurrentZodiacIndex={updateCurrentZodiacIndex} />
        </BottomSheetView>
      </BottomSheet>
      <LanguageSelector visible={showLanguageSelector} onClose={() => setShowLanguageSelector(false)} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greetingText: {
    fontFamily: FontFamily.Recoleta.SemiBold,
    fontSize: 25,
    color: Colors.white,
    includeFontPadding: false,
    position: "absolute",
    width: "100%",
    textAlign: "center",
  },
  changeText: {
    fontFamily: FontFamily.Recoleta.Regular,
    fontSize: 16,
    color: Colors.white,
    includeFontPadding: false,
  },
  mainContent: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 40,
  },
  zodiacContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  zodiacImage: {
    width: 200,
    height: 200,
  },
  zodiacName: {
    fontFamily: FontFamily.Recoleta.SemiBold,
    fontSize: 25,
    color: Colors.white,
    marginTop: 16,
    includeFontPadding: false,
  },
  dateText: {
    fontFamily: FontFamily.Recoleta.Regular,
    fontSize: 18,
    color: Colors.white,
    marginTop: 4,
    includeFontPadding: false,
  },
  horoscopeContainer: {
    height: ScreenHeight * 0.35,
  },
  loadingIndicator: {
    height: "100%",
  },
  horoscopeText: {
    fontFamily: FontFamily.Recoleta.Regular,
    fontSize: 18,
    color: Colors.white,
    marginTop: 20,
    textAlign: "center",
    includeFontPadding: false,
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "flex-end",
    flex: 1,
  },
  journalButton: {
    borderRadius: 12,
    backgroundColor: Colors.primaryBackground,
    shadowColor: Colors.shadowPrimary,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 0,
    shadowOpacity: 1,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
  },
  journalButtonText: {
    fontFamily: FontFamily.Recoleta.SemiBold,
    fontSize: 16,
    letterSpacing: 2,
    color: Colors.white,
    textTransform: "capitalize",
    includeFontPadding: false,
  },
  bottomSheetBackground: {
    backgroundColor: "transparent",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
