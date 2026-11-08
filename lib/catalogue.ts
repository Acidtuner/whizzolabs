export type Variant = {
  sku: string;
  finish: string;
  colour?: string;
  extra?: string;
};

export type Product = {
  uid: string;
  category: string;
  theme: string;
  style?: string;
  size: string;
  variants: Variant[];
};

export const CATALOGUE: Product[] = [
  {
    uid: "WIZTICTC01_A1",
    category: "A",
    theme: "BASIC BOARD",
    size: 'W5.5"×H5.5"',
    variants: [
      { sku: "WIZTICTC01_A1", finish: "WOODEN" },
      { sku: "WIZTICTC01_A1_C", finish: "ORANGE", extra: "WHITE" },
    ],
  },
  {
    uid: "WIZTICTC01_B1",
    category: "B",
    theme: "DOG",
    size: 'W6"×H6"',
    variants: [
      { sku: "WIZTICTC01_B1", finish: "WOODEN" },
      { sku: "WIZTICTC01_B1_R", finish: "RED" },
    ],
  },
  {
    uid: "WIZTICTC01_B2",
    category: "B",
    theme: "CAT",
    size: 'W5.5"×H6"',
    variants: [
      { sku: "WIZTICTC01_B2", finish: "WOODEN" },
      { sku: "WIZTICTC01_B2_B", finish: "BLUE" },
    ],
  },
  {
    uid: "WIZTICTC01_B3",
    category: "B",
    theme: "PIG",
    size: 'W6"×H6"',
    variants: [
      { sku: "WIZTICTC01_B3", finish: "WOODEN" },
      { sku: "WIZTICTC01_B3_R", finish: "RED" },
    ],
  },
  {
    uid: "WIZTICTC01_C1",
    category: "C",
    theme: "SQUARE ROBO",
    size: 'W6"×H6"',
    variants: [
      { sku: "WIZTICTC01_C1", finish: "WOODEN" },
      { sku: "WIZTICTC01_C1_DB", finish: "DARK BLUE" },
      { sku: "WIZTICTC01_C1_LB", finish: "YELLOW" },
    ],
  },
  {
    uid: "WIZTICTC01_C2",
    category: "C",
    theme: "OVAL ROBO",
    size: 'W6"×H6"',
    variants: [
      { sku: "WIZTICTC01_C2", finish: "WOODEN" },
      { sku: "WIZTICTC01_C2_B", finish: "BLUE" },
      { sku: "WIZTICTC01_C2_Y", finish: "YELLOW" },
    ],
  },
  {
    uid: "WIZTICTC01_D1",
    category: "D",
    theme: "HALLOWEEN",
    style: "STD",
    size: 'W6.5"×H6"',
    variants: [
      { sku: "WIZTICTC01_D1", finish: "WOODEN" },
      { sku: "WIZTICTC01_D1_O", finish: "ORANGE" },
    ],
  },
  {
    uid: "WIZTICTC01_D2_WL",
    category: "D",
    theme: "HALLOWEEN",
    style: "WL",
    size: 'W6.5"×H6.5"',
    variants: [
      { sku: "WIZTICTC01_D2_WL", finish: "WOODEN" },
      { sku: "WIZTICTC01_D2_WL_O", finish: "ORANGE", extra: "GREEN" },
    ],
  },
  {
    uid: "WIZTICTC01_D3_HEX",
    category: "D",
    theme: "HALLOWEEN",
    style: "HEX",
    size: 'W6.5"×H6.3"',
    variants: [
      { sku: "WIZTICTC01_D3_HEX", finish: "WOODEN" },
      { sku: "WIZTICTC01_D3_HEX_O", finish: "ORANGE", extra: "GREEN" },
    ],
  },
  {
    uid: "WIZTICTC01_E1",
    category: "E",
    theme: "OCTOPUS",
    size: 'W6"×H6"',
    variants: [
      { sku: "WIZTICTC01_E1", finish: "WOODEN" },
      { sku: "WIZTICTC01_E1_B", finish: "BLUE" },
    ],
  },
  {
    uid: "WIZTICTC01_E2",
    category: "E",
    theme: "FISH",
    size: 'W6.25"×H5"',
    variants: [
      { sku: "WIZTICTC01_E2", finish: "WOODEN" },
      { sku: "WIZTICTC01_E2_R", finish: "RED" },
    ],
  },
  {
    uid: "WIZTICTC01_E3",
    category: "E",
    theme: "PUFFER FISH",
    size: 'W7"×H5"',
    variants: [
      { sku: "WIZTICTC01_E3", finish: "WOODEN" },
      { sku: "WIZTICTC01_E3_Y", finish: "YELLOW" },
    ],
  },
  {
    uid: "WIZTICTC01_E4",
    category: "E",
    theme: "MANTRAY",
    size: 'W6"×H6.5"',
    variants: [
      { sku: "WIZTICTC01_E4", finish: "WOODEN" },
      { sku: "WIZTICTC01_E4_B", finish: "BLUE" },
    ],
  },
  {
    uid: "WIZTICTC01_E5",
    category: "E",
    theme: "TURTLE",
    size: 'W5.5"×H6"',
    variants: [
      { sku: "WIZTICTC01_E5", finish: "WOODEN" },
      { sku: "WIZTICTC01_E5_B", finish: "BLUE" },
      { sku: "WIZTICTC01_E5_O", finish: "ORANGE" },
    ],
  },
  {
    uid: "WIZTICTC01_E6",
    category: "E",
    theme: "CRAB",
    size: 'W6"×H5.5"',
    variants: [
      { sku: "WIZTICTC01_E6", finish: "WOODEN" },
      { sku: "WIZTICTC01_E6_R", finish: "RED" },
    ],
  },
  {
    uid: "WIZTICTC01_E7",
    category: "E",
    theme: "WHALE",
    size: 'W6.5"×H4.5"',
    variants: [
      { sku: "WIZTICTC01_E7", finish: "WOODEN" },
      { sku: "WIZTICTC01_E7_B", finish: "BLUE" },
    ],
  },
  {
    uid: "WIZTICTC01_F1",
    category: "F",
    theme: "SOLAR SHIP",
    size: 'W7"×H6"',
    variants: [
      { sku: "WIZTICTC01_F1", finish: "WOODEN" },
      { sku: "WIZTICTC01_F1_B", finish: "BLUE" },
    ],
  },
  {
    uid: "WIZTICTC01_F2",
    category: "F",
    theme: "SATURN",
    size: 'W9.5"×H5.5"',
    variants: [
      { sku: "WIZTICTC01_F2", finish: "WOODEN" },
      { sku: "WIZTICTC01_F2_R", finish: "RED" },
    ],
  },
  {
    uid: "WIZTICTC01_G1",
    category: "G",
    theme: "BUS",
    size: 'W6"×H6.25"',
    variants: [
      { sku: "WIZTICTC01_G1", finish: "WOODEN" },
      { sku: "WIZTICTC01_G1_R", finish: "RED" },
    ],
  },
  {
    uid: "WIZTICTC01_G2",
    category: "G",
    theme: "JEEP",
    size: 'W6"×H6"',
    variants: [
      { sku: "WIZTICTC01_G2", finish: "WOODEN" },
      { sku: "WIZTICTC01_G2_B", finish: "BLUE" },
    ],
  },
];

export const TEN_PACK = {
  sku: "WIZTICTC01_10PACK",
  name: "10-Pack Birthday Return Gift",
  price: 2499,
};
