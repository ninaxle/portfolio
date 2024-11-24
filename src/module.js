// Function to load external HTML
function loadHTML(url, targetId) {
  return fetch(url)
      .then(response => response.text())
      .then(data => {
          document.getElementById(targetId).innerHTML = data;
      });
}

// Concurrently load navbar and footer
Promise.all([
  loadHTML('navbar.html', 'navbar'),
  loadHTML('footer.html', 'footer'),
]).then(() => {
  // Bind the hamburger menu functionality once navbar is loaded
  const hamburgerIcon = document.querySelector('img[alt="Menu"]');
  const navLinks = document.querySelector('.nav-links');

  if (hamburgerIcon && navLinks) {
      hamburgerIcon.addEventListener('click', function () {
          // Check if the icon is currently 'close'
          const isMenuOpen = hamburgerIcon.src.includes('/assets/close.svg');

          // Toggle icons
          hamburgerIcon.src = isMenuOpen ? '/assets/ham.svg' : '/assets/close.svg';

          // Toggle visibility classes
          navLinks.classList.toggle('top-[13%]'); // Show the menu
          navLinks.classList.toggle('top-[-100%]'); // Hide the menu
      });
  }
}).catch(error => console.error('Error loading navbar or footer:', error));
