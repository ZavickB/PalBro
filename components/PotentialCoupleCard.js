import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTheme } from './contexts/ThemeContext';

const PotentialCoupleCard = ({ couple }) => {
  const { Probability, parent1, parent2 } = couple;
  const { currentTheme } = useTheme();

  
const styles = StyleSheet.create({
  card: {
    backgroundColor: currentTheme.palTileBackgroundColor,
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  probabilityText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: currentTheme.textColor,
  },
  parentContainer: {
    marginBottom: 8,
  },
  parentLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: currentTheme.textColor,
  },
  detailText: {
    fontSize: 14,
    color: currentTheme.textColor,
  },
  passivesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  passiveSkill: {
    backgroundColor: currentTheme.backgroundColor,
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 8,
    margin: 2,
    fontSize: 12,
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
