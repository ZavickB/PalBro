import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from './contexts/ThemeContext';
import { responsiveScale } from '../utils/responsiveScale';

const PalStatsBlock = ({ pal, statsOrder }) => {
  const { currentTheme } = useTheme();

  // Create a mapping of stat labels to emojis
  const statEmojis = {
    "Rarity": "🌟",
    "HP": "❤️",
    "Melee": "⚔️",
    "Ranged": "🏹",
    "Defence": "🛡️",
    "Price": "💰",
    "Stamina": "⚡",
    "Walking": "🚶‍♂️",
    "Running": "🏃‍♂️",
    "Mounted": "🐎",
  };
  
  const flattenAndMapStats = (pal) => {
    const flattenedStats = {
      "HP": pal.stats.hp,
      "Defence": pal.stats.defense,
      "Melee": pal.stats.attack.melee,
      "Ranged": pal.stats.attack.ranged,
      "Stamina": pal.stats.stamina,
      "Mounted": pal.stats.speed.ride,
      "Walking": pal.stats.speed.walk,
      "Running": pal.stats.speed.run,
      "Rarity": pal.rarity,
      "Price": pal.price,
    };

    return flattenedStats;
  };

  const preparedStats = flattenAndMapStats(pal);

  // Define an array of background colors
  const backgroundPastelColors = [
    "#FFC3A0", // Light Coral (Corresponds to "BreedPWR")
    "#A0E7E5", // Light Cyan (Corresponds to "HP")
    "#FFDFD3", // Light Salmon (Corresponds to "Melee")
    "#FFCA80", // Light Orange (Corresponds to "Ranged")
    "#D8BFD8", // Thistle (Corresponds to "Defence")
    "#FFB6C1", // Light Pink (Corresponds to "Price")
    "#A8D8E0", // Light Blue (Corresponds to "Stamina")
    "#B2F7EF", // Light Turquoise (Corresponds to "Walking")
    "#B0E57C", // Light Green (Corresponds to "Running")
    "#FFD700", // Gold (Corresponds to "Mounted")
    "#D2B48C", // Tan (Corresponds to "Capture Bonus")
    "#D3D3D3", // Light Gray (Corresponds to "Male %")
  ];

  // Create an array of keys and values from the stats object
  const statEntries = Object.entries(preparedStats);

  return (
    <View style={[styles.container]}>
      <View style={styles.columnsContainer}>
        {statEntries.map(([key, value], index) => (
          <View
            key={key}
            style={[
              styles.statColumn,
              {
                backgroundColor: backgroundPastelColors[index % backgroundPastelColors.length],
              },
            ]}
          >
            <View style={styles.columnWrapper}>
              <View style={styles.emojiColumn}>
                <Text style={styles.statEmoji}>
                  {statEmojis[key]}
                </Text>
              </View>
              <View style={styles.valueColumn}>
                <Text style={styles.statValue}>
                  {value}
                </Text>
                <Text style={styles.statLabel}>
                  {key}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: responsiveScale(10),
  },
  title: {
    fontSize: responsiveScale(18),
    fontWeight: 'bold',
    marginBottom: 8,
  },
  columnsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statColumn: {
    flexBasis: '49%', // Adjust the width as needed for two columns
    padding: responsiveScale(5),
    marginBottom: 5,
    borderWidth: responsiveScale(1),
    borderColor: '#ccc',
    borderRadius: responsiveScale(8),
  },
  columnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  emojiColumn: {
    flex: 1,
    alignItems: 'center',
  },
  valueColumn: {
    flex: 1,
    alignItems: 'center',
  },
  statEmoji: {
    fontSize: responsiveScale(45),
    marginBottom: 8,
  },
  statValue: {
    fontSize: responsiveScale(16),
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: responsiveScale(16),
    textAlign: 'center',
  },
});

export default PalStatsBlock;