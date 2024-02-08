export const PalsLocation = (palName, nightMode) => {
  const images = {
    "Arsox": {
        day: require('../images/maps/Arsox_Day_Habitat.webp'),
        night: require('../images/maps/Arsox_Night_Habitat.webp'),
    },
    "Astegon": {
        day: require('../images/maps/Astegon_Day_Habitat.webp'),
        night: require('../images/maps/Astegon_Night_Habitat.webp'),
    },
    "Azurobe": {
        day: require('../images/maps/Azurobe_Day_Habitat.webp'),
        night: require('../images/maps/Azurobe_Night_Habitat.webp'),
    },
    "Beakon": {
        day: require('../images/maps/Beakon_Day_Habitat.webp'),
        night: require('../images/maps/Beakon_Night_Habitat.webp'),
    },
    "Beegarde": {
        day: require('../images/maps/Beegarde_Day_Habitat.webp'),
        night: require('../images/maps/Beegarde_Night_Habitat.webp'),
    },
    "Blazamut": {
        day: require('../images/maps/Blazamut_Day_Habitat.webp'),
        night: require('../images/maps/Blazamut_Night_Habitat.webp'),
    },
    "Blazehowl": {
        day: require('../images/maps/Blazehowl_Day_Habitat.webp'),
        night: require('../images/maps/Blazehowl_Night_Habitat.webp'),
    },
    "Blazehowl_Noct": {
        day: null,
        night: require('../images/maps/Blazehowl_Noct_Night_Habitat.webp'),
    },
    "Bristla": {
        day: require('../images/maps/Bristla_Day_Habitat.webp'),
        night: require('../images/maps/Bristla_Night_Habitat.webp'),
    },
    "Broncherry_Aqua": {
        day: require('../images/maps/Broncherry_Aqua_Day_Habitat.webp'),
        night: require('../images/maps/Broncherry_Aqua_Night_Habitat.webp'),
    },
    "Broncherry": {
        day: require('../images/maps/Broncherry_Day_Habitat.webp'),
        night: require('../images/maps/Broncherry_Night_Habitat.webp'),
    },
    "Bushi": {
        day: require('../images/maps/Bushi_Day_Habitat.webp'),
        night: require('../images/maps/Bushi_Night_Habitat.webp'),
    },
    "Caprity": {
        day: require('../images/maps/Caprity_Day_Habitat.webp'),
        night: require('../images/maps/Caprity_Night_Habitat.webp'),
    },
    "Cattiva": {
        day: require('../images/maps/Cattiva_Day_Habitat.webp'),
        night: require('../images/maps/Cattiva_Night_Habitat.webp'),
    },
    "Cawgnito": {
        day: null,
        night: require('../images/maps/Cawgnito_Night_Habitat.webp'),
    },
    "Celaray": {
        day: require('../images/maps/Celaray_Day_Habitat.webp'),
        night: require('../images/maps/Celaray_Night_Habitat.webp'),
    },
    "Chikipi": {
        day: require('../images/maps/Chikipi_Day_Habitat.webp'),
        night: require('../images/maps/Chikipi_Night_Habitat.webp'),
    },
    "Chillet": {
        day: require('../images/maps/Chillet_Day_Habitat.webp'),
        night: require('../images/maps/Chillet_Night_Habitat.webp'),
    },
    "Cinnamoth": {
        day: require('../images/maps/Cinnamoth_Day_Habitat.webp'),
        night: require('../images/maps/Cinnamoth_Night_Habitat.webp'),
    },
    "Cremis": {
        day: require('../images/maps/Cremis_Day_Habitat.webp'),
        night: require('../images/maps/Cremis_Night_Habitat.webp'),
    },
    "Cryolinx": {
        day: require('../images/maps/Cryolinx_Day_Habitat.webp'),
        night: require('../images/maps/Cryolinx_Night_Habitat.webp'),
    },
    "Daedream": {
        day: null,
        night: require('../images/maps/Daedream_Night_Habitat.webp'),
    },
    "Dazzi": {
        day: require('../images/maps/Dazzi_Day_Habitat.webp'),
        night: require('../images/maps/Dazzi_Night_Habitat.webp'),
    },
    "Depresso": {
        day: null,
        night: require('../images/maps/Depresso_Night_Habitat.webp'),
    },
    "Digtoise": {
        day: require('../images/maps/Digtoise_Day_Habitat.webp'),
        night: require('../images/maps/Digtoise_Night_Habitat.webp'),
    },
    "Dinossom": {
        day: require('../images/maps/Dinossom_Day_Habitat.webp'),
        night: require('../images/maps/Dinossom_Night_Habitat.webp'),
    },
    "Dinossom_Lux": {
        day: require('../images/maps/Dinossom_Lux_Day_Habitat.webp'),
        night: require('../images/maps/Dinossom_Lux_Night_Habitat.webp'),
    },
    "Direhowl": {
        day: require('../images/maps/Direhowl_Day_Habitat.webp'),
        night: require('../images/maps/Direhowl_Night_Habitat.webp'),
    },
    "Dumud": {
        day: require('../images/maps/Dumud_Day_Habitat.webp'),
        night: require('../images/maps/Dumud_Night_Habitat.webp'),
    },
    "Eikthyrdeer": {
        day: require('../images/maps/Eikthyrdeer_Day_Habitat.webp'),
        night: require('../images/maps/Eikthyrdeer_Night_Habitat.webp'),
    },
    "Eikthyrdeer_Terra": {
        day: require('../images/maps/Eikthyrdeer_Terra_Day_Habitat.webp'),
        night: require('../images/maps/Eikthyrdeer_Terra_Night_Habitat.webp'),
    },
    "Elizabee": {
        day: require('../images/maps/Elizabee_Day_Habitat.webp'),
        night: require('../images/maps/Elizabee_Night_Habitat.webp'),
    },
    "Elphidran": {
        day: require('../images/maps/Elphidran_Day_Habitat.webp'),
        night: require('../images/maps/Elphidran_Night_Habitat.webp'),
    },
    "Faleris": {
        day: require('../images/maps/Faleris_Day_Habitat.webp'),
        night: require('../images/maps/Faleris_Night_Habitat.webp'),
    },
    "Fenglope": {
        day: require('../images/maps/Fenglope_Day_Habitat.webp'),
        night: require('../images/maps/Fenglope_Night_Habitat.webp'),
    },
    "Flambelle": {
        day: require('../images/maps/Flambelle_Day_Habitat.webp'),
        night: require('../images/maps/Flambelle_Night_Habitat.webp'),
    },
    "Flopie": {
        day: require('../images/maps/Flopie_Day_Habitat.webp'),
        night: require('../images/maps/Flopie_Night_Habitat.webp'),
    },
    "Foxcicle": {
        day: require('../images/maps/Foxcicle_Day_Habitat.webp'),
        night: require('../images/maps/Foxcicle_Night_Habitat.webp'),
    },
    "Foxparks": {
        day: require('../images/maps/Foxparks_Day_Habitat.webp'),
        night: require('../images/maps/Foxparks_Night_Habitat.webp'),
    },
    "Frostallion": {
        day: require('../images/maps/Frostallion_Day_Habitat.webp'),
        night: require('../images/maps/Frostallion_Night_Habitat.webp'),
    },
    "Fuack": {
        day: require('../images/maps/Fuack_Day_Habitat.webp'),
        night: require('../images/maps/Fuack_Night_Habitat.webp'),
    },
    "Fuddler": {
        day: require('../images/maps/Fuddler_Day_Habitat.webp'),
        night: require('../images/maps/Fuddler_Night_Habitat.webp'),
    },
    "Galeclaw": {
        day: require('../images/maps/Galeclaw_Day_Habitat.webp'),
        night: require('../images/maps/Galeclaw_Night_Habitat.webp'),
    },
    "Gobfin": {
        day: require('../images/maps/Gobfin_Day_Habitat.webp'),
        night: require('../images/maps/Gobfin_Night_Habitat.webp'),
    },
    "Gobfin_Ignis": {
        day: require('../images/maps/Gobfin_Ignis_Day_Habitat.webp'),
        night: require('../images/maps/Gobfin_Ignis_Night_Habitat.webp'),
    },
    "Gorirat": {
        day: require('../images/maps/Gorirat_Day_Habitat.webp'),
        night: require('../images/maps/Gorirat_Night_Habitat.webp'),
    },
    "Grintale": {
        day: require('../images/maps/Grintale_Day_Habitat.webp'),
        night: require('../images/maps/Grintale_Night_Habitat.webp'),
    },
    "Grizzbolt": {
        day: require('../images/maps/Grizzbolt_Day_Habitat.webp'),
        night: require('../images/maps/Grizzbolt_Night_Habitat.webp'),
    },
    "Gumoss": {
        day: require('../images/maps/Gumoss_Day_Habitat.webp'),
        night: require('../images/maps/Gumoss_Night_Habitat.webp'),
    },
    "Hangyu_Cryst": {
        day: null,
        night: require('../images/maps/Hangyu_Cryst_Night_Habitat.webp'),
    },
    "Hangyu": {
        day: require('../images/maps/Hangyu_Day_Habitat.webp'),
        night: require('../images/maps/Hangyu_Night_Habitat.webp'),
    },
    "Helzephyr": {
        day: null,
        night: require('../images/maps/Helzephyr_Night_Habitat.webp'),
    },
    "Hoocrates": {
        day: null,
        night: require('../images/maps/Hoocrates_Night_Habitat.webp'),
    },
    "Ice_Kingpaca": {
        day: require('../images/maps/Ice_Kingpaca_Day_Habitat.webp'),
        night: require('../images/maps/Ice_Kingpaca_Night_Habitat.webp'),
    },
    "Incineram": {
        day: require('../images/maps/Incineram_Day_Habitat.webp'),
        night: require('../images/maps/Incineram_Night_Habitat.webp'),
    },
    "Incineram_Noct": {
        day: require('../images/maps/Incineram_Noct_Day_Habitat.webp'),
        night: require('../images/maps/Incineram_Noct_Night_Habitat.webp'),
    },
    "Jetragon": {
        day: require('../images/maps/Jetragon_Day_Habitat.webp'),
        night: require('../images/maps/Jetragon_Night_Habitat.webp'),
    },
    "Jolthog": {
        day: require('../images/maps/Jolthog_Day_Habitat.webp'),
        night: require('../images/maps/Jolthog_Night_Habitat.webp'),
    },
    "Jormuntide": {
        day: require('../images/maps/Jormuntide_Day_Habitat.webp'),
        night: require('../images/maps/Jormuntide_Night_Habitat.webp'),
    },
    "Jormuntide_Ignis": {
        day: require('../images/maps/Jormuntide_Ignis_Day_Habitat.webp'),
        night: require('../images/maps/Jormuntide_Ignis_Night_Habitat.webp'),
    },
    "Katress": {
        day: null,
        night: require('../images/maps/Katress_Night_Habitat.webp'),
    },
    "Kelpsea": {
        day: require('../images/maps/Kelpsea_Day_Habitat.webp'),
        night: require('../images/maps/Kelpsea_Night_Habitat.webp'),
    },
    "Kelpsea_Ignis": {
        day: require('../images/maps/Kelpsea_Ignis_Day_Habitat.webp'),
        night: require('../images/maps/Kelpsea_Ignis_Night_Habitat.webp'),
    },
    "Kingpaca": {
        day: require('../images/maps/Kingpaca_Day_Habitat.webp'),
        night: require('../images/maps/Kingpaca_Night_Habitat.webp'),
    },
    "Kitsun": {
        day: null,
        night: require('../images/maps/Kitsun_Night_Habitat.webp'),
    },
    "Lamball": {
        day: require('../images/maps/Lamball_Day_Habitat.webp'),
        night: require('../images/maps/Lamball_Night_Habitat.webp'),
    },
    "Leezpunk": {
        day: require('../images/maps/Leezpunk_Day_Habitat.webp'),
        night: require('../images/maps/Leezpunk_Night_Habitat.webp'),
    },
    "Leezpunk_Ignis": {
        day: require('../images/maps/Leezpunk_Ignis_Day_Habitat.webp'),
        night: require('../images/maps/Leezpunk_Ignis_Night_Habitat.webp'),
    },
    "Lifmunk": {
        day: require('../images/maps/Lifmunk_Day_Habitat.webp'),
        night: require('../images/maps/Lifmunk_Night_Habitat.webp'),
    },
    "Loupmoon": {
        day: null,
        night: require('../images/maps/Loupmoon_Night_Habitat.webp'),
    },
    "Lovander": {
        day: null,
        night: require('../images/maps/Lovander_Night_Habitat.webp'),
    },
    "Lyleen": {
        day: require('../images/maps/Lyleen_Day_Habitat.webp'),
        night: require('../images/maps/Lyleen_Night_Habitat.webp'),
    },
    "Lyleen_Noct": {
        day: require('../images/maps/Lyleen_Noct_Day_Habitat.webp'),
        night: require('../images/maps/Lyleen_Noct_Night_Habitat.webp'),
    },
    "Mammorest_Cryst": {
        day: require('../images/maps/Mammorest_Cryst_Day_Habitat.webp'),
        night: require('../images/maps/Mammorest_Cryst_Night_Habitat.webp'),
    },
    "Mammorest": {
        day: require('../images/maps/Mammorest_Day_Habitat.webp'),
        night: require('../images/maps/Mammorest_Night_Habitat.webp'),
    },
    "Maraith": {
        day: null,
        night: require('../images/maps/Maraith_Night_Habitat.webp'),
    },
    "Mau_Cryst": {
        day: require('../images/maps/Mau_Cryst_Day_Habitat.webp'),
        night: require('../images/maps/Mau_Cryst_Night_Habitat.webp'),
    },
    "Melpaca": {
        day: require('../images/maps/Melpaca_Day_Habitat.webp'),
        night: require('../images/maps/Melpaca_Night_Habitat.webp'),
    },
    "Menasting": {
        day: require('../images/maps/Menasting_Day_Habitat.webp'),
        night: require('../images/maps/Menasting_Night_Habitat.webp'),
    },
    "Mossanda": {
        day: require('../images/maps/Mossanda_Day_Habitat.webp'),
        night: require('../images/maps/Mossanda_Night_Habitat.webp'),
    },
    "Mossanda_Lux": {
        day: require('../images/maps/Mossanda_Lux_Day_Habitat.webp'),
        night: require('../images/maps/Mossanda_Lux_Night_Habitat.webp'),
    },
    "Mozzarina": {
        day: require('../images/maps/Mozzarina_Day_Habitat.webp'),
        night: require('../images/maps/Mozzarina_Night_Habitat.webp'),
    },
    "Necromus": {
        day: require('../images/maps/Necromus_Day_Habitat.webp'),
        night: require('../images/maps/Necromus_Night_Habitat.webp'),
    },
    "Nitewing": {
        day: require('../images/maps/Nitewing_Day_Habitat.webp'),
        night: require('../images/maps/Nitewing_Night_Habitat.webp'),
    },
    "Nox": {
        day: null,
        night: require('../images/maps/Nox_Night_Habitat.webp'),
    },
    "Orserk": {
        day: require('../images/maps/Orserk_Day_Habitat.webp'),
        night: require('../images/maps/Orserk_Night_Habitat.webp'),
    },
    "Paladius": {
        day: require('../images/maps/Paladius_Day_Habitat.webp'),
        night: require('../images/maps/Paladius_Night_Habitat.webp'),
    },
    "Pengullet": {
        day: require('../images/maps/Pengullet_Day_Habitat.webp'),
        night: require('../images/maps/Pengullet_Night_Habitat.webp'),
    },
    "Penking": {
        day: require('../images/maps/Penking_Day_Habitat.webp'),
        night: require('../images/maps/Penking_Night_Habitat.webp'),
    },
    "Petallia": {
        day: require('../images/maps/Petallia_Day_Habitat.webp'),
        night: require('../images/maps/Petallia_Night_Habitat.webp'),
    },
    "Pyrin": {
        day: require('../images/maps/Pyrin_Day_Habitat.webp'),
        night: require('../images/maps/Pyrin_Night_Habitat.webp'),
    },
    "Pyrin_Noct": {
        day: null,
        night: require('../images/maps/Pyrin_Noct_Night_Habitat.webp'),
    },
    "Quivern": {
        day: require('../images/maps/Quivern_Day_Habitat.webp'),
        night: require('../images/maps/Quivern_Night_Habitat.webp'),
    },
    "Ragnahawk": {
        day: require('../images/maps/Ragnahawk_Day_Habitat.webp'),
        night: require('../images/maps/Ragnahawk_Night_Habitat.webp'),
    },
    "Rayhound": {
        day: require('../images/maps/Rayhound_Day_Habitat.webp'),
        night: require('../images/maps/Rayhound_Night_Habitat.webp'),
    },
    "Reindrix": {
        day: require('../images/maps/Reindrix_Day_Habitat.webp'),
        night: require('../images/maps/Reindrix_Night_Habitat.webp'),
    },
    "Relaxaurus": {
        day: require('../images/maps/Relaxaurus_Day_Habitat.webp'),
        night: require('../images/maps/Relaxaurus_Night_Habitat.webp'),
    },
    "Reptyro": {
        day: require('../images/maps/Reptyro_Day_Habitat.webp'),
        night: require('../images/maps/Reptyro_Night_Habitat.webp'),
    },
    "Ribbuny": {
        day: require('../images/maps/Ribbuny_Day_Habitat.webp'),
        night: require('../images/maps/Ribbuny_Night_Habitat.webp'),
    },
    "Robinquill": {
        day: require('../images/maps/Robinquill_Day_Habitat.webp'),
        night: require('../images/maps/Robinquill_Night_Habitat.webp'),
    },
    "Robinquill_Terra": {
        day: require('../images/maps/Robinquill_Terra_Day_Habitat.webp'),
        night: require('../images/maps/Robinquill_Terra_Night_Habitat.webp'),
    },
    "Rooby": {
        day: require('../images/maps/Rooby_Day_Habitat.webp'),
        night: require('../images/maps/Rooby_Night_Habitat.webp'),
    },
    "Rushoar": {
        day: require('../images/maps/Rushoar_Day_Habitat.webp'),
        night: require('../images/maps/Rushoar_Night_Habitat.webp'),
    },
    "Shadowbeak": {
        day: require('../images/maps/Shadowbeak_Day_Habitat.webp'),
        night: require('../images/maps/Shadowbeak_Night_Habitat.webp'),
    },
    "Sibelyx": {
        day: require('../images/maps/Sibelyx_Day_Habitat.webp'),
        night: require('../images/maps/Sibelyx_Night_Habitat.webp'),
    },
    "Sparkit": {
        day: require('../images/maps/Sparkit_Day_Habitat.webp'),
        night: require('../images/maps/Sparkit_Night_Habitat.webp'),
    },
    "Surfent": {
        day: require('../images/maps/Surfent_Day_Habitat.webp'),
        night: require('../images/maps/Surfent_Night_Habitat.webp'),
    },
    "Surfent_Terra": {
        day: require('../images/maps/Surfent_Terra_Day_Habitat.webp'),
        night: require('../images/maps/Surfent_Terra_Night_Habitat.webp'),
    },
    "Suzaku": {
        day: require('../images/maps/Suzaku_Day_Habitat.webp'),
        night: require('../images/maps/Suzaku_Night_Habitat.webp'),
    },
    "Sweepa": {
        day: require('../images/maps/Sweepa_Day_Habitat.webp'),
        night: require('../images/maps/Sweepa_Night_Habitat.webp'),
    },
    "Swee": {
        day: require('../images/maps/Swee_Day_Habitat.webp'),
        night: require('../images/maps/Swee_Night_Habitat.webp'),
    },
    "Tanzee": {
        day: require('../images/maps/Tanzee_Day_Habitat.webp'),
        night: require('../images/maps/Tanzee_Night_Habitat.webp'),
    },
    "Teafant": {
        day: require('../images/maps/Teafant_Day_Habitat.webp'),
        night: require('../images/maps/Teafant_Night_Habitat.webp'),
    },
    "Tocotoco": {
        day: require('../images/maps/Tocotoco_Day_Habitat.webp'),
        night: require('../images/maps/Tocotoco_Night_Habitat.webp'),
    },
    "Tombat": {
        day: null,
        night: require('../images/maps/Tombat_Night_Habitat.webp'),
    },
    "Univolt": {
        day: require('../images/maps/Univolt_Day_Habitat.webp'),
        night: require('../images/maps/Univolt_Night_Habitat.webp'),
    },
    "Vaelet": {
        day: require('../images/maps/Vaelet_Day_Habitat.webp'),
        night: require('../images/maps/Vaelet_Night_Habitat.webp'),
    },
    "Vanwyrm_Cryst": {
        day: null,
        night: require('../images/maps/Vanwyrm_Cryst_Night_Habitat.webp'),
    },
    "Vanwyrm": {
        day: require('../images/maps/Vanwyrm_Day_Habitat.webp'),
        night: require('../images/maps/Vanwyrm_Night_Habitat.webp'),
    },
    "Verdash": {
        day: require('../images/maps/Verdash_Day_Habitat.webp'),
        night: require('../images/maps/Verdash_Night_Habitat.webp'),
    },
    "Vixy": {
        day: require('../images/maps/Vixy_Day_Habitat.webp'),
        night: require('../images/maps/Vixy_Night_Habitat.webp'),
    },
    "Warsect": {
        day: require('../images/maps/Warsect_Day_Habitat.webp'),
        night: require('../images/maps/Warsect_Night_Habitat.webp'),
    },
    "Wixen": {
        day: require('../images/maps/Wixen_Day_Habitat.webp'),
        night: require('../images/maps/Wixen_Night_Habitat.webp'),
    },
    "Woolipop": {
        day: require('../images/maps/Woolipop_Day_Habitat.webp'),
        night: require('../images/maps/Woolipop_Night_Habitat.webp'),
    },
    "Wumpo_Botan": {
        day: require('../images/maps/Wumpo_Botan_Day_Habitat.webp'),
        night: require('../images/maps/Wumpo_Botan_Night_Habitat.webp'),
    },
    "Wumpo": {
        day: require('../images/maps/Wumpo_Day_Habitat.webp'),
        night: require('../images/maps/Wumpo_Night_Habitat.webp'),
    },
  };

  defaultImage = require('../images/maps/WorldMap-1024.png');

  // Check if the palName exists in the images object
  if (images[palName]) {
    // Determine whether to use the day or night image based on nightMode
    const selectedImage = nightMode ? images[palName].night : images[palName].day;
    
    // If the selectedImage is null (or any falsy value like undefined), return the defaultImage
    return selectedImage 
  } else {
    // If the palName does not exist in the images object, return the defaultImage
    return defaultImage;
  }
};
