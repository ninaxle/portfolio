// Draggable stickers for the archive/playground page
// 4 stickers using actual PNG files

// Zig-zag positions scattered down the page with rotations
const stickersData = [
  { id: "sticker-1", image: "play-content/stickers-01.png", left: "8%", top: "150px", rotate: "-5deg" },
  { id: "sticker-2", image: "play-content/stickers-02.png", left: "65%", top: "320px", rotate: "8deg" },
  { id: "sticker-3", image: "play-content/stickers-03.png", left: "15%", top: "500px", rotate: "-3deg" },
  { id: "sticker-4", image: "play-content/stickers-04.png", left: "70%", top: "680px", rotate: "6deg" },
];

export function createStickers() {
  // Hide on mobile/tablet
  if (window.innerWidth < 1024) return;

  const container = document.createElement("div");
  container.id = "stickers-container";
  container.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 50;
    overflow: hidden;
  `;

  stickersData.forEach((sticker) => {
    const el = document.createElement("div");
    el.id = sticker.id;
    el.style.cssText = `
      position: absolute;
      left: ${sticker.left};
      top: ${sticker.top};
      max-height: 224px;
      cursor: grab;
      transform: rotate(${sticker.rotate});
      user-select: none;
      -webkit-user-select: none;
      pointer-events: auto;
    `;

    el.innerHTML = `
      <img 
        src="${sticker.image}" 
        alt="Sticker"
        style="max-height: 250px; width: auto; pointer-events: none;"
      />
    `;

    // Drag functionality
    let isDragging = false;
    let startX, startY, initialLeft, initialTop;

    const onMouseDown = (e) => {
      isDragging = true;
      el.style.cursor = "grabbing";
      el.style.zIndex = "100";

      const rect = el.getBoundingClientRect();
      startX = e.clientX || e.touches[0].clientX;
      startY = e.clientY || e.touches[0].clientY;
      initialLeft = rect.left;
      initialTop = rect.top;

      e.preventDefault();
      e.stopPropagation();
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();

      const clientX = e.clientX || e.touches[0].clientX;
      const clientY = e.clientY || e.touches[0].clientY;

      const deltaX = clientX - startX;
      const deltaY = clientY - startY;

      el.style.left = `${initialLeft + deltaX}px`;
      el.style.top = `${initialTop + deltaY}px`;
    };

    const onMouseUp = () => {
      if (!isDragging) return;
      isDragging = false;
      el.style.cursor = "grab";
      el.style.zIndex = "50";
    };

    el.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    el.addEventListener("touchstart", onMouseDown, { passive: false });
    document.addEventListener("touchmove", onMouseMove, { passive: false });
    document.addEventListener("touchend", onMouseUp);

    container.appendChild(el);
  });

  // Add to hero section
  const heroSection = document.querySelector(".geist-grid-wrapper");
  if (heroSection) {
    heroSection.style.position = "relative";
    heroSection.appendChild(container);
  }
}
