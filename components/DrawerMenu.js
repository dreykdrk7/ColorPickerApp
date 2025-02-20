import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import ConfirmationAlert from "./ConfirmationAlert";

const DrawerMenu = ({ onReset, onChangeColor, onAddColor, onRemoveColor, menuColors }) => {

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleConfirm = () => {
    setShowConfirmation(false);
    onReset();
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  useEffect(() => {
    const loadColors = async () => {
      const storedColors = await AsyncStorage.getItem("menuColors");
      setMenuColors(storedColors ? JSON.parse(storedColors) : defaultColors);
    };
    loadColors();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Opciones</Text>

      <TouchableOpacity
        style={styles.option}
        onPress={() => setShowConfirmation(true)}
      >
        <Text>🔄 Reiniciar</Text>
      </TouchableOpacity>

      <Text style={styles.subTitle}>Modificar colores:</Text>

      <FlatList
        data={menuColors}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.colorItem}>
            <View style={[styles.colorBox, { backgroundColor: item }]} />
            <TouchableOpacity style={styles.editButton} onPress={() => onChangeColor(index)}>
              <Text style={styles.editText}>🎨</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => onRemoveColor(index)}>
              <Text style={styles.deleteText}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={onAddColor}>
        <Text style={styles.addText}>➕ Agregar Color</Text>
      </TouchableOpacity>

      {showConfirmation && (
        <ConfirmationAlert
          visible={showConfirmation}
          title="Confirmar"
          message="¿Seguro que quieres reiniciar los colores?"
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      )}
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
  colorItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
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
  deleteButton: {
    marginLeft: 10,
    backgroundColor: "red",
    padding: 5,
    borderRadius: 5,
  },
  deleteText: {
    color: "white",
    fontWeight: "bold",
  },
  addButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    alignItems: "center",
  },
  addText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default DrawerMenu;
