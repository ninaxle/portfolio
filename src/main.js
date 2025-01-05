
// Unified card creation function
function createCards(sectionSelector, cardsData, isBrandSection = false) {
  const cardsSection = document.querySelector(sectionSelector);
  if (!cardsSection) {
    console.error(`Cards section not found: ${sectionSelector}`);
    return;
  }

  const fragment = document.createDocumentFragment();

  cardsData.forEach((card, index) => {
    // Create card div
    const cardDiv = document.createElement('div');
    cardDiv.className = (sectionSelector === '.cards-section' && index < 2)
      ? 'px-4 py-6 flex flex-col space-y-4 flex-1' // No animation for the first two cards
      : 'px-4 py-6 flex flex-col space-y-4 flex-1 md:down'; // Apply animation to the rest

    // Image class based on the card title
    const imageClass = (card.title === 'MS. CARRY ONE (IN PROGRESS)' || card.title === 'DEAR DIARY (IN PROGRESS)' || card.title === 'GOODSELF DESIGN SYSTEM (IN PROGRESS)') 
      ? 'object-cover' // Ensure full coverage for some cards
      : 'object-contain'; // Default class for others

    // Set the inner HTML for the card
    const hoverClass = card.title.includes("IN PROGRESS") 
      ? '' // No hover effect for titles with "IN PROGRESS"
      : 'transition duration-300 ease-in-out hover:scale-110'; // Apply hover effect for other titles

    // Apply the hover class dynamically
    cardDiv.innerHTML = /*html*/`
      <div class="h-48 lg:h-80 w-full rounded-2xl relative overflow-hidden bg-[#f3f3f4] hover-image">
        <img src="${card.image}" alt="${card.title}" loading="lazy" 
          class="w-full h-full ${imageClass} ${hoverClass} hover-image" 
          id="card-image-${index}">
      </div>

      <p>${card.title}</p>
      <p>${card.description}</p>
    `;

    // Handle hover effect for "Dear Diary"
    if (card.title === "DEAR DIARY") {
      const imgElement = cardDiv.querySelector(`#card-image-${index}`);
      imgElement.addEventListener('mouseenter', () => {
        imgElement.src = "red2.png"; // Change to red2 image on hover
      });
      imgElement.addEventListener('mouseleave', () => {
        imgElement.src = "red.png"; // Revert back on mouse leave
      });
    }

    // Wrap card in a link if the `link` property exists
    if (card.link) {
      const cardContent = `
        <div class="h-48 lg:h-80 w-full rounded-2xl relative overflow-hidden bg-[#f3f3f4] hover-image">
          <img src="${card.image}" alt="${card.title}" loading="lazy" 
            class="w-full h-full object-contain transition duration-300 ease-in-out hover:scale-110">
        </div>
        <p>${card.title}</p>
        <p>${card.description}</p>
      `;
      cardDiv.innerHTML = `<a href="${card.link}" class="space-y-4">${cardContent}</a>`;
    }

    // Append the card to the fragment
    fragment.appendChild(cardDiv);
  });

  // Append all cards to the section
  cardsSection.appendChild(fragment);
}

// Data for UX/UI cards
const uxuiCardsData = [
  {
    title: "HERE:AFTER",
    description: "<em>AWARD—2023 RGD WINNER.</em> A journaling application which categorizes entries by mood. My role involved user interviews, usability tests and prototyping.",
    image: "here.png",
    link: "hereafter.html",
  },
  {
    title: "ACCESSICHAT AAC & AI SOLUTION",
    description: "<em>AWARD—2024 RGD Honourable Mention in Augmented Creativity.</em> An AI-powered AAC app designed to assist people with disabilities in daily communication.",
    image: "accessi.png",
    link: "accessichat.html",
  },
  {
    title: "EXOMIS+DEV IN-HOUSE UXUI (IN PROGRESS)",
    description: "An about page optimized for mobile and web, which highlights the brand's story, mission, values and services.",
    image: "exomis.png"
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
    title: "THE GENDER DEBATE (IN PROGRESS)",
    description: "An interactive infographic exploring gender inequalities across key SDGs by mapping the distinct challenges faced by men and women.",
    image: "gender.png"
  },
  {
    title: "MS. CARRY ONE (IN PROGRESS)",
    description: "Logo marks for a women’s fashion brand, combining graceful typography with subtle design elements, evoking sophistication and adventure.",
    image: "exomis2.png"
  },
  {
    title: "LOST IN TRANSLATION (IN PROGRESS)",
    description: "A magazine applying experimental typography to reflect the intersection of classical and contemporary music-making, blending the aesthetics of traditional music notation and modern MIDI software.",
    image: "sound.png"
  },
  {
    title: "HOW TO PLANT PLUM TREES (IN PROGRESS)",
    description: "A data visualization on the different plum tree varieties, the best zones to grow them, and different scenarios on how to plant them.",
    image: "tree.png"
  },
];

// Data for Play cards (including Little Red Riding Hood)
const playCardsData = [
  {
    title: "THE SPIRALIST (IN PROGRESS)",
    description: "An experimental, mobile and web-responsive experience that evokes the dark fantasy motifs explored in Dr. Kevin Dann’s commentary on Pettigrew’s <em>Design in Nature</em> (1908).",
    image: "spiralist.png"
  },
  {
    title: "DEAR DIARY (IN PROGRESS)",
    description: "An interactive scrolling website that reimagines <em>Little Red Riding Hood</em> through a feminist lens, using motion design to critique its origins as a cautionary story and reframe it as a narrative of resilience.",
    image: "red.png"
  },
];

// Main execution
document.addEventListener('DOMContentLoaded', () => {
  // Your existing card creation code
  createCards('.cards-section', uxuiCardsData);
  createCards('.cards-section2', brandCardsData, true);
  createCards('.cards-section3', playCardsData, true);

  
});
