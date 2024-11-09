


/// Load the navbar dynamically into the index.html
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
            const isMenuOpen = hamburgerIcon.src.includes('../assets/ham.svg');
            
            // Toggle the image between hamburger and close icons
            hamburgerIcon.src = isMenuOpen ? '../assets/close.svg' : '../assets/ham.svg';
            
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






  document.addEventListener('DOMContentLoaded', () => {
    const awards = [
        { date: "/24.06", code: "(01)", title: "Honourable Mention in Augmented Creativity" },
        { date: "/24.05", code: "(02)", title: "3rd Place in UX Protothon (Gaming)" },
        { date: "/23.10", code: "(03)", title: "1st Place Tie-Winner in UX Design Category" },
        { date: "/22.02", code: "(04)", title: "2nd Place in Student DESN’athon at YorkU" },
    ];
  
    // Find the container for the awards
    const awardsSection = document.querySelector('.awards-section');
  
    // Check if the container exists before proceeding
    if (awardsSection) {    
      // Create elements for each award
      awards.forEach((award, index) => {
        // Main container for each award
        const awardDiv = document.createElement('div');
  
        // If it's not the last award, add the border-bottom
        awardDiv.className = index === awards.length - 1 
          ? 'award p-4 pr-3 md:pr-12 pb-10'  // No border for the last item
          : 'award border-b border-grey pb-10 p-4 pr-3 md:pr-12'; // Add border for all others
  
        // Container for the date and code
        const infoDiv = document.createElement('div');
        infoDiv.className = 'info flex justify-between mb-2';
  
        const dateElement = document.createElement('h4');
        dateElement.className = 'text-h4';
        dateElement.textContent = award.date;

        const codeElement = document.createElement('h4');
        codeElement.className = 'text-h4 hidden sm:block';  // Hide on mobile and show on larger screens
        codeElement.textContent = award.code;
  
        // Add date and code to the info container
        infoDiv.appendChild(codeElement);
        infoDiv.appendChild(dateElement);

  
        // Title for the award
        const titleElement = document.createElement('h3');
        titleElement.className = 'text-h3';
        titleElement.textContent = award.title;
  
        // Add the info and title to the award container
        awardDiv.appendChild(infoDiv);
        awardDiv.appendChild(titleElement);
  
        // Add the award container to the main awards section
        awardsSection.appendChild(awardDiv);
      });
    } else {
      console.error('Awards section not found in the HTML.');
    }
  });
  






//Cards uxui
document.addEventListener('DOMContentLoaded', () => {
    // Data for the cards with added image URLs
    const cardsData = [
      {
        title: "HERE:AFTER",
        description: "2023 RGD WINNER | a mental health journaling application for students. My role involved UXR and crafting the journaling task flow.",
        image: "https://tecdn.b-cdn.net/img/new/fluid/city/113.webp"
      },
      {
        title: "ACCESSICHAT",
        description: "2024 RGD Honourable Mention in Augmented Creativity | an AI-powered platform incorporating Augmentative and Alternative Communication (AAC) tools.",
        image: "https://tecdn.b-cdn.net/img/new/fluid/city/114.webp"
      },
      {
        title: "Project Example",
        description: "A description of another project example.",
        image: "https://tecdn.b-cdn.net/img/new/fluid/city/115.webp"
      },
      {
        title: "Project Example",
        description: "A description of another project example.",
        image: "https://tecdn.b-cdn.net/img/new/fluid/city/115.webp"
      },
      // Add more card data as needed
    ];
  
    // Find the container for the cards
    const cardsSection = document.querySelector('.cards-section');
  
    // Check if the container exists before proceeding
    if (cardsSection) {
      // Create elements for each card
      cardsData.forEach(card => {

        // Main container for each card
        const cardDiv = document.createElement('div');
        cardDiv.className = 'px-4 py-6 flex flex-col space-y-4 flex-1';
  
        // Inner card container with image
        const innerCardDiv = document.createElement('div');
        innerCardDiv.className = 'bg-beige h-60 w-full border-2 border-egg rounded-2xl relative overflow-hidden';
  
        // Image for the card
        const imageElement = document.createElement('img');
        imageElement.src = card.image;
        imageElement.alt = card.title;
        imageElement.className = 'w-full h-full object-cover transition duration-300 ease-in-out hover:scale-110';
  
        // Append the image to the inner card container
        innerCardDiv.appendChild(imageElement);
  
        // Title for the card
        const titleElement = document.createElement('h4');
        titleElement.className = 'font-custom text-h4';
        titleElement.textContent = card.title;
  
        // Description for the card
        const descriptionElement = document.createElement('p');
        descriptionElement.className = 'font-custom text-p';
        descriptionElement.textContent = card.description;
  
        // Append elements to the main card container
        cardDiv.appendChild(innerCardDiv);
        cardDiv.appendChild(titleElement);
        cardDiv.appendChild(descriptionElement);
  
        // Add the card container to the main cards section
        cardsSection.appendChild(cardDiv);
      });
    } else {
      console.error('Cards section not found in the HTML.');
    }
  });



//cards brand
document.addEventListener('DOMContentLoaded', () => {
    // Data for the cards with added image URLs
    const cardsData = [
      {
        title: "HERE:AFTER",
        description: "2023 RGD WINNER | a mental health journaling application for students. My role involved UXR and crafting the journaling task flow.",
        image: "https://tecdn.b-cdn.net/img/new/fluid/city/113.webp"
      },
      {
        title: "ACCESSICHAT",
        description: "2024 RGD Honourable Mention in Augmented Creativity | an AI-powered platform incorporating Augmentative and Alternative Communication (AAC) tools.",
        image: "https://tecdn.b-cdn.net/img/new/fluid/city/114.webp"
      },
      {
        title: "Project Example",
        description: "A description of another project example.",
        image: "https://tecdn.b-cdn.net/img/new/fluid/city/115.webp"
      },
      {
        title: "Project Example",
        description: "A description of another project example.",
        image: "https://tecdn.b-cdn.net/img/new/fluid/city/115.webp"
      },
      // Add more card data as needed
    ];
  
    // Find the container for the cards
    const cardsSection = document.querySelector('.cards-section2');
  
    // Check if the container exists before proceeding
    if (cardsSection) {
      // Create elements for each card
      cardsData.forEach(card => {

        // Main container for each card
        const cardDiv = document.createElement('div');
        cardDiv.className = 'px-4 py-6 flex flex-col space-y-4 flex-1';
  
        // Inner card container with image
        const innerCardDiv = document.createElement('div');
        innerCardDiv.className = 'bg-beige h-60 w-full border-2 border-egg rounded-2xl relative overflow-hidden';
  
        // Image for the card
        const imageElement = document.createElement('img');
        imageElement.src = card.image;
        imageElement.alt = card.title;
        imageElement.className = 'w-full h-full object-cover transition duration-300 ease-in-out hover:scale-110';
  
        // Append the image to the inner card container
        innerCardDiv.appendChild(imageElement);
  
        // Title for the card
        const titleElement = document.createElement('h4');
        titleElement.className = 'font-custom text-h4';
        titleElement.textContent = card.title;
  
        // Description for the card
        const descriptionElement = document.createElement('p');
        descriptionElement.className = 'font-custom text-p';
        descriptionElement.textContent = card.description;
  
        // Append elements to the main card container
        cardDiv.appendChild(innerCardDiv);
        cardDiv.appendChild(titleElement);
        cardDiv.appendChild(descriptionElement);
  
        // Add the card container to the main cards section
        cardsSection.appendChild(cardDiv);
      });
    } else {
      console.error('Cards section not found in the HTML.');
    }
  });

