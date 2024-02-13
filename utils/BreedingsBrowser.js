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
    // Calculate the average of the parents' breeding powers
    return Math.round((parent1Power + parent2Power) / 2); // Round to the nearest whole number
};
  
const findBabyByPower = (offspringPower) => {
    // Find the pal with the nearest breeding power to the offspring power
    const sortedPals = PalsProfilesStatsAndBreedings.sort((a, b) => Math.abs(offspringPower - a.breeding.rank) - Math.abs(offspringPower - b.breeding.rank));
    return sortedPals[0];
};
  

const findPossibleBreedings = (parent1, parent2) => {
  const parent1Power = parent1.breeding.rank;
  const parent2Power = parent2.breeding.rank;
  const offspringPower = calculateOffspringPower(parent1Power, parent2Power);
  let possibleBreedings = [];

  // Check if there's a special case for the given parents
  const specialCaseKey = `${parent1.key}+${parent2.key}`;
  const inverseSpecialCaseKey = `${parent2.key}+${parent1.key}`;
  if (specialCases[specialCaseKey] || specialCases[inverseSpecialCaseKey]) {
    // If there's a special case, find the baby based on the special case
    const caseKey = specialCases[specialCaseKey] ? specialCaseKey : inverseSpecialCaseKey;
    const babyKey = specialCases[caseKey];
    const baby = PalsProfilesStatsAndBreedings.find(pal => pal.key === babyKey);
    possibleBreedings.push(baby);
  } else {
    // If no special case, find the baby based on the calculated breeding power
    const baby = findBabyByPower(offspringPower, PalsProfilesStatsAndBreedings);
    console.log('Baby:', baby);
    if (baby && baby.breeding.child_eligible) { // Check if the baby is child eligible
      possibleBreedings.push(baby);
    }
  }

  return possibleBreedings;
};


export { findPossibleBreedings };