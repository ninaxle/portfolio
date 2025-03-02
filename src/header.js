const headerTemplate = document.createElement("template");

headerTemplate.innerHTML = `
  <style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
  }

  :host {
    display: block;
  }

  header {
    background: rgba(252, 252, 252, 1); /* Solid background */
    position: fixed;
    top: 20px; /* Move to the top */
    left: 50%;
    transform: translateX(-50%);
    width: 94%;
    padding: 24px 28px;
    border-radius: 16px;
    border: 1px solid #d3d3d3;
    transition: all 0.3s ease;
    z-index: 50;
  }

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 4rem;
  }

  .logo img {
    height: 32px; /* Adjust height as needed */
  }

  .nav-links {
    display: flex;
    gap: 2.5rem;
    list-style: none;
    font-weight: 500;
  }

  li {
    font-size: 20px;
  }

  a {
    color: #282544;
  }

  .contact-button {
    background-color: #211722;
    color: #fcfcfc;
    font-size: 20px;
    font-weight: 500;
    padding: 8px 16px;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }

  .contact-button:hover {
    background-color: #5e3c49;
    transform: scale(1.05);
  }

  #hamburger-icon {
    display: none;
    cursor: pointer;
    height: 24px;
  }



 @media (min-width: 1536px) { 
    .logo img {
      height: 40px; /* Adjust height as needed */
    }

    li {
      font-size: 24px;
    }
    
  .nav-links {
    display: flex;
    gap: 2.75rem;
    list-style: none;
    font-weight: 500;
  }

  .contact-button {
    font-size: 24px;
    padding: 8px 20px;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }
  
  }

  @media (max-width: 768px) {
    header {
      width: 100%;
      top: 0px;
      border: none;
      border-bottom: 1px solid #d3d3d3;
      border-radius: 0;
      border-bottom-left-radius: 16px;
      border-bottom-right-radius: 16px;
      padding: 16px 24px;
    }

    .logo img {
      height: 30px; /* Smaller logo size on mobile */
    }

    nav {
      flex-direction: row;
      justify-content: space-between;
      gap: 1rem;
    }

    .nav-links {
      flex-direction: column;
      gap: 1.25rem;
      display: none;
      background: rgba(252, 252, 252, 1);
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      padding: 16px;
      margin: 8px;
      border-radius: 16px;
      border-top: none;
      border: 1px solid #d3d3d3;
      padding-bottom: 32px;
      text-align: center;
      align-items: center;
    }

    .nav-links.open {
      display: flex;
    }

    #hamburger-icon {
      display: block;
    }
  }
  </style>

  <header>
    <nav>
      <a href="index.html" class="logo">
        <img src="logo88.png" alt="Logo">
      </a>
      <img src="ham.svg" id="hamburger-icon" alt="Menu">
      <ul class="nav-links">
        <li><a href="index.html">Projects</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="archive.html">Archive</a></li>
        <li><a href="mailto:ninalle.65@gmail.com" class="contact-button">Contact Me</a></li>
      </ul>
    </nav>
  </header>
`;

class Header extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(headerTemplate.content.cloneNode(true));

    this.headerElement = shadowRoot.querySelector("header");
    this.hamburgerIcon = shadowRoot.getElementById("hamburger-icon");
    this.navLinks = shadowRoot.querySelector(".nav-links");

    this.hamburgerIcon.addEventListener("click", this.toggleMenu.bind(this));
  }

  toggleMenu() {
    const isMenuOpen = this.navLinks.classList.contains("open");
    this.navLinks.classList.toggle("open", !isMenuOpen);
    document.body.classList.toggle("no-scroll", !isMenuOpen);
    this.hamburgerIcon.src = isMenuOpen ? "ham.svg" : "close.svg";
  }
}

customElements.define("header-component", Header);
