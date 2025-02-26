const headerTemplate = document.createElement("template");

headerTemplate.innerHTML = 
  `<style>

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
    background-color: #fcfcfc;
    position: fixed; /* Keep header fixed on top of the page */
    top: 0;
    width: 100%;
    z-index: 50; /* Higher z-index so it's above the content */
    border-bottom: 1px solid #C5C5C5;
    transition: transform 0.3s ease;
  }

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 60px;
    height: 96px;
  }

  nav a img {
    height: 48px; /* Keep logo size as original */
  }

  .nav-links {
    display: flex;
    gap: 3.25rem;
    list-style: none;
    align-items: center;
    font-weight: 500;
  }

  li {
    font-size: 20px;
  }

  a {
    color: #282544;
  }

  #hamburger-icon {
    display: none;
    cursor: pointer;
  }

  /* For desktops 1440px and above (increase only horizontal padding) */
  @media (min-width: 1440px) {
    header {
      padding-right: 32px; 
      padding-left: 16px;
    }

    nav a img {
      height: 48px; /* Keep logo size as original */
    }
  }

  /* For mobile devices 768px and below */
  @media (max-width: 768px) {
    header {
      position: fixed; /* Keep it fixed even on mobile */
      top: 0;
      z-index: 100; /* Ensure header stays above the image */
    }

    nav {
      padding: 16px;
      height: 60px;
      background-color: #FFFFFF;
    }

    nav a img {
      height: 36px;
    }

    .nav-links {
      display: none;
      flex-direction: column;
      gap: 1.5rem;
      background-color: #fcfcfc;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      padding: 32px;
      border-top: 1px solid #282544;
      border-bottom: 1px solid #282544;
    }

    .nav-links.open {
      display: flex;
    }

    #hamburger-icon {
      display: block;
      height: 24px;
    }
  }
</style>


  <header>
    <nav>
      <a href="/"><img src="name.svg" alt="Logo"></a>
      <img src="ham.svg" id="hamburger-icon" alt="Menu">
      <ul class="nav-links">
        <li><a href="index.html">Projects</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="archive.html">Archive</a></li>
      </ul>
    </nav>
  </header>`;


class Header extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(headerTemplate.content.cloneNode(true));

    this.headerElement = shadowRoot.querySelector("header");
    this.hamburgerIcon = shadowRoot.getElementById("hamburger-icon");
    this.navLinks = shadowRoot.querySelector(".nav-links");
    this.lastScrollY = 0;

    this.setupListeners();
  }

  setupListeners() {
    // Detect desktop viewport
    this.isDesktop = window.matchMedia("(min-width: 768px)").matches;
    this.updateScrollBehavior();

    // Listen for viewport size changes
    window.matchMedia("(min-width: 768px)").addEventListener("change", (e) => {
      this.isDesktop = e.matches;
      this.updateScrollBehavior();
    });

    // Bind hamburger menu toggle
    this.hamburgerIcon.addEventListener("click", this.toggleMenu.bind(this));
  }

  updateScrollBehavior() {
    if (this.isDesktop) {
      // Add scroll behavior for desktop
      this.headerElement.style.position = "fixed"; // Explicitly set fixed for desktop
      window.addEventListener("scroll", this.handleScroll.bind(this));
      this.showHeader();
    } else {
      // Remove scroll behavior for mobile
      this.headerElement.style.position = "fixed"; // Keep fixed for mobile
      window.removeEventListener("scroll", this.handleScroll.bind(this));
      this.showHeader(); // Ensure header is visible on transition to mobile
    }
  }

  handleScroll() {
    const currentScrollY = window.scrollY;
    const scrollThreshold = 100;

    if (currentScrollY < scrollThreshold) {
      this.showHeader();
      return;
    }

    if (currentScrollY > this.lastScrollY && currentScrollY > scrollThreshold) {
      // If scrolling down and past threshold
      this.hideHeader();
    } else if (currentScrollY < this.lastScrollY) {
      // If scrolling up
      this.showHeader();
    }

    this.lastScrollY = currentScrollY;
  }

  toggleMenu() {
    const isMenuOpen = this.navLinks.classList.contains("open");
    this.navLinks.classList.toggle("open", !isMenuOpen);
    document.body.classList.toggle("no-scroll", !isMenuOpen); // Prevent scrolling
    this.hamburgerIcon.src = isMenuOpen ? "ham.svg" : "close.svg"; // Update icon
  }

  hideHeader() {
    if (this.headerElement) {
      this.headerElement.style.transform = "translateY(-100%)";
    }
  }

  showHeader() {
    if (this.headerElement) {
      this.headerElement.style.transform = "translateY(0)";
    }
  }
}

customElements.define("header-component", Header);
