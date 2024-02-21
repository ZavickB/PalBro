import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import TypePin from './TypePin';
import { useTheme } from './contexts/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons'; // Import icons
import { responsiveScale } from '../utils/responsiveScale';

const PalSkillsBlock = ({ skills }) => {
  const { currentTheme } = useTheme();
  const [selectedSkill, setSelectedSkill] = useState(null);

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      paddingHorizontal: responsiveScale(10, 'width'),
      borderRadius: responsiveScale(10),
      marginVertical: responsiveScale(10, 'height'),
    },
    skillItem: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginBottom: responsiveScale(10, 'height'),
      borderWidth: responsiveScale(1),
      borderColor: currentTheme.borderColor,
      borderRadius: responsiveScale(10),
      padding: responsiveScale(10),
    },
    skillName: {
      fontWeight: 'bold',
      fontSize: responsiveScale(16),
      color: currentTheme.textColor,
      textTransform: 'capitalize',
    },
    skillLevel: {
      fontWeight: 'bold',
      fontSize: responsiveScale(16),
      color: currentTheme.textColor,
    },
    skillCooldownPower: {
      color: currentTheme.textColor,
      marginTop: responsiveScale(5),
      flexDirection: 'row', // Align icons and text horizontally
      alignContent: 'center',
      alignItems: 'center',
    },
    cooldownIcon: {
      marginRight: responsiveScale(5, 'width'), // Add some space between icon and text
    },
    skillDescription: {
      marginTop: responsiveScale(5, 'height'),
      color: currentTheme.textColor,
      fontSize: responsiveScale(14),
    },
    skillRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      minWidth: '100%',
    },
    skillData: {
      color: currentTheme.textColor,
      fontSize: responsiveScale(14),
    }
  });

  const handleSkillPress = (skill) => {
    setSelectedSkill(skill === selectedSkill ? null : skill);
  };

  return (
    <View style={styles.container}>
      <View>
        {skills.map((skill, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleSkillPress(skill)}
            activeOpacity={0.7}
          >
            <View style={styles.skillItem}>
              <View style={styles.skillRow}>
                <TypePin key={index} type={skill.type} />
                <Text style={styles.skillName}>
                  {skill.name.replace(/_/g, ' ')}
                </Text>
                <Text style={styles.skillLevel}>{`Lv ${skill.level}`}</Text>
              </View>
              <View style={styles.skillRow}>
                <View style={styles.skillCooldownPower}>
                  <Icon name="stopwatch-outline" size={responsiveScale(16)} color={currentTheme.textColor} style={styles.cooldownIcon} />
                  <Text style={styles.skillData}>Cooldown: {skill.cooldown} seconds</Text>
                </View>
                <View style={styles.skillCooldownPower}>
                  <Icon name="flash" size={responsiveScale(16)} color={currentTheme.textColor} style={styles.cooldownIcon} />
                  <Text style={styles.skillData}>Power: {skill.power}</Text>
                </View>
              </View>
              {selectedSkill === skill && (
                <Text style={styles.skillDescription}>{skill.description}</Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default PalSkillsBlock;
