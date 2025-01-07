class FooterComponent extends HTMLElement {
    constructor() {
      super();
  
      const shadow = this.attachShadow({ mode: "open" });
  
      shadow.innerHTML = `
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  
        <style>
          * {
            font-family: "Darker Grotesque", sans-serif;
          }
  
          footer {
            padding: 24px 64px 24px 64px;
            border-top: 1px solid black;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          header {
            font-size: 20px;
            color:#282544;
            font-weight: 500;

            }
  
          .social-links {
            display: flex;
            gap: 1rem;
          }

  
          a,
          span {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 2.75rem;
            height: 2.75rem;
            color: white;
            font-size: 1.5rem;
            border-radius: 50%;
            transition: 0.2s ease-in-out;
            text-decoration: none;
          }
  
          a.linkedin { background: #2563eb; }
          a.instagram { background: #f30559; }
          a.behance { background: #111827; }
          a.email { background: #008080; }
  
          a:hover, span:hover { opacity: 0.7; }
  
          @media (max-width: 768px) {
            footer {
              flex-direction: column;
              padding: 28px;
              gap: 24px;
            }
  
            .social-links {
              justify-content: center;
              margin-top: 0.5rem;
              gap: 16px;
            }
          }
        </style>
  
        <footer>
          <header>©2024, Designed and Coded by Nina Le</header>
          <div class="social-links">
            <a class="linkedin" href="https://www.linkedin.com/in/ninale65/" target="_blank">
              <i class="fa-brands fa-linkedin-in"></i>
            </a>
            <a class="instagram" href="https://www.instagram.com/ninmedias/" target="_blank">
              <i class="fa-brands fa-instagram"></i>
            </a>
            <a class="behance" href="https://www.behance.net/ninale1" target="_blank">
              <i class="fa-brands fa-behance"></i>
            </a>
            <a class="email" href="mailto:ninalle.65@gmail.com">
              <i class="fa-solid fa-envelope"></i>
            </a>
          </div>
        </footer>
      `;
    }
  }
  
  customElements.define("footer-component", FooterComponent);
  
  