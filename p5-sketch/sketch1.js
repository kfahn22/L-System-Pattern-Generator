// Formulas for L-system by Paul Bourke
// https://paulbourke.net/fractals/lsys/

let alpha = 150;
let alpha2 = 150;

let blueGreenPalette;
let lightBluePalette;
let brownGreenPalette;
let aquaBluePalette;
let plantGreensPalette;
let redPalette;
let orangeBluePalette;

let currentPalette;

// L-system variables
let level = 7; // fractal level
let length = 22; // step length
let axiom;
let sentence;
let rules = {};
let lsystem;
let colorName;
let palette;
let palettes = {};
let lf; // length adjustment factor

// Shape and color variables
let s; // shape
let c; // color palette

// r = length;
// a = 0.5;
//dir = -1;
let fl = true; // whether the shapes are filled or stroke

let wadj = 0.65; // amount to to translate in x direction
let hadj = 0.7; // amount to to translate in y direction
let sw = 1; // strokeweight

let patterns = [
  "none", //0
  "algae",
  "board",
  "board2",
  "bush", //4
  "circular", // 5
  "cross1",
  "cross2",
  "cross3",
  "cross4",
  "crystal",
  "dragon1", //11
  "dragon2",
  "fern", //13
  "hexagonal gosper",
  "hilbert",
  "kolam", // 16
  "koch curve",
  "krishna_anklet", // 18
  "koch_snowflake",
  "leaf", //20
  "mango_leaf", //21
  "peano", // 22
  "pentaplexity", //23
  "quadratic gosper",
  "quadratic koch island", // 24
  "rings", //26
  "snake kolam", //
  "skierpinski", // 24
  "square skierpinski",
  "sticks",
  "tree", //31
  "tiles",
  "triangle",
  "weed", // 34
];

let currentPattern = patterns[11];

let shapes = [
  "archimedes spiral", // 0
  "astroid", // 1
  // "bean", // 2
  "bicorn", //2
  "cassini",
  "ceva", //4
  "cornu", //5
  "cross", //6
  "deltoid", //7
  // "dumbbell", // 8
  "eight", //8
  "gear", // 9
  "hypocyclid", //10
  "heart", //11
  "kiss", //12
  "knot", //13
  "line", //14
  "lissajous",
  "ophiuride", // 16
  // "rose", // 13
  "quadrifolium", // 16
  "spiral", // 17
  "superellipse", // 18
  "supershape", // 19
  "tear", // 20
  "tetracuspid",
  "zigzag", // 18
];
let sh = shapes[19];

colorName = "bluegreen";
let data;

function preload() {
  loadJSON("rules.json", loadRules);
  loadJSON("palettes.json", getColors);
}

function getColors(data) {
  palettes = data.colors;
  aquaBluePalette = palettes.aqua_blue;
  lightBluePalette = palettes.light_blue;
  brownGreenPalette = palettes.brown_green;
  blueGreenPalette = palettes.blue_green;
  plantGreensPalette = palettes.plant_greens;
  redPalette = palettes.reds;
  orangeBluePalette = palettes.orange_blue;
}
function setup() {
  createCanvas(600, 600);
  //  let paletteNames = Object.keys(palettes);
  currentPalette = blueGreenPalette;
  background(currentPalette[4]);
  addShape();
  for (let i = 0; i < level; i++) {
    generate();
  }
}

function draw() {
  translate(width * wadj, height * hadj);
  rotate(-PI / 2);
  turtle();
  noLoop();
}

function loadRules(data) {
  lsystem = data;
  setRule(currentPattern);
}

function loadPalettes(data) {
  colors = data;
  // setPalette(colorName);
}

function setRule(pattern) {
  axiom = lsystem[pattern].axiom;
  rules = lsystem[pattern].rules;
  angle = radians(lsystem[pattern].angle);
  lf = lsystem[pattern].length_factor;
  sentence = axiom;
}

function setPalette(name) {
  currentPalette = colors[name].palette;
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

function chooseColor(palette) {
  let c;
  let r = random(1);
  if (r <= 0.25) {
    c = palette[0];
  } else if (r > 0.25 && r <= 0.5) {
    c = palette[1];
  } else if (r > 0.5 && r <= 0.75) {
    c = palette[2];
  } else if (r > 0.75) {
    c = palette[3];
  }
  return c;
}

function turtle() {
  for (let i = 0; i < sentence.length; i++) {
    let rl = sentence.length % 2;
    let current = sentence.charAt(i);
    if (current === "F") {
      if (s) {
        c = chooseColor(currentPalette);
        if (!fl) {
          stroke(c);
          strokeWeight(sw);
          noFill();
        } else {
          fill(c);
          noStroke();
        }
        s.show();
      } else {
        c = chooseColor(currentPalette);
        stroke(c);
        strokeWeight(sw);
        line(0, 0, length, 0);
      }

      translate(length, 0);
    } else if (current === "f") {
      translate(length, 0);
    } else if (current === "+") {
      rotate(angle);
    } else if (current === "-") {
      rotate(-angle);
    } else if (current == "[") {
      push();
    } else if (current == "]") {
      pop();
    } else if (current == ">") {
      push();
      scale(lf);
      pop();
    } else if (current == "<") {
      push();
      scale(1 / lf);
      pop();
    } else if (current == "(") {
      angle -= radians(0.1);
    } else if (current == ")") {
      angle += radians(0.1);
    } else if (current == "{") {
      beginShape();
    } else if (current == "}") {
      noStroke();
      fill(currentPalette[0]);
      endShape();
    }
  }
}

function addShape() {
  if (sh === "archimedes spiral") {
    // s = new ArchimedesSpiral(0, 0, length * 0.4, -1, (PI * 10) / 8);
    s = new ArchimedesSpiral(0, 0, length * 0.4, -1, 0);
    s.addPoints();
  } else if (sh === "astroid") {
    s = new Astroid(0, 0, length * 0.5, 2);
    s.addPoints();
  } else if (sh === "bean") {
    s = new Bean(0, 0, length * 0.5);
    s.addPoints();
  } else if (sh === "bicorn") {
    s = new Bicorn(0, 0, length * 0.5);
    s.addPoints();
  } else if (sh === "cassini") {
    // 1, 1.25 peanut shaped/
    // 1, 2 oval
    s = new CassiniOval(0, 0, length / 2, 1, 1.25);
    s.addPoints();
  } else if (sh === "ceva") {
    s = new Ceva(0, 0, length / 4);
    s.addPoints();
  } else if (sh === "cornu") {
    s = new CornuSpiral(0, 0, length / 3, PI / 2);
    s.addPoints();
  } else if (sh === "cross") {
    // 1 quadrifolium
    // gets longer and more rounded as a increases
    s = new MalteseCross(0, 0, length * 0.45, 4, 2);
    s.addPoints();
  } else if (sh === "deltoid") {
    s = new Deltoid(0, 0, length / 4);
    s.addPoints();
  } else if (sh === "eight") {
    s = new Eight(0, 0, length * 0.75);
    s.addPoints();
  } else if (sh === "gear") {
    s = new Gear(0, 0, length * 0.75, 8);
    s.addPoints();
  } else if (sh === "hypocyclid") {
    s = new Hypocyclid(0, 0, length * 0.75, 6, 3);
    s.addPoints();
  } else if (sh === "heart") {
    s = new Heart(0, 0, length / 8);
    s.addPoints();
  } else if (sh === "kiss") {
    s = new KissCurve(0, 0, length * 0.75, 1, 1);
    s.addPoints();
  } else if (sh === "knot") {
    s = new Knot(0, 0, length / 4);
    s.addPoints();
  } else if (sh === "line") {
    s = null;
  } else if (sh === "lissajous") {
    s = new Lissajous(0, 0, length * 0.4, 1, 2, PI * 0.4);
    s.addPoints();
  } else if (sh === "ophiuride") {
    s = new Ophiuride(0, 0, length * 0.5, 2, 0.2);
    s.addPoints();
  } else if (sh === "quadrifolium") {
    s = new Quadrifolium(0, 0, length * 1);
    s.addPoints();
    // } else if (sh === "rose") {
    //   s = new Rose(0, 0, length * 0.175, 2, 5, 8);
    //   s.addPoints();
  } else if (sh === "spiral") {
    // n = 1 Archimedian Spiral
    // n = -1 Hyperbolic Spiral
    // n = 1/2 Fermat spiral
    // n = -1/2 Lituus spiral
    // n = 2 Galilean spiral
    let a = 0.5;
    let n = -0.5;
    let dir = -1;
    s = new Spiral(0, 0, dir, length, a, n, (PI * 10) / 8);
    //s = new Spiral(0, 0, dir, length, .5, -0.5, 0);
    s.addPoints();
  } else if (sh === "superellipse") {
    s = new Superellipse(0, 0, length, 2, 1, 0.5);
    s.addPoints();
  } else if (sh === "supershape") {
    // square new Supershape(0, 0, length * 0.75, 1, 1,1, 1, 1,4);
    // circle new Supershape(0, 0, length * 0.75,1, 1, 1, 1, 1, 0);
    s = new Supershape(0, 0, length * 0.5, 2.5, 0.4, 1, 2, 1, 4);
    s.addPoints();
  } else if (sh === "tetracuspid") {
    s = new Tetracuspid(0, 0, length * 0.5);
    s.addPoints();
  } else if (sh === "tear") {
    s = new TearDrop(0, 0, length * 1, PI);
    s.addPoints();
  } else if (sh === "zigzag") {
    s = new Zigzag(0, 0, length / 2, PI);
    s.addPoints();
  }
}

function mousePressed() {
  save("image.jpg");
}

// function mousePressed() {
//   generate();
//   turtle();
// }

// function keyPressed() {
//   if (key === "1") {
//     currentPattern = "dragon";
//     setPattern(currentPattern);
//     turtle();
//   } else if (key === "2") {
//     currentPattern = "ring";
//     setPattern(currentPattern);
//     turtle();
//   }
// }
