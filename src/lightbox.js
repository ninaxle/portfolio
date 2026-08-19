const lightboxTemplate = document.createElement("template");

lightboxTemplate.innerHTML = /* html */ `
  <style>
    :host { display: block; }

    .overlay {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 99999;
      background: rgba(0, 0, 0, 0.92);
      backdrop-filter: blur(8px);
      padding: 2rem;
    }
    .overlay.open { display: flex; flex-direction: column; align-items: center; justify-content: center; }

    .top-bar {
      position: fixed;
      bottom: 1.5rem;
      left: 0;
      right: 0;
      display: flex;
      justify-content: center;
      z-index: 10;
    }

    .counter { color: #555; font-family: "Fragment Mono", monospace; font-size: 0.75rem; }

    .slide-area {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      max-width: 1100px;
      width: 100%;
    }

    .nav-btn {
      flex-shrink: 0;
      width: 2.75rem;
      height: 2.75rem;
      border-radius: 9999px;
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.2);
      color: #fcfcfc;
      font-size: 1.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 0.2s;
      font-family: "Fragment Mono", monospace;
    }
    .nav-btn:hover { background: rgba(255,255,255,0.2); }
    .nav-btn.disabled { opacity: 0.2; pointer-events: none; }

    .content { flex: 1; min-width: 0; display: flex; flex-direction: column; align-items: center; }

    .media-wrap { width: 100%; border-radius: 1rem; overflow: hidden; background: #1a1a1a; }
    .media-wrap img,
    .media-wrap video { width: 100%; max-height: 70vh; object-fit: contain; display: block; }

    .caption { color: #999; font-family: "Fragment Mono", monospace; font-size: 0.875rem; margin-top: 1rem; text-align: center; line-height: 1.5; }

    .visit-link {
      display: inline-block;
      margin-top: 0.75rem;
      color: #fcfcfc;
      font-family: "Fragment Mono", monospace;
      font-size: 0.875rem;
      text-decoration: none;
      border: 1px solid rgba(255,255,255,0.3);
      padding: 0.5rem 1.25rem;
      border-radius: 9999px;
      transition: all 0.2s;
    }
    .visit-link:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.5); }

    .hidden { display: none !important; }
  </style>

  <div class="overlay">
    <div class="top-bar">
      <span class="counter"></span>
    </div>

    <div class="slide-area">
      <button class="nav-btn prev-btn" aria-label="Previous">‹</button>
      <div class="content">
        <div class="media-wrap"></div>
        <p class="caption"></p>
        <a class="visit-link hidden" target="_blank" rel="noopener noreferrer">Visit →</a>
      </div>
      <button class="nav-btn next-btn" aria-label="Next">›</button>
    </div>
  </div>
`;

class LightboxModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(lightboxTemplate.content.cloneNode(true));

    this.overlay = this.shadowRoot.querySelector(".overlay");
    this.mediaContainer = this.shadowRoot.querySelector(".media-wrap");
    this.captionEl = this.shadowRoot.querySelector(".caption");
    this.visitLink = this.shadowRoot.querySelector(".visit-link");
    this.counterEl = this.shadowRoot.querySelector(".counter");
    this.prevBtn = this.shadowRoot.querySelector(".prev-btn");
    this.nextBtn = this.shadowRoot.querySelector(".next-btn");

    this._items = [];
    this._index = 0;

    this.prevBtn.addEventListener("click", () => this._go(-1));
    this.nextBtn.addEventListener("click", () => this._go(1));
    this.overlay.addEventListener("click", (e) => {
      if (e.target === this.overlay) this.close();
    });

    this._onKeyDown = this._onKeyDown.bind(this);
  }

  open({ items, index }) {
    this._items = items;
    this._index = index || 0;
    this._render();
    this.overlay.classList.add("open");
    document.addEventListener("keydown", this._onKeyDown);
    document.body.style.overflow = "hidden";
  }

  close() {
    this._pauseVideo();
    this.overlay.classList.remove("open");
    document.removeEventListener("keydown", this._onKeyDown);
    document.body.style.overflow = "";
  }

  _go(dir) {
    this._pauseVideo();
    this._index += dir;
    this._render();
  }

  _render() {
    const item = this._items[this._index];
    if (!item) return;

    this.mediaContainer.innerHTML = "";

    if (item.type === "video") {
      const video = document.createElement("video");
      video.src = item.src;
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      this.mediaContainer.appendChild(video);
    } else {
      const img = document.createElement("img");
      img.src = item.src;
      img.alt = item.caption || "";
      this.mediaContainer.appendChild(img);
    }

    this.captionEl.textContent = item.caption || "";

    if (item.link) {
      this.visitLink.href = item.link;
      this.visitLink.classList.remove("hidden");
    } else {
      this.visitLink.classList.add("hidden");
    }

    this.counterEl.textContent = `${this._index + 1} / ${this._items.length}`;

    this.prevBtn.classList.toggle("disabled", this._index === 0);
    this.nextBtn.classList.toggle("disabled", this._index === this._items.length - 1);
  }

  _pauseVideo() {
    const video = this.mediaContainer.querySelector("video");
    if (video) {
      video.pause();
      video.src = "";
    }
  }

  _onKeyDown(e) {
    if (e.key === "Escape") this.close();
    if (e.key === "ArrowLeft") this._go(-1);
    if (e.key === "ArrowRight") this._go(1);
  }
}

customElements.define("lightbox-modal", LightboxModal);
