import * as FileSystem from 'expo-file-system';

async function readFileContent(uri) {
    try {
        const content = await FileSystem.readAsStringAsync(uri);
        const jsonData = JSON.parse(content);
        console.log(jsonData);
        // Proceed with your logic using jsonData
    } catch (error) {
        console.error('Error reading file content:', error);
    }
}

// async function to get the real name of a pal from its dev name
async function getPalRealName(palName, palsOfficialProfiles) {
    let palRealName = '';
    for (let i = 0; i < palsOfficialProfiles.length; i++) {
        if (palsOfficialProfiles[i]['pal_dev_name'] === palName) {
            palRealName = palsOfficialProfiles[i]['name'];
            break;
        }
    }
    return palRealName;
}

// async function to get the dev name of a pal from its real name
async function getPalDevName(palRealName, palsOfficialProfiles) {
    let palDevName = '';
    for (let i = 0; i < palsOfficialProfiles.length; i++) {
        if (palsOfficialProfiles[i]['name'] === palRealName) {
            palDevName = palsOfficialProfiles[i]['pal_dev_name'];
            break;
        }
    }
    return palDevName;
}

// async function to get the UID of a player from its name
async function getPlayerUID(playerName, playersList) {
    let playerUID = '';
    for (let i = 0; i < playersList.length; i++) {
        if (playersList[i]['Nickname'] === playerName) {
            playerUID = playersList[i]['OwnerID'];
            break;
        }
    }
    return playerUID;
}

// async function to get the pals captured by a player
async function getPlayerCapturedPals(playerName, inGameData) {
    const playerUID = getPlayerUID(playerName, inGameData['players']);

    const playerPals = [];
    for (let i = 0; i < inGameData['characters'].length; i++) {
        if (inGameData['characters'][i]['OwnerID'] === playerUID) {
            playerPals.push(inGameData['characters'][i]);
        }
    }
    return playerPals;
}

// async function to check if a couple already exists in the array of potential parents
async function coupleExists(couple, potentialParents) {
    for (const parentCouple of potentialParents) {
        // Check both possible combinations to account for parent1 and parent2 being switched
        if (
            (couple['parent1'][0] === parentCouple['parent1'][0] && couple['parent2'][0] === parentCouple['parent2'][0]) ||
            (couple['parent1'][0] === parentCouple['parent2'][0] && couple['parent2'][0] === parentCouple['parent1'][0])
        ) {
            return true;
        }
    }
    return false;
}

// async function to calculate the potential parents of a baby
async function calculatePotentialParents(babyName, palsOfficialProfiles) {
    const potentialParents = [];
    console.log('Searching for potential parents...');
    console.log(palsOfficialProfiles);
    return;
    palsOfficialProfiles.forEach(pal => {
        if (pal['breedings']) {
            Object.entries(pal['breedings']).forEach(([key, value]) => {
                if (value === babyName) {
                    const couple = {
                        'parent1': [pal['name'], pal['pal_dev_name']],
                        'parent2': [key, getPalDevName(key, palsOfficialProfiles)]
                    };
                    const coupleInverted = {
                        'parent1': [key, getPalDevName(key, palsOfficialProfiles)],
                        'parent2': [pal['name'], pal['pal_dev_name']]
                    };

                    if (!coupleExists(couple, potentialParents) && !coupleExists(coupleInverted, potentialParents)) {
                        potentialParents.push(couple);
                    }
                }
            });
        }
    });

    return potentialParents;
}

async function removeUnbreedableCouples(couples) {
    console.log('Searching for valid couples...');
    return couples.filter(couple => couple['parent1']['Gender'] !== couple['parent2']['Gender']);
}

// async function to check if the potential parents of a baby are captured by the player in the game
async function checkPlayersInGamePalsForCouples(potentialParents, playerName, inGameData) {
    const couplesInGame = [];
    const palsCapturedByPlayer = getPlayerCapturedPals(playerName, inGameData);

    // Group captured pals by their dev name for easy access
    const palsGroupedByDevName = {};
    palsCapturedByPlayer.forEach(pal => {
        const devName = pal['CharacterID']; // Assuming 'CharacterID' is the dev name
        if (!palsGroupedByDevName[devName]) {
            palsGroupedByDevName[devName] = [];
        }
        palsGroupedByDevName[devName].push(pal);
    });

    // Check each potential couple
    potentialParents.forEach(couple => {
        const parent1DevName = couple['parent1'][1];
        const parent2DevName = couple['parent2'][1];

        // Check if both parents are captured by the player
        if (palsGroupedByDevName[parent1DevName] && palsGroupedByDevName[parent2DevName]) {
            // For each instance of parent1 and parent2, create a couple entry
            palsGroupedByDevName[parent1DevName].forEach(parent1Instance => {
                palsGroupedByDevName[parent2DevName].forEach(parent2Instance => {
                    couplesInGame.push({
                        'parent1': parent1Instance,
                        'parent2': parent2Instance
                    });
                });
            });
        }
    });

    const validCouples = removeUnbreedableCouples(couplesInGame);
    return validCouples;
}

// async function to get the couples having one or more of the specified Passives
async function getCouplesWithPassives(couples, passives, palsOfficialProfiles) {
    const couplesWithPassives = [];
    couples.forEach(couple => {
        const parent1Passives = couple['parent1']['PassiveSkillList'] ? couple['parent1']['PassiveSkillList']["values"] : [];
        const parent2Passives = couple['parent2']['PassiveSkillList'] ? couple['parent2']['PassiveSkillList']["values"] : [];

        // Initialize a counter for how many passives are matched
        const matchedPassives = [];

        passives.forEach(passive => {
            // Check both parents for each passive
            let parent1Match = false;
            let parent2Match = false;

            parent1Passives.forEach(parent1Passive => {
                if (parent1Passive.includes(passive)) {
                    parent1Match = true;
                }
            });

            parent2Passives.forEach(parent2Passive => {
                if (parent2Passive.includes(passive)) {
                    parent2Match = true;
                }
            });

            // If either parent has the passive, mark this passive as matched
            if (parent1Match || parent2Match) {
                matchedPassives.push(passive);
            }
        });

        // Only add this couple if all passives in the passives array were matched
        if (matchedPassives.length === passives.length) {
            couplesWithPassives.push(couple);
        }
    });

    return couplesWithPassives;
}

async function getProbability(couplesWithPassives, desiredPassives) {
    const maxCapacity = 4; // Max capacity of a pal is 4

    couplesWithPassives.forEach(couple => {
        const parent1Passives = couple['parent1']['PassiveSkillList'] ? couple['parent1']['PassiveSkillList']["values"] : [];
        const parent2Passives = couple['parent2']['PassiveSkillList'] ? couple['parent2']['PassiveSkillList']["values"] : [];

        const combinedUniquePassives = [...new Set([...parent1Passives, ...parent2Passives])];
        const totalUniquePassives = combinedUniquePassives.length;
        const numberDesiredPassives = desiredPassives.length;

        // Check if all desired passives are present among the combined unique passives
        let allDesiredPresent = true;
        desiredPassives.forEach(desiredPassive => {
            if (!combinedUniquePassives.some(parentPassive => parentPassive.includes(desiredPassive))) {
                allDesiredPresent = false;
            }
        });

        let probability;
        if (!allDesiredPresent || totalUniquePassives < numberDesiredPassives) {
            probability = 0;
        } else if (totalUniquePassives <= maxCapacity) {
            probability = 100;
        } else {
            // Calculate probability using combinatorial logic
            probability = calculateCombination(totalUniquePassives - numberDesiredPassives, maxCapacity - numberDesiredPassives) / calculateCombination(totalUniquePassives, maxCapacity) * 100;
        }

        couple['Probability'] = probability;
    });

    return couplesWithPassives;
}

async function calculateCombination(n, r) {
    return factorial(n) / (factorial(r) * factorial(n - r));
}

async function factorial(number) {
    let factorial = 1;
    for (let i = 2; i <= number; i++) {
        factorial *= i;
    }
    return factorial;
}

async function sortCouples(couplesWithPassives, desiredPassives) {
    couplesWithPassives.sort((a, b) => {
        // Calculate match scores for desired passives for both couples
        const scoreA = calculateMatchScore(a, desiredPassives);
        const scoreB = calculateMatchScore(b, desiredPassives);

        // Sort by the number of matching desired passives
        if (scoreA !== scoreB) {
            return scoreB - scoreA; // Descending order
        }

        // Sort by probability (100 and then descending for others)
        if (a['Probability'] === 100 && b['Probability'] !== 100) {
            return -1;
        } else if (b['Probability'] === 100 && a['Probability'] !== 100) {
            return 1;
        }

        // Finally, sort by descending probabilities
        return b['Probability'] - a['Probability'];
    });
}

async function calculateMatchScore(couple, desiredPassives) {
    const combinedPassives = [...new Set([...couple['parent1']['PassiveSkillList']['values'], ...couple['parent2']['PassiveSkillList']['values']])];
    const matches = combinedPassives.filter(passive => desiredPassives.some(desiredPassive => passive.includes(desiredPassive)));
    return matches.length;
}

async function getPotentialsCouplesForBabyWithPassives(babyName, playerName, passives, inGameDataJson) {
    try {
        const palsProfiles = require("../assets/data/UpdatedPalsData.json");
        console.log(`Calculating potential couples for baby: ${babyName} for player: ${playerName} with passives:`, passives);
        const inGameData = await readFileContent(inGameDataJson); // Make sure this is awaited since it's an async async function
        const potentialParents = await calculatePotentialParents(babyName, palsProfiles);
        console.log(`Found ${potentialParents.length} potential parent couples for ${babyName}`);
        return;
        const couplesInGame = await checkPlayersInGamePalsForCouples(potentialParents, playerName, inGameData);
        console.log(`Found ${couplesInGame.length} couples in game for player: ${playerName}`);
        const couplesWithPassives = await getCouplesWithPassives(couplesInGame, passives, palsProfiles);
        console.log(`Found ${couplesWithPassives.length} couples with specified passives`);
        const couplesProbabilities = await getProbability(couplesWithPassives, passives);
        await sortCouples(couplesProbabilities, passives);
        console.log(`Couples sorted by probabilities and matching passives`);
        return couplesProbabilities;
    } catch (error) {
        console.error('Error calculating potential couples:', error);
        throw error; // Propagate the error to be handled by the caller
    }
}

export default getPotentialsCouplesForBabyWithPassives;
