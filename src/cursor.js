
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
const musicIcon = document.querySelector('.hover-image'); // Select the music icon element
const cursorText = document.querySelector('.cursor-text'); // Select the text inside the cursor

let mouseX = 0, mouseY = 0;  // To store mouse coordinates
let posX = 0, posY = 0;  // To store cursor position
let followX = 0, followY = 0;  // For the follower cursor

// Update mouse position on mousemove
document.addEventListener('mousemove', (e) => {
  mouseX = e.pageX;
  mouseY = e.pageY;
});

// Animate the cursor and follower
function animateCursor() {
  // Smoothly update cursor position
  posX += (mouseX - posX) / 9;
  posY += (mouseY - posY) / 9;

  // Smoothly update follower position
  followX += (posX - followX) / 10;
  followY += (posY - followY) / 10;

  // Move cursor and follower to the correct position
  cursor.style.left = `${posX - cursor.offsetWidth / 2}px`;  // Position the cursor
  cursor.style.top = `${posY - cursor.offsetHeight / 2}px`;

  follower.style.left = `${followX - follower.offsetWidth / 2}px`;  // Position follower
  follower.style.top = `${followY - follower.offsetHeight / 2}px`;

  requestAnimationFrame(animateCursor);  // Keep looping for smooth animation
}

// Start the animation loop
animateCursor();

// Hover effect for the music icon (to enlarge cursor and show text)
musicIcon.addEventListener('mouseenter', () => {
  cursor.classList.add('hovering');  // Add 'hovering' class on hover
  follower.classList.add('hovering');
  cursorText.style.display = 'block'; // Show the "About Me" text
});

musicIcon.addEventListener('mouseleave', () => {
  cursor.classList.remove('hovering');  // Remove 'hovering' class when hover ends
  follower.classList.remove('hovering');
  cursorText.style.display = 'none';    // Hide the "About Me" text
});
