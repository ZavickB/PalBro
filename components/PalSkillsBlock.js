import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import TypePin from './TypePin';
import { useTheme } from './contexts/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons'; // Import icons
import { scale } from 'react-native-size-matters';

const PalSkillsBlock = ({ skills }) => {
  const { currentTheme } = useTheme();
  const [selectedSkill, setSelectedSkill] = useState(null);

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      paddingHorizontal: scale(10),
      borderRadius: scale(10),
      marginVertical: scale(10),
    },
    skillItem: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginBottom: scale(10),
      borderWidth: scale(1),
      borderColor: currentTheme.borderColor,
      borderRadius: scale(10),
      padding: scale(10),
    },
    skillName: {
      fontWeight: 'bold',
      fontSize: scale(16),
      color: currentTheme.textColor,
      textTransform: 'capitalize',
    },
    skillLevel: {
      fontWeight: 'bold',
      fontSize: scale(16),
      color: currentTheme.textColor,
    },
    skillCooldownPower: {
      fontSize: scale(14),
      color: currentTheme.textColor,
      marginTop: scale(5),
      flexDirection: 'row', // Align icons and text horizontally
    },
    cooldownIcon: {
      marginRight: scale(5), // Add some space between icon and text
    },
    skillDescription: {
      marginTop: scale(5),
      color: currentTheme.textColor,
    },
    skillRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      minWidth: '100%',
    },
    skillData: {
      color: currentTheme.textColor,
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
                  <Icon name="stopwatch-outline" size={scale(16)} color={currentTheme.textColor} style={styles.cooldownIcon} />
                  <Text style={styles.skillData}>Cooldown: {skill.cooldown} seconds</Text>
                </View>
                <View style={styles.skillCooldownPower}>
                  <Icon name="flash" size={scale(16)} color={currentTheme.textColor} style={styles.cooldownIcon} />
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
