// L-system snake-kolam rule from Paul Bourke
// https://paulbourke.net/fractals/lsys/
// Basic code from:
// https://natureofcode.com/fractals/
// https://thecodingtrain.com/challenges/16-l-system-fractal-trees
// Grain filter from
// https://github.com/meezwhite/p5.grain

let level = 2; // fractal level
let length = 69; // step length
let axiom;
let rules;
let angle;
let sentence;
let fractal;
let shapeScale = 0.7; //  set shape length to fraction of step length
let palette;
let url;

let lsystem = {
  snake_kolam: {
    axiom: "F+XF+F+XF",
    rules: {
      X: "X{F-F-F}+XF+F+X{F-F-F}+X",
    },
    angle: "90",
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
  palette.alpha = 150;
  fractal = lsystem.snake_kolam;
  setRule(fractal);

  // Set text size as a fraction of length
  strokeWeight(5);
  stroke(random(palette));
  selectedShape = new TearDrop(0, 0, length * shapeScale, radians(135));
  selectedShape.addPoints();
  push();
  translate(width * 0.1, height * 0.1);

  for (let i = 0; i < level; i++) {
    generate();
  }
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
      stroke(random(palette));
      noFill();
      selectedShape.show();
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
  paletteDropdown.option("orange");
  paletteDropdown.option("blue");
  paletteDropdown.option("purple");
  paletteDropdown.option("blue_green");
  paletteDropdown.option("blue_aqua");
  paletteDropdown.option("blue_yellow");
  paletteDropdown.option("orange_blue");

  // Set default palette
  paletteDropdown.selected("orange");
  url = paletteDropdown.changed(selectPalette);
}

function selectPalette() {
  currentPalette = paletteDropdown.value();

  switch (currentPalette) {
    case "blue":
      url =
        "https://supercolorpalette.com/?scp=G0-hsl-2A1FFF-242BFF-2942FF-2E58FF-336DFF-3881FF";
      break;
    case "orange":
      url =
        "https://supercolorpalette.com/?scp=G0-hsl-FFA91F-FF9924-FF8929-FF7B2E-FF6D33-FF6038";
      break;
    case "blue_yellow":
      url =
        "https://supercolorpalette.com/?scp=G0-hsl-FFDA1F-FFC71F-FFB41F-FFA21F-1F44FF-1F57FF-1F69FF-1F7CFF";
      break;
    case "purple":
      url =
        "https://supercolorpalette.com/?scp=G0-hsl-1F7CFF-1F5EFF-1F40FF-1F22FF-391FFF-571FFF-751FFF-931FFF";
      break;
    case "blue_green":
      url =
        "https://supercolorpalette.com/?scp=G0-hsl-3C80B4-3C8AB4-3C94B4-3C9EB4-3CA8B4-3CB2B4-3CB4AC-3CB4A2";
      break;
    case "blue_aqua":
      url =
        "https://supercolorpalette.com/?scp=G0-hsl-1F75FF-1F87FF-1F9AFF-1FADFF-1FBFFF-1FD2FF-1FE5FF-1FF8FF";
      break;
    case "orange_blue":
      url =
        "https://supercolorpalette.com/?scp=G0-hsl-FF8B1F-FF781F-FF661F-1F9CFF-1FAFFF";
      break;
  }
  return url;
}

function reset() {
  push();
  url = selectPalette();
  palette = createPaletteFromURL(url);

  selectedShape = new TearDrop(0, 0, length * shapeScale, radians(135));
  selectedShape.addPoints();
  translate(width * 0.1, height * 0.1);
  background(0);
  setRule(fractal);
  for (let i = 0; i < level; i++) {
    generate();
  }
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
