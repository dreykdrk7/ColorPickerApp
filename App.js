import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Vibration } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HomeScreen from "./components/HomeScreen";
import DrawerMenu from "./components/DrawerMenu";
import { defaultColors } from "./colors";

const Drawer = createDrawerNavigator();

function App() {
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [menuColors, setMenuColors] = useState(defaultColors);
  const [changeCount, setChangeCount] = useState(0);

  useEffect(() => {
    const loadCount = async () => {
      const storedCount = await AsyncStorage.getItem("changeCount");
      if (storedCount !== null) {
        setChangeCount(JSON.parse(storedCount));
      }
    };
    loadCount();
  }, []);

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

  // ✅ Función para añadir un nuevo color
  const handleAddColor = async () => {
    const newColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    const updatedColors = [...menuColors, newColor];
    setMenuColors(updatedColors);
    await AsyncStorage.setItem("menuColors", JSON.stringify(updatedColors));
  };

  // ✅ Función para eliminar un color del menú
  const handleRemoveColor = async (index) => {
    const updatedColors = [...menuColors];
    updatedColors.splice(index, 1);
    setMenuColors(updatedColors);
    await AsyncStorage.setItem("menuColors", JSON.stringify(updatedColors));
  };

  const handleSetBackgroundColor = async (color) => {
    setBackgroundColor(color);
    Vibration.vibrate(300);
    setChangeCount((prevCount) => {
      const newCount = prevCount + 1;
      AsyncStorage.setItem("changeCount", JSON.stringify(newCount));
      return newCount;
    });
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => (
          <DrawerMenu
            {...props}
            onReset={handleReset}
            onChangeColor={handleChangeColor}
            onAddColor={handleAddColor} // ✅ Pasamos la función para añadir
            onRemoveColor={handleRemoveColor} // ✅ Pasamos la función para eliminar
            menuColors={menuColors} // ✅ Pasamos los colores actuales
          />
        )}
      >
        <Drawer.Screen name="Inicio">
          {(props) => (
            <HomeScreen
              {...props}
              backgroundColor={backgroundColor}
              menuColors={menuColors}
              setBackgroundColor={handleSetBackgroundColor}
              changeCount={changeCount}
            />
          )}
        </Drawer.Screen>
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
    fontFamily: "Roboto",
  },
  colorName: {
    fontSize: 24,
    color: "#000",
    textAlign: "center",
    marginBottom: 10,
  },
});
