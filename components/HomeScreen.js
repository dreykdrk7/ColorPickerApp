import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
  runOnJS,
} from "react-native-reanimated";
import BottomMenu from "./BottomMenu";

const HomeScreen = ({ backgroundColor, menuColors, setBackgroundColor, changeCount }) => {
  const progress = useSharedValue(0);
  const [prevColor, setPrevColor] = useState(backgroundColor);

  useEffect(() => {
    progress.value = 0;
    progress.value = withTiming(1, { duration: 3000 }, () => {
      runOnJS(setPrevColor)(backgroundColor);
    });
  }, [backgroundColor]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        [prevColor, backgroundColor]
      ),
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.topContainer}>
        <Text style={styles.counterText}>Cambios de color: {changeCount}</Text>
      </View>
      <Text style={styles.colorName}>{backgroundColor}</Text>
      <BottomMenu colors={menuColors} onColorSelect={setBackgroundColor} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },
  topContainer: {
    alignItems: "center",
    paddingVertical: 10,
  },
  counterText: {
    fontSize: 16,
    textAlign: "center",
  },
  colorName: {
    fontSize: 22,
    textAlign: "center",
  },
});

export default HomeScreen;
