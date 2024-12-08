const headerTemplate = document.createElement("template");

headerTemplate.innerHTML = 
  `<style>
    @import url('./global.styles.css');

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    :host {
      display: block;
    }

    header {
      background-color: white;
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 1000;
      border-bottom: 1px solid #dcdcdc;
      transition: transform 0.3s ease; /* Smooth hide/show transition */
    }

    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 32px 72px;
      height: 96px;
    }

    nav a img {
      height: 60px;
    }

    .nav-links {
      display: flex;
      gap: 3.25rem;
      list-style: none;
      align-items: center;
      font-weight: 400;
    }

    @media (max-width: 768px) {
      nav {
        padding: 16px;
      }

      .nav-links {
        display: none;
        flex-direction: column;
        gap: 1.5rem;
        background-color: white;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        padding: 16px;
        border-bottom: 1px solid #dcdcdc;
      }

      .nav-links.open {
        display: flex;
      }
    }
  </style>

  <header>
    <nav>
      <a href="/"><img src="name.svg" alt="Logo"></a>
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

    this.lastScrollY = 0; 
    this.headerElement = shadowRoot.querySelector("header");

    this.isDesktop = window.matchMedia("(min-width: 768px)").matches;

    if (this.isDesktop) {
      window.addEventListener("scroll", this.handleScroll.bind(this));
    }

    window.matchMedia("(min-width: 768px)").addEventListener("change", (e) => {
      this.isDesktop = e.matches;

      if (this.isDesktop) {
        window.addEventListener("scroll", this.handleScroll.bind(this));
      } else {
        window.removeEventListener("scroll", this.handleScroll.bind(this));
        this.showHeader();
      }
    });
  }

  handleScroll() {
    const currentScrollY = window.scrollY;

    // Threshold to determine whether scrolling is 'significant'
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
