import PalsProfilesStatsAndBreedings from "../assets/data/PalsProfilesStatsAndBreedings";

  const specialCases = {
    //Relaxaurus + Sparkit = Relaxaurus Lux
    "085+007": "085B",
    //Arsox + Broncherry = Kitsun
    "042+086": "061",
    //Direhowl + Gumoss = Maraith
    "026+013": "066",
    //Jormuntide + Shadowbeak = Helzephyr
    "101+107": "097",
    //Helzephyr + Shadowbeak = Cryolinx
    "097+107": "083",
    //Suzaku + Relaxaurus = Astegon
    "102+085": "098",
    //Penking + Bushi = Anubis
    "011+072": "100",
    //Incineram + Maraith = Incineram Noct
    "040+066": "040B",
    //Mau + Pengullet = Mau Cryst
    "024+010": "024B",
    //Vanwyrm + Foxcicle = Vanwyrm Cryst
    "071+057": "071B",
    //Eikthyrdeer + Hangyu = Eikthyrdeer Terra
    "037+032": "037B",
    //Elphidran + Surfent = Elphidran Aqua
    "080+065": "080B",
    //Pyrin + Katress = Pyrin Noct
    "058+075": "058B",
    //Mammorest + Wumpo = Mammorest Cryst
    "090+091": "090B",
    //Mossanda + Grizzbolt = Mossanda Lux
    "033+103": "033B",
    //Dinossom + Rayhound = Dinossom Lux
    "064+060": "064B",
    //Jolthog + Pengullet = Jolthog Cryst
    "012+010": "012B",
    //Frostallion + Helzephyr = Frostallion Noct
    "110+097": "110B",
    //Kingpaca + Reindrix = Kingpaca Cryst
    "089+059": "089B",
    //Lyleen + Menasting = Lyleen Noct
    "104+099": "104B",
    //Leezpunk + Flambelle = Leezpunk Ignis
    "045+070": "045B",
    //Blazehowl + Felbat = Blazehowl Noct
    "084+094": "084B",
    //Robinquill + Fuddler = Robinquill Terra
    "048+022": "048B",
    //Broncherry + Fuack = Broncherry Aqua
    "086+006": "086B",
    //Surfent + Dumud = Surfent Terra
    "065+043": "065B",
    //Gobfin + Rooby = Gobfin Ignis
    "031+009": "031B",
    //Suzaku + Jormuntide = Suzaku Aqua
    "102+101": "102B",
    //Reptyro + Foxcicle = Reptyro Cryst
    "088+057": "088B",
    //Hangyu + Swee = Hangyu Cryst
    "032+053": "032B",
    //Mossanda + Petallia = Lyleen
    "033+087": "104",
    //Vanwyrm + Anubis = Faleris
    "071+100": "105",
    //Mossanda + Rayhound = Grizzbolt
    "033+060": "103",
    //Grizzbolt + Relaxaurus = Orserk
    "103+085": "106",
    //Kitsun + Astegon = Shadowbeak
    "061+098": "107",
    //Bushi + Arsox = Blazehowl
    "072+042": "084",
    // Add more special cases here...
  };
  
  const calculateOffspringPower = (parent1Power, parent2Power) => {
    const averagePower = ((parent1Power + parent2Power ) / 2); // Round to the nearest whole number
    return averagePower;
  };
  
  const findBabyByPower = (offspringPower) => {
    const sortedPals = [...PalsProfilesStatsAndBreedings].sort((a, b) => a.breeding.order - b.breeding.order);
    const eligiblePals = sortedPals.filter(pal => pal.breeding.child_eligible);
  
    if (eligiblePals.length === 0) {
      console.error("No eligible pals available for comparison.");
      return null;
    }
  
    let nearestPals = [];
    let minDiff = Infinity; // Start with the largest possible difference
  
    eligiblePals.forEach(pal => {
      const diff = Math.abs(offspringPower - pal.breeding.rank);
  
      if (diff < minDiff) {
        // Found a closer pal, reset nearestPals and update minDiff
        nearestPals = [pal];
        minDiff = diff;
      } else if (diff === minDiff) {
        // Found another pal with the same minDiff, add to nearestPals
        nearestPals.push(pal);
      }
    });
  
    // Return the pal with the lowest breeding.order
    nearestPals.sort((a, b) => a.breeding.order - b.breeding.order);
    return nearestPals[0];
  
    // Example choice logic: return the first pal from the nearestPals list
    // return nearestPals[0];
  };
  
  
  const findSpecificBreeding = (parent1, parent2) => {
    let possibleBreedings = [];
    
    if (parent1.key === parent2.key) {
      // Directly return the pal corresponding to the parents without any further checks
      const baby = PalsProfilesStatsAndBreedings.find(pal => pal.key === parent1.key);
      if (baby) {
        possibleBreedings.push(baby);
      }
      return possibleBreedings;
    }

    const offspringPower = calculateOffspringPower(parent1.breeding.rank, parent2.breeding.rank);
  
    const specialCaseKey = `${parent1.key}+${parent2.key}`;
    const inverseSpecialCaseKey = `${parent2.key}+${parent1.key}`;
    if (specialCases[specialCaseKey] || specialCases[inverseSpecialCaseKey]) {
      const caseKey = specialCases[specialCaseKey] ? specialCaseKey : inverseSpecialCaseKey;
      const babyKey = specialCases[caseKey];
      const baby = PalsProfilesStatsAndBreedings.find(pal => pal.key === babyKey);
      possibleBreedings.push(baby);
    } else {
      const baby = findBabyByPower(offspringPower);
      if (baby && baby.breeding.child_eligible) {
        possibleBreedings.push(baby);
      } else {
        console.log(`No eligible baby found by power.`);
      }
    }
  
    return possibleBreedings;
  };
  
  const findAllBreedingPossibilities = (pals) => {
    let palsList = [...pals];
    const breedingResults = [];
  
    palsList.forEach((parent1, i) => {
      palsList.forEach((parent2, j) => {
        const babies = findSpecificBreeding(parent1, parent2);
        babies.forEach(baby => {
          if (!breedingResults.find(b => b.key === baby.key)) {
            breedingResults.push(baby);
          }
        });
      });
    });
    return breedingResults;
  };
  
  const findPotentialParentsForPal = (babyKey, pals) => {
    const potentialParents = [];
    const seenPairs = new Set(); // Use a Set to track seen parent pairs
    
    for (let i = 0; i < pals.length; i++) {
      for (let j = 0; j < pals.length; j++) { // Start from i + 1 to avoid comparing a pal with itself
        const parent1 = pals[i];
        const parent2 = pals[j];
        const babies = findSpecificBreeding(parent1, parent2);
        const matchingBaby = babies.find(baby => baby.key === babyKey);
        if (matchingBaby) {
          // Create a string identifier for the pair that is order-independent
          const pairIdentifier = [parent1.key, parent2.key].sort().join('-');
          if (!seenPairs.has(pairIdentifier)) {
            seenPairs.add(pairIdentifier); // Mark this pair as seen
            potentialParents.push({parent1: parent1, parent2: parent2});
          }
        }
      }
    }
    return potentialParents;
  };
  
  export { findSpecificBreeding, findAllBreedingPossibilities, findPotentialParentsForPal };