import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import icons
import { useTheme } from './contexts/ThemeContext';
import { scale } from 'react-native-size-matters';

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
      paddingHorizontal: scale(10),
      borderRadius: scale(10),
      marginVertical: scale(10),
      borderWidth: scale(1),
      borderColor: currentTheme.borderColor,
      backgroundColor: currentTheme.backgroundVariant,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: scale(10),
    },
    titleText: {
      fontWeight: 'bold',
      fontSize: scale(16),
      color: currentTheme.textColor,
    },
    description: {
      fontSize: scale(14),
      color: currentTheme.textColor,
      paddingHorizontal: scale(10),
      paddingBottom: scale(10),
    },
    icon: {
      marginRight: scale(5),
    },
  });

  return (
    <TouchableOpacity onPress={toggleExpand} activeOpacity={0.7}>
      <View style={styles.container}>
        <View style={styles.titleRow}>
          <Text style={styles.titleText}>{formatName(aura.name)}</Text>
          <Icon name={expanded ? "chevron-up-outline" : "chevron-down-outline"} size={scale(20)} color={currentTheme.textColor} />
        </View>
        {expanded && (
          <Text style={styles.description}>{aura.description}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default PalSpecialCapacityBlock;
