// L-system variables
let level = 7; // fractal level
let length = 22; // step length
let axiom;
let sentence;
let rules = {};
let lsystem;
let lf; // length adjustment factor

// Shape and color variables
let s; // shape
let c; // color palette
let fl = true; // whether the shapes are filled or stroke

let wadj = 0.65; // amount to to translate in x direction
let hadj = 0.7; // amount to to translate in y direction
let sw = 1; // strokeweight

let blueGreenPalette;
let lightBluePalette;
let brownGreenPalette;
let aquaBluePalette;
let plantGreensPalette;
let redPalette;
let orangeBluePalette;

// Set default palette
//let currentPalette = aquaBluePalette;
let palettes = {};
let dropdown;

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
  "astroid", // 1
  "bicorn", //2
  "cassini", //3
  "ceva", //4
  "cornu", //5
  "cross", //6
  "eight", //7
  "kiss", //8
  "line", //9
  "quadrifolium", // 10
  "spiral", // 11
  "superellipse", // 12
  "supershape", // 19
  "tear", // 13
  "zigzag", // 14
];

let sh = shapes[7];

function getColors(data) {
  palettes = data.colors;
  aquaBluePalette = palettes.aqua_blue;
  lightBluePalette = palettes.light_blue;
  brownGreenPalette = palettes.brown_green;
  blueGreenPalette = palettes.blue_green;
  plantGreensPalette = palettes.plant_greens;
  redPalette = palettes.reds;
  orangeBluePalette = palettes.orange_blue;

  // Update background color with the default palette
  // Set default palette
  currentPalette = aquaBluePalette;
  //background(currentPalette[4]);

  // Create dropdown menu
  dropdown = createSelect();
  dropdown.position(10, 10);
  dropdown.option("aqua_blue");
  dropdown.option("light_blue");
  dropdown.option("brown_green");
  dropdown.option("blue_green");
  dropdown.option("plant_greens");
  dropdown.option("reds");
  dropdown.option("orange_blue");

  // Set initial value of the dropdown
  dropdown.selected("aqua_blue");

  // Attach event listener

  dropdown.changed(pickColor);
}

function pickColor() {
  let selected = dropdown.value();
  switch (selected) {
    case "aqua_blue":
      currentPalette = aquaBluePalette;
      break;
    case "light_blue":
      currentPalette = lightBluePalette;
      break;
    case "brown_green":
      currentPalette = brownGreenPalette;
      break;
    case "blue_green":
      currentPalette = blueGreenPalette;
      break;
    case "plant_greens":
      currentPalette = plantGreensPalette;
      break;
    case "reds":
      currentPalette = redPalette;
      break;
    case "orange_blue":
      currentPalette = orangeBluePalette;
      break;
  }

  // Update background color with the selected palette
  background(currentPalette[4]);
  translate(width * wadj, height * hadj);
  rotate(-PI / 2);
  addShape();
  // for (let i = 0; i < level; i++) {
  //   generate();
  // }
  turtle();
}

function preload() {
  loadJSON("rules.json", loadRules);
  loadJSON("palettes.json", getColors);
}

function setup() {
  createCanvas(600, 600);
  translate(width * wadj, height * hadj);
  rotate(-PI / 2);
  addShape();
  for (let i = 0; i < level; i++) {
    generate();
  }
  turtle();
}

function draw() {
  // translate(width * wadj, height * hadj);
  // rotate(-PI / 2);
  //turtle();
  //noLoop();
}

function loadRules(data) {
  lsystem = data;
  setRule(currentPattern);
}

// function loadPalettes(data) {
//   colors = data;
//   // setPalette(colorName);
// }

function setRule(pattern) {
  axiom = lsystem[pattern].axiom;
  rules = lsystem[pattern].rules;
  angle = radians(lsystem[pattern].angle);
  lf = lsystem[pattern].length_factor;
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
    //c = random(currentPalette);
    c = chooseColor(currentPalette);
    //console.log(c)
    if (current === "F") {
      if (s) {
        //c = chooseColor(currentPalette);

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
        // c = chooseColor(currentPalette);
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
  } else if (sh === "eight") {
    s = new Eight(0, 0, length * 0.75);
    s.addPoints();
  } else if (sh === "heart") {
    s = new Heart(0, 0, length / 8);
    s.addPoints();
  } else if (sh === "kiss") {
    s = new KissCurve(0, 0, length * 0.75, 1, 1);
    s.addPoints();
  } else if (sh === "line") {
    s = null;
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
    s = new Supershape(0, 0, length * 0.5, 2.5, 0.4, 1, 2, 1, 4);
    s.addPoints();
  } else if (sh === "tear") {
    s = new TearDrop(0, 0, length * 1, PI);
    s.addPoints();
  } else if (sh === "zigzag") {
    s = new Zigzag(0, 0, length / 2, PI);
    s.addPoints();
  }
}

// function mousePressed() {
//   save("image.jpg");
// }
