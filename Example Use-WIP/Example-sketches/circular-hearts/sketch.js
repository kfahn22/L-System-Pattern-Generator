// Learn more about L-systems
// https://paulbourke.net/fractals/lsys/
// Basic code from:
// https://natureofcode.com/fractals/
// https://thecodingtrain.com/challenges/16-l-system-fractal-trees
// Grain filter from
// https://github.com/meezwhite/p5.grain

// More info at https://github.com/kfahn22/L-System-Pattern-Generator

let level = 1; // not a fractal
let length = 20; // step length
let axiom;
let rules;
let angle;
let sentence;
let fractal;
let shapeScale = 0.75; //  set shape length to fraction of step length
let palette;
let url;
let currentAlpha = 150;
let shapes = [];

let lsystem = {
  circular: {
    axiom: "F",
    rules: {
      F: "F+F+F+F+F+F+F+F+F+F+F+F",
      X: "",
    },
    angle: "30",
    length_factor: "1",
  },
};

function setup() {
  createCanvas(600, 600);
  background(0);

  // Add p5gain library
  p5grain.setup();

  resetButton = createButton("Reset");
  resetButton.position(width + 110, 5);
  resetButton.mousePressed(reset);

  addPalettes();
  selectPalette();
  palette = createPaletteFromURL(url);
  palette.alpha = 255;
  fractal = lsystem.circular;
  setRule(fractal);

  // Set shape size as a fraction of length
  strokeWeight(2);
  shapes.push(new Heart(0, 0, length * 0.25, radians(-10)));
  shapes.push(new Heart(100, 0, length * 0.5, radians(250)));
  shapes.push(new Heart(200, 0, length * 1.05, radians(260)));
  for (let i = 0; i < shapes.length; i++) {
    shapes[i].addPoints();
  }
  push();
  translate(width * 0.45, height * 0.4);

  //for (let i = 0; i < level; i++) {
  generate();
  //}
  turtle();
  pop();

  applyChromaticGrain(42);
}

function draw() {
  noLoop();
}

function setRule(pattern) {
  axiom = pattern.axiom;
  rules = pattern.rules;
  angle = radians(pattern.angle);
  lf = pattern.length_factor;
  sentence = axiom;
}

function generate() {
  let nextSentence = "";
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);
    let found = false;
    for (let key in rules) {
      if (current === key) {
        found = true;
        nextSentence += rules[key];

        break;
      }
    }
    if (!found) {
      nextSentence += current;
    }
  }
  sentence = nextSentence;
}

function turtle() {
  let amt = 0;
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);
    if (current === "F") {
      let c = random(palette);
      c[3] = currentAlpha;
      fill(c);
      noStroke();
      for (let i = 0; i < shapes.length; i++) {
        //c[3] = currentAlpha + 20;
        fill(c);
        noStroke();
        shapes[i].show();
      }
      translate(length, 0);
    } else if (current === "f") {
      translate(length, 0);
    } else if (current === "+") {
      rotate(angle);
      amt += 0.1;
    } else if (current === "-") {
      rotate(-angle);
      amt += 0.2;
    } else if (current == "[") {
      push();
    } else if (current == "]") {
      pop();
    } else if (current == ">") {
      push();
      length = length * lf;
      pickShape();
      pop();
    } else if (current == "<") {
      push();
      length = length / lf;
      pickShape();
      pop();
    } else if (current == "(") {
      angle -= radians(0.1);
    } else if (current == ")") {
      angle += radians(0.1);
    } else if (current == "{") {
      beginShape();
    } else if (current == "}") {
      noStroke();
      fill(random(palette));
      endShape();
    }
  }
}

// Helper functions to convert the url string to the palette array from chatGPT
function createPaletteFromURL(url) {
  // Extract the color codes from the URL using a regular expression
  let regex = /[0-9A-F]{6}/gi;
  let matches = url.match(regex);

  // Convert HEX codes to RGB and create the palette array
  let palette = matches.map((hex) => hexToRgb(hex));

  return palette;
}

// Helper function to convert HEX to RGB
function hexToRgb(hex) {
  let r = parseInt(hex.slice(0, 2), 16);
  let g = parseInt(hex.slice(2, 4), 16);
  let b = parseInt(hex.slice(4, 6), 16);
  let a = 255;
  return [r, g, b, a];
}

function addPalettes() {
  paletteDropdown = createSelect();
  paletteDropdown.position(width + 5, 5);
  paletteDropdown.option("pink");
  paletteDropdown.option("pink_ltblue");
  paletteDropdown.option("orange");
  paletteDropdown.option("blue");
  paletteDropdown.option("lt_blue");
  paletteDropdown.option("yellow");
  paletteDropdown.option("aqua");
  paletteDropdown.option("blue_green");

  // Set default palette
  paletteDropdown.selected("pink");
  url = paletteDropdown.changed(selectPalette);
}

function selectPalette() {
  currentPalette = paletteDropdown.value();

  switch (currentPalette) {
    case "pink":
      url =
        "https://supercolorpalette.com/?scp=G0-hsl-F165B2-F37CC1-F594D0-F7ABDD-F9C2E8";
      break;
    case "pink_ltblue":
      url =
        "https://supercolorpalette.com/?scp=G0-hsl-E198B8-E3A1CE-E5A9E1-DDB0E8-D4B8EA-CEC0EC-CBC8EF-D0D6F1";
      break;
    case "blue":
      url =
        "https://supercolorpalette.com/?scp=G0-hsl-2A1FFF-242BFF-2942FF-2E58FF-336DFF-3881FF";
      break;
    case "lt_blue":
      url =
        "https://supercolorpalette.com/?scp=G0-hsl-94C3F5-ABD2F7-C2E1F9-DAEDFC-F1F9FE";
      break;
    case "orange":
      url =
        "https://supercolorpalette.com/?scp=G0-hsl-FFA91F-FF9924-FF8929-FF7B2E-FF6D33-FF6038";
      break;
    case "aqua":
      url =
        "https://supercolorpalette.com/?scp=G0-hsl-1FFFCE-38FFCD-52FFCE-6BFFD0-85FFD4-9EFFDA-B8FFE1-D1FFEA";
      break;
    case "blue_green":
      url =
        "https://supercolorpalette.com/?scp=G0-hsl-3C80B4-3C8AB4-3C94B4-3C9EB4-3CA8B4-3CB2B4-3CB4AC-3CB4A2";
      break;
    case "yellow":
      url =
        "https://supercolorpalette.com/?scp=G0-hsl-FFDA1F-FFD738-FFD752-FFD86B-FFDA85-FFDF9E-FFE5B8-FFEDD1";
      break;
  }
  return url;
}

function reset() {
  shapes = [];
  push();
  url = selectPalette();
  palette = createPaletteFromURL(url);

  shapes.push(new Heart(0, 0, length * 0.25, radians(-10)));
  shapes.push(new Heart(100, 0, length * 0.5, radians(250)));
  shapes.push(new Heart(200, 0, length * 1.05, radians(260)));
  //for (let i = 0; i < shapes.length; i++) {
  shapes[i].addPoints();
  //}
  translate(width * 0.45, height * 0.4);
  background(0);
  setRule(fractal);
  generate();
  turtle();
  pop();

  applyChromaticGrain(42);
}

// Function to save the canvas as an image when 's' key is pressed
function keyPressed() {
  if (key === "s" || key === "S") {
    save("img.jpg");
  }
}
