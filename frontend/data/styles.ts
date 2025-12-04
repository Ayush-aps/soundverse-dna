export type StylePreset = {
  id: string;
  title: string;
  description: string;
  mood: string;
  tags: string[];
  imageUrl: string;
  audioUrl: string;
  category: "core" | "signature";
  accent: string;
};

const sharedAudio = "/audio/dubstep.mp3";

export const stylePresets: StylePreset[] = [
  {
    id: "dubstep",
    title: "Dubstep",
    description: "Wobbly, Punchy, Dark, Heavy, Aggressive",
    mood: "Heaving low-end with razor-sharp drops.",
    tags: ["Bass", "Syncopated", "Night"],
    imageUrl: "/music/dubstep.png",
    audioUrl: sharedAudio,
    category: "core",
    accent: "#6949FF",
  },
  {
    id: "bigroom",
    title: "Big Room",
    description: "Anthemic, Energetic",
    mood: "Festival-ready supersaws and open-air leads.",
    tags: ["Festival", "4x4", "Anthem"],
    imageUrl: "/music/bigroom.png",
    audioUrl: sharedAudio,
    category: "core",
    accent: "#F25F5C",
  },
  {
    id: "piano-house",
    title: "Piano House",
    description: "Warm, Melodic",
    mood: "Sun-drenched chords with soulful toplines.",
    tags: ["Keys", "Feel-good", "Groove"],
    imageUrl: "/music/piano.png",
    audioUrl: "/audio/piano.mp3",
    category: "core",
    accent: "#F2B705",
  },
  {
    id: "progressive",
    title: "Progressive House",
    description: "Euphoric, Atmospheric",
    mood: "Slow-building crescendos and lush pads.",
    tags: ["Journey", "Pad-heavy", "Euphoric"],
    imageUrl: "/music/progressive.png",
    audioUrl: sharedAudio,
    category: "core",
    accent: "#3DD6D0",
  },
  {
    id: "folktronica",
    title: "Folktronica",
    description: "Organic, Acoustic",
    mood: "Finger-picked warmth meets glitch microbeats.",
    tags: ["Organic", "Hybrid", "Warm"],
    imageUrl: "/music/folk.png",
    audioUrl: sharedAudio,
    category: "core",
    accent: "#9EE493",
  },
  {
    id: "edm",
    title: "EDM",
    description: "Energetic, Upbeat",
    mood: "Wide stereo leads and hands-up moments.",
    tags: ["Mainstage", "Bright", "Uplift"],
    imageUrl: "/music/edm.png",
    audioUrl: sharedAudio,
    category: "core",
    accent: "#F7A1C4",
  },
  {
    id: "ambient-chop",
    title: "Ambient Chop",
    description: "Airy, Cinematic",
    mood: "Granular textures with orchestral bloom.",
    tags: ["Cinematic", "Slow", "Texture"],
    imageUrl: "/music/progressive.png",
    audioUrl: sharedAudio,
    category: "signature",
    accent: "#B48BFF",
  },
  {
    id: "hyperpop",
    title: "Hyperpop",
    description: "Glossy, Sharp",
    mood: "Detuned glitz with elastic drums.",
    tags: ["Glitch", "Vox chop", "Future"],
    imageUrl: "/music/edm.png",
    audioUrl: sharedAudio,
    category: "signature",
    accent: "#FF85A2",
  },
];
