class BackButton extends HTMLElement {
    constructor() {
      super();
  
      // Create a shadow DOM
      const shadow = this.attachShadow({ mode: 'open' });
  
      // Add HTML and CSS to the shadow DOM
      shadow.innerHTML = `
        <link rel="stylesheet" href="./global.styles.css">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
  
          a {
            text-decoration: none;
          }
  
          .back-button {
            padding-bottom: 0.25rem; /* pb-1 */
            width: 5rem; /* w-20 */
            height: 3rem; /* h-12 */
            border-radius: 9999px; /* rounded-full */
            border-top-left-radius: 0; /* rounded-tl-none */
            display: flex; /* flex */
            align-items: center; /* items-center */
            justify-content: center; /* justify-center */
            background-color: #ffffff; /* Default white background */
            color: #000000; /* Text color remains black (original state) */
            font-family: 'Darker Grotesque', sans-serif; /* Match original font */
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06); 
            cursor: pointer;
            transition: all 0.3s ease; /* transition-all duration-300 */
            transform-origin: top left; /* transform-origin: top left */
            border: none; /* Remove any border or stroke */
          }
  
          /* Responsive size for larger screens (md) */
          @media (min-width: 768px) {
            .back-button {
              width: 6rem;
              height: 4rem;
            }
  
            /* Animation for larger screens */
            .back-button:hover {
              background-color: #0B83FE; /* Hover background color set to #0B83FE */
              color: #ffffff; /* Text color changes to white on hover */
              transform: scale(1.5) rotate(12deg); /* hover:scale-150 hover:rotate-12 */
            }
          }
  
          /* Disable animation for small screens (mobile) */
          @media (max-width: 767px) {
            .back-button:hover {
              transform: none; /* Disable animation on mobile */
              background-color: #ffffff; /* Keep white background on hover for mobile */
              color: #000000; /* Keep original text color */
            }
          }
  
          h3 {
            text-align: center; /* text-center */
            margin: 0;
          }
        </style>
        <a href="index.html">
          <button class="back-button">
            <h3>Back</h3>
          </button>
        </a>
      `;
    }
  
    connectedCallback() {
      // Allow setting a custom link via the "link" attribute
      const link = this.getAttribute('link') || 'index.html';
      this.shadowRoot.querySelector('a').setAttribute('href', link);
    }
  }
  
  // Define the custom element
  customElements.define('back-button', BackButton);
  
  