
const footerTemplate = document.createElement("template");

footerTemplate.innerHTML = 
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
      background-color: #fcfcfc;
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 1000;
      border-bottom: 1px solid #282544;
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
