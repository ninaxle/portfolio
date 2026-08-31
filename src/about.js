// about.js — About page data and grid initialization
import { buildProfileSection, buildAwardsSection, buildFreeTimeSection } from "./main.js";

const profileData = {
  image: "profile-content/pfp.jpeg",
  alt: "a photo of me with my parasol!",
  description: "Nina is a ux/ui designer with a multidisciplinary background, blending a love for aesthetics with a sense of harmony and how things fit together.",
  // tagline: "// I git commit my design files, sing through my vowels, and pixel push until it's right. When I look at a cat, I see a circle and two triangles.",
  experience: [
    {
      // role: "Product Manager @ Radiate (YorkU)",
      description: "In high school choir, I was an alto. For a while, I thought that meant something about my voice. Instead, it meant something about my part. An alto's job is to hold the foundation by bridging the sopranos' melody and holding the harmony together underneath it. Turns out, that's most of what design is. Not every interface needs to sing soprano. Some products are meant to be loud, expressive, and delightful. Others are meant to disappear into the task and let the person get on with their day."
    },
    {
      // role: "User Experience Intern @ Genesys Cloud",
      description: "My experiences shaped three things I believe about design:"
    },
    {
      description: "<u>Empathy and focus come first</u> Before deciding what a product should look or feel like, design decisions should be grounded in knowing whose experience is being shaped, and what they need in this specific moment."
    },
        {
      description: "<u>Form goes with function</u> I don't separate UI from UX. No matter how different the processes, they're both components of the same final experience, and neither one exists in a vacuum."
    },
    {
      description: "<u>Great design is pleasing</u> A designer may have a different idea of a bad interface than the end user does. Pleasing will be defined differently depending on the audience; the goal is to make it pleasing for the people it's for."
    },
    // {
    //   description: "Singing is still part of how I think. Even solo, I think about phrasing and pronunciation the way I think about layout. Design, like a good arrangement, is grounded in intentionality."
    // }

  ]
};

const awardsData = [
  {
    image: "profile-content/rgd.png",
    label: "RGD AWARDS",
    caption: "[1] 1st in UX Design [2] Honourable Mention (AI)"
  },
  {
    image: "profile-content/dubstech.png",
    label: "DUBSTECH",
    caption: "[3] 3rd in Gaming Track"
  },
  {
    image: "profile-content/dsa.png",
    label: "DSA DESN'ATHON",
    caption: "[4] 2nd in Student Leadership [5] 2nd in Sustainability"
  },
  {
    image: "profile-content/wop.svg",
    label: "WALL OF PORTFOLIOS",
    caption: "[6] Portfolio Feature"
  }
];

const freeTimeData = [
  { image: "profile-content/tea.jpg", caption: "At afternoon tea; find the decoden phone case I made!" },
  { image: "profile-content/code.jpg", caption: "Coding! I am familiar with HTML, CSS/Tailwind, and JS." },
  { image: "profile-content/wip.jpg", caption: "Making all kinds of art." },
  { image: "profile-content/frogs.jpg", caption: "Showing off work I am proud of." },
  { image: "profile-content/aqua.jpg", caption: "Admiring sea life at Ripley's Aquarium." },
  { image: "profile-content/emo.jpg", caption: "Listening and belting to emo music." }
];

document.addEventListener("DOMContentLoaded", () => {
  buildProfileSection(profileData, "#profile-section");
  buildAwardsSection(awardsData, "#awards-section");
  buildFreeTimeSection(freeTimeData, "#freetime-section");
});
