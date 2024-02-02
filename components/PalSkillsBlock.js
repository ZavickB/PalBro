import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import TypePin from './TypePin';
import { useTheme } from './ThemeContext';

const PalSkillsBlock = ({ skills }) => {
  const { currentTheme } = useTheme();
  const [selectedSkill, setSelectedSkill] = useState(null);

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      paddingHorizontal: 10,
      borderRadius: 10,
      marginVertical: 10,
    },
    skillItem: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginBottom: 10,
      borderWidth: 1,
      borderColor: currentTheme.borderColor,
      borderRadius: 10,
      padding: 10,
    },
    skillName: {
      fontWeight: 'bold',
      fontSize: 16,
      color: currentTheme.textColor,
      textTransform: 'capitalize',
    },
    skillLevel: {
      fontWeight: 'bold',
      fontSize: 16,
      color: currentTheme.textColor,
    },
    skillCooldownPower: {
      fontSize: 14,
      color: currentTheme.textColor,
    },
    skillDescription: {
      marginTop: 5,
      color: currentTheme.textColor,
    },
    skillRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      minWidth: '100%',
    },
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
                <Text style={styles.skillCooldownPower}>
                  Cooldown: {skill.cooldown} Power: {skill.power}
                </Text>
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
