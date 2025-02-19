import React, { useState, useEffect } from "react";
import { Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
  runOnJS,
} from "react-native-reanimated";
import BottomMenu from "./BottomMenu";

const HomeScreen = ({ backgroundColor, menuColors, setBackgroundColor }) => {
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
      <Text style={styles.colorName}>{backgroundColor}</Text>
      <BottomMenu colors={menuColors} onColorSelect={setBackgroundColor} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 20,
  },
  colorName: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
  },
});

export default HomeScreen;
