import { GradientBg1 } from "@/assets/images";
import { BackSvg } from "@/assets/svgs";
import { HapticTab } from "@/components/HapticTab";
import Loader from "@/components/Loader";
import { Colors } from "@/constants/Colors";
import { FontFamily } from "@/constants/Fonts";
import { Journal } from "@/types/journal";
import { JournalStorage } from "@/utils/storage";
import dayjs from "dayjs";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HistoryScreen = () => {
  const { t } = useTranslation();
  const inset = useSafeAreaInsets();
  const router = useRouter();

  const [histories, setHistories] = useState<Journal[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchHistoryJournals = async () => {
    try {
      setIsLoading(true);
      const data = await JournalStorage.getAllJournalsPublic();
      setHistories(data);
    } catch (error) {}
    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchHistoryJournals();
    }, [])
  );

  return (
    <View style={[styles.container, { paddingTop: inset.top + 12, paddingBottom: inset.bottom }]}>
      <Image source={GradientBg1} contentFit='cover' style={StyleSheet.absoluteFillObject} />
      <View style={styles.header}>
        <View style={styles.headerContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{t("history.title")}</Text>
          </View>

          <HapticTab onPress={() => router.back()}>
            <BackSvg />
          </HapticTab>
        </View>
      </View>
      <FlatList
        data={histories}
        style={styles.flatList}
        contentContainerStyle={styles.flatlistContainer}
        renderItem={({ item }) => {
          return (
            <HapticTab
              onPress={() => {
                router.push({
                  pathname: "/journalscreen",
                  params: {
                    journalId: item.id,
                  },
                });
              }}
            >
              <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]} style={styles.gradientContainer}>
                <View style={styles.itemHeader}>
                  <Text style={styles.dateText}>{dayjs(item.createdAt).format("DD MMM, YYYY")}</Text>
                  <BackSvg style={styles.arrowIcon} width={28} height={28} />
                </View>
                <Text style={styles.contentText}>{item.content}</Text>
              </LinearGradient>
            </HapticTab>
          );
        }}
      />
      {isLoading && <Loader />}
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {},
  flatlistContainer: {
    gap: 24,
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
  flatList: {
    marginTop: 24,
  },
  gradientContainer: {
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: 16,
    padding: 12,
  },
  itemHeader: {
    flexDirection: "row",
    marginBottom: 12,
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateText: {
    fontFamily: FontFamily.Recoleta.Regular,
    fontSize: 20,
    color: Colors.whiteTransparent,
  },
  arrowIcon: {
    transform: [{ rotate: "180deg" }],
  },
  contentText: {
    fontFamily: FontFamily.Recoleta.Regular,
    fontSize: 14,
    color: Colors.whiteTransparent,
  },
});
