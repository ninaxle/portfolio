// Function to load HTML content into specified element
function loadHTML(file, elementId) {
  return fetch(file)
    .then(response => response.text())
    .then(data => {
      document.getElementById(elementId).innerHTML = data;
    });
}

// Concurrently load navbar and footer
Promise.all([
  loadHTML('navbar.html', 'navbar'),
  loadHTML('footer.html', 'footer'),
]).then(() => {
  // Get references to the hamburger icon and nav links
  const hamburgerIcon = document.querySelector('img[alt="Menu"]');
  const navLinks = document.querySelector('.nav-links');

  if (!hamburgerIcon && !navLinks) {
    return;
  }

  // Function to check if the screen width is small and show only the hamburger
  function handleScreenResize() {
    const isMobile = window.innerWidth <= 768; // Change to your breakpoint
    if (isMobile) {
      // Hide the nav links by default when on mobile
      navLinks.style.top = '-100%';  // Hide the menu off-screen
      hamburgerIcon.style.display = 'block';  // Show the hamburger icon
    } else {
      // On larger screens, show the menu and hide the hamburger
      navLinks.style.top = '0';  // Keep menu visible on larger screens
      hamburgerIcon.style.display = 'none';  // Hide the hamburger icon
    }
  }

  // Initial check when the page loads
  handleScreenResize();

  // Re-check when the window is resized
  window.addEventListener('resize', handleScreenResize);

  // Bind the hamburger menu functionality once navbar is loaded
  if (hamburgerIcon && navLinks) {
    hamburgerIcon.addEventListener('click', function () {
      // Check if the icon is currently 'close'
      const isMenuOpen = hamburgerIcon.src.includes('ham.svg');

      // Toggle icons
      hamburgerIcon.src = isMenuOpen ? 'close.svg' : 'ham.svg';

      // Toggle visibility classes
      navLinks.style.top = isMenuOpen ? '72px' : '-100%';  // Show/hide menu based on icon
    });
  }
}).catch(error => console.error('Error loading navbar or footer:', error));
