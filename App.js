import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import BottomMenu from "./components/BottomMenu";
import DrawerMenu from "./components/DrawerMenu";
import { defaultColors } from "./colors";

const Drawer = createDrawerNavigator();

function App() {
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [menuColors, setMenuColors] = useState(defaultColors);

  useEffect(() => {
    const loadColors = async () => {
      const storedColors = await AsyncStorage.getItem("menuColors");
      setMenuColors(storedColors ? JSON.parse(storedColors) : defaultColors);
    };
    loadColors();
  }, []);

  const handleReset = async () => {
    setBackgroundColor("#FFFFFF");
    setMenuColors(defaultColors);
    await AsyncStorage.removeItem("menuColors");
  };

  const handleChangeColor = async (index) => {
    const newColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    const updatedColors = [...menuColors];
    updatedColors[index] = newColor;
    setMenuColors(updatedColors);
    await AsyncStorage.setItem("menuColors", JSON.stringify(updatedColors));
  };

  const HomeScreen = () => {
    return (
      <View style={[styles.container, { backgroundColor }]}>
        <Text style={styles.colorName}>{backgroundColor}</Text>
        <BottomMenu colors={menuColors} onColorSelect={setBackgroundColor} />
      </View>
    );
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => (
          <DrawerMenu
            {...props}
            menuColors={menuColors}
            onReset={handleReset}
            onChangeColor={handleChangeColor}
          />
        )}
      >
        <Drawer.Screen name="Inicio" component={HomeScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 20,
  },
  colorName: {
    fontSize: 24,
    color: "#000",
    textAlign: "center",
    marginBottom: 10,
  },
});
