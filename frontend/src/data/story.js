// =====================================================================
//  ADI'S JOURNEY — EMERALD VERSION
//  STORY CONTENT FILE
//  Every line Adi says, every badge, every dex entry, every stat lives
//  here. Edit wording freely — nothing else in the app needs to change.
// =====================================================================

export const META = {
  title: "ADI'S JOURNEY",
  version: "EMERALD VERSION",
  tagline: "A true story, played on a Game Boy Advance",
  author: "ADI SHARMA",
  links: [
    { label: "LINKEDIN", url: "https://www.linkedin.com/in/adi-sharma-6a492b272/" },
    { label: "GITHUB", url: "https://github.com/adisharma200606-star" },
  ],
};

// ---------------------------------------------------------------------
// COLD OPEN — the quote this whole game answers (BoJack-style monologue)
// ---------------------------------------------------------------------
export const COLD_OPEN = {
  quote: [
    "You only owe your life to two people in this world.",
    "One is your 80-year-old self. Toothless, but full of wisdom.",
    "The other is your 8-year-old self. Toothless, but full of excitement.",
    "Open every door your 8-year-old wanted to walk through.",
    "Finish everything your 80-year-old wanted to start.",
  ],
  attribution: "the rule I play by",
  close: [
    "One door is still opening.",
    "This is the story of every door so far.",
    "Told on a Game Boy Advance — because the 8-year-old wouldn't accept anything else.",
  ],
};

export const PLAYER = {
  name: "ADI",
  sprite: "adi",
  blurb: "Decision Science undergrad. Can name every Pokémon.",
};

export const TYPE_COLORS = {
  NORMAL: "#a8a090",
  DRAMA: "#e07aa8",
  FIGHT: "#c0563b",
  SPORT: "#4f9e4f",
  WORD: "#e8b84b",
  MUSIC: "#c43a5a",
  MIND: "#8a6fd0",
  IRON: "#7a8794",
  TECH: "#3aa87a",
  DATA: "#4a7fd6",
  CODE: "#3fbfbf",
  SHADOW: "#4a4a5a",
};

// ---------------------------------------------------------------------
// PROLOGUE — Bangalore, age 9
// ---------------------------------------------------------------------
export const PROLOGUE_LINES = [
  "This is a true story.",
  "Bangalore, India. The year a nine-year-old boy steps off a train with his family.",
  "He's the new kid. His English? Not fluent yet. Not even close.",
  "At school, words fly past him like a flock of Taillow.",
  "So he does the only thing a kid like him knows how to do.",
  "He starts collecting them.",
  "Every new word gets caught, written down, and used in a real conversation — like an entry in a Pokédex.",
  "The Pokédex fills up. Sentence by sentence. Fight by fight.",
  "Years later, that habit grows a name: writing. It will ship 3,000+ scripts and 3,000,000+ views.",
  "But no trainer starts alone. Every journey needs starters…",
];

// ---------------------------------------------------------------------
// STARTERS — the interests that start everything
// ---------------------------------------------------------------------
export const STARTERS = [
  {
    id: "movies",
    name: "CINEMUNCH",
    from: "MOVIES",
    type: "DRAMA",
    sprite: "reel",
    dexId: "dex-cinema",
    desc: "Raised on a thousand films. Learned story before it learned grammar.",
    evolves: "Evolves into: scriptwriter at AdHoc Productions · Editor of REVEIL Magazine",
  },
  {
    id: "wwe",
    name: "SLAMTRO",
    from: "WWE",
    type: "FIGHT",
    sprite: "slam",
    dexId: "dex-wwe",
    desc: "Grew up on Monday night promos. Believes the mic is a weapon.",
    evolves: "Evolves into: Arcathon PR – 2nd · Vistas PR – 2nd · Dissente Debate – 3rd",
  },
  {
    id: "football",
    name: "GOALEAF",
    from: "FOOTBALL",
    type: "SPORT",
    sprite: "striker",
    dexId: "dex-football",
    desc: "A box-to-box midfielder of the mind. Never stops running.",
    evolves: "Evolves into: 20+ UGC creators coordinated like a title-winning squad",
  },
];

// ---------------------------------------------------------------------
// EVOLUTION LINES — the interests evolve as he does
// Stage 1: gym 1 · Stage 2: gyms 2-3 · Stage 3: Elite Road + Champion
// ---------------------------------------------------------------------
export const EVOLUTIONS = {
  movies: [
    { name: "CINEMUNCH", sprite: "reel", dexId: "dex-cinema", stage: 1, blurb: "Watches everything. Learns story before grammar." },
    { name: "SCREENSAGE", sprite: "screensage", dexId: "dex-screensage", stage: 2, blurb: "Projects the whole film before the first frame is shot." },
    { name: "PREMIEREON", sprite: "premiereon", dexId: "dex-premiereon", stage: 3, blurb: "The auteur. Every frame, on purpose." },
  ],
  wwe: [
    { name: "SLAMTRO", sprite: "slam", dexId: "dex-wwe", stage: 1, blurb: "Promos before bed. Mic is a weapon." },
    { name: "MASKARADO", sprite: "maskarado", dexId: "dex-maskarado", stage: 2, blurb: "The mask got heavier. So did the mic work." },
    { name: "GRANDSLAMM", sprite: "grandslamm", dexId: "dex-grandslamm", stage: 3, blurb: "The main event. Undefeated in story." },
  ],
  football: [
    { name: "GOALEAF", sprite: "striker", dexId: "dex-football", stage: 1, blurb: "Box-to-box. Never stops running." },
    { name: "STRIKEROO", sprite: "strikerroo", dexId: "dex-strikerroo", stage: 2, blurb: "First touch learned under pressure." },
    { name: "GOLDENBOOT", sprite: "goldenboot", dexId: "dex-goldenboot", stage: 3, blurb: "The captain. Golden because the reps were." },
  ],
};

// ---------------------------------------------------------------------
// INTERESTS — the places that show who he is off the résumé.
// Each one is a scene on the map; finishing it recruits a party member.
// The first (his room) is the opening scene of every new game.
// ---------------------------------------------------------------------
export const INTERESTS = [
  {
    id: "bedroom",
    place: "ADI'S ROOM",
    opening: true,
    bg: "bedroom",
    playerSprite: "adi_guitar",
    companion: { name: "RIFFLING", sprite: "riffling", type: "MUSIC", blurb: "the guitar companion" },
    lines: [
      "Tonight. A bedroom, a practice amp, a guitar that's seen better strings.",
      "ADI is playing. Nirvana first — it's always Nirvana first.",
      "Then the Eagles, when the night slows down. Guns N' Roses, when it doesn't.",
      "Nobody's listening. That's kind of the point.",
      "Before any gym, any badge, any pitch — this is who he is when no one's watching.",
    ],
    after: "To understand how he got here, we have to go back. Way back…",
    minigame: { kind: "riff", target: 9, bonusDex: "dex-riff-bonus", bonusName: "FIRST TAKE" },
    dex: ["dex-guitar", "dex-riffling"],
  },
  {
    id: "library",
    place: "THE LIBRARY",
    bg: "library",
    companion: { name: "ATOMITE", sprite: "atomite", type: "MIND", blurb: "the reading companion" },
    lines: [
      "THE LIBRARY. Quiet. His kind of quiet.",
      "He reads because the kid who once collected words never really stopped.",
      "One book rewired more than the rest: ATOMIC HABITS.",
      "Small habits. Compounding. 1% better, every single day.",
      "He didn't just highlight it. He built an app out of it — BITBYBIT.",
      "Some people read to escape. He reads to build.",
    ],
    dex: ["dex-atomic-habits", "dex-atomite", "dex-true-crime", "dex-fun-7"],
  },
  {
    id: "pitch",
    place: "THE RIGHT WING",
    bg: "pitch",
    companion: { name: "REDWING", sprite: "redwing", type: "SPORT", blurb: "the football companion" },
    lines: [
      "THE PITCH. Right touchline. His touchline.",
      "He plays RIGHT WING. Hug the line, beat your man, whip it in.",
      "And he's a MANCHESTER UNITED fan. Through the highs. Through the… many lows.",
      "Supporting United teaches you the hardest skill in football: showing up anyway.",
      "Playing on the wing teaches you the second: one good cross can change the whole game.",
    ],
    minigame: { kind: "cross", target: 3, bonusDex: "dex-cross-bonus", bonusName: "FAR-POST HEADER" },
    dex: ["dex-right-wing", "dex-man-utd", "dex-redwing", "dex-fun-8"],
  },
  {
    id: "tthall",
    place: "TT HALL",
    bg: "tthall",
    companion: { name: "PADDLEPIP", sprite: "paddlepip", type: "SPORT", blurb: "the table tennis companion" },
    lines: [
      "THE TT HALL. Plock. Plock. Plock.",
      "Table tennis — he plays it actively. Not for a league. Not for a ranking.",
      "Just for the rally. Reflexes, spin, and the joy of getting one more ball back.",
      "He doesn't follow the pros. He just really, really likes winning the point.",
    ],
    minigame: { kind: "pong", target: 6, bonusDex: "dex-rally-bonus", bonusName: "LONG RALLY" },
    dex: ["dex-table-tennis", "dex-paddlepip", "dex-fun-9"],
  },
  {
    id: "irongym",
    place: "THE IRON GYM",
    bg: "irongym",
    companion: { name: "IRONCUB", sprite: "ironcub", type: "IRON", blurb: "the training companion" },
    lines: [
      "THE IRON GYM. Early. Chalk in the air.",
      "He trains to become better. To make himself proud.",
      "To build a physique he can genuinely love — and grow with.",
      "No shortcuts. Rep by rep. Bit by bit, again.",
      "The plan: once he's built a body he respects, move on to BOXING and CALISTHENICS.",
      "Every other gym in this game hands out a badge. This one gives him nothing but the work. He comes back anyway.",
    ],
    minigame: { kind: "reps", target: 6, bonusDex: "dex-reps-bonus", bonusName: "PERSONAL BEST" },
    dex: ["dex-training", "dex-boxing-goal", "dex-ironcub", "dex-fun-10"],
  },
  {
    id: "workbench",
    place: "THE WORKBENCH",
    bg: "workbench",
    companion: { name: "SOLDERBUG", sprite: "solderbug", type: "TECH", blurb: "the tinkering companion" },
    lines: [
      "THE WORKBENCH. Screws everywhere. Something is definitely open.",
      "He geeks out. On everything.",
      "He's swapped the PCB of a mechanical keyboard himself — if you can open it, you can understand it.",
      "Late nights go to deep learning: how a network actually learns, not just that it does.",
      "And he collects fun facts the way he once collected words. Ask him about wombats. Actually — block out an hour first.",
    ],
    dex: ["dex-keyboard-pcb", "dex-deep-learning", "dex-solderbug", "dex-fun-facts"],
  },
];

// ---------------------------------------------------------------------
// CHAPTERS — 3 gyms (internships) → 2 elites (projects) → champion
// ---------------------------------------------------------------------
export const CHAPTERS = [
  {
    id: "airlearn",
    kind: "gym",
    index: 1,
    town: "AIRLEARN CITY",
    route: "Route 101 · the flagship gym",
    card: "CHAPTER ONE · 3,000 SCRIPTS",
    company: "Airlearn",
    role: "Content & Operations Intern",
    fact: "3,000+ scripts · 20+ UGC creators · 3,000,000+ views · built & pitched Synapse",
    opponent: {
      name: "GRAMMARLOT",
      title: "The Script Wyrm",
      sprite: "grammarlot",
      type: "WORD",
      level: 18,
    },
    badge: { name: "SYNAPSE BADGE", color: "#3fbfbf" },
    intro: [
      "Before this: GREENROOM NOW. First internship ever — first real scripts, for TANISHQ and CAMPUS SHOES.",
      "Now: AIRLEARN CITY. A language-learning app with millions of learners.",
      "Content & Operations: scripts feeding 20+ UGC creators across the world.",
      "This gym is where the Pokédex habit becomes an industry.",
    ],
    setback: {
      move: "MANUAL LABOR",
      playerHp: 18,
      lines: [
        "The workflow: scripts written in Docs, pasted into Sheets, chased over chat.",
        "Scripts get lost. Creators wait. Deadlines slip.",
        "He only spots the gap after doing it the hard way. Thousands of times.",
      ],
    },
    lesson: {
      move: "SYNAPSE BUILD",
      playerHp: 74,
      lines: [
        "Every repeated pain is a product waiting to exist.",
        "He builds SYNAPSE — Python, Streamlit, Google APIs. A script pipeline that doesn't forget.",
      ],
    },
    hailMary: {
      move: "CGO PITCH",
      lines: [
        "He walks up to the CHIEF GROWTH OFFICER and pitches it himself.",
        "Approved for live deployment.",
        "3,000+ scripts shipped. 3,000,000+ views across the pipeline.",
      ],
    },
    outro: [
      "SYNAPSE BADGE GET!",
      "Lesson 1: if the process hurts, fix the process. Then tell the CGO.",
    ],
    lessonLog: {
      what: "I ran a broken manual workflow for weeks before fixing it — the gap was visible much earlier.",
      why: "Fix the process, not just the task. Then pitch it upward.",
    },
    dex: ["dex-bangalore", "dex-reveil", "dex-adhoc", "dex-greenroom", "dex-python", "dex-claude-api", "dex-synapse", "dex-3m-views"],
  },
  {
    id: "livlive",
    kind: "gym",
    index: 2,
    town: "LIVLIVE TOWN",
    route: "Route 102 · no map provided",
    card: "CHAPTER TWO · DAY ONE",
    company: "LivLive",
    role: "Founders' Office — Growth & Partnerships",
    fact: "9 of 10 clients in week one · the firing that taught the most",
    opponent: {
      name: "CROWDWING",
      title: "Keeper of Empty Rooms",
      sprite: "crowdwing",
      type: "NORMAL",
      level: 27,
    },
    badge: { name: "FOUNDER'S BADGE", color: "#e8913a" },
    intro: [
      "LIVLIVE TOWN. Founders' Office — Growth & Partnerships.",
      "An Entrepreneur-First-backed event-tech startup. One founder. One him. Zero playbook.",
      "High pace. High pressure. From day one.",
    ],
    setback: {
      move: "DAY ONE",
      playerHp: 14,
      lines: [
        "He wasn't ready for it. Not even close.",
        "A month in, the founder sat him down and showed him the gap.",
        "For lack of a better word: fired.",
      ],
    },
    lesson: {
      move: "GRATITUDE",
      playerHp: 76,
      lines: [
        "The founder gave him the most valuable thing anyone gave him that year: the truth about how much he has to grow.",
        "He's grateful for it. Genuinely.",
      ],
    },
    hailMary: {
      move: "DOOR BREAKER",
      lines: [
        "But the week before the exit still counts: 9 out of 10 clients pitched — onboarded.",
        "The work was never the problem. The readiness was.",
        "Now he knows the difference.",
      ],
    },
    outro: [
      "FOUNDER'S BADGE GET!",
      "Lesson 2: getting fired can be the best mentorship you never signed up for.",
    ],
    lessonLog: {
      what: "Walked into the highest-pressure room of my life not ready for day one — and got fired for it.",
      why: "The founder showed me how much I have to grow. Grateful always.",
    },
    dex: ["dex-figma", "dex-fest-head", "dex-arcathon", "dex-nine-of-ten", "dex-party", "dex-founder-truth"],
  },
  {
    id: "musigma",
    kind: "gym",
    index: 3,
    town: "SIGMA SUMMIT",
    route: "Route 103 · the final gym",
    card: "CHAPTER THREE · THE METHOD",
    company: "Mu Sigma",
    role: "Decision Sciences Apprentice",
    fact: "Oil & gas EDA · SCQA segmentation for a pharma client",
    opponent: {
      name: "QUBITOR",
      title: "The Framework",
      sprite: "qubitor",
      type: "DATA",
      level: 45,
    },
    badge: { name: "AOP BADGE", color: "#4a7fd6" },
    intro: [
      "On the road here: FLASH.CO. A Reddit scraper + Claude API engine he wired himself drove 50,000+ views.",
      "SIGMA SUMMIT. The final gym. Decision Sciences Apprentice.",
      "An oil & gas client. Maintenance logs, equipment records, reservoir data.",
    ],
    setback: {
      move: "PARADIGM SHIFT",
      playerHp: 24,
      lines: [
        "Reactivate or plug-and-abandon? Decisions on idle wells worth millions.",
        "The answer doesn't live in vibes. He tries vibes first anyway.",
        "The framework humbles him fast.",
      ],
    },
    lesson: {
      move: "METHOD M",
      playerHp: 77,
      lines: [
        "The Art of Problem Solving: hygiene, exploration, modeling. Discipline over improvisation.",
        "The same discipline the nine-year-old needed for English. Full circle.",
      ],
    },
    hailMary: {
      move: "SCQA STRIKE",
      lines: [
        "He segments healthcare professionals for a pharmaceutical client using SCQA.",
        "Situation. Complication. Question. Answer.",
        "His oldest move — storytelling — lands in the data world.",
      ],
    },
    outro: [
      "AOP BADGE GET!",
      "Lesson 3: every skill you grind early finds a boss fight later.",
      "All three badges. The gate to the ELITE ROAD creaks open…",
    ],
    lessonLog: {
      what: "Tried to shortcut a rigorous framework with instinct.",
      why: "Method scales where instinct stalls.",
    },
    dex: ["dex-flash", "dex-davinci", "dex-prompt-eng", "dex-50k-views", "dex-scqa", "dex-ml", "dex-gpa"],
  },

  // -------------------- ELITE FOUR — the projects --------------------
  {
    id: "consigliere",
    kind: "elite",
    index: 4,
    town: "ELITE ROAD · I",
    route: "Victory Road · no clients, no permission needed",
    card: "CHAPTER FOUR · THE NOTCH",
    company: "Consigliere — Notch-Native Mac Assistant",
    role: "Solo build · Swift & SwiftUI, directed with Claude Code",
    fact: "First commit → daily use in 7 days · 116 automated tests in CI",
    opponent: {
      name: "NOTCHLING",
      title: "The First Ship",
      sprite: "notchling",
      type: "CODE",
      level: 50,
    },
    badge: { name: "NOTCH BADGE", color: "#2a2a3a" },
    intro: [
      "ELITE ROAD, BATTLE 1. No internships this time. This one is just his.",
      "CONSIGLIERE — a Mac assistant that lives in the notch. Swift. SwiftUI.",
      "He has never written either. The compiler does not care about his internships.",
    ],
    setback: {
      move: "GREEN CODE",
      playerHp: 26,
      lines: [
        "Native development is a different beast. Xcode errors pile up like stale scrolls.",
        "Seven days sounds fast. The nights are not.",
      ],
    },
    lesson: {
      move: "SPEC FIRST",
      playerHp: 78,
      lines: [
        "He stops learning Swift first and writes the spec first instead — product rules, then code.",
        "Directed end-to-end with CLAUDE CODE. Direction is a skill too.",
      ],
    },
    hailMary: {
      move: "DAILY DRIVER",
      lines: [
        "First commit to daily use in SEVEN DAYS.",
        "116 automated tests running in CI. It lives in his menu bar now.",
      ],
    },
    outro: [
      "NOTCH BADGE GET!",
      "He didn't wait to be a Swift developer. He shipped like one.",
    ],
    lessonLog: {
      what: "Charged into native Swift with zero experience; the compiler humbled me fast.",
      why: "Write the spec first. Direction is a skill.",
    },
    dex: ["dex-claude-code", "dex-swift", "dex-116-tests"],
  },
  {
    id: "bitbybit",
    kind: "elite",
    index: 5,
    town: "ELITE ROAD · II",
    route: "Victory Road · the loop",
    card: "CHAPTER FIVE · TINY BITS",
    company: "BitByBit — Knight-Themed Life OS",
    role: "Solo build · React, Firebase, Claude API",
    fact: "Habit app grounded in the Fogg Behavior Model & Atomic Habits",
    opponent: {
      name: "BITKNIGHT",
      title: "The Loop",
      sprite: "bitknight",
      type: "CODE",
      level: 51,
    },
    badge: { name: "HABIT BADGE", color: "#4f9e4f" },
    intro: [
      "ELITE ROAD, BATTLE 2. BITBYBIT — a habit-breaking Life OS.",
      "The blueprint came off a library shelf: ATOMIC HABITS. Plus the Fogg Behavior Model.",
      "Off the clock, the data side kept growing too: a gun-violence forecast (8.7% MAPE) and a birth-ratio ML study flagged publishable.",
    ],
    setback: {
      move: "OWN BOSS FIGHT",
      playerHp: 28,
      lines: [
        "He is building a habit app while dodging his own bad habits.",
        "The irony hits like a super-effective move.",
      ],
    },
    lesson: {
      move: "TINY BITS",
      playerHp: 79,
      lines: [
        "Product design, development, go-to-market — all solo, all at once.",
        "The only way through: break it into tiny bits. The app's name is the strategy.",
      ],
    },
    hailMary: {
      move: "VERCEL DROP",
      lines: [
        "Deployed on Vercel. On its way to a full launch.",
        "A habit app, built habit by habit.",
      ],
    },
    outro: [
      "HABIT BADGE GET!",
      "Tiny bits beat grand plans. Every time.",
      "Two elites down. Behind the last door: something without a sprite at all…",
    ],
    lessonLog: {
      what: "Building a habit app while dodging my own bad habits.",
      why: "Tiny bits beat grand plans.",
    },
    dex: ["dex-react", "dex-firebase", "dex-loaded", "dex-coldstar", "dex-forecasting", "dex-mape", "dex-history"],
  },

  // -------------------- CHAMPION --------------------
  {
    id: "champion",
    kind: "champion",
    index: 6,
    town: "THE CHAMPION'S ROOM",
    route: "final boss · unseen until now",
    card: "FINAL CHAPTER · THE DOUBT",
    company: "The Doubt",
    role: "It has been in every battle so far.",
    fact: "You are playing the final blow.",
    opponent: {
      name: "THE DOUBT",
      title: "the fear of getting stuck",
      sprite: "doubt",
      type: "SHADOW",
      level: 60,
    },
    badge: { name: "CHAMPION'S CROWN", color: "#e8b84b" },
    intro: [
      "The door to the CHAMPION opens. No gym. No client. No professor.",
      "The final opponent steps into the light…",
      "It's the FINAL EVOLUTION of your own starter. It wears YOUR face.",
      "THE DOUBT saved its truest shape for last: you, fully evolved.",
    ],
    setback: {
      move: "STUCK FOREVER",
      playerHp: 15,
      lines: [
        "It hits with his own voice.",
        "'You'll never reach your true potential.'",
        "'Everything you ship is just proof of how far away you still are.'",
      ],
    },
    lesson: {
      move: "CONTROL",
      playerHp: 83,
      lines: [
        "But control was never going to be given. It gets built — script by script, spec by spec, deploy by deploy.",
        "Every badge on the shelf is proof he took it back.",
        "And somewhere along the way, pride stopped being a destination. It started showing up unannounced.",
      ],
    },
    hailMary: {
      move: "LEARNER FOREVER",
      lines: [
        "But you can't lose a mirror match by being someone else.",
        "So he answers the only way he knows how — he keeps building, keeps learning.",
        "An 8-bit world. Six chapters, six side quests. One whole person.",
        "The game you are playing right now is the final blow. SUPER EFFECTIVE.",
      ],
    },
    outro: [
      "THE DOUBT fainted.",
      "I'm the 9-year-old who stepped off the train. And I'm so happy he did things when things were hard.",
      "On to the HALL OF FAME.",
    ],
    lessonLog: {
      what: "I almost told this story in a slide deck. The Doubt almost convinced me I'd get stuck.",
      why: "Control gets built, not given. Learner forever.",
    },
    dex: ["dex-pokemon-1028", "dex-this-game", "dex-control", "dex-learner", "dex-proud"],
  },
];

// ---------------------------------------------------------------------
// ADI-DEX — collectible entries, unlocked as the journey progresses
// ---------------------------------------------------------------------
const DEX_BASE = [
  { id: "dex-bangalore", cat: "CITY", name: "BANGALORE", desc: "Where the story starts: a new kid, not yet fluent in English." },
  { id: "dex-pokedex-habit", cat: "POKÉDEX", name: "THE WORD DEX", desc: "The habit that started everything: catching English words like Pokémon until sentences evolved." },
  { id: "dex-pokemon-1028", cat: "POKÉDEX", name: "EVERY POKÉMON", desc: "He can name every single one. Ask him. He will answer." },
  { id: "dex-reveil", cat: "CLUB", name: "REVEIL MAGAZINE", desc: "Editor. Words as an editor hit different." },
  { id: "dex-adhoc", cat: "CLUB", name: "ADHOC PRODUCTIONS", desc: "Scriptwriter for campus stage — the first battle arena." },
  { id: "dex-python", cat: "SKILL", name: "PYTHON", desc: "The workhorse: Synapse, scrapers, ML pipelines, forecasts." },
  { id: "dex-claude-api", cat: "SKILL", name: "CLAUDE API", desc: "Content engine fuel: Reddit scraper → Claude → Sheets → views." },
  { id: "dex-synapse", cat: "MILESTONE", name: "SYNAPSE", desc: "Script-management platform pitched to the CGO and deployed live." },
  { id: "dex-3m-views", cat: "MILESTONE", name: "3,000,000+", desc: "Views across the content pipeline from 3,000+ shipped scripts." },
  { id: "dex-figma", cat: "SKILL", name: "FIGMA", desc: "Where product thinking gets its skeletons." },
  { id: "dex-fest-head", cat: "CLUB", name: "EVENT HEAD ×2", desc: "Product Development Event Head, Analyiate · Stage Rounds Head, Insightix." },
  { id: "dex-arcathon", cat: "CLUB", name: "PODIUM COLLECTION", desc: "Arcathon PR – 2nd · Vistas PR – 2nd · Dissente Debate – 3rd." },
  { id: "dex-nine-of-ten", cat: "MILESTONE", name: "9 OF 10", desc: "Clients converted in week one at LivLive." },
  { id: "dex-davinci", cat: "SKILL", name: "DAVINCI RESOLVE", desc: "AI product demo videos, cut and shipped for GTM." },
  { id: "dex-prompt-eng", cat: "SKILL", name: "PROMPT ENGINEERING", desc: "Treating models like Pokémon: know the type matchups." },
  { id: "dex-50k-views", cat: "MILESTONE", name: "50,000+", desc: "Views driven at Flash.co with a scraper-engine combo." },
  { id: "dex-scqa", cat: "SKILL", name: "SCQA", desc: "Situation, Complication, Question, Answer — storytelling in consulting armor." },
  { id: "dex-ml", cat: "SKILL", name: "MACHINE LEARNING", desc: "Three-model pipelines. Random Forest is the starter evolution." },
  { id: "dex-gpa", cat: "MILESTONE", name: "DECISION SCIENCE", desc: "BBA in Decision Science, CHRIST University." },
  { id: "dex-guitar", cat: "INTEREST", name: "GUITAR", desc: "Nirvana, the Eagles, Guns N' Roses. Practice amp, audience of one, and that's the point." },
  { id: "dex-true-crime", cat: "INTEREST", name: "TRUE CRIME", desc: "Case files as bedtime stories. Pattern recognition training, technically." },
  { id: "dex-history", cat: "INTEREST", name: "HISTORY", desc: "200+ countries of context behind every dataset." },
  { id: "dex-claude-code", cat: "SKILL", name: "CLAUDE CODE", desc: "Directed Consigliere spec-first, first commit to daily use in 7 days." },
  { id: "dex-swift", cat: "SKILL", name: "SWIFT/SWIFTUI", desc: "Learned under fire. 116 tests in CI now guard it." },
  { id: "dex-116-tests", cat: "MILESTONE", name: "116 TESTS", desc: "Automated tests in CI for a notch app nobody asked for. He uses it daily." },
  { id: "dex-react", cat: "SKILL", name: "REACT", desc: "BitByBit, this game, half his GitHub." },
  { id: "dex-firebase", cat: "SKILL", name: "FIREBASE", desc: "BitByBit's backbone — habits need memory." },
  { id: "dex-forecasting", cat: "SKILL", name: "TIME SERIES", desc: "239,677 incidents later, forecasting with humility." },
  { id: "dex-mape", cat: "MILESTONE", name: "8.7% MAPE", desc: "Policy-grade accuracy. Submitted for publication." },
  { id: "dex-this-game", cat: "MILESTONE", name: "THIS GAME", desc: "Story, sprites, chiptunes and code. A résumé you can play." },
  { id: "dex-control", cat: "THEME", name: "CONTROL", desc: "The most sought-after thing in my life. One day it belongs entirely to me — something of my own, every decision mine." },
  { id: "dex-learner", cat: "THEME", name: "LEARNER FOREVER", desc: "Unrivaled under heaven, my version: so human, so approachable, good at everything, still learning." },
  { id: "dex-proud", cat: "THEME", name: "PRIDE, UNANNOUNCED", desc: "At some point along the way, pride stopped being a destination and started showing up unannounced." },
  { id: "dex-party", cat: "PEOPLE", name: "THE PARTY", desc: "The girlfriend and friends who push when I can't push myself." },
  { id: "dex-founder-truth", cat: "PEOPLE", name: "THE FOUNDER'S GIFT", desc: "The truth about how much I have to grow — delivered on day one. Grateful always." },
  { id: "dex-fun-facts", cat: "TRAIT", name: "FUN FACT MACHINE", desc: "Name any topic. I have a fact. Vending machines, sharks, wombat geometry — try me." },
  { id: "dex-screensage", cat: "EVOLUTION", name: "SCREENSAGE", desc: "CINEMUNCH, stage 2. Projects the whole film before the first frame is shot." },
  { id: "dex-premiereon", cat: "EVOLUTION", name: "PREMIEREON", desc: "The auteur — CINEMUNCH's final form. Every frame, on purpose." },
  { id: "dex-maskarado", cat: "EVOLUTION", name: "MASKARADO", desc: "SLAMTRO, stage 2. The mask got heavier. So did the mic work." },
  { id: "dex-grandslamm", cat: "EVOLUTION", name: "GRANDSLAMM", desc: "The main event — SLAMTRO's final form. Undefeated in story." },
  { id: "dex-strikerroo", cat: "EVOLUTION", name: "STRIKEROO", desc: "GOALEAF, stage 2. First touch learned under pressure." },
  { id: "dex-goldenboot", cat: "EVOLUTION", name: "GOLDENBOOT", desc: "The captain — GOALEAF's final form. Golden because the reps were." },
  { id: "dex-greenroom", cat: "SIDE QUEST", name: "GREENROOM NOW", desc: "First internship. Influencer scripts for Tanishq & Campus Shoes. First drafts bled red ink — research fixed them." },
  { id: "dex-flash", cat: "SIDE QUEST", name: "FLASH.CO", desc: "Growth Marketing Intern. Reddit scraper + Claude API engine → 50,000+ views for heybuffy.com." },
  { id: "dex-loaded", cat: "SIDE QUEST", name: "LOADED AND LETHAL", desc: "239,677 US gun-violence incidents (2013–2018) forecast at 8.7% MAPE. Submitted for publication." },
  { id: "dex-coldstar", cat: "SIDE QUEST", name: "BORN UNDER A COLD STAR", desc: "Male birth sex ratios, 9,513 observations, 200+ countries. Random Forest 77.14%. Flagged publishable." },
  { id: "dex-riffling", cat: "PARTY", name: "RIFFLING", desc: "The guitar companion. Grunge hair, loud heart. Shows up every night the day was too much." },
  { id: "dex-atomic-habits", cat: "BOOK", name: "ATOMIC HABITS", desc: "The book that rewired him — and the blueprint for BitByBit. 1% better, compounding." },
  { id: "dex-atomite", cat: "PARTY", name: "ATOMITE", desc: "The reading companion. A book that became a knight that became an app." },
  { id: "dex-right-wing", cat: "INTEREST", name: "RIGHT WING", desc: "His position. Hug the line, beat your man, one good cross changes the game." },
  { id: "dex-man-utd", cat: "INTEREST", name: "MANCHESTER UNITED", desc: "A fan through everything. Always will be. Teaches the hardest skill in football: showing up anyway." },
  { id: "dex-redwing", cat: "PARTY", name: "REDWING", desc: "The football companion. A red devil who lives on the right flank." },
  { id: "dex-table-tennis", cat: "INTEREST", name: "TABLE TENNIS", desc: "Played actively, followed never. It's about the rally, not the rankings." },
  { id: "dex-paddlepip", cat: "PARTY", name: "PADDLEPIP", desc: "The table tennis companion. Fastest reflexes in the party." },
  { id: "dex-training", cat: "INTEREST", name: "TRAINING", desc: "To become better. To make himself proud. A physique he can genuinely love and grow with." },
  { id: "dex-boxing-goal", cat: "GOAL", name: "BOXING & CALISTHENICS", desc: "Next on the list, once he's built a body he respects. Unlock pending." },
  { id: "dex-ironcub", cat: "PARTY", name: "IRONCUB", desc: "The training companion. Hand wraps on, already eyeing the heavy bag." },
  { id: "dex-keyboard-pcb", cat: "TINKER", name: "KEYBOARD SURGERY", desc: "Swapped a mechanical keyboard's PCB himself. If it opens, he'll open it." },
  { id: "dex-deep-learning", cat: "TINKER", name: "DEEP LEARNING", desc: "Late nights spent on how networks actually learn — not just that they do." },
  { id: "dex-solderbug", cat: "PARTY", name: "SOLDERBUG", desc: "The tinkering companion. Circuit-board shell, soldering-iron antenna, infinite curiosity." },
  { id: "dex-riff-bonus", cat: "BONUS", name: "FIRST TAKE", desc: "You played the riff with him and nailed it. Nirvana would approve. Probably." },
  { id: "dex-rally-bonus", cat: "BONUS", name: "LONG RALLY", desc: "Six-plus returns against PADDLEPIP. He'd want a rematch immediately." },
  { id: "dex-cross-bonus", cat: "BONUS", name: "FAR-POST HEADER", desc: "Three crosses whipped in from the right, three headers home. That's the job description." },
  { id: "dex-reps-bonus", cat: "BONUS", name: "PERSONAL BEST", desc: "Curls to pull-ups to the heavy bag in twelve seconds. The long version is still in progress." },
  { id: "dex-cinema", cat: "INTEREST", name: "CINEMA", desc: "Starter #1. A thousand films before a thousand sentences." },
  { id: "dex-wwe", cat: "INTEREST", name: "WWE", desc: "Starter #2. Promos taught him pitch cadence before any course did." },
  { id: "dex-football", cat: "INTEREST", name: "FOOTBALL", desc: "Starter #3. Fitness, tactics and never blaming the midfielder." },
];

// ---------------------------------------------------------------------
// HALL OF FAME
// ---------------------------------------------------------------------
export const HALL_STATS = [
  { label: "VIEWS SHIPPED", value: "3,000,000+" },
  { label: "SCRIPTS WRITTEN", value: "3,000+" },
  { label: "UGC CREATORS LED", value: "20+" },
  { label: "CLIENTS IN WEEK ONE", value: "9/10" },
  { label: "VIEWS DRIVEN (FLASH.CO)", value: "50,000+" },
  { label: "INCIDENTS ANALYZED", value: "239,677" },
  { label: "FORECAST ERROR (MAPE)", value: "8.7%" },
  { label: "RANDOM FOREST ACCURACY", value: "77.14%" },
  { label: "TESTS IN CI", value: "116" },
  { label: "SPEC → DAILY USE", value: "7 DAYS" },
  { label: "POKÉMON NAMED", value: "ALL OF THEM" },
  { label: "CLUB, FOREVER", value: "MAN UTD" },
  { label: "BANDS ON REPEAT", value: "NIRVANA · EAGLES · GN'R" },
];

export const WEAKNESSES = {
  title: "WHAT I'M STILL BAD AT",
  sub: "a save file you're allowed to read",
  items: [
    "Speaking slowly. I run at 1.5x when I'm excited.",
    "Resting without guilt.",
    "Reading the docs before building. I build, then read, then rebuild.",
    "Letting go of control.",
    "Endings. (Working on it — see below.)",
  ],
};

export const FUN_FACTS = [
  "Did you know? Vending machines kill more people per year than sharks do.",
  "Did you know? Sharks existed before trees did.",
  "Did you know? Wombats poop in cubes.",
  "Did you know? There are more possible chess games than atoms in the observable universe.",
  "Did you know? Honey never spoils — archaeologists found 3,000-year-old edible honey.",
  "Did you know? Octopuses have three hearts and blue blood.",
  "Did you know? The Eiffel Tower grows about 15 cm taller in summer.",
  "Did you know? Bananas are radioactive — you'd need ten million at once to get radiation poisoning.",
  "Did you know? A day on Venus is longer than its year.",
  "Did you know? Sea otters hold hands while they sleep so they don't drift apart.",
];

export const FUN_FACT_DEX = FUN_FACTS.map((f, i) => ({
  id: `dex-fun-${i + 1}`,
  cat: "FUN FACT",
  name: `FUN FACT #${i + 1}`,
  desc: f,
}));

export const DEX = [
  ...DEX_BASE,
  ...FUN_FACT_DEX,
];

export const HALL_MENTORS = {
  title: "THE PARTY",
  lines: [
    "My girlfriend and my friends — who pushed me when I couldn't push myself.",
    "The LivLive founder — who showed me exactly how much I have to grow, on day one. Fired me, politely. Taught me everything.",
    "Every mentor in the movies I love: the harsh ones, the kind ones, the ones who believed first.",
  ],
};

export const HALL_EPILOGUE = {
  title: "EPILOGUE · THE TWO PEOPLE",
  lines: [
    "You only owe your life to two people: your 8-year-old self, full of excitement. Your 80-year-old self, full of wisdom.",
    "This game is the doors opened so far.",
    "One door is still opening. It doesn't have a name yet — he'll know it when he walks through it.",
    "Learner forever.",
  ],
};

export const LETS_TALK = {
  title: "LET'S TALK",
  lines: [
    "Most people send a résumé. I sent a save file.",
    "The badges are what I've done. The party — the guitar, the books, the right wing, the iron, the workbench — is who I am.",
    "If any of this felt like someone you'd want on your team, I'd love to hear from you.",
  ],
  sign: "— ADI SHARMA · adisharma200606@gmail.com",
  email: "adisharma200606@gmail.com",
};
