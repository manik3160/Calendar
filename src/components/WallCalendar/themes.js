export const THEMES = [
  {
    monthIndex: 0,
    accent: "#87CEEB",
    accentDim: "#4682B4",
    title: "The Frost Cycle",
    subtitle: "Phase 1: Clear mind, icy determination. Beginnings.",
    imgAlt: "icy frozen landscape with geometric blue shapes"
  },
  {
    monthIndex: 1,
    accent: "#DDA0DD",
    accentDim: "#BA55D3",
    title: "The Crystal Dawn",
    subtitle: "Phase 2: Reflective growth and internal momentum.",
    imgAlt: "amethyst crystals glowing in dawn light"
  },
  {
    monthIndex: 2,
    accent: "#98FB98",
    accentDim: "#3CB371",
    title: "The Emerald Sprout",
    subtitle: "Phase 3: Vitality and emergent possibilities.",
    imgAlt: "vibrant abstract emerald leaves unfolding"
  },
  {
    monthIndex: 3,
    accent: "#FFD700",
    accentDim: "#DAA520",
    title: "The Sunstone Epoch",
    subtitle: "Phase 4: Golden clarity and warming focus.",
    imgAlt: "golden sunstones scattered on a dark surface"
  },
  {
    monthIndex: 4,
    accent: "#50C878",
    accentDim: "#2E8B57",
    title: "The Verdant Shift",
    subtitle: "Phase 5: Deep roots and expansive growth.",
    imgAlt: "deep jade and malachite fluid patterns"
  },
  {
    monthIndex: 5,
    accent: "#FF7F50",
    accentDim: "#FF4500",
    title: "The Coral Horizon",
    subtitle: "Phase 6: High energy and boundless momentum.",
    imgAlt: "glowing coral formations in deep obsidian water"
  },
  {
    monthIndex: 6,
    accent: "#1E90FF",
    accentDim: "#0000CD",
    title: "The Azure Flow",
    subtitle: "Phase 7: Fluid adaptability and vast depths.",
    imgAlt: "deep ocean abyss with bioluminescent blue glows"
  },
  {
    monthIndex: 7,
    accent: "#F4A460",
    accentDim: "#D2691E",
    title: "The Saffron Ascent",
    subtitle: "Phase 8: Late summer warmth and steadfast progress.",
    imgAlt: "abstract saffron dust across dark cracked stone"
  },
  {
    monthIndex: 8,
    accent: "#DC143C",
    accentDim: "#8B0000",
    title: "The Ruby Harvest",
    subtitle: "Phase 9: Gathering strength and rich rewards.",
    imgAlt: "ruby red geometric prisms"
  },
  {
    monthIndex: 9,
    accent: "#ba9eff",
    accentDim: "#8455ef",
    title: "The Obsidian Cycle",
    subtitle: "Phase 10: Deep focus and alignment. Structured exploration within the void.",
    imgAlt: "moody cinematic landscape of dark volcanic peaks under a starry night sky with purple nebulae"
  },
  {
    monthIndex: 10,
    accent: "#FFBF00",
    accentDim: "#B8860B",
    title: "The Amber Glow",
    subtitle: "Phase 11: Preserved energy and grounded wisdom.",
    imgAlt: "liquid amber flowing through dark volcanic rock"
  },
  {
    monthIndex: 11,
    accent: "#C0C0C0",
    accentDim: "#808080",
    title: "The Silver Zenith",
    subtitle: "Phase 12: Reflection, rest, and stark clarity.",
    imgAlt: "silver metallic liquid pools on black marble"
  }
];

export const getThemeForMonth = (month) => {
  return THEMES[month % 12];
};
