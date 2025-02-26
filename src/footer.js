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
          padding: 48px 64px 48px 64px;
          border-top: 1px solid #C5C5C5;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        header {
          font-size: 22px;
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
          width: 3rem;
          height: 3rem;
          color: white;
          font-size: 1.5rem;
          border-radius: 16px;
          transition: 0.2s ease-in-out;
          text-decoration: none;
        }
/* Even richer, vibrant gradients */
a.linkedin {
  background: #4B52A2; /* Deep, bold LinkedIn purple */
}
a.instagram {
  background: #FF096B; /* Vibrant, intense Instagram pink */
}
a.behance {
  background: #211722; /* Richer, more intense Behance purple */
}
a.email {
  background: #0D9960; /* Bold, vibrant teal */
}



        a:hover, span:hover { opacity: 0.7; }

 @media (min-width: 1100px) {

        .social-links {
          gap: 2rem;
        }

        a,
        span {
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

        a,
        span {
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
