import React from "react";
import { View, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const BottomMenu = ({ colors, onColorSelect }) => {
  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={[
          styles.scrollContainer,
          { minWidth: screenWidth },
          ]}
      >
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
    padding: 13,
    backgroundColor: "#333",
    borderRadius: 15,
  },
  scrollContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
  colorBox: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 6,
  },
});

export default BottomMenu;
