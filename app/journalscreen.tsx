import { GradientBg1 } from "@/assets/images";
import { BackSvg, HistorySvg } from "@/assets/svgs";
import { HapticTab } from "@/components/HapticTab";
import Loader from "@/components/Loader";
import { Colors } from "@/constants/Colors";
import { FontFamily } from "@/constants/Fonts";
import { ScreenHeight } from "@/utils/dimen";
import { JournalStorage } from "@/utils/storage";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const JournalScreen = ({}) => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();
  const inset = useSafeAreaInsets();
  const router = useRouter();

  const { zodiac, journalId } = useLocalSearchParams<{ zodiac: string; journalId: string }>();

  const saveToHistory = async () => {
    if (input.length <= 1) {
      return;
    }

    try {
      setIsLoading(true);
      if (journalId) {
        await JournalStorage.updateJournal({ content: input, zodiacSign: zodiac, id: journalId });
      } else {
        await JournalStorage.createJournal({ content: input, zodiacSign: zodiac });
      }
    } catch (error) {}

    setIsLoading(false);
    router.back();
  };

  const fetchJournalById = async () => {
    setIsLoading(true);
    try {
      const journal = await JournalStorage.getJournalById(journalId);
      setInput(journal?.content ?? "");
    } catch (error) {}
    setIsLoading(false);
  };

  useEffect(() => {
    if (journalId) {
      fetchJournalById();
    }
  }, []);

  return (
    <View style={[styles.container, { paddingTop: inset.top + 12 }]}>
      <Image source={GradientBg1} contentFit='cover' style={StyleSheet.absoluteFillObject} />
      <View style={[styles.content, { marginBottom: inset.bottom }]}>
        <View style={styles.headerContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{journalId ? t("journal.editTitle") : t("journal.title")}</Text>
          </View>

          <HapticTab onPress={() => router.back()}>
            <BackSvg />
          </HapticTab>

          {!journalId && (
            <HapticTab onPress={() => router.navigate("/historyscreen")}>
              <HistorySvg />
            </HapticTab>
          )}
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            value={input}
            autoFocus
            onChangeText={setInput}
            multiline
            cursorColor={Colors.whiteTransparent}
            inputMode='text'
            style={styles.textInput}
          />
        </View>
        <View style={styles.buttonContainer}>
          <HapticTab style={styles.saveButton} onPress={saveToHistory}>
            <Text style={styles.saveButtonText}>{t("common.save")}</Text>
          </HapticTab>
        </View>
      </View>
      {isLoading && <Loader />}
    </View>
  );
};

export default JournalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  content: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
  },
  titleContainer: {
    position: "absolute",
    width: "100%",
  },
  titleText: {
    fontFamily: FontFamily.Recoleta.SemiBold,
    fontSize: 22,
    textAlign: "center",
    color: Colors.white,
  },
  textInputContainer: {
    marginTop: 24,
    backgroundColor: Colors.inputBackground,
    borderWidth: 1,
    borderColor: Colors.borderMedium,
    height: ScreenHeight * 0.7,
    borderRadius: 12,
    overflow: "hidden",
  },
  textInput: {
    fontFamily: FontFamily.Recoleta.Regular,
    fontSize: 20,
    color: Colors.whiteTransparent,
    letterSpacing: 1,
    padding: 16,
    flexGrow: 1,
    verticalAlign: "top",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  saveButton: {
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
  saveButtonText: {
    fontFamily: FontFamily.Recoleta.SemiBold,
    fontSize: 16,
    letterSpacing: 2,
    color: Colors.white,
    textTransform: "capitalize",
  },
});
