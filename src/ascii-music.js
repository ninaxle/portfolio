function initAsciiMusic() {
  const sketch = function (p) {
    let img;
    let symbols = [
      "@",
      "#",
      "&",
      "＊",
      "%",
      "♫",
      "♪",
      "!",
      "+",
      "=",
      "?",
      "^",
      "☆",
      "♡",
      "<",
      "o",
      "•",
      ".",
      "~",
    ];
    let stepSize = 14;
    let t = 0;
    let asciiAmount = 1;
    let transitionDuration = 8;
    let startTime;
    let imgLoaded = false;

    p.preload = function () {
      img = p.loadImage("music.png", 
        () => {
          console.log("Image loaded successfully");
          imgLoaded = true;
        },
        () => {
          console.error("Failed to load image");
        }
      );
    };

    p.setup = function () {
      let displayWidth = 800;
      let displayHeight = 400;

      let cnv = p.createCanvas(displayWidth, displayHeight);
      cnv.parent("ascii-music-container");
      p.textFont("Doto");
      p.textSize(stepSize);
      p.noStroke();
      startTime = p.millis() / 1000;
      console.log("Canvas created:", displayWidth, displayHeight);
    };

    p.draw = function () {
      p.background(255);
      
      if (!imgLoaded || !img) {
        p.fill(0);
        p.text("Loading...", p.width/2, p.height/2);
        return;
      }
      
      img.loadPixels();
      t += 0.03;

      let offsetX = (p.width - img.width) / 2;
      let offsetY = (p.height - img.height) / 2;

      let elapsed = p.millis() / 1000 - startTime;
      let progress = p.constrain(elapsed / transitionDuration, 0, 1);
      asciiAmount = p.pow(1 - progress, 2.5);

      if (asciiAmount < 0.02) {
        p.image(img, offsetX, offsetY);
        return;
      }

      for (let imgY = 0; imgY < img.height; imgY += stepSize) {
        for (let imgX = 0; imgX < img.width; imgX += stepSize) {
          let index = (imgX + imgY * img.width) * 4;
          let r = img.pixels[index];
          let g = img.pixels[index + 1];
          let b = img.pixels[index + 2];
          let brightnessVal = (r + g + b) / 3;

          let canvasX = imgX + offsetX;
          let canvasY = imgY + offsetY;

          let distFromMouse = p.dist(p.mouseX, p.mouseY, canvasX, canvasY);

          let ripple1 = p.sin(distFromMouse * 0.02 - t * 5) * 100;
          let ripple2 = p.cos(distFromMouse * 0.04 - t * 3) * 50;
          let scan = p.sin(t * 2 + canvasY * 0.15) * 45;
          let animatedBrightness = brightnessVal + scan + ripple1 + ripple2;

          let symbolIndex = p.floor(
            p.map(animatedBrightness, 0, 255, 0, symbols.length - 1),
          );
          symbolIndex = p.constrain(symbolIndex, 0, symbols.length - 1);

          let localAsciiAmount = asciiAmount;
          if (distFromMouse < 250) {
            let influence = p.map(distFromMouse, 0, 250, 1, 0);
            influence = p.pow(influence, 2);
            localAsciiAmount = p.lerp(asciiAmount, 0, influence * 0.5);
          }

          if (p.random() < localAsciiAmount) {
            p.push();
            p.translate(canvasX + stepSize / 2, canvasY + stepSize / 2);

            if (distFromMouse < 200) {
              let influence = p.map(distFromMouse, 0, 200, 1, 0);
              let rotation = influence * p.PI * 2;
              p.rotate(rotation + t * influence);

              let hueShift = (distFromMouse * 0.5 + t * 50) % 360;
              p.colorMode(p.HSB, 360, 100, 100);
              p.fill(
                hueShift,
                40 * influence,
                p.map(brightnessVal, 0, 255, 30, 100),
              );
              p.colorMode(p.RGB, 255);
            } else {
              p.fill(r, g, b);
            }

            p.text(symbols[symbolIndex], -stepSize / 2, stepSize / 2);
            p.pop();
          } else {
            p.fill(r, g, b);
            p.rect(canvasX, canvasY, stepSize, stepSize);
          }
        }
      }
    };

    p.mousePressed = function () {
      startTime = p.millis() / 1000;
      asciiAmount = 1;
    };
  };
  new p5(sketch);
}

initAsciiMusic();