function initAsciiMusic() {
  const sketch = function (p) {
    let img;
    let symbols = [
      "@",
      "#",
      "&",
      "＊",
      "%",
      "♫",
      "♪",
      "!",
      "+",
      "=",
      "?",
      "^",
      "☆",
      "♡",
      "<",
      "o",
      "•",
      ".",
      "~",
    ];
    const symLen = symbols.length;
    const symLenM1 = symLen - 1;

    let stepSize = 9;
    let t = 0;
    let asciiAmount = 1;
    let transitionDuration = 8;
    let startTime;
    let imgLoaded = false;
    let isMobile = false;

    let cachedPixels = null;
    let cachedImgWidth = 0;
    let cachedImgHeight = 0;

    // Pre-built brightness→symbol index LUT (0-255 → symIndex)
    let brightnessLUT = new Uint8Array(512); // oversized to avoid clamping math

    function buildLUT() {
      for (let i = 0; i < 512; i++) {
        let mapped = (i / 255) * symLenM1;
        brightnessLUT[i] = Math.max(0, Math.min(symLenM1, Math.floor(mapped)));
      }
    }

    let smoothMouseX = 0;
    let smoothMouseY = 0;
    let touchX = -1000;
    let touchY = -1000;

    // Raw canvas 2D context for fast direct drawing
    let ctx;

    // ---- PERF: cached fillStyle strings, quantized so nearby colors reuse the same string ----
    // Cuts per-frame string allocation (a major GC/stutter source) way down.
    const colorCache = new Map();
    const COLOR_MAX_CACHE = 4096; // safety valve so the map can't grow unbounded
    function getRgbString(r, g, b) {
      // Used ONLY for the animated hover-tint colors (hsv-derived, changes every
      // frame anyway, small area near the cursor) — a little quantization there
      // is invisible and gives a real cache-hit-rate win.
      const qr = r & 0xf8; // quantize to steps of 8
      const qg = g & 0xf8;
      const qb = b & 0xf8;
      const key = (qr << 16) | (qg << 8) | qb;
      let s = colorCache.get(key);
      if (!s) {
        if (colorCache.size > COLOR_MAX_CACHE) colorCache.clear();
        s = `rgb(${qr},${qg},${qb})`;
        colorCache.set(key, s);
      }
      return s;
    }

    // Exact (non-quantized) cache for direct image-pixel reproduction — this is
    // the path that draws your actual artwork/background, so colors must stay
    // pixel-perfect (in particular, near-white background pixels must exactly
    // match the canvas's #fcfcfc clear color, or you get a visible seam).
    const exactColorCache = new Map();
    const EXACT_MAX_CACHE = 8192;
    function getExactRgbString(r, g, b) {
      const key = (r << 16) | (g << 8) | b;
      let s = exactColorCache.get(key);
      if (!s) {
        if (exactColorCache.size > EXACT_MAX_CACHE) exactColorCache.clear();
        s = `rgb(${r},${g},${b})`;
        exactColorCache.set(key, s);
      }
      return s;
    }

    // ---- PERF: pause the whole sketch when scrolled off-screen ----
    let isVisible = true;
    let observer = null;
    let cnv; // canvas element reference, used to swap the cursor when paused

    // ---- Eye-comfort auto-pause ----
    // After it's been breathing for a while, let it come to rest at the next
    // natural "pixel art" low point (mostly flat squares, few ascii glyphs)
    // instead of animating forever. A click/tap replays it.
    const PAUSE_AFTER_MS = 10000; // how long to let it run before it's allowed to settle
    let animationPaused = false;
    let sessionStartTime = 0;

    function updateLoopState() {
      if (isVisible && !animationPaused) {
        if (!p.isLooping()) p.loop();
      } else {
        if (p.isLooping()) p.noLoop();
      }
    }

    function resumeAnimation() {
      if (!animationPaused) return;
      animationPaused = false;
      sessionStartTime = p.millis();
      startTime = p.millis() / 1000;
      asciiAmount = 1;
      if (cnv) cnv.style("cursor", "default");
      updateLoopState();
      document.dispatchEvent(new CustomEvent("ascii-resumed"));
    }

    p.preload = function () {
      isMobile = p.windowWidth < 768;
      let resizeFactor = isMobile ? 6 : 3.5;
      img = p.loadImage(
        "music.png",
        () => {
          img.resize(img.width / resizeFactor, img.height / resizeFactor);
          img.loadPixels();
          cachedPixels = img.pixels.slice();
          cachedImgWidth = img.width;
          cachedImgHeight = img.height;
          imgLoaded = true;
        },
        () => {
          console.error("Failed to load image");
        },
      );
    };

    p.setup = function () {
      isMobile = p.windowWidth < 768;
      stepSize = isMobile ? 6 : 9;
      let displayWidth = isMobile ? p.windowWidth : 800;
      let displayHeight = isMobile ? p.windowWidth * 0.5 : 400;

      // PERF: cap pixel density to 1. On Retina/high-DPI screens p5 defaults to
      // window.devicePixelRatio (often 2, sometimes 3), which multiplies the
      // number of raster pixels the canvas has to draw by 4x-9x for no visible
      // benefit at this text/ascii scale. This is the single biggest lag fix.
      p.pixelDensity(1);

      // PERF: this animation reads fine at 30fps; halves the draw workload.
      p.frameRate(30);

      cnv = p.createCanvas(displayWidth, displayHeight);
      cnv.parent("ascii-music-container");
      p.textFont("Doto");
      p.textSize(stepSize);
      p.noStroke();
      startTime = p.millis() / 1000;
      sessionStartTime = p.millis();
      smoothMouseX = p.width * 0.5;
      smoothMouseY = p.height * 0.5;
      buildLUT();
      // Grab raw 2D context once
      ctx = p.drawingContext;
      ctx.font = `${stepSize}px Doto`;
      ctx.textBaseline = "alphabetic";

      // PERF: stop calling draw() entirely while the hero is scrolled out of view.
      if ("IntersectionObserver" in window) {
        const el = document.getElementById("ascii-music-container");
        if (el) {
          observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                isVisible = entry.isIntersecting;
                updateLoopState();
              });
            },
            { threshold: 0.01 },
          );
          observer.observe(el);
        }
      }
    };

    let resizeTimer = null;
    let lastIsMobile = false;
    let lastStepSizeForFont = 0;

    function rebuildImageCache(mobile) {
      let resizeFactor = mobile ? 6 : 3.5;
      p.loadImage("music.png", function (freshImg) {
        freshImg.resize(
          freshImg.width / resizeFactor,
          freshImg.height / resizeFactor,
        );
        freshImg.loadPixels();
        cachedPixels = freshImg.pixels.slice();
        cachedImgWidth = freshImg.width;
        cachedImgHeight = freshImg.height;
      });
    }

    p.windowResized = function () {
      let nowMobile = p.windowWidth < 768;
      let displayWidth = nowMobile ? p.windowWidth : 800;
      let displayHeight = nowMobile ? p.windowWidth * 0.5 : 400;
      p.resizeCanvas(displayWidth, displayHeight);
      isMobile = nowMobile;
      stepSize = nowMobile ? 6 : 9;
      p.textSize(stepSize);
      ctx = p.drawingContext;
      ctx.font = `${stepSize}px Doto`;
      ctx.textBaseline = "alphabetic";
      lastStepSizeForFont = stepSize;
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        if (nowMobile !== lastIsMobile) {
          lastIsMobile = nowMobile;
          rebuildImageCache(nowMobile);
        }
      }, 200);
    };

    p.touchStarted = function () {
      if (animationPaused) {
        resumeAnimation();
        return;
      }
      if (isMobile && p.touches.length > 0) {
        touchX = p.touches[0].x;
        touchY = p.touches[0].y;
      }
    };
    p.touchMoved = function () {
      if (isMobile && p.touches.length > 0) {
        touchX = p.touches[0].x;
        touchY = p.touches[0].y;
      }
    };
    p.touchEnded = function () {
      touchX = -1000;
      touchY = -1000;
    };

    p.mousePressed = function () {
      if (animationPaused) {
        resumeAnimation();
        return;
      }
      if (!isMobile) {
        startTime = p.millis() / 1000;
        asciiAmount = 1;
      }
    };

    // HSB→RGB helper (h: 0-360, s: 0-100, v: 0-100) → [r,g,b] 0-255
    function hsvToRgb(h, s, v) {
      s /= 100;
      v /= 100;
      const c = v * s;
      const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
      const m = v - c;
      let r = 0,
        g = 0,
        b = 0;
      if (h < 60) {
        r = c;
        g = x;
      } else if (h < 120) {
        r = x;
        g = c;
      } else if (h < 180) {
        g = c;
        b = x;
      } else if (h < 240) {
        g = x;
        b = c;
      } else if (h < 300) {
        r = x;
        b = c;
      } else {
        r = c;
        b = x;
      }
      return [((r + m) * 255) | 0, ((g + m) * 255) | 0, ((b + m) * 255) | 0];
    }

    p.draw = function () {
      if (!isVisible) return; // PERF: belt-and-suspenders guard alongside noLoop()

      // PERF: raw fillRect for the background instead of p.background(),
      // which goes through p5's color-parsing/style layer every frame.
      ctx.fillStyle = "#fcfcfc";
      ctx.fillRect(0, 0, p.width, p.height);

      if (!imgLoaded || !cachedPixels) {
        p.fill(0);
        p.text("Loading...", p.width / 2, p.height / 2);
        return;
      }

      t += 0.055;

      // Pointer target
      let targetX = isMobile ? touchX : p.mouseX;
      let targetY = isMobile ? touchY : p.mouseY;
      smoothMouseX += (targetX - smoothMouseX) * 0.12;
      smoothMouseY += (targetY - smoothMouseY) * 0.12;

      const offsetX = (p.width - cachedImgWidth) / 2;
      const offsetY = (p.height - cachedImgHeight) / 2 - (isMobile ? 20 : 0);

      let elapsed = p.millis() / 1000 - startTime;
      if (elapsed >= transitionDuration * 2) {
        startTime = p.millis() / 1000;
        elapsed = 0;
      }

      const halfDuration = transitionDuration;
      if (elapsed < halfDuration) {
        asciiAmount = Math.max(Math.pow(1 - elapsed / halfDuration, 2.5), 0.15);
      } else {
        asciiAmount = Math.max(
          Math.pow((elapsed - halfDuration) / halfDuration, 2.5),
          0.15,
        );
      }

      // Eye comfort: once we've been running long enough, wait for the next
      // moment the breathing cycle bottoms out (mostly flat squares, i.e. the
      // "pixel art" look) and freeze there rather than stopping mid-transition.
      const shouldPauseThisFrame =
        !animationPaused &&
        p.millis() - sessionStartTime > PAUSE_AFTER_MS &&
        asciiAmount <= 0.16;

      const mx = Math.min(Math.max(smoothMouseX / p.width, 0), 1);
      const my = Math.min(Math.max(smoothMouseY / p.height, 0), 1);

      const mouseSpeed = 2 + mx * 3; // lerp(2,5,mx)
      const mouseChaos = 20 + my * 40; // lerp(20,60,my)
      const mouseStepMod = 1.2 + mx * 0.6; // lerp(1.2,1.8,mx)
      const effectRadius = 50 + my * 50; // 50–100
      const effectRadiusSq = effectRadius * effectRadius;
      const satBase = 80 + my * 20; // lerp(30,70,my)
      const asciiInfluenceRadius = 80;
      const asciiInfluenceRadiusSq =
        asciiInfluenceRadius * asciiInfluenceRadius;
      const halfStep = stepSize / 2;
      const smx = smoothMouseX,
        smy = smoothMouseY;
      // Cache last fillStyle to skip redundant style assignments
      let lastFillStyle = "";
      const setFill = (s) => {
        if (s !== lastFillStyle) {
          ctx.fillStyle = s;
          lastFillStyle = s;
        }
      };
      const tSpeed6 = t * 6 * mouseSpeed;
      const tSpeed4 = t * 4 * mouseSpeed;
      const tSpeed3 = t * 3 * mouseSpeed;
      const tSpeed15 = t * mouseSpeed * 1.5;
      const chaos05 = mouseChaos * 0.5;
      const chaos07 = mouseChaos * 0.7;
      const mxWave = mx * 2 + 0.5;
      const tintMxR = mx * 0.1; // lerp factor for r tint (0.1 weight)
      const tintMxB = (1 - mx) * 0.1; // lerp factor for b tint
      const r255 = 255 * mx;
      const b200 = 200 * (1 - mx);
      const symScale = symLenM1 / 255;

      // PERF: only touch ctx.font when stepSize actually changed (it doesn't
      // change mid-session outside of resize, so this was pure per-frame waste).
      if (stepSize !== lastStepSizeForFont) {
        ctx.font = `${stepSize}px Doto`;
        lastStepSizeForFont = stepSize;
      }
      ctx.textBaseline = "alphabetic";

      const pxW = cachedImgWidth;

      for (let imgY = 0; imgY < cachedImgHeight; imgY += stepSize) {
        const canvasY = imgY + offsetY;
        const cy = canvasY + halfStep;
        const scan = Math.sin(tSpeed3 + canvasY * 0.12) * (40 + chaos07);

        for (let imgX = 0; imgX < cachedImgWidth; imgX += stepSize) {
          const index = (imgX + imgY * pxW) * 4;
          const r = cachedPixels[index];
          const g = cachedPixels[index + 1];
          const b = cachedPixels[index + 2];
          const a = cachedPixels[index + 3];

          if (a < 10) continue;

          const brightnessVal = (r + g + b) / 3;
          if (brightnessVal > 245 && a < 50) continue;

          const canvasX = imgX + offsetX;
          const cx = canvasX + halfStep;

          const dx = smx - cx,
            dy = smy - cy;
          const distSq = dx * dx + dy * dy;

          const nearMouse = distSq < effectRadiusSq;
          const nearAscii = distSq < asciiInfluenceRadiusSq;
          const distFromMouse = nearMouse || nearAscii ? Math.sqrt(distSq) : 0;

          let ripple1, ripple2;
          if (nearMouse || distSq < 90000) {
            const d = distFromMouse || Math.sqrt(distSq);
            ripple1 = Math.sin(d * 0.02 - tSpeed6) * (70 + mouseChaos);
            ripple2 = Math.cos(d * 0.035 - tSpeed4) * (40 + chaos05);
          } else {
            ripple1 = Math.sin(-tSpeed6) * (70 + mouseChaos) * 0.3;
            ripple2 = Math.cos(-tSpeed4) * (40 + chaos05) * 0.3;
          }
          const extraWave =
            Math.sin(tSpeed15 + canvasX * 0.06 * mxWave) * chaos07;

          const animatedBrightness =
            brightnessVal + scan + ripple1 + ripple2 + extraWave;

          const lutIdx = Math.max(0, Math.min(511, animatedBrightness | 0));
          const symbolIndex = brightnessLUT[lutIdx];

          let localAsciiAmount = asciiAmount;
          if (nearAscii) {
            const influence = 1 - distFromMouse / asciiInfluenceRadius;
            localAsciiAmount +=
              (1.0 - asciiAmount) * influence * influence * 0.5;
          }

          if (Math.random() < localAsciiAmount) {
            const sym = symbols[symbolIndex];

            if (nearMouse) {
              const influence = 1 - distFromMouse / effectRadius;
              const rot =
                influence * Math.PI * 0.8 * mouseStepMod +
                t * influence * mouseSpeed * 0.5;

              if (rot > 0.08) {
                const hueShift =
                  (distFromMouse * 0.4 + t * 40 + mx * 180) % 360;
                const saturation = satBase * influence;
                const val = 30 + (brightnessVal / 255) * 10;
                const [rr, gg, bb] = hsvToRgb(hueShift, saturation, val);
                ctx.save();
                ctx.translate(cx, cy);
                ctx.rotate(rot);
                setFill(getRgbString(rr, gg, bb));
                ctx.fillText(sym, -halfStep, halfStep);
                ctx.restore();
              } else {
                const hueShift =
                  (distFromMouse * 0.4 + t * 40 + mx * 180) % 360;
                const saturation = satBase * influence;
                const val = 30 + (brightnessVal / 255) * 70;
                const [rr, gg, bb] = hsvToRgb(hueShift, saturation, val);
                setFill(getRgbString(rr, gg, bb));
                ctx.fillText(sym, canvasX, canvasY + stepSize);
              }
            } else {
              const tintR = (r + (r255 - r) * tintMxR) | 0;
              const tintB = (b + (b200 - b) * tintMxB) | 0;
              setFill(getExactRgbString(tintR, g, tintB));
              ctx.fillText(sym, canvasX, canvasY + stepSize);
            }
          } else {
            // Rect fallback. original pixel color, no mouse tint so background stays #fcfcfc
            setFill(getExactRgbString(r, g, b));
            ctx.fillRect(canvasX, canvasY, stepSize, stepSize);
          }
        }
      }

      // Restore p5 state so p5 internals don't get confused
      p.noStroke();

      if (shouldPauseThisFrame) {
        animationPaused = true;
        if (cnv) cnv.style("cursor", "pointer");
        updateLoopState();
        document.dispatchEvent(new CustomEvent("ascii-paused"));
      }
    };

    p.remove = function () {
      if (observer) observer.disconnect();
    };
  };
  new p5(sketch, document.getElementById("ascii-music-container"));
}

initAsciiMusic();
