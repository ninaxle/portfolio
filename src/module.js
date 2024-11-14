
fetch('navbar.html')
.then(response => response.text())
.then(data => {
    document.getElementById('navbar').innerHTML = data;

    // Now that the navbar is loaded, bind the toggle function to the hamburger icon
    const hamburgerIcon = document.querySelector('img[alt="Menu"]');
    const navLinks = document.querySelector('.nav-links');

    // Toggle the nav menu on click
    if (hamburgerIcon) {
        hamburgerIcon.addEventListener('click', function () {
            // Check if the icon is the hamburger or close
            const isMenuOpen = hamburgerIcon.src.includes('/assets/close.svg');
            
            // Toggle the image between hamburger and close icons
            hamburgerIcon.src = isMenuOpen ? '/assets/ham.svg' : '/assets/close.svg';
            
            // Toggle the nav menu visibility using classes
            navLinks.classList.toggle('top-[13%]');  // Show the menu
            navLinks.classList.toggle('top-[-100%]');  // Hide the menu
      
        });
    }
});


// Load the navbar
fetch('footer.html')
  .then(response => response.text())
  .then(data => {
    // Assuming you have a div with id="navbar" in your HTML files
    document.getElementById('footer').innerHTML = data;
  });