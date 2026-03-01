function initSketch() {
  const sketch = function (p) {
    let oscillator;
    let playing = false;
    let currentNote = -1;
    let tempoMultiplier = 300;
    let draggedNoteIndex = -1;
    let hasTriggered = false;
    let animationTimer = 0;
    let lastHoveredIndex = -1;

    // max-w-7xl = 1280px
    const MAX_WIDTH = 1280;
    const MAX_HEIGHT = 600;

    let melody = [
      { note: "D4", dur: 3 },
      { note: "B4", dur: 3 },
      { note: "G3", dur: 3 },
      { note: "D3", dur: 3 },
      { note: "E3", dur: 1 },
      { note: "F#3", dur: 1 },
      { note: "G3", dur: 1 },
      { note: "E3", dur: 1.5 },
      { note: "G3", dur: 1.5 },
      { note: "D3", dur: 3 },
      { note: "A4", dur: 3 },
      { note: "D4", dur: 3 },
      { note: "B4", dur: 3 },
      { note: "G3", dur: 3 },
      { note: "E3", dur: 1 },
      { note: "G3", dur: 1 },
      { note: "G3", dur: 1 },
      { note: "A4", dur: 2 },
      { note: "B4", dur: 1 },
      { note: "A4", dur: 3 },
      { note: "B4", dur: 1 },
      { note: "C4", dur: 1 },
      { note: "B4", dur: 1 },
      { note: "A4", dur: 1 },
      { note: "D4", dur: 2 },
      { note: "B4", dur: 1 },
      { note: "A4", dur: 1 },
      { note: "G3", dur: 3 },
      { note: "A4", dur: 1 },
      { note: "B4", dur: 2 },
      { note: "G3", dur: 1 },
      { note: "E3", dur: 2 },
      { note: "G3", dur: 1 },
      { note: "E3", dur: 1 },
      { note: "D3", dur: 3 },
      { note: "E3", dur: 1 },
      { note: "G3", dur: 2 },
      { note: "B4", dur: 1 },
      { note: "A4", dur: 2 },
      { note: "D3", dur: 1 },
      { note: "G3", dur: 2 },
      { note: "B4", dur: 1 },
      { note: "A4", dur: 2 },
      { note: "B4", dur: 1 },
      { note: "C4", dur: 1 },
      { note: "D4", dur: 1 },
      { note: "B4", dur: 1 },
      { note: "G3", dur: 2 },
      { note: "A3", dur: 1 },
      { note: "A3", dur: 1 },
      { note: "G3", dur: 6 },
    ];

    let notePositions = {
      G4: -2,
      "F#4": -1,
      F4: -1,
      E4: 0,
      D4: 1,
      C4: 2,
      B4: -4,
      A4: -3,
      B3: 3,
      A3: 4,
      G3: 5,
      "F#3": 6,
      F3: 6,
      E3: 7,
      D3: 8,
    };

    let celestialSymbols = [
      "@",
      "♪",
      "^",
      "☆",
      "♡",
      "<",
      "#",
      "＊",
      "&",
      "!",
      "+",
      "~",
      "=",
      "?",
      "%",
      "♫",
      "o",
      "•",
      ".",
    ];
    let celestialColors = [];

    function getContainerWidth() {
      let container = document.getElementById("sketch-container");
      let rect = container
        ? container.getBoundingClientRect()
        : { width: p.windowWidth };
      return Math.min(Math.floor(rect.width) || p.windowWidth, MAX_WIDTH);
    }

    p.setup = function () {
      let w = getContainerWidth();
      let isMobile = w < 600;
      let canvasHeight = Math.min(
        isMobile ? p.windowHeight * 0.75 : p.windowHeight * 0.6,
        MAX_HEIGHT,
      );

      let cnv = p.createCanvas(w, canvasHeight);
      cnv.parent("sketch-container");
      cnv.style("display", "block");
      cnv.style("max-width", "100%");
      cnv.style("height", "auto");

      p.textAlign(p.CENTER, p.CENTER);
      p.textFont("Doto");
      p.colorMode(p.RGB, 255, 255, 255, 255);

      celestialColors = [
        p.color("#FA36A3"),
        p.color("#6FB5B6"),
        p.color("#D92731"),
      ];

      oscillator = new p5.Oscillator("square");
      oscillator.amp(0);

      for (let n of melody) {
        n.rX = p.random(-12, 12);
        n.rY = p.random(-15, 15);
        n.sizeVar = p.random(0.7, 1.1);
        n.jittOffset = p.random(100);
        n.offsetX = n.offsetY = 0;
        n.hue = p.random(celestialColors);
        n.parallaxMult = p.random(0.02, 0.06);
        n.opacity = 0;
        n.dropOffset = -400;
        n.myPersonalTrinkle = p.random(10, 40);
        n.char = p.random(celestialSymbols);
      }

      layoutNotes();
    };

    function layoutNotes() {
      let w = p.width;
      let isMobile = w < 600;

      let margin = isMobile ? 16 : 32;
      let maxLineWidth = w - margin * 2;

      let minRowHeight = 170;

      let rows = [[]];
      let currentRow = 0;
      let currentX = 0;

      for (let n of melody) {
        let noteW = 30 + n.dur * 3;
        if (currentX + noteW > maxLineWidth) {
          currentRow++;
          rows[currentRow] = [];
          currentX = 0;
        }
        rows[currentRow].push({ noteRef: n, width: noteW });
        currentX += noteW;
      }

      let contentHeight = rows.length * minRowHeight;
      let rowHeight;

      let topPadding = 64;
      let bottomPadding = 40;
      const mobileHeight = p.height - topPadding - bottomPadding;
      if (contentHeight > mobileHeight) {
        rowHeight = mobileHeight / rows.length;
      } else {
        rowHeight = minRowHeight;
        topPadding = (p.height - contentHeight) / 2 + 40;
      }

      let y = topPadding;
      for (let i = 0; i < rows.length; i++) {
        let totalRowWidth = rows[i].reduce((sum, item) => sum + item.width, 0);
        let startX = (w - totalRowWidth) / 2;
        let runningX = startX;

        for (let item of rows[i]) {
          let n = item.noteRef;
          let noteOffset = (notePositions[n.note] || 8) * 6;
          if (noteOffset > rowHeight - 30) {
            noteOffset = (noteOffset + 30) * rowHeight / 100;
          }

          n.targetX = runningX + item.width / 2;
          n.targetY = y + noteOffset;
          n.spawnDelay = y * 0.15 + n.myPersonalTrinkle;
          runningX += item.width;
        }
        y += rowHeight;
      }
    }

    p.windowResized = () => layoutNotes();

    p.draw = function () {
      p.background("#1B191B");

      let canvasRect = p.canvas.getBoundingClientRect();
      if (canvasRect.top < p.windowHeight - 20) hasTriggered = true;
      if (hasTriggered) animationTimer += 4;

      for (let i = 0; i < melody.length; i++) {
        let n = melody[i];

        if (animationTimer > n.spawnDelay) {
          n.dropOffset = p.lerp(n.dropOffset, 0, 0.1);
          n.opacity = p.lerp(n.opacity, 255, 0.1);
        }

        let bob = ["♪", "♫"].includes(n.char)
          ? p.sin(p.frameCount * 0.1 + n.jittOffset) * 4
          : 0;

        if (draggedNoteIndex !== i) {
          n.offsetX = p.lerp(n.offsetX, 0, 0.2);
          n.offsetY = p.lerp(n.offsetY, 0, 0.2);
        }

        let fx = n.targetX + n.rX + n.offsetX;
        let fy = n.targetY + n.rY + bob + n.offsetY + n.dropOffset;
        n.screenX = fx;
        n.screenY = fy;

        p.push();
        p.translate(fx, fy);

        let isActive = playing && i === currentNote;
        let isMusicNote = ["♪", "♫"].includes(n.char);
        let isHovered = p.dist(p.mouseX, p.mouseY, fx, fy) < 30 && !playing;
        let c = isActive || isMusicNote ? n.hue : p.color("#fcfcfc");

        if (isHovered && isMusicNote) {
          if (lastHoveredIndex !== i) {
            oscillator.setType("triangle");
            oscillator.freq(p.random(900, 1300));
            oscillator.amp(0.2, 0);
            oscillator.start();
            oscillator.amp(0, 0.05);
            lastHoveredIndex = i;
          }
          p.scale(1.4);
          p.rotate(p.sin(p.frameCount * 0.1) * 0.2);
          c = p.lerpColor(c, p.color("#fcfcfc"), 0.4);

          p.push();
          p.resetMatrix();
          let msg = "play song";
          p.textFont("Fragment Mono");
          p.textSize(14);
          let tw = p.textWidth(msg);
          p.noStroke();
          p.fill(0, 180);
          p.rectMode(p.CENTER);
          p.rect(p.mouseX + 38, p.mouseY - 10, tw + 32, 36, 10);
          p.fill("#fcfcfc");
          p.textAlign(p.CENTER, p.CENTER);
          p.text(msg, p.mouseX + 38, p.mouseY - 10);
          p.pop();
        } else if (lastHoveredIndex === i) {
          lastHoveredIndex = -1;
        }

        p.fill(p.red(c), p.green(c), p.blue(c), n.opacity);
        p.textSize(26 * n.sizeVar);
        p.text(n.char, 0, 0);

        if (isActive) {
          p.fill(p.red(n.hue), p.green(n.hue), p.blue(n.hue), n.opacity);
          p.textSize(16);
          p.text("✧", 20, -20);
          p.text("｡", -20, 20);
          p.text("ﾟ", -25, -10);
          p.text("+", 18, 18);
        }
        p.pop();
      }
    };

    function getHoveredNoteIndex() {
      for (let i = 0; i < melody.length; i++) {
        if (
          p.dist(p.mouseX, p.mouseY, melody[i].screenX, melody[i].screenY) < 30
        )
          return i;
      }
      return -1;
    }

    p.mousePressed = function () {
      if (p.getAudioContext().state !== "running") p.getAudioContext().resume();
      let i = getHoveredNoteIndex();
      if (i !== -1) {
        if (["♪", "♫"].includes(melody[i].char)) startMusic();
        else draggedNoteIndex = i;
      }
    };
    p.mouseDragged = function () {
      if (draggedNoteIndex !== -1) {
        melody[draggedNoteIndex].offsetX += p.movedX;
        melody[draggedNoteIndex].offsetY += p.movedY;
      }
    };
    p.mouseReleased = () => {
      draggedNoteIndex = -1;
    };

    function startMusic() {
      if (playing) return;
      playing = true;
      oscillator.start();
      playNote(0);
    }

    function playNote(i) {
      if (i >= melody.length) {
        oscillator.amp(0, 0.2);
        setTimeout(() => {
          oscillator.stop();
          playing = false;
          currentNote = -1;
        }, 200);
        return;
      }
      currentNote = i;
      let n = melody[i];
      oscillator.freq(noteToFreq(n.note));
      oscillator.amp(0.3, 0.05);
      setTimeout(
        () => {
          oscillator.amp(0, 0.05);
          n.char = p.random(celestialSymbols);
        },
        n.dur * tempoMultiplier - 50,
      );
      setTimeout(() => playNote(i + 1), n.dur * tempoMultiplier);
    }

    function noteToFreq(n) {
      return {
        D3: 146.83,
        E3: 164.81,
        F3: 174.61,
        "F#3": 185,
        G3: 196,
        A3: 220,
        B3: 246.94,
        C4: 261.63,
        D4: 293.66,
        E4: 329.63,
        F4: 349.23,
        "F#4": 369.99,
        G4: 392,
        A4: 440,
        B4: 493.88,
      }[n];
    }
  };

  new p5(sketch, document.getElementById("sketch-container"));
}

initSketch();
