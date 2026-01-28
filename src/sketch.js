// // Daisy Bell - Midnight Moon Edition ☾ ⋆ ✧
// Draggable Stars: Drag non-music symbols; they snap back elastically.
// Click to Play: Clicking any ♪ or ♫ starts the song.
// Guaranteed Twinkle: Symbol always changes to something new after play.

let oscillator;
let playing = false;
let currentNote = -1; 
let tempoMultiplier = 300; 
let draggedNoteIndex = -1; 

// FULL MELODY
let melody = [
  // --- "Daisy, Daisy..." ---
  { note: "D4", dur: 3 }, { note: "B4", dur: 3 }, 
  { note: "G3", dur: 3 }, { note: "D3", dur: 3 }, 
  
  // --- "Give me your answer do" ---
  { note: "E3", dur: 1 }, { note: "F#3", dur: 1 }, { note: "G3", dur: 1 }, 
  { note: "E3", dur: 1.5 }, { note: "G3", dur: 1.5 }, { note: "D3", dur: 3 },

  // --- "I'm half cra-zy~..." ---
  { note: "A4", dur: 3 }, { note: "D4", dur: 3 },
  { note: "B4", dur: 3 }, { note: "G3", dur: 3 },

  // --- "All for the love of you" ---
  { note: "E3", dur: 1 }, { note: "G3", dur: 1 }, { note: "G3", dur: 1 }, 
  { note: "A4", dur: 2 }, { note: "B4", dur: 1 }, { note: "A4", dur: 3 },

  // --- "It won't be a stylish marriage~" --- 
  { note: "B4", dur: 1 }, { note: "C4", dur: 1 }, { note: "B4", dur: 1 },
  { note: "A4", dur: 1 }, { note: "D4", dur: 2 },
  { note: "B4", dur: 1 }, { note: "A4", dur: 1 }, { note: "G3", dur: 3 },

  // --- "I can't afford a carriage~" ---
  { note: "A4", dur: 1 }, { note: "B4", dur: 2 },
  /*aff-ford*/ { note: "G3", dur: 1 }, { note: "E3", dur: 2 },
  { note: "G3", dur: 1 }, //a
  { note: /*carr-age*/ "E3", dur: 1 }, { note: "D3", dur: 3 },

  // --- "But yoou'll~ look sweet, upon~ the seat" ---
  { note: "E3", dur: 1 }, { note: "G3", dur: 2 },
  { note: "B4", dur: 1 }, //look
  { note: "A4", dur: 2 },
  { note: "D3", dur: 1 }, { note: "G3", dur: 2 }, //up-on
  { note: "B4", dur: 1 }, //the
  { note: "A4", dur: 2 }, //seat

  // --- "Of a bi-cy-cle /built for/ twoo~" ---
  { note: "B4", dur: 1 }, { note: "C4", dur: 1 },
  { note: "D4", dur: 1 }, { note: "B4", dur: 1 }, { note: "G3", dur: 2 },
  { note: "A3", dur: 1 },   { note: "A3", dur: 1 },   { note: "G3", dur: 6 },
];

let notePositions = {
  "G4": -2, "F#4": -1, "F4": -1, "E4": 0, "D4": 1, "C4": 2, 
  "B4": -4, "A4": -3, 
  "B3": 3, "A3": 4, "G3": 5, "F#3": 6, "F3": 6, "E3": 7, "D3": 8 
};

let celestialSymbols = ["@", "♪","^", "☆", "♡", "<", "#", "＊", "&","!", "+", "~", "=", "?", "%", "♫","o", "•", "."];
let celestialColors = [334, 344, 218, 184];


function setup() {

  createCanvas(windowWidth, 700); 

  // 2. Attach it to your HTML div

  textAlign(CENTER, CENTER);
  textFont('Doto'); 
  colorMode(HSB, 360, 100, 100); 
  
 /* let btn = createButton("▶ Play Night Version");
  btn.position(width/2 - 70, height - 50);
  btn.mousePressed(startMusic);
  
  */

  oscillator = new p5.Oscillator('square'); 
  oscillator.amp(0); 

  for(let i = 0; i < melody.length; i++) {
    melody[i].rX = random(-15, 15);       
    melody[i].rY = random(-20, 20);       
    melody[i].sizeVar = random(0.6, 1.2); 
    melody[i].char = random(celestialSymbols);
    melody[i].hue = random(celestialColors);
    melody[i].jittOffset = random(100);
    
    // Physics properties
    melody[i].offsetX = 0; 
    melody[i].offsetY = 0; 
    melody[i].screenX = 0; 
    melody[i].screenY = 0; 
  }
}



function draw() {
  background('#211722'); 
  drawSheetMusic(50, 100);
  
push();          // Saves current drawing style
fill('red');     // Makes it bright red
noStroke();      // Removes the outline
rect(mouseX, mouseY, 50, 50); // Draws at mouse position
pop();           // Restores style so it doesn't mess up your stars
  
  // --- DYNAMIC CURSOR LOGIC ---
  let hoveringOver = getHoveredNoteIndex();
  
  if (draggedNoteIndex !== -1) {
    cursor('grabbing'); // Currently dragging
  } else if (hoveringOver !== -1) {
    let char = melody[hoveringOver].char;
    if (char === "♪" || char === "♫") {
      cursor('pointer'); // Play button cursor
    } else {
      cursor('grab'); // Draggable cursor
    }
  } else {
    cursor(ARROW);
  }
}

function drawSheetMusic(startX, startY) {
  let x = startX + 100; 
  let y = startY;
  let rowHeight = 130; 
  let rightMargin = width - 50; 
  let lineHeight = 12; 

  drawMoonClef(startX + 20, y);

  for (let i = 0; i < melody.length; i++) {
    let noteData = melody[i];
    let noteWidth = 35 + (noteData.dur * 5); 

    if (x + noteWidth > rightMargin) {
      x = startX + 100;
      y += rowHeight;
      drawMoonClef(startX + 20, y);
    }

    let pos = notePositions[noteData.note] || 8; 
    let noteY = y + (pos * (lineHeight / 2)); 
    
    let anchorX = x + noteData.rX;
    let anchorY = noteY + noteData.rY;
    
    // Bobbing for music notes
    let bob = 0;
    if (noteData.char === "♪" || noteData.char === "♫") {
        bob = floor(sin((frameCount * 0.15) + noteData.jittOffset) * 3);
    }

    // Elastic snap back
    if (draggedNoteIndex !== i) {
        noteData.offsetX = lerp(noteData.offsetX, 0, 0.2);
        noteData.offsetY = lerp(noteData.offsetY, 0, 0.2);
    }

    let finalX = anchorX + noteData.offsetX;
    let finalY = anchorY + bob + noteData.offsetY;

    noteData.screenX = finalX;
    noteData.screenY = finalY;

    push(); 
    translate(finalX, finalY);

   if (i === currentNote) {
      let sparkleWiggle = sin(frameCount * 0.3) * 5;
      fill(255);
      textSize(20);
      text("✧", 20, -20 + sparkleWiggle);
      text("｡", -20, 20 - sparkleWiggle);
      text("ﾟ", -25 + sparkleWiggle, -10);
      text("+", 15, 20 + sparkleWiggle);
      
      fill(255); 
      textSize(30 * noteData.sizeVar);
    } else {
      fill(noteData.hue, 40, 80); 
      textSize(30 * noteData.sizeVar); 
    }

    text(noteData.char, 0, 0); 
    pop(); 

    x += noteWidth; 
  }
}

// --- INTERACTION HANDLERS ---

// Helper to find what we are hovering over
function getHoveredNoteIndex() {
  for (let i = 0; i < melody.length; i++) {
    let d = dist(mouseX, mouseY, melody[i].screenX, melody[i].screenY);
    if (d < 20) return i;
  }
  return -1;
}

function mousePressed() {
  let index = getHoveredNoteIndex();
  
  if (index !== -1) {
    let char = melody[index].char;
    
    // IF MUSIC NOTE -> PLAY SONG
    if (char === "♪" || char === "♫") {
      startMusic();
    } 
    // IF OTHER SYMBOL -> START DRAGGING
    else {
      draggedNoteIndex = index;
    }
  }
}

function mouseDragged() {
  if (draggedNoteIndex !== -1) {
    let note = melody[draggedNoteIndex];
    note.offsetX += movedX;
    note.offsetY += movedY;
  }
}

function mouseReleased() {
  draggedNoteIndex = -1; 
}


// Function to draw "Trouble Chef" (Treble Clef) & 3/4 using Moons/Stars
function drawMoonClef(x, y) {
  push();
  translate(x, y);
  
  fill(0, 0, 90); 
  textSize(16);
  noStroke();
  
  text("☾", 0, -30);
  text("│", 0, -15);
  text("★", 0, 0); 
  text("│", 0, 15);
  text("☆", 0, 30);
  
  textSize(18);
  text("★o", 30, -10); 
  text("☾*", 30, 15);  
  
  pop();
}


function startMusic() {
  if (playing) return;
  userStartAudio(); 
  playing = true;
  oscillator.start(); 
  playNote(0);
}

function playNote(index) {
  if (index >= melody.length) {
    oscillator.amp(0, 0.1); 
    setTimeout(() => { oscillator.stop(); playing = false; currentNote = -1; }, 100);
    return;
  }
  
  currentNote = index;
  let noteData = melody[index];
  let durationMS = noteData.dur * tempoMultiplier;
  
  let freq = noteToFreq(noteData.note);
  if (freq) oscillator.freq(freq);
  oscillator.amp(0.3, 0.05); 
  
  setTimeout(() => { 
    oscillator.amp(0, 0.05); 
    
    // Change symbol
    let oldChar = melody[index].char;
    let newChar = oldChar;
    while (newChar === oldChar) {
      newChar = random(celestialSymbols);
    }
    melody[index].char = newChar;
    
  }, durationMS - 50); 
  
  setTimeout(() => { playNote(index + 1); }, durationMS);
}

function noteToFreq(note) {
  let notes = { 'D3': 146.83, 'E3': 164.81, 'F3': 174.61, 'F#3': 185.00, 'G3': 196.00, 'A3': 220.00, 'B3': 246.94, 'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'F#4': 369.99, 'G4': 392.00, 'A4': 440.00, 'B4': 493.88 };
  return notes[note];
}

