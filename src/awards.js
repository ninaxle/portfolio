

document.addEventListener('DOMContentLoaded', () => {
  const awards = [
    { date: "2023–2024", code: "RGD Student Awards x 2", title: "1st Place Tie-Winner in Forbes UX Design & Honourable Mention in Augmented Creativity" },
    { date: "2024", code: "DubsTech & Design Buddies Protothon", title: "3rd Place Winner in Gaming Track" },
    { date: "2022", code: "DSA Winter DESN'athon @ York University", title: "2nd Place Winner in designing for Student Enpowerment" },
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
        ? 'award  flex items-center pt-6 justify-between'  // No border for the last item
        : 'award border-b border-grey py-6  flex items-center justify-between'; // Add border for all others

      // Container for the code and title
      const detailsDiv = document.createElement('div');
      detailsDiv.className = 'details flex flex-col flex-1';

      const codeElement = document.createElement('p');
      codeElement.className = 'text-p';  // Hide on mobile and show on larger screens
      codeElement.textContent = award.code;

      const titleElement = document.createElement('h4');
      titleElement.className = 'text-h4';
      titleElement.textContent = award.title;

      // Add code and title to the details container
      detailsDiv.appendChild(codeElement);
      detailsDiv.appendChild(titleElement);

      // Year (Date) element - Aligned to the right
      const dateElement = document.createElement('p');
      dateElement.className = 'text-p text-right ml-4 min-w-[4rem]'; // Margin left for spacing
      dateElement.textContent = award.date;

      // Add the details and date to the award container
      awardDiv.appendChild(detailsDiv);
      awardDiv.appendChild(dateElement);

      // Add the award container to the main awards section
      awardsSection.appendChild(awardDiv);
    });
  } else {
    console.error('Awards section not found in the HTML.');
  }
});
