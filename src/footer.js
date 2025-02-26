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
          padding: 48px 64px;
          border-top: 1px solid #C5C5C5;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        header {
          font-size: 22px;
          color: #282544;
          font-weight: 500;
        }

        .social-links {
          display: flex;
          gap: 1rem;
        }

        a {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 3rem;
          height: 3rem;
          font-size: 1.5rem;
          border-radius: 16px;
          text-decoration: none;
          transition: background 0.2s ease-in-out, box-shadow 0.3s ease-in-out;
          color: white;
        }

        /* Button Colors */
        a.linkedin {
          background: #4B52A2;
        }
        a.instagram {
          background: rgb(233, 41, 137);
        }
        a.behance {
          background: #211722;
        }
        a.email {
          background: #008080;
        }

        /* Hover Glow Effect (More Radius, Less Opacity) */
        a.linkedin:hover {
          box-shadow: 0 0 15px rgba(75, 82, 162, 0.3), 0 0 30px rgba(75, 82, 162, 0.2);
        }
        a.instagram:hover {
          box-shadow: 0 0 15px rgba(233, 41, 137, 0.3), 0 0 30px rgba(233, 41, 137, 0.2);
        }
        a.behance:hover {
          box-shadow: 0 0 15px rgba(33, 23, 34, 0.3), 0 0 30px rgba(33, 23, 34, 0.2);
        }
        a.email:hover {
          box-shadow: 0 0 15px rgba(0, 128, 128, 0.3), 0 0 30px rgba(0, 128, 128, 0.2);
        }

        @media (min-width: 1100px) {
          .social-links {
            gap: 2rem;
          }
          a {
            width: 7.5rem;
          }
        }

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
          a {
            width: 3rem;
            height: 3rem;
            border-radius: 12px;
          }
        }
      </style>

      <footer>
        <header>©2024, Designed and Coded by Nina Le :)</header>
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
