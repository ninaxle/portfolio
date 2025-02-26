
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
    // Create card div
    const cardDiv = document.createElement('div');
    cardDiv.className = (sectionSelector === '.cards-section' && index < 2)
      ? 'pb-6 flex flex-col space-y-4 flex-1' // No animation for the first two cards
      : 'pb-6 flex flex-col space-y-4 flex-1 md:down'; // Apply animation to the rest

    // Image class based on the card title
    const imageClass = (card.title === 'Ms. Carry One' || card.title === 'Dear Diary' || card.title === 'Goodself Design System') 
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
              let tagClasses = "border px-3 py-1 rounded-xl text-base mr-1 mb-1";
              
              if (tag.toLowerCase().includes('rgd')) {
                tagClasses = "bg-violet-50 text-blob px-3 py-1 rounded-xl text-base mr-1 mb-1"; // Change for 'rgd'
              } else if (tag.toLowerCase().includes('winner')) {
                tagClasses = "bg-violet-50 text-blob px-3 py-1 rounded-xl text-base mr-1 mb-1"; 
              } else if (tag.toUpperCase().includes('PROGRESS')) {
                tagClasses = "bg-light px-3 py-1 rounded-xl text-base mr-1 mb-1"; 
              } else if (tag.toLowerCase().includes('mention')) {
                tagClasses = "bg-violet-50 text-blob px-3 py-1 rounded-xl text-base mr-1 mb-1"; 
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
      



      

      // animation

      const style = document.createElement('style');
      style.textContent = `
        .pretty {
  position: relative;
  z-index: 0;
}

@property --angle {
syntax: "<angle>";
initial-value: 0deg;
inherits: false;

}


.pretty::after, .pretty::before {
--angle: 0deg;
  content: '';
  position: absolute;
  height: 100%;
  width: 100%;
background-image: conic-gradient(from var(--angle), #fb8bb9 10%, #7fd8c8 30%, #a89cf0 50%, #d69ee6 70%, #fea8a9 90%);
  border-radius: 18px;
  opacity: 0;
  z-index: -1;
  animation: 3s spin linear infinite;
}

.pretty:hover::before {
  opacity: 36%;
  	filter: blur(0.75rem)
}

.pretty:hover::after {
  opacity: 1;
}


@keyframes spin {
 from {
 --angle: 0deg;
 
 }
 to {
 --angle: 360deg;
 }
  }
}
      `;
      document.head.appendChild(style);
      
  
    // Apply the hover class dynamically
    cardDiv.innerHTML = /*html*/`
    <div class="h-72 lg:h-80 2xl:h-[500px] w-full rounded-2xl relative overflow-hidden bg-[#f3f3f4]">
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
      const cardContent = `
        <div class="flex justify-center items-center rounded-[18px] pretty p-[2px]">
        <div class="h-72 lg:h-80 2xl:h-[500px] w-full rounded-2xl relative overflow-hidden bg-light">
          <div class="relative h-full group">
            <img src="${card.image}" alt="${card.title}" loading="lazy" 
              class="w-full h-full object-contain transition duration-300 ease-in-out hover:scale-110">
           
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
    image: "exomis.png"
  },
  {
    title: "Goodself Design System",
    tags: "IN PROGRESS | DESIGN SYSTEM | UI LIBRARIES | ACCESSIBILITY | MOBILE, DESKTOP & TABLET",
    image: "ds.png"
  },
];

// Data for Brand cards
const brandCardsData = [
  {
    title: "The Gender Debate",
    tags: "IN PROGRESS | INTERACTIVE | DIGITAL DESIGN | DATA VISUALIZATION",
    image: "gender.png"

  },
  {
    title: "Ms. Carry One",
    tags: "IN PROGRESS | LOGO DESIGN | ILLUSTRATION | BRANDING",
    image: "exomis2.png"
  },
  {
    title: "Lost in Translation",
    tags: "IN PROGRESS | TYPOGRAPHY | PRINT",

    image: "sound.png"
  },
  {
    title: "How to Plant Plum Trees",
    tags: "IN PROGRESS | ILLUSTRATION | DATA VISUALIZATION",
    image: "tree.png"
  },
];

// Data for Play cards (including Little Red Riding Hood)
const playCardsData = [
  {
    title: "The Spiralist",
    tags: "IN PROGRESS | TYPOGRAPHY | MOBILE & DESKTOP",
    image: "spiralist.png"
    
  },
  {
    title: "Dear Diary",

    tags: "IN PROGRESS | STORYBOARDING | ILLUSTRATION | DESKTOP",
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


