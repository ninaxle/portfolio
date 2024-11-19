

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
          ? 'award p-4 pr-3 md:pr-12'  // No border for the last item
          : 'award border-b border-grey pb-10 p-2 pr-3 md:pr-12'; // Add border for all others
  
        // Container for the date and code
        const infoDiv = document.createElement('div');
        infoDiv.className = 'info flex justify-between mb-2';
  
        const dateElement = document.createElement('p');
        dateElement.className = 'text-p';
        dateElement.textContent = award.date;

        const codeElement = document.createElement('p');
        codeElement.className = 'text-p hidden sm:block';  // Hide on mobile and show on larger screens
        codeElement.textContent = award.code;
  
        // Add date and code to the info container
        infoDiv.appendChild(codeElement);
        infoDiv.appendChild(dateElement);

  
        // Title for the award
        const titleElement = document.createElement('p');
        titleElement.className = 'text-p';
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
  