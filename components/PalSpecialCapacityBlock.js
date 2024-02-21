import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import icons
import { useTheme } from './contexts/ThemeContext';
import { responsiveScale } from '../utils/responsiveScale';

// Rename `specialCapacity` prop to `aura`
const PalSpecialCapacityBlock = ({ aura }) => {
  const { currentTheme } = useTheme();
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  // Utility function to format drop names for display and matching
  const formatName = (dropName) => {
    return dropName
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

    
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      paddingHorizontal: responsiveScale(10, 'width'),
      borderRadius: responsiveScale(10),
      marginVertical: responsiveScale(10, 'height'),
      borderWidth: responsiveScale(1),
      borderColor: currentTheme.borderColor,
      backgroundColor: currentTheme.backgroundVariant,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: responsiveScale(10),
    },
    titleText: {
      fontWeight: 'bold',
      fontSize: responsiveScale(16),
      color: currentTheme.textColor,
    },
    description: {
      fontSize: responsiveScale(16),
      color: currentTheme.textColor,
      paddingHorizontal: responsiveScale(10, 'width'),
      paddingBottom: responsiveScale(10, 'height'),
    },
    icon: {
      marginRight: responsiveScale(5, 'width'),
    },
  });

  return (
    <TouchableOpacity onPress={toggleExpand} activeOpacity={0.7}>
      <View style={styles.container}>
        <View style={styles.titleRow}>
          <Text style={styles.titleText}>{formatName(aura.name)}</Text>
          <Icon name={expanded ? "chevron-up-outline" : "chevron-down-outline"} size={responsiveScale(20)} color={currentTheme.textColor} />
        </View>
        {expanded && (
          <Text style={styles.description}>{aura.description}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default PalSpecialCapacityBlock;
