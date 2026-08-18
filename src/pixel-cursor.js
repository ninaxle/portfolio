// ============================================
// PIXEL BRUSH CURSOR TRAIL
// ============================================
const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );

if (!isMobile) {
  const PIXEL_SIZE = 14;
  const MIN_DISTANCE = 4;
  const TRAIL_LIFETIME = 600;
  const OPACITY_STEPS = 10;

  const STROKE_COLORS = [
    [230, 50, 70],
    [255, 95, 158],
    [192, 106, 226],
    [111, 118, 200],
    [51, 176, 176],
  ];

  let colorIndex = Math.floor(Math.random() * STROKE_COLORS.length);
  let colorMix = 0;

  function getCurrentColor() {
    const c1 = STROKE_COLORS[colorIndex];
    const c2 = STROKE_COLORS[(colorIndex + 1) % STROKE_COLORS.length];
    const vary = () => (Math.random() - 0.5) * 20 | 0;
    const r = Math.min(255, Math.max(0, c1[0] + (c2[0] - c1[0]) * colorMix + vary()));
    const g = Math.min(255, Math.max(0, c1[1] + (c2[1] - c1[1]) * colorMix + vary()));
    const b = Math.min(255, Math.max(0, c1[2] + (c2[2] - c1[2]) * colorMix + vary()));
    return `rgb(${r},${g},${b})`;
  }

  function advanceColor() {
    colorMix += 0.003;
    if (colorMix >= 1) {
      colorMix = 0;
      colorIndex = (colorIndex + 1) % STROKE_COLORS.length;
    }
  }

  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "100000";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const trail = new Map();
  let lastX = 0;
  let lastY = 0;
  let hasLastPoint = false;

  function addPixel(x, y, time) {
    const gx = Math.floor(x / PIXEL_SIZE);
    const gy = Math.floor(y / PIXEL_SIZE);
    const key = `${gx},${gy}`;
    if (!trail.has(key)) {
      trail.set(key, {
        x: gx * PIXEL_SIZE,
        y: gy * PIXEL_SIZE,
        time,
        color: getCurrentColor(),
      });
      advanceColor();
    }
  }

  function interpolatePixels(x1, y1, x2, y2, time) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const steps = Math.ceil(dist / PIXEL_SIZE);
    for (let i = 0; i <= steps; i++) {
      const t = steps === 0 ? 0 : i / steps;
      addPixel(x1 + dx * t, y1 + dy * t, time);
    }
  }

  document.addEventListener("mousemove", (e) => {
    const overSketch =
      e.target.tagName === "CANVAS" ||
      e.target.classList.contains("p5Canvas");

    if (overSketch) {
      hasLastPoint = false;
      return;
    }

    const x = e.clientX;
    const y = e.clientY;

    if (!hasLastPoint) {
      addPixel(x, y, performance.now());
      lastX = x;
      lastY = y;
      hasLastPoint = true;
      return;
    }

    const dx = x - lastX;
    const dy = y - lastY;
    if (dx * dx + dy * dy >= MIN_DISTANCE * MIN_DISTANCE) {
      interpolatePixels(lastX, lastY, x, y, performance.now());
      lastX = x;
      lastY = y;
    }
  });

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const now = performance.now();

    for (const [key, pixel] of trail) {
      const age = now - pixel.time;
      if (age > TRAIL_LIFETIME) {
        trail.delete(key);
        continue;
      }

      const rawOpacity = 1 - age / TRAIL_LIFETIME;
      const opacity = Math.ceil(rawOpacity * OPACITY_STEPS) / OPACITY_STEPS;
      ctx.globalAlpha = opacity;
      ctx.fillStyle = pixel.color;
      ctx.fillRect(pixel.x, pixel.y, PIXEL_SIZE, PIXEL_SIZE);
    }

    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  }

  animate();
}
