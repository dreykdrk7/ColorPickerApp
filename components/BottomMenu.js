import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

const BottomMenu = ({ colors, onColorSelect }) => {
  return (
    <View style={styles.container}>
      {colors.map((color, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.colorBox, { backgroundColor: color }]}
          onPress={() => onColorSelect(color)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#333",
  },
  colorBox: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },
});

export default BottomMenu;
