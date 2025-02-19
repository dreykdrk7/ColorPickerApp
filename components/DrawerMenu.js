import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const DrawerMenu = ({ menuColors, onReset, onChangeColor }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Opciones</Text>
  
        <TouchableOpacity style={styles.option} onPress={onReset}>
          <Text>🔄 Reiniciar</Text>
        </TouchableOpacity>
  
        <Text style={styles.subTitle}>Modificar colores:</Text>
        <View style={styles.colorContainer}>
          {menuColors.map((color, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.colorBox, { backgroundColor: color }]}
              onPress={() => onChangeColor(index)}
            />
          ))}
        </View>
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subTitle: {
    marginTop: 10,
    fontSize: 16,
  },
  option: {
    padding: 10,
    backgroundColor: "#ddd",
    marginVertical: 10,
    borderRadius: 5,
  },
  colorContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  colorBox: {
    width: 40,
    height: 40,
    margin: 5,
    borderRadius: 5,
  },
});

export default DrawerMenu;
