/**
 * Curated content and pure logic helpers for The Universe Celebrates Salma
 */

export interface ConstellationStar {
  id: number;
  name: string;
  x: number; // percentage in star map
  y: number; // percentage in star map
  message: string;
  meaning: string;
  color: string;
}

export const CONSTELLATION_STARS: ConstellationStar[] = [
  {
    id: 1,
    name: "Astraea (Radiance)",
    x: 22,
    y: 42,
    message: "Your smile makes ordinary moments brighter.",
    meaning: "A light that gently lifts everyone around you.",
    color: "#F6D69B", // champagne gold
  },
  {
    id: 2,
    name: "Althea (Grace)",
    x: 38,
    y: 24,
    message: "Never stop being your wonderful self.",
    meaning: "Your authenticity is rare and deeply cherished.",
    color: "#E9D5FF", // lavender
  },
  {
    id: 3,
    name: "Lyra (Harmony)",
    x: 52,
    y: 48,
    message: "You deserve beautiful things and endless happiness.",
    meaning: "May peace and abundance walk with you always.",
    color: "#FBCFE8", // soft pastel pink
  },
  {
    id: 4,
    name: "Celeste (Wonder)",
    x: 68,
    y: 26,
    message: "May your dreams find their way to reality.",
    meaning: "Every noble desire in your heart deserves to unfold.",
    color: "#BAE6FD", // celestial cyan
  },
  {
    id: 5,
    name: "Serena (Joy)",
    x: 82,
    y: 54,
    message: "Keep collecting little moments of joy.",
    meaning: "Life is painted in the quiet, sweet everyday memories.",
    color: "#FDE68A", // warm amber star
  },
  {
    id: 6,
    name: "Elysia (Precious)",
    x: 58,
    y: 78,
    message: "The world is better with people like you in it.",
    meaning: "Your presence brings warmth, kindness, and quiet strength.",
    color: "#DDD6FE", // soft purple
  },
];

export const HAPPINESS_MESSAGES: string[] = [
  "You carry a quiet grace that turns ordinary days into poetry.",
  "Remember: the stars don't compete with the darkness; they simply shine. Keep shining.",
  "Your kindness is a ripple that travels further across the world than you will ever know.",
  "You are capable of far more than your doubts could ever persuade you of.",
  "Give yourself permission to pause, take a deep breath, and appreciate how far you have come.",
  "The universe spent billions of years weaving together the atoms that make you so uniquely you.",
  "You don't need to have every answer today. Trust the journey and honor your pace.",
  "Someone out there smiled today simply because they remembered something funny you said.",
  "Peace is not found in an absence of storms, but in knowing your own steady anchor.",
  "Your laughter is contagious and one of the purest gifts to those around you.",
  "May your tea be warm, your book be thrilling, and your heart be light.",
  "Whatever is meant for you will not pass you by; it is already making its way toward you.",
  "Be proud of the quiet battles you fought and won that no one else ever witnessed.",
  "You possess a gentle strength that makes tough days easier to endure.",
  "The world looks a little softer and more hopeful whenever you smile.",
  "Even on cloudy nights, the stars never leave; your inner spark is always there.",
  "You deserve to be celebrated not only on your birthday, but for every ordinary Tuesday you brighten.",
  "May unexpected kindness find you in the most unexpected corners this week.",
  "Your intuition is wise and your heart is good. Trust where they lead you.",
  "You are loved, you are appreciated, and you are worthy of everything wonderful.",
  "Collect sunset moments, warm hugs, sweet memories, and keep them close to your heart.",
  "No matter how big the universe seems, your story holds immense beauty and meaning.",
  "Here is your gentle reminder: you are doing so much better than you give yourself credit for.",
  "Keep believing in the magic of new beginnings and untrodden paths.",
];

export const LETTER_CONTENT = {
  salutation: "Dear Salma,",
  paragraphs: [
    "Today is your day, and I hope it brings you more happiness than you can imagine.",
    "I hope you always find reasons to smile, courage to chase your dreams, and beautiful people who make life a little brighter.",
    "May this new chapter bring unexpected adventures, unforgettable memories, and countless little moments that make you happy.",
    "Never forget how special it is to simply be yourself.",
    "Keep shining, keep smiling, and never stop dreaming.",
    "Wishing you the happiest birthday!",
  ],
  closing: "With lots of good wishes. ❤️",
};

export const TIME_CAPSULE_MESSAGE = {
  title: "A Little Note for Your Future Self",
  subtitle: "Stored in the eternal celestial archives",
  body: [
    "To the future Salma who opens this on another turn of the seasons:",
    "I hope you are looking back at today with a smile, seeing how every step was leading you somewhere meaningful.",
    "I hope your days are filled with warm laughter, quiet peace of mind, and friends who cherish you for exactly who you are.",
    "Never lose the gentle curiosity and warmth that makes your spirit so radiant.",
    "Whatever new horizon you stand before today, step forward with courage. You have everything you need within you.",
  ],
  signoff: "May your future always be as luminous as the night sky. 🌌",
};

export interface GardenFlower {
  id: number;
  name: string;
  type: string;
  petalColor: string;
  glowColor: string;
  message: string;
}

export const GARDEN_FLOWERS: GardenFlower[] = [
  {
    id: 1,
    name: "Starlight Rose",
    type: "Rosa Celestial",
    petalColor: "#F472B6", // Soft rose pink
    glowColor: "rgba(244, 114, 182, 0.4)",
    message: "Your kindness blossoms in ways that make the whole world gentler.",
  },
  {
    id: 2,
    name: "Moonlit Lily",
    type: "Lilium Lunaris",
    petalColor: "#E9D5FF", // Lavender
    glowColor: "rgba(233, 213, 255, 0.4)",
    message: "You possess a graceful calm that soothes even the busiest storms.",
  },
  {
    id: 3,
    name: "Cosmic Orchid",
    type: "Orchis Astra",
    petalColor: "#BAE6FD", // Cyan ice
    glowColor: "rgba(186, 230, 253, 0.4)",
    message: "You are rare, intricate, and meant to thrive in your own radiant light.",
  },
  {
    id: 4,
    name: "Golden Lotus",
    type: "Nelumbo Aureum",
    petalColor: "#FDE68A", // Champagne gold
    glowColor: "rgba(253, 230, 138, 0.5)",
    message: "From every challenge, you rise with even greater wisdom and beauty.",
  },
  {
    id: 5,
    name: "Lavender Starflower",
    type: "Aster Amethyst",
    petalColor: "#C084FC", // Purple violet
    glowColor: "rgba(192, 132, 252, 0.4)",
    message: "May your heart always be surrounded by peace, laughter, and sweet comfort.",
  },
  {
    id: 6,
    name: "Aurora Blossom",
    type: "Flos Aurorae",
    petalColor: "#6EE7B7", // Mint aurora emerald
    glowColor: "rgba(110, 231, 183, 0.4)",
    message: "Every room you enter is filled with colors of hope and sincere joy.",
  },
];

export const LUCKY_STAR_MESSAGES: string[] = [
  "You caught a lucky star! May unexpected blessings and genuine laughter follow you wherever you go, Salma. ✨",
  "A star in your hands: May every door you knock on this year swing open to welcome your brilliance. 🌠",
  "Starlight fortune: You are meant for joyful beginnings and quiet, serene triumphs. Keep dreaming boldly! ✦",
  "Cosmic blessing: May you always find reasons to be proud of your gentle courage and generous heart. 🌟",
  "Celestial favor: The universe promises you warm friendships, memorable journeys, and deep peace this year. 💫",
  "Lucky star prophecy: Great things are aligning silently behind the scenes just for you, Salma! 💖",
];

export const SECRET_CAPSULE_MESSAGE = {
  title: "The Celestial Keepsake Capsule",
  prelude: "Discovered floating in the deep orbit of gratitude",
  message:
    "Salma, in a universe of trillions of galaxies, your existence is the most wonderful coincidence. Thank you for making ordinary days special, for your sincerity, and for the bright energy you share with everyone. Never forget that you are deeply valued, thoroughly admired, and endlessly capable of creating a life full of wonder. Happy Birthday!",
};

export const EASTER_EGG_MESSAGE = {
  badge: "✦ Secret Dimension Unlocked ✦",
  title: "A Hidden Note for Salma's Heart",
  text: "You found the hidden star! Some of the most extraordinary treasures in life are the quiet, unassuming ones that require patience to notice. Just like you, Salma: a rare and luminous spirit whose warmth touches hearts in ways words can barely capture. Keep shining with your signature grace. The cosmos is infinitely richer with you in it! ✨❤️",
};

export const KEEPSAKE_CARD_DATA = {
  recipient: "SALMA",
  occasion: "Celestial Birthday Celebration",
  tagline: "“Among billions of stars, today we celebrate YOU.”",
  quote:
    "May your life always be illuminated with deep joy, genuine love, countless adventures, and dreams that turn into reality. Happy Birthday, Salma!",
  signature: "The Universe Celebrates Salma",
};

/**
 * Pure helper function: Shuffle array without mutating original
 */
export function shuffleArray<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Pure helper function: Get next non-repeating message
 */
export function getNextMessage(
  deck: string[],
  currentIndex: number
): { message: string; nextIndex: number; newDeck: string[] } {
  if (deck.length === 0) {
    const fresh = shuffleArray(HAPPINESS_MESSAGES);
    return {
      message: fresh[0],
      nextIndex: 1,
      newDeck: fresh,
    };
  }

  if (currentIndex >= deck.length) {
    const reshuffled = shuffleArray(HAPPINESS_MESSAGES);
    return {
      message: reshuffled[0],
      nextIndex: 1,
      newDeck: reshuffled,
    };
  }

  return {
    message: deck[currentIndex],
    nextIndex: currentIndex + 1,
    newDeck: deck,
  };
}

/**
 * Pure helper function: Calculate discovered stars percentage
 */
export function calculateConstellationProgress(discoveredIds: number[]): {
  count: number;
  total: number;
  isComplete: boolean;
  percentage: number;
} {
  const unique = new Set(discoveredIds);
  const total = CONSTELLATION_STARS.length;
  const count = unique.size;
  return {
    count,
    total,
    isComplete: count >= total,
    percentage: Math.round((count / total) * 100),
  };
}
