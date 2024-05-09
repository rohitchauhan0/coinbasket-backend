import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CategoryRadioButton = ({ category, depth, selectedCategory, onSelect }) => {
  const indentation = ' '.repeat(depth * 4);

  const handlePress = () => {
    // Check if the category is already selected
    if (selectedCategory !== category._id) {
      onSelect(category._id);
    }
  };

  return (
    <View style={styles.container}>
      {/* Radio button and label */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>{`${indentation}`}</Text>
        <TouchableOpacity onPress={handlePress}>
          <View style={[styles.radioContainer, selectedCategory === category._id && styles.selectedRadio]}>
            {selectedCategory === category._id && <View style={styles.innerRadio} />}
          </View>
        </TouchableOpacity>
        <Text>{`${category.name}`}</Text>
      </View>
      
      {/* Render children recursively */}
      {category.children && category.children.length > 0 && (
        <View style={styles.childrenContainer}>
          {category.children.map(child => (
            <CategoryRadioButton key={child._id} category={child} depth={depth + 1} selectedCategory={selectedCategory} onSelect={onSelect} />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  radioContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRadio: {
    backgroundColor: 'black',
  },
  innerRadio: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white', // Set the background color of the inner radio button
  },
  childrenContainer: {
    marginLeft: 20,
  },
});

export default CategoryRadioButton;
