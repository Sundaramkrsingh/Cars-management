export const progressionSummaryConfig = {
  heading: "Progression summary",
  subHeading: "8 more sessions for s16",
  progress: 40,
  description: "Total prog.",
  stats: [
    { title: "Max streak", value: "25 days" },
    { title: "Total prog.", value: "62%" },
    { title: "Attempted", value: "92 Qs" },
  ],
}

export const performanceSummaryConfig = {
  heading: "Performance summary",
  subHeading: "Get to 90% accuracy for G8",
  progress: 70,
  description: "Current Accuracy",
  stats: [
    { title: "Net score", value: "6,34,678" },
    { title: "Percentile", value: "Top 56" },
    { title: "Accuracy", value: "76%" },
  ],
}

export const strengthWeaknessConfig = {
  heading: "Tier 2",
  subHeading: "Strengths & Weaknesses",
  info: "info",
  strength: [
    { progress: 90, label: "Social Competency", value: "60,564" },
    { progress: 75, label: "Personal Efficiency", value: "58,467" },
    { progress: 60, label: "Peripheral Literacy", value: "32,008" },
    { progress: 90, label: "Social Competency", value: "60,564" },
    { progress: 75, label: "Personal Efficiency", value: "58,467" },
    { progress: 60, label: "Peripheral Literacy", value: "32,008" },
  ],
  weakness: [
    { progress: 55, label: "Functional Acumen", value: "60,564" },
    { progress: 45, label: "Value Dimensions", value: "58,467" },
    { progress: 25, label: "Strengths Compass", value: "32,008" },
    { progress: 55, label: "Functional Acumen", value: "60,564" },
    { progress: 45, label: "Value Dimensions", value: "58,467" },
    { progress: 25, label: "Strengths Compass", value: "32,008" },
  ],
}

export const competenciesGradesCardConfig = {
  heading: "Tier 3",
  subHeading: "Competencies & Grades",
  info: "info",
  competenceInfo: [
    {
      title: "Grade 8 (Above 90%)",
      data: [
        { label: "Networking Skills", variant: "green" },
        { label: "Networking Skills", variant: "yellow" },
        { label: "Contextual Vocabulary", variant: "blue" },
        { label: "Probability & Statistic", variant: "green" },
        { label: "Contextual Vocabulary", variant: "yellow" },
        { label: "Probability & Statistic", variant: "blue" },
      ],
    },
    {
      title: "Grade 7 (70 -90%)",
      data: [
        { label: "Combinatorics", variant: "blue" },
        { label: "Artistic Expression", variant: "red" },
        { label: "Antonyms & Synonyms", variant: "green" },
        { label: "Contextual Vocabulary", variant: "blue" },
        { label: "Playfulness & Humor", variant: "yellow" },
      ],
    },
    {
      title: "Grade 6 (50 -70%)",
      data: [
        { label: "Combinatorics", variant: "blue" },
        { label: "Artistic Expression", variant: "red" },
        { label: "Antonyms & Synonyms", variant: "green" },
        { label: "Contextual Vocabulary", variant: "blue" },
        { label: "Playfulness & Humor", variant: "yellow" },
      ],
    },
    {
      title: "Grade 5 (50 -70%)",
      data: [
        { label: "Combinatorics", variant: "blue" },
        { label: "Artistic Expression", variant: "red" },
        { label: "Antonyms & Synonyms", variant: "green" },
        { label: "Contextual Vocabulary", variant: "blue" },
        { label: "Playfulness & Humor", variant: "yellow" },
      ],
    },
    {
      title: "Grade 4 (50 -70%)",
      data: [
        { label: "Combinatorics", variant: "blue" },
        { label: "Artistic Expression", variant: "red" },
        { label: "Antonyms & Synonyms", variant: "green" },
        { label: "Contextual Vocabulary", variant: "blue" },
        { label: "Playfulness & Humor", variant: "yellow" },
      ],
    },
  ],
}

export const facetsScoreCardConfig = {
  heading: "Tier 1",
  subHeading: "FACETS Score",
  info: "info",
  facetsScoreGraphConfig: {
    labels: [
      "G2, FLAIR",
      "G6, ASSET",
      "G3, CRAFT",
      "G7, EXTRA",
      "G6, TRAIT",
      "G8, SKILL",
    ],
    datasets: [
      {
        label: "Score",
        data: [7, 5, 5, 6, 9, 6],
        backgroundColor: "rgba(135,220,205,0.2)",
        borderColor: "rgba(135,220,205,1)",
        borderWidth: 1,
      },
    ],
  },
}

export const drawerHeadings = {
  tier1: "What is Tier 1 ?",
  tier2: "What is Tier 2 ?",
  tier3: "What is Tier 3 ?",
  progression: "Progression summary",
  performance: "Performance summary",
}

export const drawerSubHeadings = {
  tier1:
    "Few words FACETS, maybe analogy about tier 1 is stream , tier 2 is subjects and tier 3 is subjects",
  tier2:
    "Maybe connect with tier 2 and say . We could also use an analogy ie tier 1 is stream , tier 2 is subjects and tier 3 is subjects",
  tier3: "Tier 3 content",
  progression:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  performance:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
}

export const drawerContent = {
  tier1: {
    title: "FACETS Score",
    description: "Shows which grade you are in each FACET tier",
  },
  tier2: {
    title: "Strengths & Weaknesses",
    description:
      "Shows total score you achieved for each tier 2 elements in the assessments",
  },
  tier3: {
    title: "Competencies & Grades",
    description:
      "Shows total score you achieved for each tier 3 elements in the assessments",
  },
  progression: {
    data: [
      {
        title: "Max Streak",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
      },
      {
        title: "Total Progression",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
      },
      {
        title: "Attempted Qs",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
      },
      {
        title: "Stage Levels",
        table: {
          header: ["Stage", "Stage Name", "No. of Session"],
          tableData: [
            {
              stage: "S01",
              stageName: "Base",
              sessions: "5(1×5)",
            },
            {
              stage: "S11-S16",
              stageName: "Leap",
              sessions: "90(6×15)",
            },
            {
              stage: "S21-S26",
              stageName: "Rise",
              sessions: "90(6×15)",
            },
            {
              stage: "S31-S36",
              stageName: "Soar",
              sessions: "90(6×15)",
            },
            {
              stage: "S41-S46",
              stageName: "Peak",
              sessions: "90(6×15)",
            },
          ],
        },
      },
    ],
  },
  performance: {
    data: [
      {
        title: "Net score",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
      },
      {
        title: "Percentile",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
      },
      {
        title: "Accuracy",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
      },
      {
        title: "Grade Level",
        table: {
          header: ["Level", "Grade Name", "Score in %"],
          tableData: [
            { level: "G1", grade: "Seeker", score: "Below 30%" },
            { level: "G2", grade: "Habile", score: "30% - 50%" },
            { level: "G3", grade: "Adroit", score: "50% - 60%" },
            { level: "G4", grade: "Maven", score: "60% - 70%" },
            { level: "G5", grade: "Wizard", score: "70% - 80%" },
            { level: "G6", grade: "Prodigy", score: "80% - 90%" },
            { level: "G7", grade: "Genius", score: "90% - 95%" },
            { level: "G8", grade: "Legend", score: "Above 95%" },
          ],
        },
      },
    ],
  },
}
