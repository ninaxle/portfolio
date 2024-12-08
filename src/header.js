const headerTemplate = document.createElement("template");

headerTemplate.innerHTML = `
  <style>
    @import url('./global.styles.css'); /* Import global styles here */

    /* General Reset */
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
      position: sticky;
      top: 0;
      z-index: 1000;
      border-bottom: 1px solid #dcdcdc;
    }

    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 32px 72px; /* Desktop padding */
      padding-left: 32px; /* Desktop padding */

      margin: 0 auto;
      height: 96px;
    }

    /* Adjust padding for mobile */
    @media (max-width: 768px) {
      nav {
        padding: 16px; /* Smaller mobile padding */
      }
    }

    /* Logo Styling */
    nav a {
      text-decoration: none;
    }

    nav a img {
      height: 60px; /* Set your desired logo size */
    }

    /* Navigation Links */
    .nav-links {
      display: flex;
      gap: 3.25rem;
      list-style: none;
      align-items: center;
      font-weight: 400;
    }

    .nav-links li {
      list-style: none;
    }

    .nav-links li a {
      text-decoration: none;
      color: black;
      font-size: 1.1rem; /* Adjust size to make the fonts bigger */
      transition: color 0.3s ease;
    }

    .nav-links li a:hover {
      color: #ff6f61;
    }

    @media (max-width: 768px) {
  nav a img {
    height: 52px;
  }      .nav-links {
        display: none;
        flex-direction: column;
        gap: 1.5rem;
        background-color: white;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        padding: 16px; /* Add better mobile padding */
        border-bottom: 1px solid #dcdcdc;
      }

      .nav-links.open {
        display: flex;
      }

      .hamburger {
        display: block;
      }
    }

    @media (min-width: 768px) {
      .hamburger {
        display: none;
      }
    }

    /* Hamburger Icon */
    .hamburger img {
      height: 24px;
      cursor: pointer;
    }
  </style>

  <header>
    <nav>
      <!-- Logo container -->
      <a href="/"><img src="name.svg" alt="Logo"></a>

      <!-- Right-aligned nav links container -->
      <ul class="nav-links">
        <li><a href="index.html">Projects</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="archive.html">Archive</a></li>
      </ul>

      <!-- Hamburger Icon for Mobile -->
      <div class="hamburger">
        <img onclick="onToggleMenu(this)" src="ham.svg" alt="Menu">
      </div>
    </nav>
  </header>
`;

class Header extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(headerTemplate.content.cloneNode(true));
  }
}

customElements.define("header-component", Header);

function onToggleMenu(element) {
  const navLinks = element.closest("header").shadowRoot.querySelector(".nav-links");
  navLinks.classList.toggle("open");
}
