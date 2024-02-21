import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTheme } from './contexts/ThemeContext';
import { scale } from 'react-native-size-matters';

const PotentialCoupleCard = ({ couple }) => {
  const { Probability, parent1, parent2 } = couple;
  const { currentTheme } = useTheme();

  
const styles = StyleSheet.create({
  card: {
    backgroundColor: currentTheme.palTileBackgroundColor,
    borderRadius: scale(8),
    padding: scale(16),
    marginBottom: scale(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  probabilityText: {
    fontSize: scale(18),
    fontWeight: 'bold',
    marginBottom: scale(10),
    color: currentTheme.textColor,
  },
  parentContainer: {
    marginBottom: scale(8),
  },
  parentLabel: {
    fontSize: scale(16),
    fontWeight: 'bold',
    color: currentTheme.textColor,
  },
  detailText: {
    fontSize: scale(14),
    color: currentTheme.textColor,
  },
  passivesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: scale(4),
  },
  passiveSkill: {
    backgroundColor: currentTheme.backgroundColor,
    borderRadius: scale(15),
    paddingVertical: scale(4),
    paddingHorizontal: scale(8),
    margin: scale(2),
    fontSize: scale(12),
    color: currentTheme.textColor,
  },
});

  const renderPassiveSkills = (passives) => {
    // Check if 'values' exists and is an array before mapping
    if (Array.isArray(passives?.values)) {
      return (
        <View style={styles.passivesContainer}>
          {passives.values.map((skill, index) => (
            <Text key={index} style={styles.passiveSkill}>
              {skill}
            </Text>
          ))}
        </View>
      );
    } else {
      // Handle the case where 'values' is not an array - return an appropriate fallback UI or null
      return <Text style={styles.passiveSkill}>No skills available</Text>;
    }
  };

  const renderParentDetails = (parent, label) => (
    <View style={styles.parentContainer}>
      <Text style={styles.parentLabel}>{label}</Text>
      <Text style={styles.detailText}>Name: {parent.palData.name}</Text>
      <Text style={styles.detailText}>Number: #{parent.palData.key}</Text>
      <Text style={styles.detailText}>Gender: {parent.Gender}</Text>
      <Text style={styles.detailText}>Level: {parent.Level}</Text>
      <Text style={styles.detailText}>Skills:</Text>
      {renderPassiveSkills(parent.PassiveSkillList)}
    </View>
  );

  return (
    <View style={styles.card}>
      <Text style={styles.probabilityText}>Probability: {Probability}%</Text>
      {renderParentDetails(parent1, 'Parent 1')}
      {renderParentDetails(parent2, 'Parent 2')}
    </View>
  );
};


export default PotentialCoupleCard;
