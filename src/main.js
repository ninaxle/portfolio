// Unified card creation function
function createCards(sectionSelector, cardsData, isBrandSection = false) {
  const cardsSection = document.querySelector(sectionSelector);
  if (!cardsSection) {
    console.error(`Cards section not found: ${sectionSelector}`);
    return;
  }

  const fragment = document.createDocumentFragment();


  cardsData.forEach((card, index) => {
    // Check if it's the UX/UI section and apply the 'down' class to cards with index >= 2
    const cardDiv = document.createElement('div');
    cardDiv.className = (sectionSelector === '.cards-section' && index < 2)
      ? 'pb-8 px-2 flex flex-col space-y-4 flex-1' // No animation for the first two cards
      : 'pb-8 px-2 flex flex-col space-y-4 flex-1 md:down'; // Apply animation to the rest




    // image class based on the card title
    const imageClass = (card.title === 'MS. CARRY ONE' || card.title === 'DEAR DIARY'  || card.title === 'GOODSELF DESIGN SYSTEM (IN PROGRESS)') 
      ? 'object-cover' // some
      : 'object-contain'; // most cards

    // same background color for all cards in the Brand section
    cardDiv.innerHTML = `
      <div class="h-48 md:h-80 w-full rounded-2xl relative overflow-hidden bg-[#f3f3f4]">
        <img src="${card.image}" alt="${card.title}" loading="lazy" 
          class="w-full h-full ${imageClass} transition duration-300 ease-in-out hover:scale-110" 
          id="card-image-${index}">
      </div>
      <p>${card.title}</p>
      <p>${card.description}</p>
    `;

    // Changed the image on hover for "Little Red Riding Hood"
    if (card.title === "DEAR DIARY") {
      const imgElement = cardDiv.querySelector(`#card-image-${index}`);
      imgElement.addEventListener('mouseenter', () => {
        imgElement.src = "red2.png"; // Changed to red2 image on hover
      });
      imgElement.addEventListener('mouseleave', () => {
        imgElement.src = "red.png"; // Revert back on mouse leave
      });
    }

    fragment.appendChild(cardDiv);
  });

  cardsSection.appendChild(fragment);
}

// Data for UX/UI cards
const uxuiCardsData = [
  {
    title: "HERE:AFTER",
    description: "<em>AWARD—2023 RGD WINNER.</em> A journaling application which categorizes entries by mood. My role involved user interviews, usability tests and prototyping.",
    image: "here.png"
  },
  {
    title: "EXOMIS+DEV IN-HOUSE UXUI",
    description: "An about page optimized for mobile and web, which highlights the brand's story, mission, values and services.",
    image: "exomis.png"
  },
  {
    title: "ACCESSICHAT AAC & AI SOLUTION",
    description: "<em>AWARD—2024 RGD Honourable Mention in Augmented Creativity.</em> An AI-powered AAC app designed to assist people with disabilities in daily communication.",
    image: "accessi.png"
  },
  {
    title: "GOODSELF DESIGN SYSTEM (IN PROGRESS)",
    description: "Development of a new design system for a healthtech start-up, including new components, upgrades to typography and color contrast.",
    image: "ds.png"
  },
];

// Data for Brand cards
const brandCardsData = [
  {
    title: "THE GENDER DEBATE",
    description: "An interactive infographic exploring gender inequalities across key SDGs by mapping the distinct challenges faced by men and women.",
    image: "gender.png"
  },
  {
    title: "MS. CARRY ONE",
    description: "Logo marks for a women’s fashion brand, combining graceful typography with subtle design elements, evoking sophistication and adventure.",
    image: "exomis2.png"
  },
  {
    title: "LOST IN TRANSLATION",
    description: "A magazine applying experimental typography to reflect the intersection of classical and contemporary music-making, blending the aesthetics of traditional music notation and modern MIDI software.",
    image: "sound.png"
  },
  {
    title: "HOW TO PLANT PLUM TREES",
    description: "A data visualization on the different plum tree varieties, the best zones to grow them, and different scenarios on how to plant them.",
    image: "tree.png"
  },
];

// Data for Play cards (including Little Red Riding Hood)
const playCardsData = [
  {
    title: "THE SPIRALIST",
    description: "An experimental, mobile and web-responsive experience that evokes the dark fantasy motifs explored in Dr. Kevin Dann’s commentary on Pettigrew’s <em>Design in Nature</em> (1908).",
    image: "spiralist.png"
  },
  {
    title: "DEAR DIARY",
    description: "An interactive scrolling website that reimagines <em>Little Red Riding Hood</em> through a feminist lens, using motion design to critique its origins as a cautionary story and reframe it as a narrative of resilience.",
    image: "red.png"
  },
];

// Main execution
document.addEventListener('DOMContentLoaded', () => {
  // UX/UI cards creation
  createCards('.cards-section', uxuiCardsData);
  // Brand cards creation with same background color for all
  createCards('.cards-section2', brandCardsData, true);
  // Play cards creation with hover effect for Little Red Riding Hood
  createCards('.cards-section3', playCardsData, true);
});
