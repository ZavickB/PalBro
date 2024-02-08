import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import TypeBadge from '../components/TypeBadge';
import TopBar from '../components/TopBar';
import { useTheme } from '../components/contexts/ThemeContext';
import PalsProfilesStatsAndBreedings from '../assets/data/PalsProfilesStatsAndBreedings';
import SwitchButton from '../components/SwitchButton';
import { useCapturedPals } from '../components/contexts/CapturedPalsContext';
import GradientBackground from '../components/GradientBackground';

const BreedingOptionsView = ({ route, navigation }) => {
  const { palData, palsUsed } = route.params;
  const { currentTheme } = useTheme();
  const { capturedPals } = useCapturedPals();
  const [isUsingCapturedPals, setIsUsingCapturedPals] = useState(palsUsed === "MyPals");
  const [potentialParentsData, setPotentialParentsData] = useState([]);

  // Debugging

  const newlyCapturedPals = PalsProfilesStatsAndBreedings.filter(pal =>
    !!capturedPals[pal.key] // Adjusted check for captured status
  );

  const calculatePotentialParents = (selectedPal, useCapturedPals) => {
    const palsList = useCapturedPals ? newlyCapturedPals : PalsProfilesStatsAndBreedings;
    const potentialParents = [];

    for (const pal of palsList) {
      const { breedings } = pal;
      if (breedings) {
        for (const key in breedings) {
          if (breedings[key] === selectedPal.name) {
            const parent = palsList.find(p => p.name === key);
            if (parent) {
              const parentCouple = [pal, parent];
              if (!potentialParents.some(couple =>
                (couple[0].name === parentCouple[0].name && couple[1].name === parentCouple[1].name) ||
                (couple[0].name === parentCouple[1].name && couple[1].name === parentCouple[0].name)
              )) {
                potentialParents.push(parentCouple);
              }
            }
          }
        }
      }
    }
    return potentialParents;
  };

  useEffect(() => {
    const updatedPotentialParentsData = calculatePotentialParents(palData, isUsingCapturedPals);
    setPotentialParentsData(updatedPotentialParentsData);
  }, [palData, isUsingCapturedPals]);

  const toggleList = () => setIsUsingCapturedPals(prev => !prev);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      width: '100%',
      height: 300,
      resizeMode: 'cover',
    },
    infoContainer: {
      padding: 16,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'left',
      marginBottom: 8,
      color: currentTheme.textColor,
    },
    section: {
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
      color: currentTheme.textColor,
    },
    description: {
      fontSize: 16,
      textAlign: 'justify',
      color: currentTheme.textColor,
    },
    palListItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    palImage: {
      width: 24,
      height: 24,
      marginRight: 8,
    },
  });

  return (
    <GradientBackground>
      <View style={styles.container}>
        <TopBar navigation={navigation} />
        <ScrollView style={styles.container}>
          <Image style={styles.image} source={palData.image} />
          <View style={styles.infoContainer}>
            <Text style={styles.name}>#{palData.key} {palData.name}</Text>
            <View style={styles.typesContainer}>
              <TypeBadge types={palData.types} />
            </View>

            <SwitchButton onPress={toggleList} isUsingCapturedPals={isUsingCapturedPals} />

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Potential Parent Couples:</Text>
              {potentialParentsData.length > 0 ? (
                potentialParentsData.map((couple, index) => (
                  <View key={index} style={styles.palListItem}>
                    {couple.map((pal, palIndex) => (
                      <React.Fragment key={palIndex}>
                        {pal.image ? (
                          <Image source={pal.image} style={styles.palImage} />
                        ) : (null) }
                        <Text style={styles.description}>{pal.name}</Text>
                        {palIndex === 0 && <Text style={styles.description}> + </Text>}
                      </React.Fragment>
                    ))}
                  </View>
                ))
              ) : (
                <Text style={styles.description}>Not available</Text>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </GradientBackground>
  );
};

export default BreedingOptionsView;
