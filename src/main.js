const materialIcons = document.createElement("link");
materialIcons.rel = "stylesheet";
materialIcons.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
document.head.appendChild(materialIcons);

// Create tooltip element for "coming soon" cards
const tooltip = document.createElement("div");
tooltip.id = "card-tooltip";
tooltip.style.cssText = `
  position: fixed;
  background: rgba(0, 0, 0, 0.7);
  color: #fcfcfc;
  padding: 8px 16px;
  border-radius: 10px;
  font-family: 'Fragment Mono', monospace;
  font-size: 14px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.15s ease;
  z-index: 1000;
  white-space: nowrap;
`;
tooltip.textContent = "under construction";
document.body.appendChild(tooltip);

// Mouse tracking for tooltip - only for cards without links, desktop only
document.addEventListener("mousemove", (e) => {
  if (window.innerWidth < 768) return;

  const tooltipCards = document.querySelectorAll(".has-tooltip");
  let shouldShow = false;

  tooltipCards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    if (
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom
    ) {
      shouldShow = true;
    }
  });

  if (shouldShow) {
    tooltip.style.opacity = "1";
    tooltip.style.left = e.clientX + 5 + "px";
    tooltip.style.top = e.clientY - 28 + "px";
  } else {
    tooltip.style.opacity = "0";
  }
});

// ---------------------------------------------------------------------------
// Grid appearance constants
// ---------------------------------------------------------------------------
// Single source of truth for the gridline colour so every border in every
// grid block is guaranteed to match. Adjust this one value if it needs to
// line up with an existing CSS variable elsewhere in the site.
const GRID_LINE = "border-[#d9d9d9]";

// Fixed height shared by the "empty" cell in row 1 (box 2, and box 1 when it
// has no text). Adjust here to resize it.
const PLACEHOLDER_BOX_HEIGHT = "h-12";

// Inner padding for the two content cells (boxes 3, 4) so the card content
// doesn't touch the border lines. Typography/spacing *within* the card
// (space-y-4, text classes, etc.) is unchanged from before.
const CONTENT_BOX_PADDING = "p-6";

// Small gap between the two columns on desktop. Each row's own border-top
// still spans the full width of the row (including this gap), so the
// horizontal gridlines read as continuous — the grid still reads as a
// 2-column block, the gap just adds breathing room between columns.
const COLUMN_GAP = "md:gap-x-4";

// Helper to build the media element (video or image)
// width/height attributes give the browser an aspect ratio hint for CLS,
// actual display sizing is handled by CSS: fixed 385px height, object-fit
// (cover/contain, set per-card via imageClass) controls how the media fills it.
const MEDIA_HEIGHT = "h-[385px]";

function getMediaHTML(card, imageClass, hasHover = false) {
  const hoverClass = hasHover
    ? "transition duration-300 ease-in-out hover:scale-105"
    : "";

  if (card.video) {
    return `
      <video
        src="${card.video}"
        class="w-full ${MEDIA_HEIGHT} ${imageClass} ${hoverClass}"
        width="800"
        height="500"
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
      width="800"
      height="500"
      class="w-full ${MEDIA_HEIGHT} ${imageClass} ${hoverClass}"
    />
  `;
}

// Builds the same "content" markup a card used to render inside a column
// (media, tags, title, description — same typography, spacing, and border
// radius as before), now sized to live inside a grid cell (box 3 or 4).
function buildCardContent(card) {
  const wrapper = document.createElement("div");
  wrapper.className = `flex flex-col space-y-4 ${CONTENT_BOX_PADDING} h-full`;

  if (!card) {
    // No second project for this pair — leave the cell empty.
    return wrapper;
  }

  const imageClass =
    card.title === "Dear Diary" ||
    card.title === "Goodself Design System" ||
    card.title === "The Digital Music Box - Carousel Visualizer" ||
    card.title === "Meiva" ||
    card.title === "The Purrfect Supper"
      ? "object-cover"
      : "object-contain";

  let tagHTML = "";
  if (card.tags) {
    const tagsArray = card.tags.split(" | ");
    const bracketTags = tagsArray.map((tag) => `[${tag.trim()}]`).join(" ");
    tagHTML = `<p class="text-grey">${bracketTags}</p>`;
  }

  if (card.link) {
    const isExternal =
      card.link.startsWith("http://") || card.link.startsWith("https://");
    const targetAttr = isExternal
      ? ' target="_blank" rel="noopener noreferrer"'
      : "";

    wrapper.innerHTML = /*html*/ `
      <a href="${card.link}" class="space-y-4 block"${targetAttr}>
        <div class="w-full rounded-2xl relative z-10 overflow-hidden bg-light">
          <div class="relative group">
            ${getMediaHTML(card, imageClass, true)}
          </div>
        </div>
        <div class="relative z-10">
          <div>${tagHTML}</div>
          <h4>${card.title}</h4>
          ${card.description ? `<p class="text-grey">${card.description}</p>` : ""}
        </div>
      </a>
    `;
  } else {
    wrapper.classList.add("has-tooltip");
    wrapper.innerHTML = /*html*/ `
      <div class="w-full rounded-2xl relative z-10 overflow-hidden bg-[#f3f3f4]">
        <div class="inner-content w-full rounded-2xl overflow-hidden">
          ${getMediaHTML(card, imageClass, true)}
        </div>
        <span class="md:hidden absolute top-3 right-3" style="
          background: rgba(0, 0, 0, 0.7);
          color: #fcfcfc;
          padding: 4px 8px;
          border-radius: 4px;
          font-family: 'Fragment Mono', monospace;
          font-size: 14px;
        ">
          UNDER CONSTRUCTION
        </span>
      </div>
      <div class="relative z-10">
        <div>${tagHTML}</div>
        <h4>${card.title}</h4>
        ${card.description ? `<p class="text-grey">${card.description}</p>` : ""}
      </div>
    `;
  }

  return wrapper;
}

// Splits a flat cardsData array into pairs — one pair per grid block, since
// boxes 3/4 always show two projects at a time.
function chunkIntoPairs(cardsData) {
  const pairs = [];
  for (let i = 0; i < cardsData.length; i += 2) {
    pairs.push([cardsData[i], cardsData[i + 1]]); // second may be undefined
  }
  return pairs;
}

// Builds one grid block:
//   row 1 -> box 1 (optional text) | box 2 (always empty)
//   row 2 -> box 3 (project A)     | box 4 (project B)
// Each row is its own wrapper with a top border, so stacked rows read as
// horizontal gridlines. Box 1/2 only get left/right borders; boxes 3/4 get
// a full border with the top removed (row 2's own top border stands in for
// it, so the line isn't doubled) plus a bottom border, since row 2 is now
// the last row and closes the block.// Builds one grid block:
//   row 1 -> box 1 (optional text) | box 2 (always empty)
//   row 2 -> box 3 (project A)     | box 4 (project B)
function buildGridSection(pair, boxOneText = "") {
  const [cardA, cardB] = pair;

  const section = document.createElement("div");
  // removed border-b to this section
  section.className = `grid-section flex flex-col w-full ${GRID_LINE}`;

  // Row 1: Only border-t (no bottom border)
  const rowTop = document.createElement("div");
  rowTop.className = `w-full border-t ${GRID_LINE}`;
  rowTop.innerHTML = /*html*/ `
    <div class="max-w-full xl:max-w-[94rem] xl:mx-auto grid grid-cols-1 md:grid-cols-2 px-4 md:px-16 lg:px-[7.95rem] ${COLUMN_GAP}">
      <div class="${PLACEHOLDER_BOX_HEIGHT} flex items-center px-6 border-x ${GRID_LINE}">
        ${boxOneText ? `<p class="text-grey">${boxOneText}</p>` : ""}
      </div>
      <div class="${PLACEHOLDER_BOX_HEIGHT} border-x ${GRID_LINE}"></div>
    </div>
  `;

  // Row 2: Only border-t (REMOVED border-b here to stop border stacking)
  const rowContent = document.createElement("div");
  rowContent.className = `w-full border-t ${GRID_LINE}`;

  const innerGrid = document.createElement("div");
  innerGrid.className = `max-w-full xl:max-w-[94rem] xl:mx-auto  grid grid-cols-1 md:grid-cols-2 px-4 md:px-16 lg:px-[7.95rem] ${COLUMN_GAP}`;

  [cardA, cardB].forEach((card) => {
    const box = document.createElement("div");
    box.className = `border-x ${GRID_LINE}`;
    box.appendChild(buildCardContent(card));
    innerGrid.appendChild(box);
  });

  rowContent.appendChild(innerGrid);

  section.appendChild(rowTop);
  section.appendChild(rowContent);
  return section;
}
// Unified card creation function — same call signature as before, plus an
// optional trailing boxOneText argument. When provided, it shows up ONLY in
// box 1 of the FIRST element matching sectionSelector — i.e. the very first
// time this class is used in the HTML for this call.
// (sectionSelector, cardsData) is still repeatable: EVERY element in the
// HTML matching sectionSelector gets exactly one grid block (2 projects).
// Pairs are handed out in order across those elements, so one
// ".cards-section" in the HTML shows the first 2 projects, a second
// ".cards-section" shows the next 2, and so on.
function createCards(sectionSelector, cardsData, isBrandSection = false, boxOneText = "") {
  const cardsSections = document.querySelectorAll(sectionSelector);
  if (!cardsSections.length) {
    console.error(`Cards section not found: ${sectionSelector}`);
    return;
  }

  const pairs = chunkIntoPairs(cardsData);

  cardsSections.forEach((sectionEl, i) => {
    const pair = pairs[i];
    if (!pair) return; // ran out of data for this element — leave it empty
    const text = i === 0 ? boxOneText : "";
    sectionEl.appendChild(buildGridSection(pair, text));
  });
}

// ---------------------------------------------------------------------------
// Playground card functions (filtered, image + caption only)
// ---------------------------------------------------------------------------

// Simplified card content for playground — image/video + caption only, no title/tags
function buildPlaygroundCardContent(card) {
  const wrapper = document.createElement("div");
  wrapper.className = `flex flex-col space-y-4 ${CONTENT_BOX_PADDING} h-full`;

  if (!card) {
    return wrapper;
  }

  const imageClass =
    card.title === "Dear Diary" ||
    card.title === "Goodself Design System" ||
    card.title === "The Digital Music Box - Carousel Visualizer" ||
    card.title === "Meiva" ||
    card.title === "The Purrfect Supper"
      ? "object-cover"
      : "object-contain";

  if (card.link) {
    const isExternal =
      card.link.startsWith("http://") || card.link.startsWith("https://");
    const targetAttr = isExternal
      ? ' target="_blank" rel="noopener noreferrer"'
      : "";

    wrapper.innerHTML = /*html*/ `
      <a href="${card.link}" class="space-y-4 block"${targetAttr}>
        <div class="w-full rounded-2xl relative z-10 overflow-hidden bg-light">
          <div class="relative group">
            ${getMediaHTML(card, imageClass, true)}
          </div>
        </div>
        <div class="relative z-10">
          <p class="text-grey">${card.description || ""}</p>
        </div>
      </a>
    `;
  } else {
    wrapper.classList.add("has-tooltip");
    wrapper.innerHTML = /*html*/ `
      <div class="w-full rounded-2xl relative z-10 overflow-hidden bg-[#f3f3f4]">
        <div class="inner-content w-full rounded-2xl overflow-hidden">
          ${getMediaHTML(card, imageClass, true)}
        </div>
        <span class="md:hidden absolute top-3 right-3" style="
          background: rgba(0, 0, 0, 0.7);
          color: #fcfcfc;
          padding: 4px 8px;
          border-radius: 4px;
          font-family: 'Fragment Mono', monospace;
          font-size: 14px;
        ">
          UNDER CONSTRUCTION
        </span>
      </div>
      <div class="relative z-10">
        <p class="text-grey">${card.description || ""}</p>
      </div>
    `;
  }

  return wrapper;
}

// Builds filter buttons for the playground
function buildPlaygroundFilters(containerSelector, categories, onFilter) {
  const container = document.querySelector(containerSelector);
  if (!container) {
    console.error("Filter container not found:", containerSelector);
    return;
  }

  const wrapper = document.createElement("div");
  wrapper.className = "flex flex-wrap gap-2";

  const allBtn = document.createElement("button");
  allBtn.textContent = "All";
  allBtn.className =
    "px-4 py-2 rounded-full border border-grid text-sm font-[family-name:'Fragment_Mono'] transition-colors bg-black text-white";
  allBtn.addEventListener("click", () => {
    setActive("All");
    onFilter("All");
  });
  wrapper.appendChild(allBtn);

  categories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.textContent = cat;
    btn.className =
      "px-4 py-2 rounded-full border border-grid text-sm font-[family-name:'Fragment_Mono'] transition-colors hover:border-black";
    btn.addEventListener("click", () => {
      setActive(cat);
      onFilter(cat);
    });
    wrapper.appendChild(btn);
  });

  function setActive(label) {
    wrapper.querySelectorAll("button").forEach((b) => {
      if (b.textContent === label) {
        b.classList.add("bg-black", "text-white");
        b.classList.remove("hover:border-black");
      } else {
        b.classList.remove("bg-black", "text-white");
        b.classList.add("hover:border-black");
      }
    });
  }

  container.appendChild(wrapper);
}

// Creates filtered playground cards — uses the existing grid layout but with
// simplified card content (image + caption only, no title/tags).
function createPlaygroundCards(sectionSelector, cardsData, filterContainerSelector) {
  const cardsSections = document.querySelectorAll(sectionSelector);
  if (!cardsSections.length) {
    console.error("Cards section not found:", sectionSelector);
    return;
  }

  // Extract unique categories from all cards
  const allCategories = [
    ...new Set(cardsData.flatMap((card) => card.category || [])),
  ];

  let currentFilter = "All";

  function getFilteredCards() {
    if (currentFilter === "All") return cardsData;
    return cardsData.filter(
      (card) => card.category && card.category.includes(currentFilter)
    );
  }

  function renderGrid() {
    const filtered = getFilteredCards();
    const pairs = chunkIntoPairs(filtered);

    cardsSections.forEach((sectionEl) => {
      sectionEl.innerHTML = "";

      pairs.forEach((pair, i) => {
        const [cardA, cardB] = pair;

        const section = document.createElement("div");
        section.className = `grid-section flex flex-col w-full ${GRID_LINE}`;

        // Row 1: optional text | empty
        const rowTop = document.createElement("div");
        rowTop.className = `w-full border-t ${GRID_LINE}`;
        const boxOneText =
          i === 0 && currentFilter === "All"
            ? "// Where I pixel push away"
            : "";
        rowTop.innerHTML = /*html*/ `
          <div class="max-w-full xl:max-w-[94rem] xl:mx-auto grid grid-cols-1 md:grid-cols-2 px-4 md:px-16 lg:px-[7.95rem] ${COLUMN_GAP}">
            <div class="${PLACEHOLDER_BOX_HEIGHT} flex items-center px-6 border-x ${GRID_LINE}">
              ${boxOneText ? `<p class="text-grey">${boxOneText}</p>` : ""}
            </div>
            <div class="${PLACEHOLDER_BOX_HEIGHT} border-x ${GRID_LINE}"></div>
          </div>
        `;

        // Row 2: card A | card B (simplified content)
        const rowContent = document.createElement("div");
        rowContent.className = `w-full border-t ${GRID_LINE}`;

        const innerGrid = document.createElement("div");
        innerGrid.className = `max-w-full xl:max-w-[94rem] xl:mx-auto grid grid-cols-1 md:grid-cols-2 px-4 md:px-16 lg:px-[7.95rem] ${COLUMN_GAP}`;

        [cardA, cardB].forEach((card) => {
          const box = document.createElement("div");
          box.className = `border-x ${GRID_LINE}`;
          box.appendChild(buildPlaygroundCardContent(card));
          innerGrid.appendChild(box);
        });

        rowContent.appendChild(innerGrid);

        section.appendChild(rowTop);
        section.appendChild(rowContent);
        sectionEl.appendChild(section);
      });
    });
  }

  // Set up filter UI
  buildPlaygroundFilters(filterContainerSelector, allCategories, (filter) => {
    currentFilter = filter;
    renderGrid();
  });

  // Initial render
  renderGrid();
}

// ---------------------------------------------------------------------------
// About section grid functions (reusable for any page)
// ---------------------------------------------------------------------------

// Builds a 2-column profile intro grid (image left, text right)
function buildProfileGrid(data, containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) {
    console.error("Profile grid container not found:", containerSelector);
    return;
  }

  const grid = document.createElement("div");
  grid.className = "grid grid-cols-1 md:grid-cols-2 gap-4 2xl:gap-20";

  // Left column — image
  const imageCol = document.createElement("div");
  imageCol.className = "w-full z-10 relative order-2 md:order-1 px-4 lg:px-16 2xl:px-4";
  imageCol.innerHTML = /*html*/ `
    <img
      src="${data.image}"
      alt="${data.alt || "Profile picture"}"
      class="rounded-3xl w-full md:w-7/8 2xl:w-full h-auto lg:h-[800px] 2xl:h-[900px] object-cover object-center"
    />
  `;

  // Right column — text
  const textCol = document.createElement("div");
  textCol.className = "flex flex-col gap-8 xl:gap-14 z-10 relative order-1 md:order-2";

  // Bio section
  const bio = document.createElement("div");
  bio.className = "flex flex-col gap-4 px-4 md:px-0";
  bio.innerHTML = /*html*/ `
    <div class="flex flex-col w-full gap-4 pb-8 md:pb-12">
      <h3 class="z-20">${data.description}</h3>
      ${data.tagline ? `<p class="smolwidth z-20 text-grey">${data.tagline}</p>` : ""}
    </div>
  `;
  textCol.appendChild(bio);

  // Experience section
  if (data.experience && data.experience.length > 0) {
    const expSection = document.createElement("div");
    expSection.className = "flex flex-col gap-4 px-4 md:px-0 smolwidth pb-8";

    let expHTML = `<p class="text-grey">[EXPERIENCE]</p>`;
    data.experience.forEach((exp) => {
      expHTML += /*html*/ `
        <div>
          <p>${exp.role}</p>
          <h6>${exp.description}</h6>
        </div>
      `;
    });
    expSection.innerHTML = expHTML;
    textCol.appendChild(expSection);
  }

  grid.appendChild(imageCol);
  grid.appendChild(textCol);
  container.appendChild(grid);
}

// Builds a 4-column awards grid (images in row 1, captions in row 2)
function buildAwardsGrid(data, containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) {
    console.error("Awards grid container not found:", containerSelector);
    return;
  }

  const grid = document.createElement("div");
  grid.className = "grid grid-cols-1 md:grid-cols-4 gap-8";

  data.forEach((award) => {
    const cell = document.createElement("div");
    cell.className = "flex flex-col gap-4 md:gap-8 rounded-2xl z-10 relative";
    cell.innerHTML = /*html*/ `
      <div class="flex justify-center items-center 2xl:p-8 rounded-2xl h-52 overflow-hidden border border-grid bg-white">
        <img src="${award.image}" class="w-4/6 h-auto" alt="${award.label}" />
      </div>
      <div class="flex flex-col gap-2">
        <h6 class="label text-grey">[${award.label}]</h6>
        <p>${award.caption}</p>
      </div>
    `;
    grid.appendChild(cell);
  });

  container.appendChild(grid);
}

// Builds a 3-column free time grid (square images with captions)
function buildFreeTimeGrid(data, containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) {
    console.error("Free time grid container not found:", containerSelector);
    return;
  }

  const grid = document.createElement("div");
  grid.className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8";

  data.forEach((item) => {
    const cell = document.createElement("div");
    cell.className = "z-10 relative";
    cell.innerHTML = /*html*/ `
      <img src="${item.image}" class="w-full aspect-square object-cover rounded-lg" alt="${item.caption}" />
      <h6 class="pt-4">${item.caption}</h6>
    `;
    grid.appendChild(cell);
  });

  container.appendChild(grid);
}

// Data for UX/UI cards
const uxuiCardsData = [


  {
    title: "Radiate Showcase Website",
    tags: "PRODUCT MANAGEMENT | UX STRATEGY",
    link: "radiate.html",
    image: "radiate/thumbnail-1.png",
    description: "Leading product strategy to get 44 design grads discovered at scale",

  },

  {
    title: "Melio",
    tags: "WEARABLE TECH | HEALTHCARE | AI SAFETY | UX RESEARCH",
    link: "melio.html",
    image: "melio/melio.png",
    description: "Rhythm-based app helping dementia patients reconnect with time through music",

  },


  {
    title: "Accelerator",
    tags: "CAPSTONE PROJECT | UNITY | VS CODE | BLENDER | PROCREATE",
    link: "accelerator.html",
    video: "degree-project/jumpsacre.mp4",
    description: "An analog horror game based on the Digital Acceleration Paradox",
  },

  {
    title: "The Digital Music Box - Carousel Visualizer",
    tags: "CODE | MUSIC VISUALIZATION",
    link: "https://editor.p5js.org/ninistar/full/bu9tv-CMp",
    video: "ponie2.mp4",
    description: "An interactive music visualization using p5.js",
  },
  {
    title: "Genesys Cloud",
    tags: "INTERNSHIP",
    image: "gen.png",
    description: "Shaping product direction for enterprise contact center software",
  },

  {
    title: "Goodself Design System",
    tags: "DESIGN SYSTEM | UI LIBRARIES | ACCESSIBILITY | MOBILE, DESKTOP & TABLET",
    image: "ds.png",
    description: "A healthtech design system designed around accessibility",
  },


  {
    title: "Accessichat",
    image: "accessi.png",
    link: "accessichat.html",
    tags: "HONOURABLE MENTION | RGD CANADA '24 | HACKATHON | MOBILE",
    description: "An AI-powered AAC app designed to support people with disabilities",
  },


  {
    title: "Here:after",
    image: "here.png",
    link: "hereafter.html",
    tags: "WINNER | RGD CANADA '23 | UX RESEARCH | MOBILE",
    description: "A mental health journalling application designed for self-reflection",
  },



];

// Combined playground cards (brand + play) with categories for filtering
const playgroundCardsData = [
  {
    title: "Lost in Translation",
    tags: "TYPOGRAPHY | PRINT",
    image: "sound.png",
    description: "Typographic study of language barriers",
    category: ["digital & print"],
  },
  {
    title: "How to Plant Plum Trees",
    tags: "ILLUSTRATION | DATA VISUALIZATION",
    image: "tree.png",
    description: "Botanical guide with data storytelling",
    category: ["illustration", "digital & print"],
  },
  {
    title: "The Wish Economy",
    tags: "PUBLICATION | ASCII | P5JS",
    link: "https://www.desn.ca/2026-projects/project-3-nina-le",
    image: "wishe/thumbnail.jpg",
    description: "A publication about birthdays, data, and digital performance",
    category: ["digital & print", "code"],
  },
  {
    title: "Meiva",
    tags: "MOBILE & DESKTOP",
    image: "meiva.png",
    description: "A responsive vaccine booking site designed to reduce friction",
    category: ["digital & print", "interactive"],
  },
  {
    title: "The Purrfect Supper",
    tags: "CODE | MINI-GAME",
    link: "https://editor.p5js.org/ninistar/full/UL27yTVgl",
    video: "pur.mp4",
    description: "A catcher game built in p5.js",
    category: ["code", "interactive"],
  },
  {
    title: "Dear Diary",
    tags: "ILLUSTRATION | WEB DESIGN | DESKTOP",
    link: "https://youtu.be/WAzITLPvqEU",
    video: "red.mp4",
    description: "Little Red Riding Hood as an interactive scroll experience",
    category: ["illustration", "interactive"],
  },
];

// Main execution
document.addEventListener("DOMContentLoaded", () => {
  createCards(".cards-section", uxuiCardsData, false, "// Craft at the intersection of design and code");
  createPlaygroundCards(".cards-section3", playgroundCardsData, ".playground-filters");
});