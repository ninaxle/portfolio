const materialIcons = document.createElement("link");
materialIcons.rel = "stylesheet";
materialIcons.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
document.head.appendChild(materialIcons);

// Dynamically load another JavaScript file (additional.js)
const script = document.createElement("script");
script.src = "cursor.js"; // Path to the additional JS file
script.type = "text/javascript";
script.async = true; // Load asynchronously
document.head.appendChild(script);

// Optional: Add a callback after the script is loaded
script.onload = function () {
  console.log("cursor.js has been loaded!");
};

// Helper to build the media element (video or image)
function getMediaHTML(card, imageClass, hoverClass) {
  if (card.video) {
    return `
      <video
        src="${card.video}"
        class="w-full h-auto ${imageClass} transition duration-300 ease-in-out hover:scale-110"
        autoplay
        muted
        loop
        playsinline
      ></video>
    `;
  }
  return `
    <img
      src="${card.image}"
      alt="${card.title}"
      loading="lazy"
      class="w-full h-auto ${imageClass} transition duration-300 ease-in-out hover:scale-110"
    />
  `;
}

// Unified card creation function
function createCards(sectionSelector, cardsData, isBrandSection = false) {
  const cardsSection = document.querySelector(sectionSelector);
  if (!cardsSection) {
    console.error(`Cards section not found: ${sectionSelector}`);
    return;
  }

  const col1 = document.createElement("div");
  col1.className = "flex flex-col gap-12";
  const col2 = document.createElement("div");
  col2.className = "flex flex-col gap-12";

  cardsData.forEach((card, index) => {
    const heightClass = "h-auto";

    // Create card div
    const cardDiv = document.createElement("div");
    cardDiv.className = "flex flex-col space-y-4";

    // Image class based on the card title
    const imageClass =
      card.title === "Dear Diary" ||
      card.title === "Goodself Design System" ||
      card.title === "The Digital Music Box - Carousel Visualizer" ||
      card.title === "Meiva" ||
      card.title === "The Purrfect Supper"
        ? "object-cover"
        : "object-contain";

    const hoverClass = "transition duration-300 ease-in-out hover:scale-110";

    let tagHTML = "";
    if (card.tags) {
      const tagsArray = card.tags.split(" | ");
      const bracketTags = tagsArray.map((tag) => `[${tag.trim()}]`).join(" ");
      tagHTML = `<p class="text-gray-500">${bracketTags}</p>`;
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

    // Default (no link) card
    cardDiv.innerHTML = /*html*/ `
      <div class="${heightClass} w-full rounded-2xl relative z-10 overflow-hidden bg-[#f3f3f4]">
        <div class="inner-content w-full rounded-2xl overflow-hidden">
          ${getMediaHTML(card, imageClass, hoverClass)}
        </div>
      </div>
      <div class="relative z-10">
        <div>${tagHTML}</div>
        <h4>${card.title}</h4>
        ${card.description ? `<p class="text-gray-500">${card.description}</p>` : ""}
      </div>
    `;

    // Wrap card in a link if the `link` property exists
    if (card.link) {
      const cardContent = /* html */ `
        <div class="relative z-10 parent">
          <div class="pretty"></div>
          <div class="flex justify-center items-center rounded-[18px] p-[3px]">
            <div class="${heightClass} w-full rounded-2xl relative z-10 overflow-hidden bg-light">
              <div class="relative group">
                ${getMediaHTML(card, imageClass, hoverClass)}
              </div>
            </div>
          </div>
        </div>

        <div class="relative z-10">
          <div>${tagHTML}</div>
          <h4>${card.title}</h4>
          ${card.description ? `<p class="text-gray-500">${card.description}</p>` : ""}
        </div>
      `;
      cardDiv.innerHTML = `<a href="${card.link}" class="space-y-4">${cardContent}</a>`;
    }

    // Append card to alternating columns
    if (index % 2 === 0) {
      col1.appendChild(cardDiv);
    } else {
      col2.appendChild(cardDiv);
    }
  });

  // Append both columns to the section
  cardsSection.appendChild(col1);
  cardsSection.appendChild(col2);
}

// Data for UX/UI cards
const uxuiCardsData = [
  {
    title: "Here:after",
    image: "here.png",
    link: "hereafter.html",
    tags: "WINNER | RGD CANADA '23 | UX RESEARCH | MOBILE",
    description: "End-of-life planning app for documenting final wishes",
  },
  {
    title: "The Digital Music Box - Carousel Visualizer",
    tags: "CODE | MUSIC VISUALIZATION",
    link: "https://editor.p5js.org/ninistar/full/bu9tv-CMp",
    video: "ponie.mov",
    description: "Interactive music visualization using p5.js",
  },
  {
    title: "Goodself Design System",
    tags: "DESIGN SYSTEM | UI LIBRARIES | ACCESSIBILITY | MOBILE, DESKTOP & TABLET",
    image: "ds.png",
    description: "Accessible component library for multi-platform products",
  },
  {
    title: "Accessichat",
    image: "accessi.png",
    link: "accessichat.html",
    tags: "HONOURABLE MENTION | RGD CANADA '24 | HACKATHON | MOBILE",
    description: "AI chat interface built with accessibility-first approach",
  },
];

// Data for Brand cards
const brandCardsData = [
  {
    title: "Lost in Translation",
    tags: "TYPOGRAPHY | PRINT",
    image: "sound.png",
    description: "Typographic study of language barriers",
  },
  {
    title: "How to Plant Plum Trees",
    tags: "ILLUSTRATION | DATA VISUALIZATION",
    image: "tree.png",
    description: "Botanical guide with data storytelling",
  },
];

// Data for Play cards
const playCardsData = [
  {
    title: "The Purrfect Supper",
    tags: "CODE | MINI-GAME",
    link: "https://editor.p5js.org/ninistar/full/UL27yTVgl",
    image: "purrfect-super.png",
    description: "Playful mini-game built in p5.js",
  },
  {
    title: "Dear Diary",
    tags: "ILLUSTRATION | WEB DESIGN | DESKTOP",
    link: "https://youtu.be/WAzITLPvqEU",
    image: "dear diary.png",
    description: "Illustrated web experience with personal narratives",
  },
  {
    title: "Exomis Design + Development",
    tags: "RESPONSIVE DESIGN | UX RESEARCH | MOBILE & DESKTOP",
    image: "exomis.png",
    description: "Responsive website design with UX research",
  },
  {
    title: "Meiva",
    tags: "MOBILE & DESKTOP",
    image: "meiva.png",
    description: "Cross-platform app for mobile and desktop",
  },
];

// Main execution
document.addEventListener("DOMContentLoaded", () => {
  createCards(".cards-section", uxuiCardsData);
  createCards(".cards-section2", brandCardsData, true);
  createCards(".cards-section3", playCardsData, true);
});