// L-system kolam rule from Paul Bourke
// https://paulbourke.net/fractals/lsys/
// Basic code from:
// https://natureofcode.com/fractals/
// https://thecodingtrain.com/challenges/16-l-system-fractal-trees

let level = 3; // fractal level
let length = 18; // step length
let axiom;
let rules;
let angle;
let sentence;
let fractal;
let shapeScale = 0.15; //  set shape length to fraction of step length
let sw = 2;
let palette;
let url;
let wadj = 0.5;
let hadj = 0.9;

let lsystem = {
  kolam: {
    axiom: "(-D--D)",
    rules: {
      A: "F++FFFF--F--FFFF++F++FFFF--F",
      B: "F--FFFF++F++FFFF--F--FFFF++F",
      C: "BFA--BFA",
      D: "CFC--CFC",
    },
    angle: "45.1",
    length_factor: "1",
  },
};

function setup() {
  createCanvas(600, 600);
  background(0);

  resetButton = createButton("Reset");
  resetButton.position(width + 110, 5);
  resetButton.mousePressed(reset);

  // Select a palette
  addPalettes();
  url = selectPalette();

  let selectedShape = new Craniod(
    0,
    0,
    length * shapeScale,
    3.75,
    1,
    6,
    radians(39)
  );
  fractal = new LSystem(
    lsystem,
    wadj,
    hadj,
    level,
    length,
    sw,
    selectedShape,
    url
  );
  fractal.renderFractal();
}

function draw() {
  noLoop();
}

function addPalettes() {
  paletteDropdown = createSelect();
  paletteDropdown.position(width + 5, 5);
  paletteDropdown.option("pink");
  paletteDropdown.option("orange");
  paletteDropdown.option("blue");
  paletteDropdown.option("purple");
  paletteDropdown.option("blue_green");
  paletteDropdown.option("blue_aqua");
  paletteDropdown.option("blue_yellow");
  paletteDropdown.option("orange_blue");

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

  selectedShape = new Craniod(
    0,
    0,
    length * shapeScale,
    3.75,
    1,
    6,
    radians(39)
  );
  selectedShape.addPoints();
  translate(width * 0.5, height * 0.9);
  background(0);
  setRule(fractal);
  for (let i = 0; i < level; i++) {
    generate();
  }
  turtle();
  pop();
}

// Function to save the canvas as an image when 's' key is pressed
function keyPressed() {
  if (key === "s" || key === "S") {
    save("img.jpg");
  }
}
