const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
const cursorText = document.querySelector('.cursor-text'); // Select the text inside the cursor

// Select all elements with the hover-image class (including links and images)
const hoverElements = document.querySelectorAll('.hover-image');

// Update mouse position on mousemove
let mouseX = 0, mouseY = 0; // To store mouse coordinates
let posX = 0, posY = 0; // To store cursor position
let followX = 0, followY = 0; // For the follower cursor

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
  cursor.style.left = `${posX - cursor.offsetWidth / 2}px`;
  cursor.style.top = `${posY - cursor.offsetHeight / 2}px`;

  follower.style.left = `${followX - follower.offsetWidth / 2}px`;
  follower.style.top = `${followY - follower.offsetHeight / 2}px`;

  requestAnimationFrame(animateCursor);
}

// Start the animation loop
animateCursor();

// Hover effect for all elements with the hover-image class
hoverElements.forEach((element) => {
  element.addEventListener('mouseenter', () => {
    cursor.classList.add('hovering'); // Add 'hovering' class on hover
    follower.classList.add('hovering');
    cursorText.style.display = 'block'; // Show the text

    // Check if it's an image or specific text link and change the cursor text accordingly
    if (element.querySelector('img')) {
      cursorText.textContent = "Open Link"; // Set cursor text for image elements
    } else if (element.tagName === "IMG" && element.alt === "Music Icon") {
        cursorText.textContent = "About Me"; // Set cursor text for music icon
    } else if (element.querySelector('h4') && element.querySelector('h4').textContent === "About") {
      cursorText.textContent = "About Me"; // Set cursor text for "About"
    } else if (element.querySelector('h4') && element.querySelector('h4').textContent === "Resume") {
      cursorText.textContent = "Resume"; // Set cursor text for "Resume"
    } else if (element.querySelector('h4') && element.querySelector('h4').textContent === "Archive") {
      cursorText.textContent = "Archive"; // Set cursor text for "Archive"
    } else {
      cursorText.textContent = "Open Link"; // Default text
    }
  });

  element.addEventListener('mouseleave', () => {
    cursor.classList.remove('hovering'); // Remove 'hovering' class when hover ends
    follower.classList.remove('hovering');
    cursorText.style.display = 'none'; // Hide the text
  });
});
