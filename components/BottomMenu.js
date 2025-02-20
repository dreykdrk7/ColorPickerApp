import React from "react";
import { View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

const BottomMenu = ({ colors, onColorSelect }) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {colors.map((color, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.colorBox, { backgroundColor: color }]}
            onPress={() => onColorSelect(color)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#333",
    borderRadius: 15,
  },
  scrollContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  colorBox: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
});

export default BottomMenu;
