const headerTemplate = document.createElement("template");

headerTemplate.innerHTML = /* html */ `
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      text-decoration: none;
      font-family: "Fragment Mono", monospace;
      letter-spacing: -0.04em;
      font-weight: 400;
    }

    :host {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 9999;
      pointer-events: none;
    }

    /* ─── CONTAINER ─────────────────────────────────────────── */
    .container {
      width: 100%;
      display: flex;
      justify-content: center;
      pointer-events: none;
      transition: opacity 0.4s ease, transform 0.4s ease;
    }

    .container.hidden {
      opacity: 0;
      transform: translateY(-20px);
      pointer-events: none;
    }

    /* ─── HEADER PILL ───────────────────────────────────────── */
    header {
      position: relative;
      background: rgba(252, 252, 252, 1);
      width: auto;
      min-width: min-content;
      max-width: calc(100vw - 16px);
      margin-top: 1rem;
      padding: 8px;
      border-radius: 20px;
      border: 1px solid #d3d3d3;
      transition: all 0.3s ease;
      pointer-events: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 4px;
    }

    /* ─── NAV LINKS ─────────────────────────────────────────── */
    nav {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 4px;
    }

    .nav-links {
      position: relative;
      display: flex;
      gap: 4px;
      list-style: none;
      font-weight: 500;
      align-items: center;
    }

    li { font-size: 14px; flex-shrink: 0; }

    .nav-links a {
      color: #8C8A98;
      padding: 8px 16px;
      border-radius: 12px;
      display: inline-block;
      cursor: pointer;
      transition: color 0.2s ease, background-color 0.2s ease;
    }

    /* Project-mode nav: gray hover, black active (pill slides over it) */
    .nav-links a:hover {
      background-color: #EDEBEE;
      color: #1B191B;
    }

    .nav-links a.active {
      background-color: #1B191B !important;
      color: #fff !important;
    }

    /* White text while the black pill sits underneath (project nav) */
    .nav-links a.nav-on { color: #fff !important; }

    /* Default-mode nav (sliding indicator): no gray hover, pill handles state */
    .nav-links.indicator-mode a:hover {
      background-color: transparent;
      color: #1B191B;
    }

    .nav-links.indicator-mode a.active {
      background-color: transparent !important;
      color: #8C8A98 !important;
    }

    /* Lift link text above the sliding pill */
    .nav-links a span {
      position: relative;
      z-index: 3;
    }

    .nav-links.indicator-mode a.nav-on { color: #fff !important; }

    .nav-indicator {
      position: absolute;
      left: 0;
      top: 0;
      height: 36px;
      border-radius: 12px;
      background: #1B191B;
      z-index: 2;
      pointer-events: none;
      will-change: transform, width;
    }

    /* ─── PROJECT BUTTON ────────────────────────────────────── */
.project-button {
  background-color: #1B191B;
  color: #fff;
  padding: 8px 16px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
  user-select: none;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.project-button.unlit {
  background-color: #EDEBEE;
  color: #1B191B;
}

.project-button span {
  position: relative;
  z-index: 3;
}

.project-button:hover {
  background-color: #333;
}

    /* ─── CLOSE BUTTON ──────────────────────────────────────── */
    .close-button {
      cursor: pointer;
      padding: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 12px;
      transition: background 0.2s;
    }

    .close-button:hover {
      background-color: #f0f0f0;
    }

    .close-button img {
      width: 20px;
      height: 20px;
    }

    /* ─── HAMBURGER BUTTON ──────────────────────────────────── */
    .hamburger-button {
      cursor: pointer;
      padding: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 12px;
      transition: background 0.2s;
    }

    .hamburger-button:hover {
      background-color: #f0f0f0;
    }

    .hamburger-button img {
      width: 20px;
      height: 20px;
    }

    /* ─── DROPDOWN ──────────────────────────────────────────── */
    .dropdown {
      position: relative;
      display: inline-block;
    }

    .dropdown-content {
      display: none;
      position: absolute;
      top: calc(100% + 0.5rem);
      left: 0;
      background: rgba(252, 252, 252, 1);
      border: 1px solid #d3d3d3;
      border-radius: 12px;
      min-width: 220px;
      z-index: 100;
      padding: 8px 0;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .dropdown-content.show {
      display: block;
    }

    .dropdown-content a {
      color: #8C8A98;
      padding: 10px 16px;
      display: block;
      font-size: 14px;
      transition: all 0.2s;
    }

    .dropdown-content a:hover {
      background-color: #f0f0f0;
      color: #1B191B;
    }

    /* ─── HAMBURGER MENU DROPDOWN ───────────────────────────── */
    .ham-dropdown {
      display: none;
      position: absolute;
      top: calc(100% + 0.5rem);
      right: 0;
      background: rgba(252, 252, 252, 1);
      border: 1px solid #d3d3d3;
      border-radius: 12px;
      min-width: 180px;
      z-index: 10000;
      padding: 8px 0;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .ham-dropdown.show {
      display: block;
    }

    .ham-dropdown a {
      color: #8C8A98;
      padding: 10px 16px;
      display: block;
      font-size: 14px;
      transition: all 0.2s;
    }

    .ham-dropdown a:hover {
      background-color: #f0f0f0;
      color: #1B191B;
    }

    /* ─── NAV LAYOUT SLOTS ──────────────────────────────────── */
    .nav-left,
    .nav-center,
    .nav-right {
      min-width: 0;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .nav-right {
      position: relative;
    }

    /* Hamburger only shows on mobile (default mode) */
    .hamburger-button {
      display: none;
    }

    /* Project mode: hamburger never shows at all */
    .project-ham {
      display: none !important;
    }

    /* ─── MOBILE ────────────────────────────────────────────── */
    @media (max-width: 768px) {
      .container {
        justify-content: stretch;
      }

      header {
        width: 100%;
        margin-top: 0;
        border-radius: 0;
        padding: 16px;
      }

      /* Hide desktop center nav on mobile */
      .nav-center {
        display: none;
      }

      /* The sliding pill lives in the header, so hide it explicitly */
      .nav-indicator {
        display: none;
      }

      /* Show hamburger on mobile (default mode only) */
      .hamburger-button {
        display: flex;
      }

      .ham-dropdown {
        right: 0;
        top: calc(100% + 0.75rem);
      }

      .dropdown-content {
        left: 0;
        top: calc(100% + 0.75rem);
      }

      /* Disable hover states on mobile */
      .nav-links a:hover,
      .project-button:hover,
      .close-button:hover,
      .hamburger-button:hover,
      .dropdown-content a:hover,
      .ham-dropdown a:hover {
        background-color: transparent;
        color: inherit;
      }
    }
  </style>

  <div class="container" id="header-container">
    <header>
      <div class="nav-left" id="nav-left"></div>
      <div class="nav-center" id="nav-center"></div>
      <div class="nav-right" id="nav-right"></div>
    </header>
  </div>
`;

class Header extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(headerTemplate.content.cloneNode(true));

    this.container = shadowRoot.getElementById("header-container");
    this.navLeft = shadowRoot.getElementById("nav-left");
    this.navCenter = shadowRoot.getElementById("nav-center");
    this.navRight = shadowRoot.getElementById("nav-right");
    this.header = shadowRoot.querySelector("header");

    this.handleScroll = this.handleScroll.bind(this);
  }

  connectedCallback() {
    window.addEventListener("scroll", this.handleScroll);

    const isProjectPage = this.hasAttribute("project-page");
    if (isProjectPage) {
      this.setupProjectMode();
    } else {
      this.setupDefaultMode();
    }
  }

  disconnectedCallback() {
    window.removeEventListener("scroll", this.handleScroll);
    if (this._onResize) {
      window.removeEventListener("resize", this._onResize);
      this._onResize = null;
    }
  }

  /* ── DEFAULT MODE ──────────────────────────────────────────── */
  setupDefaultMode() {
    // Desktop center nav
    this.navCenter.innerHTML = `
      <ul class="nav-links indicator-mode">
        <li><a href="index.html"><span>WORKS</span></a></li>
        <li><a href="archive.html"><span>PLAYGROUND</span></a></li>
        <li><a href="about.html"><span>ABOUT</span></a></li>
        <li><a href="resume/Nina Le-Resume.pdf" target="_blank"><span>RESUME</span></a></li>
      </ul>
    `;
    this.setActiveLink();
    const defaultLinks = Array.from(
      this.navCenter.querySelectorAll(".nav-links a"),
    );
    const defaultActive =
      this.navCenter.querySelector(".nav-links a.active") || defaultLinks[0];
    this.setupIndicator(defaultLinks, defaultActive);

    // Mobile right: hamburger that opens the same links
    this.navRight.innerHTML = `
      <div class="hamburger-button" id="ham-btn">
        <img src="ham.svg" alt="Menu" id="ham-icon" />
      </div>
      <div class="ham-dropdown" id="ham-dropdown">
        <a href="index.html">WORKS</a>
        <a href="archive.html">PLAYGROUND</a>
        <a href="about.html">ABOUT</a>
        <a href="resume/Nina Le-Resume.pdf" target="_blank">RESUME</a>
      </div>
    `;

    const hamBtn = this.shadowRoot.getElementById("ham-btn");
    const hamIcon = this.shadowRoot.getElementById("ham-icon");
    const hamDropdown = this.shadowRoot.getElementById("ham-dropdown");

    hamBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = hamDropdown.classList.toggle("show");
      hamIcon.src = open ? "close.svg" : "ham.svg";
    });

    document.addEventListener("click", () => {
      hamDropdown.classList.remove("show");
      if (hamIcon) hamIcon.src = "ham.svg";
    });
  }

  /* ── PROJECT MODE ──────────────────────────────────────────── */
  setupProjectMode() {
    const projectName = this.getAttribute("project-name") || "";

    const allProjects = [
      { name: "Radiate", link: "radiate.html" },
      { name: "Melio", link: "melio.html" },

      { name: "Here:after", link: "hereafter.html" },
      { name: "Accessichat", link: "accessichat.html" },
      { name: "Accelerator", link: "accelerator.html" },
    ];

    const filteredProjects = allProjects.filter((p) => {
      return !window.location.pathname.includes(p.link.replace(".html", ""));
    });

    const projectLinksHTML = filteredProjects
      .map((p) => `<a href="${p.link}" target="_blank">${p.name}</a>`)
      .join("");

    // LEFT: WORKS/project dropdown
    this.navLeft.innerHTML = `
      <div class="dropdown" id="proj-dropdown-wrap">
        <div class="project-button" id="proj-btn">
          <span>WORKS/${projectName}</span>
        </div>
        <div class="dropdown-content" id="proj-dropdown">
          ${projectLinksHTML}
        </div>
      </div>
    `;

    // CENTER (desktop only): secondary nav
    this.navCenter.innerHTML = `
      <ul class="nav-links">
        <li><a href="archive.html"><span>PLAYGROUND</span></a></li>
        <li><a href="about.html"><span>ABOUT</span></a></li>
        <li><a href="resume/Nina Le-Resume.pdf" target="_blank"><span>RESUME</span></a></li>
      </ul>
    `;
    this.setActiveLink();
    const projectLinks = Array.from(
      this.navCenter.querySelectorAll(".nav-links a"),
    );
    const worksBtn = this.shadowRoot.getElementById("proj-btn");
    this.setupIndicator([worksBtn, ...projectLinks], worksBtn);

    // RIGHT: close only (no hamburger in project mode, on any screen size for mobile)
    this.navRight.innerHTML = `
      <a href="index.html" class="close-button" title="Back to Works">
        <img src="close.svg" alt="Close" />
      </a>
    `;

    // Project dropdown
    const projBtn = this.shadowRoot.getElementById("proj-btn");
    const projDropdown = this.shadowRoot.getElementById("proj-dropdown");

    projBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      projDropdown.classList.toggle("show");
    });

    // Close on outside click
    document.addEventListener("click", () => {
      projDropdown.classList.remove("show");
    });
  }

  /* ── HELPERS ───────────────────────────────────────────────── */
  setupIndicator(slots, resting = null) {
    if (!slots || slots.length === 0) return;

    const indicator = document.createElement("div");
    indicator.className = "nav-indicator";
    this.header.appendChild(indicator);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const measure = (el) => {
      const hRect = this.header.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      return {
        x: r.left - hRect.left,
        w: r.width,
        h: r.height,
        top: r.top - hRect.top,
      };
    };

    const mark = (slot) => {
      slots.forEach((s) => {
        if (s.matches("a") && s.closest(".nav-links")) {
          s.classList.toggle("nav-on", s === slot);
        } else {
          // Non-nav slots (e.g. WORKS/[project]) go "unlit" when the
          // pill has left them, and light black again when it returns
          s.classList.toggle("unlit", s !== slot);
        }
      });
    };

    // ── Physics state ──────────────────────────────────────────
    let x = 0;
    let w = 0;
    let vx = 0;
    let vw = 0;
    let mode = "glide"; // "glide" = smooth follow, "spring" = boing boing
    let target = null;
    let currentSlot = null;
    let last = performance.now();
    let rafId = 0;
    let hoverTimer = 0;

    const setTargetSlot = (slot, spring = false) => {
      if (!slot) return;
      target = { slot, ...measure(slot) };
      currentSlot = slot;
      if (spring) {
        mode = "spring";
        vx = 0;
        vw = 0;
      }
    };

    const goTo = (slot, spring) => {
      if (!slot || slot === currentSlot) return;
      setTargetSlot(slot, spring);
      mode = spring ? "spring" : "glide";
      ensureLoop();
    };

    const slotAt = (clientX, clientY) => {
      for (const s of slots) {
        const r = s.getBoundingClientRect();
        if (
          clientX >= r.left &&
          clientX <= r.right &&
          clientY >= r.top &&
          clientY <= r.bottom
        ) {
          return s;
        }
      }
      return null;
    };

    const write = () => {
      indicator.style.transform = `translateX(${x}px)`;
      indicator.style.width = `${w}px`;
    };

    // White text always follows the pill's real position, so a link
    // only "lights up" once the pill is actually under it.
    const syncMark = () => {
      const center = x + w / 2;
      let hit = null;
      for (const s of slots) {
        const m = measure(s);
        if (center >= m.x && center <= m.x + m.w) {
          hit = s;
          break;
        }
      }
      mark(hit);
    };

    const step = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!target) {
        rafId = 0;
        return;
      }

      let settled = false;
      if (mode === "spring") {
        // Underdamped spring → the "boing boing" overshoot
        const tension = 240;
        const friction = 13;
        const ax = -tension * (x - target.x) - friction * vx;
        const aw = -tension * (w - target.w) - friction * vw;
        vx += ax * dt;
        vw += aw * dt;
        x += vx * dt;
        w += vw * dt;
        settled =
          Math.abs(target.x - x) < 0.5 &&
          Math.abs(target.w - w) < 0.5 &&
          Math.abs(vx) < 0.5 &&
          Math.abs(vw) < 0.5;
        if (settled) {
          x = target.x;
          w = target.w;
          vx = 0;
          vw = 0;
          mode = "glide";
          settled = false; // one more glide frame to fully dock
        }
      } else {
        // Critically-smooth exponential glide — frame-rate independent
        const factor = 1 - Math.exp(-10 * dt);
        x += (target.x - x) * factor;
        w += (target.w - w) * factor;
        settled =
          Math.abs(target.x - x) < 0.04 && Math.abs(target.w - w) < 0.04;
        if (settled) {
          x = target.x;
          w = target.w;
        }
      }

      write();
      syncMark();

      if (mode === "glide" && settled) {
        rafId = 0; // stop looping when at rest
      } else {
        rafId = requestAnimationFrame(step);
      }
    };

    const ensureLoop = () => {
      if (!rafId) {
        last = performance.now();
        rafId = requestAnimationFrame(step);
      }
    };

    // ── Initial placement at the resting slot ──────────────────
    const initialSlot = resting || slots[0];
    if (initialSlot) {
      const m = measure(initialSlot);
      indicator.style.top = `${m.top}px`;
      indicator.style.height = `${m.h}px`;
      x = m.x;
      w = m.w;
      target = { slot: initialSlot, ...m };
      currentSlot = initialSlot;
      mark(initialSlot);
      if (reduceMotion) {
        indicator.style.transform = `translateX(${x}px)`;
        indicator.style.width = `${w}px`;
      } else {
        // Entrance: pill springs out from half-width for a soft pop
        w = m.w * 0.5;
        write();
        mode = "spring";
        ensureLoop();
      }
    }

    // ── Hover: chase the cursor across the whole header bar ────
    this.header.addEventListener("mousemove", (e) => {
      if (reduceMotion) return;
      clearTimeout(hoverTimer);
      const slot = slotAt(e.clientX, e.clientY);
      if (slot) {
        goTo(slot, false);
      } else if (resting) {
        // Defer so fast gaps between items don't cause flicker
        hoverTimer = setTimeout(() => goTo(resting, false), 120);
      }
    });

    this.header.addEventListener("mouseleave", () => {
      clearTimeout(hoverTimer);
      if (reduceMotion) return;
      goTo(resting, false);
    });

    // ── Click: boing, then navigate (view transition kicks in) ─
    slots.forEach((slot) => {
      if (!slot.closest(".nav-links")) return;
      if (slot.getAttribute("target") === "_blank") return;
      slot.addEventListener("click", (e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)
          return;
        if (slot.classList.contains("active")) return;
        e.preventDefault();
        setTargetSlot(slot, !reduceMotion);
        ensureLoop();
        setTimeout(
          () => {
            window.location.href = slot.getAttribute("href");
          },
          reduceMotion ? 0 : 700,
        );
      });
    });

    // ── Resize: re-measure and glide so the pill never desyncs ──
    const resync = () => {
      const slot = currentSlot || resting;
      if (!slot) return;
      setTargetSlot(slot, false);
      mode = "glide";
      ensureLoop();
    };

    this._onResize = () => {
      if (this._resizeRaf) return;
      this._resizeRaf = requestAnimationFrame(() => {
        this._resizeRaf = 0;
        resync();
      });
    };
    window.addEventListener("resize", this._onResize);
  }

  setActiveLink() {
    const currentPath = window.location.pathname;
    this.shadowRoot.querySelectorAll(".nav-links a").forEach((link) => {
      const href = link.getAttribute("href");
      if (
        href &&
        currentPath.includes(href.replace(".html", "")) &&
        href !== ""
      ) {
        link.classList.add("active");
      } else if (currentPath === "/" && href === "index.html") {
        link.classList.add("active");
      }
    });
  }

  handleScroll() {
    if (window.innerWidth > 768) {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const threshold = 600;

      if (scrollY + windowHeight > totalHeight - threshold) {
        this.container.classList.add("hidden");
      } else {
        this.container.classList.remove("hidden");
      }
    } else {
      this.container.classList.remove("hidden");
    }
  }
}

customElements.define("header-component", Header);
