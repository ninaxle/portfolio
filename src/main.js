document.addEventListener('DOMContentLoaded', () => {
  // Data for the awards
  const awards = [
      { date: "24/05", code: "02", title: "3rd Place in UX Protothon (Gaming)" },
      { date: "23/10", code: "03", title: "1st Place Tie-Winner in UX Design Category" },
      { date: "22/02", code: "04", title: "2nd Place in Student DESN’athon at YorkU" },
  ];

  // Find the container for the awards
  const awardsSection = document.querySelector('.awards-section');

  // Check if the container exists before proceeding
  if (awardsSection) {    
      // Create elements for each award
      awards.forEach(award => {
          // Main container for each award
          const awardDiv = document.createElement('div');
          awardDiv.className = 'award border border-grey p-4';

          // Container for the date and code
          const infoDiv = document.createElement('div');
          infoDiv.className = 'info flex justify-between mb-2';

          const dateElement = document.createElement('h4');
          dateElement.className = 'text-sm';
          dateElement.textContent = award.date;

          const codeElement = document.createElement('h4');
          codeElement.className = 'text-h3';
          codeElement.textContent = award.code;

          // Add date and code to the info container
          infoDiv.appendChild(dateElement);
          infoDiv.appendChild(codeElement);

          // Title for the award
          const titleElement = document.createElement('h4');
          titleElement.className = 'text-lg';
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
  // Data for the cards
  const cardsData = [
      {
          title: "HERE:AFTER",
          description: "2023 RGD WINNER | a mental health journaling application for students. My role involved UXR and crafting the journaling task flow.",
      },
      {
          title: "ACCESSICHAT",
          description: "2024 RGD Honourable Mention in Augmented Creativity | an AI-powered platform incorporating Augmentative and Alternative Communication (AAC) tools.",
      },
      {
          title: "ACCESSICHAT",
          description: "2024 RGD Honourable Mention in Augmented Creativity | an AI-powered platform incorporating Augmentative and Alternative Communication (AAC) tools.",
      },
      {
          title: "ACCESSICHAT",
          description: "2024 RGD Honourable Mention in Augmented Creativity | an AI-powered platform incorporating Augmentative and Alternative Communication (AAC) tools.",
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
          cardDiv.className = 'px-4 py-6 flex flex-col space-y-4 flex-1'; // Maintain existing classes

          // Inner card container
          const innerCardDiv = document.createElement('div');
          innerCardDiv.className = 'bg-beige h-60 w-full p-2 border-2 border-grey rounded-2xl';

          // Link for the card
          const link = document.createElement('a');
          link.href = '#content'; // Set the link destination

          // Append the link to the inner card container
          innerCardDiv.appendChild(link);

          // Title for the card
          const titleElement = document.createElement('p');
          titleElement.className = 'font-custom text-p'; // Use your existing styles
          titleElement.textContent = card.title;

          // Description for the card
          const descriptionElement = document.createElement('p');
          descriptionElement.className = 'font-custom text-p';
          descriptionElement.textContent = card.description;

          // Add the inner card and title to the main card container
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
  // Data for the cards
  const cardsData = [
      {
          title: "HERE:AFTER",
          description: "2023 RGD WINNER | a mental health journaling application for students. My role involved UXR and crafting the journaling task flow.",
      },
      {
          title: "ACCESSICHAT",
          description: "2024 RGD Honourable Mention in Augmented Creativity | an AI-powered platform incorporating Augmentative and Alternative Communication (AAC) tools.",
      },
      {
          title: "ACCESSICHAT",
          description: "2024 RGD Honourable Mention in Augmented Creativity | an AI-powered platform incorporating Augmentative and Alternative Communication (AAC) tools.",
      },
      {
          title: "ACCESSICHAT",
          description: "2024 RGD Honourable Mention in Augmented Creativity | an AI-powered platform incorporating Augmentative and Alternative Communication (AAC) tools.",
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
          cardDiv.className = 'px-4 py-6 flex flex-col space-y-4 flex-1'; // Maintain existing classes

          // Inner card container
          const innerCardDiv = document.createElement('div');
          innerCardDiv.className = 'bg-beige h-60 w-full p-2 border-2 border-grey rounded-2xl';

          // Link for the card
          const link = document.createElement('a');
          link.href = '#content'; // Set the link destination

          // Append the link to the inner card container
          innerCardDiv.appendChild(link);

          // Title for the card
          const titleElement = document.createElement('p');
          titleElement.className = 'font-custom text-p'; // Use your existing styles
          titleElement.textContent = card.title;

          // Description for the card
          const descriptionElement = document.createElement('p');
          descriptionElement.className = 'font-custom text-p';
          descriptionElement.textContent = card.description;

          // Add the inner card and title to the main card container
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

