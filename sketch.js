// Formulas for L-system by Paul Bourke
// https://paulbourke.net/fractals/lsys/

let axiom;
let sentence;
let rules = {};
let lsystem;
let lf;
let level = 3;
let s; // shape
let c; // color palette
n = -0.5;
let length = 11; // 18
r = length;
a = 0.5;
dir = -1;
let fl = false;

// let wSlider, hSlider, lSlider;
// let patternArray = { none: "1", board: "1", bush: "2" };

let patterns = [
  "none", //0
  "algae",
  "board",
  "bush",
  "circular", // 4
  "cross1",
  "cross2",
  "cross3",
  "cross4",
  "crystal",
  "dragon1", //10
  "dragon2",
  "fern",
  "hexagonal gosper",
  "hilbert",
  "kolam", // 15
  "koch curve",
  "krishna_anklet", // 17
  "koch_snowflake",
  "leaf", //16
  "mango_leaf",
  "peano", // 18
  "pentaplexity",
  "quadratic gosper",
  "quadratic koch island", // 21
  "rings",
  "snake kolam", // 23
  "skierpinski", // 24
  "square skierpinski",
  "sticks",
  "tree", //27
  "tiles",
  "triangle",
  "weed", // 30
];
let currentPattern = patterns[18];
let alpha = 150;
let wadj = 0.26;
let hadj = 0.57;
let sw = 2;

let shapes = [
  "archimedes spiral", // 0
  "astroid", // 1
  "bicorn", //2
  "ceva", //3
  "cornu", //4
  "cross", //5
  "deltoid", //6
  "eight", //7
  "gear", // 8
  "heart", //9
  "kiss", //10
  "knot", //11
  "line", //12
  // "nodal",
  "ophiuroid",
  "rose", // 13
  "quadrifolium", // 14
  "spiral", // 15
  // "strophoid", //
  "supershape", // 16
  "tear", // 17
  "zigzag", // 18
];
let sh = shapes[0];

//bright
let palette1 = [
  [6, 214, 160, 100],
  [255, 209, 102, 100],
  [239, 71, 111, 100],
  [38, 84, 124, 100],
  [252, 252, 252, 255],
];

// greens and blues
let palette2 = [
  [181, 244, 74, alpha],
  [112, 238, 156, 100],
  [121, 174, 163, alpha],
  [67, 67, 113, alpha],
  [13, 10, 11, 255],
];

// purples
let palette3 = [
  [165, 196, 212, 100],
  [132, 153, 177, 100],
  [123, 109, 141, 100],
  [89, 63, 98, 100],
  [54, 21, 30, 255],
];

// blues
let palette4 = [
  [218, 227, 229, 100],
  [187, 209, 234, 100],
  [161, 198, 234, 100],
  [80, 125, 188, 100],
  [4, 8, 15, 255],
];

// greys
let palette5 = [
  [224, 251, 252, alpha],
  [194, 223, 227, alpha],
  [157, 180, 192, alpha],
  [92, 107, 115, alpha],
  [85, 67, 72, 255],
];

// orange and blue
let palette6 = [
  [219, 228, 238, alpha],
  [129, 164, 205, alpha],
  [62, 124, 177, alpha],
  [5, 74, 145, alpha],
  [241, 115, 0, 255],
];

// reds
let palette7 = [
  [102, 0, 0, alpha],
  [153, 0, 51, alpha],
  [95, 2, 31, alpha],
  [140, 0, 26, alpha],
  [255, 255, 255, 255],
];

let palette8 = [
  [9, 82, 86, alpha],
  [8, 127, 140, alpha],
  [90, 170, 149, alpha],
  [134, 168, 115, alpha],
  [255, 255, 255, 255],
];

// let c1 = color(255, 149, 140);
// let c2 = color(238, 133, 181);
let currentPalette = palette6;

function preload() {
  loadJSON("rules.json", loadLSystem);
}

function setup() {
  createCanvas(600, 600);
  background(currentPalette[4]);
  addShape();
  for (let i = 0; i < level; i++) {
    // Increase the number of iterations for more complexity
    generate();
  }
}

function draw() {
  translate(width * wadj, height * hadj);
  rotate(-PI / 2);
  turtle();
  noLoop();
}

function loadLSystem(data) {
  lsystem = data;
  setPattern(currentPattern);
  // createCanvas(800, 800);
  // background(255);
  //turtle();
}

function setPattern(pattern) {
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
      }
      // s.show(c);
      else {
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
      //length = length * lf;
    } else if (current == "<") {
      //length = length / lf;
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
      fill(currentPalette[1]);
      endShape();
    } else if (current == "#") {
      t.show();
    }
  }
}
// let shapes = [
//   "archimedes spiral",
//   "ceva",
//   "cross",
//   "deltoid",
//   "kiss",
//   "knot",
//   "quadrifolium",
//   "spiral",
//   "tear",
// ];

function addShape() {
  //let r = lSlider.value();
  if (sh === "archimedes spiral") {
    s = new ArchimedesSpiral(0, 0, length * 0.4, -1, (PI * 10) / 8);
    s.addPoints();
  } else if (sh === "astroid") {
    s = new Astroid(0, 0, length * 0.5);
    s.addPoints();
  } else if (sh === "bicorn") {
    s = new Bicorn(0, 0, length * 0.5);
    s.addPoints();
  } else if (sh === "ceva") {
    s = new Ceva(0, 0, length / 4);
    s.addPoints();
  } else if (sh === "cornu") {
    s = new CornuSpiral(0, 0, length / 3, PI / 2);
    s.addPoints();
  } else if (sh === "cross") {
    s = new MalteseCross(0, 0, length * 0.5);
    s.addPoints();
  } else if (sh === "deltoid") {
    s = new Deltoid(0, 0, length / 4);
    s.addPoints();
  } else if (sh === "eight") {
    s = new Eight(0, 0, length * 0.75);
    s.addPoints();
  } else if (sh === "ellipse") {
    ellipse(0, 0, length * 0.5, length * 0.5);
  } else if (sh === "gear") {
    s = new Gear(0, 0, length * 0.75, 8);
    s.addPoints();
  } else if (sh === "leaf") {
    s = new Strophoid(0, 0, length * 0.5);
    s.addPoints();
  } else if (sh === "line") {
    s = null;
  } else if (sh === "heart") {
    s = new Heart(0, 0, length / 8);
    s.addPoints();
  } else if (sh === "kiss") {
    s = new KissCurve(0, 0, length * 0.75);
    s.addPoints();
  } else if (sh === "knot") {
    s = new Knot(0, 0, length / 4);
    s.addPoints();
  } else if (sh === "ophiuroid") {
    s = new Ophiuroid(0, 0, length / 4);
    s.addPoints();
    // } else if (sh === "nodal") {
    // s = new Nodal(0, 0, length/2, 1);
    // s.addPoints();
  } else if (sh === "quadrifolium") {
    s = new Quadrifolium(0, 0, length * 0.75);
    s.addPoints();
  } else if (sh === "rose") {
    s = new Rose(0, 0, length * 0.175, 2, 5, 8);
    s.addPoints();
  } else if (sh === "spiral") {
    s = new Spiral(0, 0, dir, length, a, n, (PI * 10) / 8);
    s.addPoints();
    // square new Supershape(0, 0, length * 0.75, 4);
    // circle new Supershape(0, 0, length * 0.75, 0);
  } else if (sh === "supershape") {
    s = new Supershape(0, 0, length * 0.75, 0);
    s.addPoints();
  } else if (sh === "tear") {
    s = new TearDrop(0, 0, length * 1);
    s.addPoints();
  } else if (sh === "zigzag") {
    s = new Zigzag(0, 0, length / 2);
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
