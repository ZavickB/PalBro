import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTheme } from './contexts/ThemeContext';
import { responsiveScale } from '../utils/responsiveScale';
import PassiveSkillsList from '../assets/data/PassiveSkillsList';

const PotentialCoupleCard = ({ couple }) => {
  const { Probability, parent1, parent2 } = couple;
  const { currentTheme } = useTheme();

  const globalPassives = PassiveSkillsList.map(passive => passive).sort((a, b) => a.skill_dev_name.localeCompare(b.skill_dev_name));

    
  const styles = StyleSheet.create({
    card: {
      backgroundColor: currentTheme.palTileBackgroundColor,
      borderRadius: responsiveScale(8),
      padding: responsiveScale(16),
      marginBottom: responsiveScale(10, 'height'),
      shadowColor: '#000',
      shadowOffset: { width: 0, height: responsiveScale(2, 'height') },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    probabilityText: {
      fontSize: responsiveScale(18),
      fontWeight: 'bold',
      marginBottom: responsiveScale(10, 'height'),
      color: currentTheme.textColor,
    },
    parentContainer: {
      marginBottom: responsiveScale(8, 'height'),
    },
    parentLabel: {
      fontSize: responsiveScale(16),
      fontWeight: 'bold',
      color: currentTheme.textColor,
    },
    detailText: {
      fontSize: responsiveScale(14),
      color: currentTheme.textColor,
    },
    passivesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: responsiveScale(4, 'height'),
    },
    passiveSkill: {
      backgroundColor: currentTheme.backgroundColor,
      borderRadius: responsiveScale(15),
      paddingVertical: responsiveScale(4, 'height'),
      paddingHorizontal: responsiveScale(8, 'width'),
      margin: responsiveScale(2),
      fontSize: responsiveScale(12),
      color: currentTheme.textColor,
    },
  });

  const findRealPassiveName = (skillName) => {
    const passive = globalPassives.find(passive => passive.skill_dev_name === skillName);
    return passive.skill_name;
  }

  const renderPassiveSkills = (passives) => {
    if (Array.isArray(passives?.values)) {
      return (
        <View style={styles.passivesContainer}>
          {passives.values.map((skill, index) => (
            <Text key={index} style={styles.passiveSkill}>
              {findRealPassiveName(skill)}
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
