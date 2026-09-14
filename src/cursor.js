// ============================================
// COMPOSE IMAGE CURSOR (desktop only)
// Event-driven: no permanent rAF loop, so the
// main thread stays idle when the mouse isn't on
// one of the p5 canvases.
// ============================================
const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );

if (!isMobile) {
  const composeImg = new Image();
  composeImg.src = "compose.png";
  let imgLoaded = false;

  composeImg.style.position = "fixed";
  composeImg.style.pointerEvents = "none";
  composeImg.style.zIndex = "100000";
  composeImg.style.display = "none";
  composeImg.style.width = "20px";
  document.body.appendChild(composeImg);

  composeImg.onload = () => {
    imgLoaded = true;
  };
  composeImg.onerror = () => {
    imgLoaded = false;
  };

  let clientX = 0,
    clientY = 0;
  let overSketch = false;
  let currentTarget = null;
  let rafPending = false;

  function applyCursor() {
    rafPending = false;
    if (overSketch) {
      if (imgLoaded) {
        // Hide system mouse on the canvas specifically
        if (currentTarget) currentTarget.style.cursor = "none";
        document.body.style.cursor = "none";
        composeImg.style.display = "block";
        composeImg.style.left = `${clientX}px`;
        composeImg.style.top = `${clientY}px`;
      } else {
        // Fallback: image failed to load, keep the system mouse
        if (currentTarget) currentTarget.style.cursor = "auto";
        document.body.style.cursor = "auto";
        composeImg.style.display = "none";
      }
    } else {
      document.body.style.cursor = "auto";
      composeImg.style.display = "none";
    }
  }

  document.addEventListener("mousemove", (e) => {
    clientX = e.clientX;
    clientY = e.clientY;
    currentTarget = e.target;
    overSketch =
      e.target.tagName === "CANVAS" || e.target.classList.contains("p5Canvas");

    // Coalesce positioning into a single rAF per move burst.
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(applyCursor);
  });
}
