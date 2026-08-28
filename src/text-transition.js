// Rolls the footer tagline "Designing harmony, one pixel at a time." into
// "Play a song that holds a special place in my heart" and back, in an
// infinite loop.
//
// Effect: all characters blink together on a shared, slow tick (a
// synchronized flicker, not a rolling wave) — then, after a short hold,
// letters lock into place one at a time, left to right, at a steady pace.
// Characters still blinking keep flickering in sync until their turn to
// lock arrives. Extra target characters are appended as fresh blinking
// slots; extra source characters are dropped once their turn arrives.
//
// An 8s delay precedes the first run, then it loops forever.
const ELEMENT_SELECTOR = "#tagline-transition";
const ORIGINAL_TEXT = "Designing harmony, one pixel at a time.";
const TARGET_TEXT = "Play a song that holds a special place in my heart :)";

const SCRAMBLE_CHARS = "`~!@#$%^&*()-_=+[]{}|;:,.<>/?\\()0123456789";
const INITIAL_DELAY = 1000; // wait before the first run
const PAUSE_BETWEEN_LOOPS = 2500; // pause after returning to the original line
const HOLD_AFTER_FORWARD = 3000; // pause once the target line is complete

const BLINK_INTERVAL = 200; // ms between synchronized symbol changes (gentle, shared tick)
const PRE_REVEAL_HOLD = 750; // ms all characters blink together before any lock in
const REVEAL_STAGGER = 72; // ms between each subsequent character locking, left to right

const el = document.querySelector(ELEMENT_SELECTOR);

if (el && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  el.textContent = TARGET_TEXT;
} else if (el) {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        observer.disconnect();
        setTimeout(() => startTransition(el), INITIAL_DELAY);
      }
    },
    { threshold: 0.6 }
  );
  observer.observe(el);
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function randomScrambleChar() {
  return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
}

// Morphs the visible text from `fromText` to `toText`. Every character
// blinks in unison on a shared BLINK_INTERVAL tick until its individual
// reveal time arrives (PRE_REVEAL_HOLD + index * REVEAL_STAGGER), at which
// point it locks onto the target letter (or, if the target line is
// shorter, is simply dropped).
function morphText(node, fromText, toText) {
  const sourceChars = [...fromText];
  const targetChars = [...toText];
  const maxIndex = Math.max(sourceChars.length, targetChars.length);

  const values = new Array(maxIndex);
  for (let i = 0; i < maxIndex; i++) {
    values[i] = i < sourceChars.length ? sourceChars[i] : randomScrambleChar();
  }

  const revealTime = (i) => PRE_REVEAL_HOLD + i * REVEAL_STAGGER;

  return new Promise((resolve) => {
    const start = performance.now();
    let lastTick = -1;

    function frame(now) {
      const t = now - start;
      const tick = Math.floor(t / BLINK_INTERVAL);
      const isNewTick = tick !== lastTick;
      if (isNewTick) lastTick = tick;

      let allDone = true;
      let out = "";

      for (let i = 0; i < maxIndex; i++) {
        const locked = t >= revealTime(i);

        if (locked) {
          if (i < targetChars.length) {
            values[i] = targetChars[i];
            out += values[i];
          }
          // else: dropped, contributes nothing
        } else {
          allDone = false;
          if (isNewTick) values[i] = randomScrambleChar();
          out += values[i];
        }
      }

      node.textContent = out;

      if (allDone) {
        resolve();
      } else {
        requestAnimationFrame(frame);
      }
    }

    requestAnimationFrame(frame);
  });
}

async function startTransition(node) {
  while (true) {
    await morphText(node, ORIGINAL_TEXT, TARGET_TEXT);
    await delay(HOLD_AFTER_FORWARD);
    await morphText(node, TARGET_TEXT, ORIGINAL_TEXT);
    await delay(PAUSE_BETWEEN_LOOPS);
  }
}