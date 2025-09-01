import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Colors } from '@/constants/Colors';

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} color={Colors.white} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.overlayBackground,
  },
});
