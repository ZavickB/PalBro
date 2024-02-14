import * as FileSystem from 'expo-file-system';
import { findPotentialParentsForPal } from './BreedingsCalculator';

async function readFileContent(uri) {
    try {
        const content = await FileSystem.readAsStringAsync(uri);
        const jsonData = JSON.parse(content);
        console.log('File content read');
        return jsonData; // Ensure jsonData is returned here
    } catch (error) {
        console.error('Error reading file content:', error);
        throw error; // Rethrow the error to be handled by the caller
    }
}

// async function to get the UID of a player from its name
async function getPlayerUID(playerName, inGameData) {
    console.log('Searching for players UIDS...');
    const playersList = inGameData['players'];
    console.log(`Found ${playersList.length} players in game`);
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
    const playerUID = await getPlayerUID(playerName, inGameData);
    console.log(`Player UID for ${playerName}: ${playerUID}`);
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
async function calculatePotentialParents(babyKey, palsOfficialProfiles) {
    const potentialParents = findPotentialParentsForPal(babyKey, palsOfficialProfiles);
    return potentialParents;
}

async function removeUnbreedableCouples(couples) {
    console.log('Searching for valid couples...');
    return couples.filter(couple => couple['parent1']['Gender'] !== couple['parent2']['Gender']);
}

// async function to check if the potential parents of a baby are captured by the player in the game
async function checkPlayersInGamePalsForCouples(potentialParents, playerName, inGameData) {

    const couplesInGame = [];
    const palsCapturedByPlayer = await getPlayerCapturedPals(playerName, inGameData);

    console.log(`Found ${palsCapturedByPlayer.length} pals captured by player: ${playerName}`);

    // Group captured pals by their dev name for easy access
    const palsGroupedByDevName = {};
    palsCapturedByPlayer.forEach(pal => {
        const devName = pal['CharacterID']; // Assuming 'CharacterID' is the dev name
        if (!palsGroupedByDevName[devName]) {
            palsGroupedByDevName[devName] = [];
        }
        palsGroupedByDevName[devName].push(pal);
    });

    // For each potential parent couple as parent1, parent2
    potentialParents.forEach(couple => {
        const parent1DevName = couple['parent1']['asset'];
        const parent2DevName = couple['parent2']['asset'];

        // Check if both parents are captured by the player
        if (palsGroupedByDevName[parent1DevName] && palsGroupedByDevName[parent2DevName]) {
            // For each instance of parent1 and parent2, create a couple entry
            palsGroupedByDevName[parent1DevName].forEach(parent1Instance => {
                palsGroupedByDevName[parent2DevName].forEach(parent2Instance => {
                    // Here, we also store each parent's name alongside their other details
                    couplesInGame.push({
                        'parent1': {
                            ...parent1Instance, // Spread operator to include all properties of parent1Instance
                            'palData': couple['parent1'] // Explicitly store the name of parent1
                        },
                        'parent2': {
                            ...parent2Instance, // Spread operator to include all properties of parent2Instance
                            'palData': couple['parent2'] // Explicitly store the name of parent2
                        }
                    });
                });
            });
        }
    });


    const validCouples = removeUnbreedableCouples(couplesInGame);
    return validCouples;
}

async function getCouplesWithPassives(couples, passives) {
    const couplesWithPassives = [];
    couples.forEach(couple => {
        // Ensure parent1Passives and parent2Passives are arrays
        const parent1Passives = Array.isArray(couple['parent1']['PassiveSkillList']["values"]) ? couple['parent1']['PassiveSkillList']["values"] : [];
        console.log('Parent 1 passives:', parent1Passives);
        const parent2Passives = Array.isArray(couple['parent2']['PassiveSkillList']["values"]) ? couple['parent2']['PassiveSkillList']["values"] : [];
        console.log('Parent 2 passives:', parent2Passives);

        // The rest of your function remains unchanged
        const matchedPassives = [];

        passives.forEach(passive => {
            let parent1Match = false, parent2Match = false;

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

            if (parent1Match || parent2Match) {
                matchedPassives.push(passive);
            }
        });

        if (matchedPassives.length === passives.length) {
            couplesWithPassives.push(couple);
        }
    });

    return couplesWithPassives;
}

async function getProbability(couplesWithPassives, desiredPassives) {
    const maxCapacity = 4; // Max capacity of a pal is 4

    couplesWithPassives.forEach((couple, index) => {
        console.log(`Processing couple #${index}`);

        // Ensure these arrays are defined outside of any try-catch or conditional scopes
        const parent1Passives = couple['parent1']['PassiveSkillList'] ? couple['parent1']['PassiveSkillList']["values"] : [];
        console.log(`Parent 1 passives:`, couple['parent1']);
        
        const parent2Passives = couple['parent2']['PassiveSkillList'] ? couple['parent2']['PassiveSkillList']["values"] : [];
        console.log(`Parent 2 passives:`, couple['parent2']);

        let combinedUniquePassives = [];
        try {
            combinedUniquePassives = [...new Set([...parent1Passives, ...parent2Passives])];
            console.log(`Combined Unique Passives:`, combinedUniquePassives);
        } catch (error) {
            console.error(`Error combining passives for couple #${index}:`, error);
            // The catch block ensures any errors in combining passives are logged, but doesn't interrupt the flow
        }

        const totalUniquePassives = combinedUniquePassives.length;
        //numberDesiredPassives is the number not empty passives in the desiredPassives array
        const numberDesiredPassives = desiredPassives.filter(passive => passive !== '').length;

        console.log(`Total Unique Passives: ${totalUniquePassives}, Number of Desired Passives: ${numberDesiredPassives}`);

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

async function getPotentialsCouplesForBabyWithPassives(baby, playerName, passives, inGameDataURI) {
    try {
        const palsProfiles = require("../assets/data/palsData.json");
        console.log(`Calculating potential couples for baby: ${baby.name} for player: ${playerName} with passives:`, passives);
        
        const inGameData = await readFileContent(inGameDataURI); 
        if (!inGameData) {
            console.error('Game data is undefined. Check file path and content.');
            return;
        }
        const potentialParents = await calculatePotentialParents(baby.key, palsProfiles);
        console.log(`Found ${potentialParents.length} potential parent couples for ${baby.name}`);
        
        const couplesInGame = await checkPlayersInGamePalsForCouples(potentialParents, playerName, inGameData);
        console.log(`Found ${couplesInGame.length} couples in game for player: ${playerName}`);

        const couplesWithPassives = await getCouplesWithPassives(couplesInGame, passives);
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
