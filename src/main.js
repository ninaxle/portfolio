const materialIcons = document.createElement("link");
materialIcons.rel = "stylesheet";
materialIcons.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
document.head.appendChild(materialIcons);

// Dynamically load another JavaScript file (additional.js)
const script = document.createElement('script');
script.src = 'cursor.js';  // Path to the additional JS file
script.type = 'text/javascript';
script.async = true;  // Load asynchronously
document.head.appendChild(script);

// Optional: Add a callback after the script is loaded
script.onload = function () {
  console.log('cursor.js has been loaded!');
};

// Unified card creation function
function createCards(sectionSelector, cardsData, isBrandSection = false) {
  const cardsSection = document.querySelector(sectionSelector);
  if (!cardsSection) {
    console.error(`Cards section not found: ${sectionSelector}`);
    return;
  }

  const fragment = document.createDocumentFragment();

  cardsData.forEach((card, index) => {
    const isTallCard =
      card.title === 'The Purrfect Supper' ||
      //card.title === 'Here:after' ||
      //card.title === 'Accessichat' ||
      //card.title === 'Exomis Design + Development' ||
      //card.title === 'Goodself Design System' ||



    card.title === 'The Digital Music Box - Carousel Visualizer';

    const heightClass = isTallCard
      ? 'h-72 lg:h-[420px] 2xl:h-[800px]'
      : 'h-72 lg:h-80 2xl:h-[500px]';

    // Create card div
    const cardDiv = document.createElement('div');
    cardDiv.className = (sectionSelector === '.cards-section' && index < 2)
      ? 'pb-6 flex flex-col space-y-4 flex-1' // No animation for the first two cards
      : 'pb-6 flex flex-col space-y-4 flex-1 md:down'; // Apply animation to the rest

    // Image class based on the card title
    const imageClass = (//card.title === 'Ms. Carry One'||
      card.title === 'Dear Diary' ||
      card.title === 'Goodself Design System' ||
      card.title === 'The Digital Music Box - Carousel Visualizer' ||
      card.title === 'Meiva'||
      card.title === 'The Purrfect Supper'
    ) 
      ? 'object-cover' // full coverage for some cards
      : 'object-contain'; // Default class for others

    // Set the inner HTML for the card
    const hoverClass = card.tags.includes("IN PROGRESS")
      ? '' 
      : 'transition duration-300 ease-in-out hover:scale-110'; // Apply hover effect for other titles

    let tagHTML = '';
    if (card.tags) {
      const tagsArray = card.tags.split(' | '); // Split tags by "|"
      tagHTML = `
        <div class="flex flex-wrap gap-1">
          ${tagsArray.map(tag => {

            // Check if the tag is 'rgd' or 'canada' and apply different styles
            let tagClasses = "border px-3 py-1 rounded-xl text-base 2xl:text-xl mr-1 mb-1";

            if (tag.toLowerCase().includes('rgd')) {
              tagClasses = "border border-gray-400 text-gray-600 px-3 py-1 rounded-xl text-base 2xl:text-xl mr-1 mb-1"; // Change for 'rgd'
            } else if (tag.toLowerCase().includes('winner')) {
              tagClasses = "border border-gray-400 text-gray-600 px-3 py-1 rounded-xl text-base 2xl:text-xl mr-1 mb-1"; 
            } else if (tag.toUpperCase().includes('PROGRESS')) {
              tagClasses = "border border-gray-400 text-gray-600 px-3 py-1 rounded-xl text-base 2xl:text-xl mr-1 mb-1"; 
            } else if (tag.toLowerCase().includes('mention')) {
              tagClasses = "border border-gray-400 text-gray-600 px-3 py-1 rounded-xl text-base 2xl:text-xl mr-1 mb-1"; 
            }

            return `
            <span class="${tagClasses}">
              ${tag}
            </span>
          `;
          }).join('')}
        </div>
      `;
    }

    const style = document.createElement("style");
    style.textContent = /* css */ `
      .parent:hover .pretty::after { 
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        border-radius: 20px;
        animation: 3s rotate linear infinite;
        transition: background 0.3s ease-in-out;
        background: conic-gradient(
          from var(--angle),
          #8a90e6 0%,
          #80b3b3 25%,
          #e96b8e 50%,
          #66b3b3 75%,
          #8a90e6 100%
        ) border-box;
      }

      .parent:hover .pretty::before { 
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        border-radius: 20px;
        animation: 3s rotate linear infinite;
        transition: background 0.3s ease-in-out;
        background: conic-gradient(
          from var(--angle),
          #8a90e6 0%,
          #80b3b3 25%,
          #e96b8e 50%,
          #66b3b3 75%,
          #8a90e6 100%
        ) border-box;
        filter: blur(0.75rem);
      }

      @keyframes rotate {
        to {
          --angle: 360deg;
        }
      }
      
      @property --angle {
        syntax: "<angle>";
        initial-value: 0deg;
        inherits: false;
      }
    `;
    document.head.appendChild(style);

    // Apply the hover class dynamically
    cardDiv.innerHTML = /*html*/`
    <div class="${heightClass} w-full rounded-2xl relative overflow-hidden bg-[#f3f3f4]">
      <div class="inner-content h-full w-full rounded-2xl overflow-hidden">
        <img src="${card.image}" alt="${card.title}" loading="lazy" 
          class="w-full h-full ${imageClass} ${hoverClass}" 
          id="card-image-${index}">
      </div>
    </div>
    <h4>${card.title}</h4>
    <div>${tagHTML}</div>
  `;

    // Wrap card in a link if the `link` property exists
    if (card.link) {
      const cardContent = /* html */ `
        <div class="relative parent">
          <div class="pretty"></div>
          <div class="flex justify-center items-center rounded-[18px] p-[3px]">
            <div
              class="${heightClass} w-full rounded-2xl relative overflow-hidden bg-light"
            >
              <div class="relative h-full group">
                <img
                  src="${card.image}"
                  alt="${card.title}"
                  loading="lazy"
                  class="w-full h-full ${imageClass} transition duration-300 ease-in-out hover:scale-110"
                />
              </div>
            </div>
          </div>
        </div>

        <h4>${card.title}</h4>
        <div>${tagHTML}</div>
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
    title: "Here:after",
    image: "here.png",
    link: "hereafter.html",
    tags: " UX WINNER | RGD CANADA '23 | UX RESEARCH | MOBILE",
  },
  {
    title: "Accessichat",
    image: "accessi.png",
    link: "accessichat.html",
    tags: "AI HONOURABLE MENTION | RGD CANADA '24 | HACKATHON | MOBILE",
  },
  {
    title: "Exomis Design + Development",
    tags: "IN PROGRESS | RESPONSIVE DESIGN | UX RESEARCH | MOBILE & DESKTOP",
    image: "exomis.png",
  },
  {
    title: "Goodself Design System",
    tags: "IN PROGRESS | DESIGN SYSTEM | UI LIBRARIES | ACCESSIBILITY | MOBILE, DESKTOP & TABLET",
    image: "ds.png",
  },
];

// Data for Brand cards
const brandCardsData = [
  {
    title: "The Gender Debate",
    tags: "IN PROGRESS | INTERACTIVE | DIGITAL DESIGN | DATA VISUALIZATION",
    image: "gender.png",
  },
  {
    title: "Ms. Carry One",
    tags: "IN PROGRESS | LOGO DESIGN | ILLUSTRATION | BRANDING",
    image: "exomis2.png",
  },
  {
    title: "Lost in Translation",
    tags: "IN PROGRESS | TYPOGRAPHY | PRINT",

    image: "sound.png",
  },
  {
    title: "How to Plant Plum Trees",
    tags: "IN PROGRESS | ILLUSTRATION | DATA VISUALIZATION",
    image: "tree.png",
  },
];

// Data for Play cards (including Little Red Riding Hood)
const playCardsData = [
  {
    title: "Dear Diary",

    tags: "ILLUSTRATION | WEB DESIGN | DESKTOP",
    link: "https://youtu.be/WAzITLPvqEU",

    image: "dear diary.png"
  },
  {
    title: "Meiva",
    tags: "IN PROGRESS | MOBILE & DESKTOP",
    image: "meiva.png"
    
  },

];

//code cards
const codeCardsData = [

  {
    title: "The Purrfect Supper",
    tags: "P5JS | CODE | MINI-GAME",
    link: "https://editor.p5js.org/ninistar/full/UL27yTVgl",
    image: "purrfect-super.png"
    
  },
  {
    title: "The Digital Music Box - Carousel Visualizer",
    tags: "P5JS | CODE | MUSIC VISUALIZATION",
    link: "https://editor.p5js.org/ninistar/full/bu9tv-CMp",
    image: "ponies.png"
  },
];

// Main execution
document.addEventListener('DOMContentLoaded', () => {
  // Your existing card creation code
  createCards('.cards-section', uxuiCardsData);
  createCards('.cards-section2', brandCardsData, true);
  createCards('.cards-section3', playCardsData, true);
  createCards('.cards-section4', codeCardsData, true);


  
});

