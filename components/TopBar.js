import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from './contexts/ThemeContext';
import { responsiveScale } from '../utils/responsiveScale';
import { GameSelectionModal } from './GameSelectionModal';

const TopBar = ({ title, navigation }) => {
  const { toggleTheme, currentTheme } = useTheme(); // Get current theme
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const handleThemeToggle = () => {
    toggleTheme(); // Toggle theme directly without delay
  };

  return (
    <View style={[styles.topBar, { backgroundColor: currentTheme.backgroundColor }]}>
      {title && (
        <Text style={[styles.title, { color: currentTheme.textColor }]}>{title}</Text>
      )}
      {!title && (
        <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()}>
          <FontAwesome5 name="arrow-left" size={responsiveScale(30)} color={currentTheme.textColor} />
        </TouchableOpacity>
      )}
      <View style={styles.iconsContainer}>
        <TouchableOpacity style={styles.icon} onPress={() => setIsModalVisible(true)}>
          <FontAwesome5 name="gamepad" size={responsiveScale(30)} color={currentTheme.textColor} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={handleThemeToggle}>
          <FontAwesome5 name="adjust" size={responsiveScale(30)} color={currentTheme.textColor} />
        </TouchableOpacity>
      </View>
      <GameSelectionModal visible={isModalVisible} onClose={() => setIsModalVisible(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    marginTop: responsiveScale(40, "height"),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: responsiveScale(60, 'height'),
    paddingHorizontal: responsiveScale(10),
    width: '100%',
  },
  title: {
    fontSize: responsiveScale(30),
    fontWeight: 'bold',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: responsiveScale(10),
  },
});

export default TopBar;
