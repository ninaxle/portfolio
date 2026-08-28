// Reusable "lock / slot machine" text transition. Churns text into random
// symbols and digits in batches (left to right), then locks each batch onto
// its correct letters.
//
//   - characters are processed left to right in batches (chunkSize) at a time
//   - each batch turns into scrolling symbols/digits that decelerate before
//     locking, so the symbols are actually readable
//   - a shared static prefix is never churned (e.g. "Hey I am Nina, ")
//   - extra characters between lines are appended or dropped as needed
//
// Usage:
//   import { createTextTransition } from "./text-transition.js";
//   const t = createTextTransition(el, {
//     texts: ["A", "B", "C"],
//     staticPrefix: "",
//     trigger: "scroll",        // "auto", "intersect", or "scroll"
//     startDelay: 2500,
//     holdMs: [2500, 2500, 2500], // one entry per phrase, or a single number
//   });
//   t.start();
const SCRAMBLE_CHARS = "`~!@#$%^&*()-_=+[]{}|;:,.<>/?\\()0123456789";
const INTRA_STAGGER = 35; // tiny offset between the chars inside one batch
const BASE_FLIPS_PER_SEC = 150; // how fast symbols scroll while churning
const DECEL_EXP = 1.6; // how sharply the churn slows before locking
const JITTER_CHANCE = 0.1; // chance a slot gets a sudden burst of motion
const JITTER_PUNCH = 8;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// True when the element's top has entered the viewport (i.e. the user has
// scrolled far enough to actually see it).
const isVisible = (element) => {
  const rect = element.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  return rect.bottom > 0 && rect.top >= 0 && rect.top < vh;
};

export function createTextTransition(element, options = {}) {
  const {
    texts = [],
    staticPrefix = "",
    trigger = "auto",
    startDelay = 0,
    holdMs = 1400,
    chunkSize = 4,
    churnDuration = 460,
    batchGap = 130,
  } = options;

  if (!element || !texts.length) {
    return { start() {}, stop() {} };
  }

  const node = element;
  const suffices = texts.map((text) =>
    staticPrefix && text.startsWith(staticPrefix)
      ? text.slice(staticPrefix.length)
      : text
  );

  const holdFor = (index) =>
    Array.isArray(holdMs) ? holdMs[index] ?? holdMs[holdMs.length - 1] : holdMs;

  let stopped = true;
  let timerId = null;
  let rafId = null;

  const sleep = (ms) =>
    new Promise((resolve) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        timerId = null;
        resolve();
      }, ms);
    });

  const BATCH_CYCLE = churnDuration + batchGap;
  const batchStart = (batch) => batch * BATCH_CYCLE;
  const slotStart = (index) =>
    batchStart(Math.floor(index / chunkSize)) +
    (index % chunkSize) * INTRA_STAGGER;

  // Morphs the visible suffix from `fromSuffix` to `toSuffix`, left to right,
  // in batches of `chunkSize`. The static prefix is re-rendered untouched.
  function morphText(fromSuffix, toSuffix) {
    const sourceChars = [...fromSuffix];
    const targetChars = [...toSuffix];
    const maxIndex = Math.max(sourceChars.length, targetChars.length);
    const slots = new Map();

    return new Promise((resolve) => {
      const start = performance.now();
      let prev = start;

      function frame(now) {
        if (stopped) {
          resolve();
          return;
        }

        const dt = Math.min(0.05, (now - prev) / 1000);
        prev = now;
        const t = now - start;

        // Birth a slot for each position when its batch is reached.
        for (let i = 0; i < maxIndex; i++) {
          if (t >= slotStart(i) && !slots.has(i)) {
            slots.set(i, {
              seed: Math.floor(Math.random() * SCRAMBLE_CHARS.length),
              flips: 0,
              start: slotStart(i),
              removed: false,
              value: i < sourceChars.length ? sourceChars[i] : "",
            });
          }
        }

        slots.forEach((s, i) => {
          if (s.removed) return;

          const p = Math.min(1, (t - s.start) / churnDuration);
          if (p >= 1) {
            // Lock: either onto the target letter, or drop the slot when the
            // target line is shorter than the current one.
            if (i >= targetChars.length) {
              s.removed = true;
              s.value = "";
            } else {
              s.value = targetChars[i];
            }
          } else {
            // Churn: scroll symbols/digits fast at first, decelerating to a
            // readable near-stop right before the lock, with random bursts.
            let speed = BASE_FLIPS_PER_SEC * Math.pow(1 - p, DECEL_EXP);
            if (Math.random() < JITTER_CHANCE) speed += JITTER_PUNCH;
            s.flips += speed * dt;
            s.value =
              SCRAMBLE_CHARS[
                (s.seed + Math.floor(s.flips)) % SCRAMBLE_CHARS.length
              ];
          }
        });

        let allDone = true;
        for (let i = 0; i < maxIndex; i++) {
          const s = slots.get(i);
          if (!s) {
            allDone = false;
            break;
          }
          if (i >= targetChars.length) {
            if (!s.removed) {
              allDone = false;
              break;
            }
          } else if (s.value !== targetChars[i]) {
            allDone = false;
            break;
          }
        }

        let out = "";
        for (let i = 0; i < maxIndex; i++) {
          const s = slots.get(i);
          if (!s) {
            if (i < sourceChars.length) out += sourceChars[i];
            continue;
          }
          if (s.removed) continue;
          out += s.value;
        }
        node.textContent = staticPrefix + out;

        if (allDone) {
          resolve();
        } else {
          rafId = requestAnimationFrame(frame);
        }
      }

      rafId = requestAnimationFrame(frame);
    });
  }

  async function runSequence() {
    node.textContent = staticPrefix + suffices[0];
    await sleep(startDelay);
    if (stopped) return;

    let current = 0;
    while (true) {
      const next = (current + 1) % texts.length;
      await morphText(suffices[current], suffices[next]);
      if (stopped) return;
      await sleep(holdFor(next));
      if (stopped) return;
      current = next;
    }
  }

function start() {
    if (!stopped) return;
    stopped = false;

    if (trigger === "intersect") {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            observer.disconnect();
            runSequence();
          }
        },
        { threshold: 0.6 }
      );
      observer.observe(node);
    } else if (trigger === "scroll") {
      // Only begin once the user has actually scrolled (scrollY > 0) far
      // enough for the element to enter the viewport. The intersection
      // observer does the visibility check; scrollY > 0 guards against pages
      // where the tagline is visible on load with no scrolling involved.
      const observer = new IntersectionObserver(
        (entries) => {
          if (
            entries.some((entry) => entry.isIntersecting) &&
            window.scrollY > 0
          ) {
            observer.disconnect();
            runSequence();
          }
        },
        { threshold: 0.6 }
      );
      observer.observe(node);
      // Fallback: if the page fits the viewport there is nothing to scroll,
      // so just run the delayed sequence instead of never starting.
      if (
        document.documentElement.scrollHeight <= window.innerHeight &&
        isVisible(node)
      ) {
        observer.disconnect();
        runSequence();
      }
    } else {
      runSequence();
    }
  }

  function stop() {
    stopped = true;
    clearTimeout(timerId);
    if (rafId) cancelAnimationFrame(rafId);
  }

  return { start, stop };
}

// Instance wiring for the index page ---------------------------------------------------------------------------
const FOOTER_TAGLINE = {
  el: "#tagline-transition",
  options: {
    texts: [
      "Designing harmony, one pixel at a time.",
      "Play a song close to my heart!",
    ],
    trigger: "scroll",
    startDelay: 2500,
    holdMs: [2500, 5000],
  },
};

const HERO_TITLE = {
  el: "#hero-title-transition",
  options: {
    texts: [
      "Hey I am Nina, a ux/ui designer.",
      "Hey I am Nina, a developer.",
      "Hey I am Nina, a vocalist.",
      "Hey I am Nina, an artist.",
    ],
    staticPrefix: "Hey I am Nina, ",
    trigger: "auto",
    startDelay: 2500,
    holdMs: 2500,
    chunkSize: 5,
    churnDuration: 240,
    batchGap: 70,
  },
};

const ifOnPage = (selector, fn) => {
  const el = document.querySelector(selector);
  if (el) fn(el);
};

document.addEventListener("DOMContentLoaded", () => {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  ifOnPage(FOOTER_TAGLINE.el, (el) => {
    if (reducedMotion) {
      el.textContent = FOOTER_TAGLINE.options.texts[1];
      return;
    }
    createTextTransition(el, FOOTER_TAGLINE.options).start();
  });

  ifOnPage(HERO_TITLE.el, (el) => {
    if (reducedMotion) return;
    createTextTransition(el, HERO_TITLE.options).start();
  });
});