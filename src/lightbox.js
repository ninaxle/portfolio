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
      /* was 8.525rem; raised to offset the new scrub row. Tweak to taste. */
      margin-bottom: 11rem;
      cursor: pointer;
      transition: background 0.2s;
      font-family: "Fragment Mono", monospace;
    }
    .nav-btn:hover { background: rgba(255,255,255,0.2); }
    .nav-btn.disabled { opacity: 0.2; pointer-events: none; }

    .content { flex: 1; min-width: 0; display: flex; flex-direction: column; align-items: center; }

    .media-wrap { width: 100%; aspect-ratio: 16 / 9; background: #1a1a1a; border-radius: 1rem; overflow: hidden; }
    .media-wrap img,
    .media-wrap video { width: 100%; height: 100%; object-fit: contain; display: block; }

    /* ---- scrub bar (videos only) ---- */
    .scrub {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-top: 0.75rem;
      visibility: hidden; /* keeps height stable so nav buttons don't shift */
    }
    .scrub.active { visibility: visible; }

    .play-btn {
      background: none;
      border: none;
      color: #fcfcfc;
      font-family: "Fragment Mono", monospace;
      font-size: 0.875rem;
      cursor: pointer;
      padding: 0;
      width: 1.5rem;
    }

    .scrub-bar {
      flex: 1;
      height: 4px;
      accent-color: #fcfcfc;
      cursor: pointer;
    }

    .time {
      color: #999;
      font-family: "Fragment Mono", monospace;
      font-size: 0.75rem;
      min-width: 6.5rem;
      text-align: right;
    }

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
    .visit-link.no-link { visibility: hidden; }

    .counter { color: #555; font-family: "Fragment Mono", monospace; font-size: 0.75rem; margin-top: 1rem; }

    .hidden { display: none !important; }

    .nav-row { display: none; }

    @media (max-width: 768px) {
      .slide-area {
        flex-direction: column;
        gap: 1rem;
        padding-bottom: 4rem;
        align-items: center;
      }
      .slide-area .prev-btn,
      .slide-area .next-btn {
        display: none;
      }
      .nav-btn {
        width: 2.25rem;
        height: 2.25rem;
      }
      .nav-row {
        display: flex;
        gap: 1rem;
        justify-content: center;
        position: fixed;
        bottom: 0.25rem;
        left: 0;
        right: 0;
        z-index: 10;
      }
    }
  </style>

  <div class="overlay">
    <div class="slide-area">
      <button class="nav-btn prev-btn" aria-label="Previous">‹</button>
      <div class="content">
        <div class="media-wrap"></div>
        <div class="scrub">
          <button class="play-btn" aria-label="Play/Pause">❚❚</button>
          <input class="scrub-bar" type="range" min="0" max="1000" value="0" step="1" aria-label="Seek" />
          <span class="time">0:00 / 0:00</span>
        </div>
        <p class="caption"></p>
        <a class="visit-link" target="_blank" rel="noopener noreferrer">View Project →</a>
        <span class="counter"></span>
      </div>
      <button class="nav-btn next-btn" aria-label="Next">›</button>
    </div>

    <div class="nav-row">
      <button class="nav-btn prev-btn" aria-label="Previous">‹</button>
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
    this.prevBtns = this.shadowRoot.querySelectorAll(".prev-btn");
    this.nextBtns = this.shadowRoot.querySelectorAll(".next-btn");

    // scrub bar refs
    this.scrub = this.shadowRoot.querySelector(".scrub");
    this.scrubBar = this.shadowRoot.querySelector(".scrub-bar");
    this.playBtn = this.shadowRoot.querySelector(".play-btn");
    this.timeEl = this.shadowRoot.querySelector(".time");

    this._items = [];
    this._index = 0;
    this._video = null;
    this._scrubbing = false;
    this._wasPlaying = false;

    this.prevBtns.forEach((btn) => btn.addEventListener("click", () => this._go(-1)));
    this.nextBtns.forEach((btn) => btn.addEventListener("click", () => this._go(1)));
    this.overlay.addEventListener("click", (e) => {
      if (e.target === this.overlay) this.close();
    });

    // play / pause
    this.playBtn.addEventListener("click", () => {
      if (!this._video) return;
      this._video.paused ? this._video.play() : this._video.pause();
    });

    // scrubbing
    this.scrubBar.addEventListener("pointerdown", () => {
      if (!this._video) return;
      this._scrubbing = true;
      this._wasPlaying = !this._video.paused;
      this._video.pause();
    });

    this.scrubBar.addEventListener("input", () => {
      const v = this._video;
      if (!v || !v.duration) return;
      v.currentTime = (this.scrubBar.value / 1000) * v.duration;
      this._updateTime();
    });

    const endScrub = () => {
      if (!this._scrubbing) return;
      this._scrubbing = false;
      if (this._video && this._wasPlaying) this._video.play();
      this._wasPlaying = false;
    };
    this.scrubBar.addEventListener("pointerup", endScrub);
    this.scrubBar.addEventListener("pointercancel", endScrub);

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
    const next = this._index + dir;
    if (next < 0 || next >= this._items.length) return;
    this._pauseVideo();
    this._index = next;
    this._render();
  }

  _render() {
    const item = this._items[this._index];
    if (!item) return;

    this.mediaContainer.innerHTML = "";
    this._video = null;
    this._scrubbing = false;
    this._wasPlaying = false;

    if (item.type === "video") {
      const video = document.createElement("video");
      video.src = item.src;
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;

      video.addEventListener("timeupdate", () => {
        if (!video.duration) return;
        if (!this._scrubbing) {
          this.scrubBar.value = (video.currentTime / video.duration) * 1000;
        }
        this._updateTime();
      });
      video.addEventListener("loadedmetadata", () => this._updateTime());
      video.addEventListener("play", () => (this.playBtn.textContent = "❚❚"));
      video.addEventListener("pause", () => (this.playBtn.textContent = "▶"));

      this._video = video;
      this.mediaContainer.appendChild(video);
    } else {
      const img = document.createElement("img");
      img.src = item.src;
      img.alt = item.caption || "";
      this.mediaContainer.appendChild(img);
    }

    // scrub bar: only visible for videos
    this.scrub.classList.toggle("active", item.type === "video");
    this.scrubBar.value = 0;
    this.playBtn.textContent = "❚❚";
    this.timeEl.textContent = "0:00 / 0:00";

    this.captionEl.textContent = item.caption || "";

    if (item.link) {
      this.visitLink.href = item.link;
      this.visitLink.classList.remove("no-link");
    } else {
      this.visitLink.classList.add("no-link");
    }

    this.counterEl.textContent = `${this._index + 1} / ${this._items.length}`;

    this.prevBtns.forEach((btn) => btn.classList.toggle("disabled", this._index === 0));
    this.nextBtns.forEach((btn) => btn.classList.toggle("disabled", this._index === this._items.length - 1));
  }

  _fmt(s) {
    if (!isFinite(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  }

  _updateTime() {
    const v = this._video;
    if (!v) return;
    this.timeEl.textContent = `${this._fmt(v.currentTime)} / ${this._fmt(v.duration)}`;
  }

  _pauseVideo() {
    const video = this.mediaContainer.querySelector("video");
    if (video) {
      video.pause();
      video.src = "";
    }
    this._video = null;
  }

  _onKeyDown(e) {
    if (e.key === "Escape") this.close();
    // when the slider is focused, arrow keys should scrub, not change slides
    if (this.shadowRoot.activeElement === this.scrubBar) return;
    if (e.key === "ArrowLeft") this._go(-1);
    if (e.key === "ArrowRight") this._go(1);
  }
}

customElements.define("lightbox-modal", LightboxModal);