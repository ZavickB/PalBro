import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import icons
import { useTheme } from './contexts/ThemeContext';

const PalSpecialCapacityBlock = ({ specialCapacity }) => {
  const { currentTheme } = useTheme();
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      paddingHorizontal: 10,
      borderRadius: 10,
      marginVertical: 10,
      borderWidth: 1,
      borderColor: currentTheme.borderColor,
      backgroundColor: currentTheme.backgroundVariant,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
    },
    titleText: {
      fontWeight: 'bold',
      fontSize: 16,
      color: currentTheme.textColor,
    },
    description: {
      fontSize: 14,
      color: currentTheme.textColor,
      paddingHorizontal: 10,
      paddingBottom: 10,
    },
    icon: {
      marginRight: 5,
    },
  });

  return (
    <TouchableOpacity onPress={toggleExpand} activeOpacity={0.7}>
      <View style={styles.container}>
        <View style={styles.titleRow}>
          <Text style={styles.titleText}>{specialCapacity.name}</Text>
          <Icon name={expanded ? "chevron-up-outline" : "chevron-down-outline"} size={20} color={currentTheme.textColor} />
        </View>
        {expanded && (
          <Text style={styles.description}>{specialCapacity.description}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default PalSpecialCapacityBlock;
