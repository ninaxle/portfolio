document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.querySelector("lightbox-modal");
  if (!lightbox) return;

  const main = document.querySelector("main");
  if (!main) return;

  const allMedia = main.querySelectorAll("img, video");
  const items = [];

  allMedia.forEach((el) => {
    if (el.closest("[data-lightbox-exclude]")) return;
    if (el.tagName === "IFRAME") return;
    if (el.closest("lightbox-modal")) return;

    const src = el.src || el.querySelector("source")?.src;
    if (!src) return;

    const type = el.tagName === "VIDEO" ? "video" : "image";

    let caption = "";
    let current = el.parentElement;
    while (current) {
      const label =
        current.querySelector(":scope > .text-grey") ||
        current.querySelector(":scope > div > .text-grey");
      if (label) {
        caption = label.textContent.replace(/[\[\]]/g, "").trim();
        break;
      }
      if (current.tagName === "SECTION" || current.tagName === "MAIN") break;
      current = current.parentElement;
    }

    el.style.cursor = "pointer";
    el.style.transition = "opacity 0.2s";
    el.addEventListener("mouseenter", () => (el.style.opacity = "0.85"));
    el.addEventListener("mouseleave", () => (el.style.opacity = "1"));

    items.push({ src, type, caption });

    el.addEventListener("click", () => {
      const index = items.findIndex((i) => i.src === src);
      lightbox.open({ items, index });
    });
  });
});
