// about.js — About page data and grid initialization
import { buildProfileSection, buildAwardsSection, buildFreeTimeSection } from "./main.js";

const profileData = {
  image: "pfp.jpeg",
  alt: "Profile picture of Nina Le",
  description: "Nina is a ux/ui designer with a multidisciplinary background, blending a love for aesthetics with a sense of harmony and how things fit together.",
  // tagline: "// I git commit my design files, sing through my vowels, and pixel push until it's right. When I look at a cat, I see a circle and two triangles.",
  experience: [
    {
      role: "Product Manager @ Radiate (YorkU)",
      description: "Led product design and cross-team coordination for the graduate show, overseeing timelines, usability testing, and a scalable design system."
    },
    {
      role: "User Experience Intern @ Genesys Cloud",
      description: "Drove UX research and product strategy for a B2B SaaS platform by analyzing competitor design systems and translating usability insights into a prioritized feature roadmap."
    },
    {
      role: "UX/UI Intern @ Goodself",
      description: "Designed and built a compliant, cross-platform design system and navigation structure from scratch while roadmapping a regulated medical tracking feature."
    },
    {
      role: "Product Design Intern @ Exomis Design + Development",
      description: "Created research-backed user personas and journey maps to inform responsive, cross-device design decisions that improved retention and engagement."
    }
  ]
};

const awardsData = [
  {
    image: "rgd.png",
    label: "RGD AWARDS",
    caption: "[1] 1st in UX Design [2] Honourable Mention (AI)"
  },
  {
    image: "dubstech.png",
    label: "DUBSTECH",
    caption: "[3] 3rd in Gaming Track"
  },
  {
    image: "dsa.png",
    label: "DSA DESN'ATHON",
    caption: "[4] 2nd in Student Leadership [5] 2nd in Sustainability"
  },
  {
    image: "wop.svg",
    label: "WALL OF PORTFOLIOS",
    caption: "[6] Portfolio Feature"
  }
];

const freeTimeData = [
  { image: "tea.jpg", caption: "↑ At afternoon tea; find the decoden phone case I made!" },
  { image: "code.jpg", caption: "↑ Coding! I have been coding with HTML, CSS/Tailwind, and some Javascript. Currently looking into Python..." },
  { image: "wip.jpg", caption: "↑ Making all kinds of art. Pivoting a bit from illustration, I've recently been sculpting mini clay figurines >:)" },
  { image: "frogs.jpg", caption: "↑ Showing off work I am proud of - including the final form of my clay frogs" },
  { image: "aqua.jpg", caption: "↑ Admiring sea life at Ripley's Aquarium" },
  { image: "emo.jpg", caption: "↑ Listening and belting to emo music (I am a great singer, trust)" }
];

document.addEventListener("DOMContentLoaded", () => {
  buildProfileSection(profileData, "#profile-section");
  buildAwardsSection(awardsData, "#awards-section");
  buildFreeTimeSection(freeTimeData, "#freetime-section");
});
