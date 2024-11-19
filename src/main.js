




// Unified card creation function
function createCards(sectionSelector, cardsData) {
  const cardsSection = document.querySelector(sectionSelector);
  if (!cardsSection) {
    console.error(`Cards section not found: ${sectionSelector}`);
    return;
  }

  const fragment = document.createDocumentFragment();

  cardsData.forEach(card => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'px-4 py-6 flex flex-col space-y-4 flex-1';

    cardDiv.innerHTML = `
      <div class="border-black border h-80 w-full rounded-2xl relative overflow-hidden">
        <img src="${card.image}" alt="${card.title}" loading="lazy" class="w-full h-full object-cover transition duration-300 ease-in-out hover:scale-110 hover:bg-lime-100">
      </div>
      <h4 class="font-custom text-h4">${card.title}</h4>
      <p class="font-custom text-p">${card.description}</p>
    `;

    fragment.appendChild(cardDiv);
  });

  cardsSection.appendChild(fragment);
}

// Data for UX/UI cards
const uxuiCardsData = [
  {
    title: "HERE:AFTER",
    description: "2023 RGD WINNER | a mental health journaling application for students. My role involved UXR and crafting the journaling task flow.",
    image: "/assets/here.png"
  },
  {
    title: "ACCESSICHAT",
    description: "2024 RGD Honourable Mention in Augmented Creativity | an AI-powered platform incorporating Augmentative and Alternative Communication (AAC) tools.",
    image: "/assets/accesi.png"
  },
  {
    title: "Project Example",
    description: "A description of another project example.",
    image: "https://tecdn.b-cdn.net/img/new/fluid/city/115.webp"
  },
  {
    title: "Project Example",
    description: "A description of another project example.",
    image: "https://tecdn.b-cdn.net/img/new/fluid/city/115.webp"
  },
];

// Data for Brand cards
const brandCardsData = [
  {
    title: "HERE:AFTER",
    description: "2023 RGD WINNER | a mental health journaling application for students. My role involved UXR and crafting the journaling task flow.",
    image: "https://tecdn.b-cdn.net/img/new/fluid/city/113.webp"
  },
  {
    title: "Ms Carry One",
    description: "2024 RGD Honourable Mention in Augmented Creativity | an AI-powered platform incorporating Augmentative and Alternative Communication (AAC) tools.",
    image: "/assets/one.png"
  },
  {
    title: "Project Example",
    description: "A description of another project example.",
    image: "https://tecdn.b-cdn.net/img/new/fluid/city/115.webp"
  },
  {
    title: "Project Example with Felix",
    description: "A description of another project example with Felix.",
    image: "https://tecdn.b-cdn.net/img/new/fluid/city/115.webp"
  },
];

// Main execution
document.addEventListener('DOMContentLoaded', () => {
  createCards('.cards-section', uxuiCardsData);
  createCards('.cards-section2', brandCardsData);
});



