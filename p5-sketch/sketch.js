// Formulas for L-system by Paul Bourke
// https://paulbourke.net/fractals/lsys/

let alpha = 255;
let alpha2 = 255;
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
  [112, 238, 156, alpha2],
  [181, 244, 74, alpha],
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
  [218, 227, 229, 150],
  [187, 209, 234, alpha],
  [161, 198, 234, alpha],
  [80, 125, 188, alpha],
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
  [62, 124, 177, alpha],
  [5, 74, 145, alpha],
  [219, 228, 238, alpha],
  [129, 164, 205, alpha],

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
  [9, 82, 86, 100],
  [8, 127, 140, alpha],
  [90, 170, 149, alpha],
  [134, 168, 115, alpha],
  [255, 255, 255, 255],
];

let palette9 = [
  [239, 118, 122, alpha],
  [125, 122, 188, alpha],
  [100, 87, 166, alpha],
  [255, 227, 71, alpha],
  [4, 42, 53, 255],
];

let palette10 = [
  [203, 255, 140, alpha],
  [185, 216, 194, alpha],
  [100, 87, 166, alpha],
  [238, 132, 52, alpha],
  [2, 3, 0, 255],
];

let palette11 = [
  [255, 221, 73, alpha],
  [104, 182, 132, alpha],
  [254, 144, 0, alpha],
  [60, 105, 151, alpha],
  [0, 21, 20, 255],
];
let palette12 = [
  [237, 173, 199, 100],
  [209, 153, 182, alpha],
  [196, 147, 176, alpha],
  [166, 139, 165, alpha],
  [25, 23, 22, 255],
  // [92,93,103, 255],
];

let palette13 = [
  [79, 93, 117, 100],
  [191, 192, 192, alpha],
  [255, 255, 255, alpha],
  [239, 131, 84, alpha],
  [45, 49, 66, 255],
];

// purple/aqua
let palette14 = [
  [151, 216, 178, 255],
  [160, 172, 173, alpha],
  [83, 18, 83, alpha],
  [51, 3, 47, alpha],
  [23, 3, 18, 255],
];

// aqua/blue
let palette15 = [
  [202, 240, 248, 100],
  [144, 224, 239, alpha],
  [0, 180, 216, alpha],
  [0, 119, 182, alpha],
  [3, 4, 94, 255],
];

// plant greens
let palette16 = [
  [80, 75, 58, 255],
  [110, 111, 88, alpha],
  [125, 133, 112, alpha],
  [175, 190, 143, alpha],
  [38, 96, 164, 255],
];

// bright green and red
let palette17 = [
  [47,181,113, alpha2],
  [140,216,103, alpha],
  [237,125,58, alpha],
  [239,45,86, alpha],
  [54,53,55, 255],
];

// muted orange, yellow, green, blue
let palette18 = [
  [112, 162, 136, alpha2],
  [213, 137, 111, alpha],
  [218, 183, 133, alpha],
  [224, 141, 172, alpha],
  [42, 43, 42, 255],
];

// orange, purple, yellow
let palette19 = [
  [105,143,63, alpha2],
  [240,162,2, alpha],
  [255,246,137, alpha],
  [128,71,94, alpha],
  [25,24,10, 255],
];

// greens
let palette20 = [
  [107,191,89, alpha2],
  [8,160,69, alpha],
  [11, 110, 79, alpha],
  [7,59,58, alpha],
  [221,213, 208, 255],
];

let palette21 = [
  [246, 186, 99, alpha2],
  [153, 185, 158, alpha],
  [183, 197, 109, alpha],
  [106, 127, 110, alpha],
  [255, 255, 255, 255],
];

// lt blues
let palette22 = [
  [202,240,248, alpha2],
  [173,232,244, alpha],
  [144,224,239, alpha],
  [72,202,228, alpha],
  [3,4,94, 255],
];

// more greens
let palette23 = [
  [204, 255, 51, alpha2],
  [158, 240, 26, alpha],
  [112, 224, 0, alpha],
  [56, 176, 0, alpha],
  [0,75,35, 255],
  // [0, 0, 0, 255],
];


// brown and green
let palette24 = [
  [179,138,88, alpha2],
  [111,115,47, alpha],
  [60,82,51, alpha],
  [38,64,39, alpha],
  [13,31,34, 255],
];

// red, orange, yellow
let palette25 = [
  [255,229,72, alpha2],
  [255,178,15, alpha],
  [255,75,62, alpha],
  [151,45,7, alpha],
  [88,39,7, 255],
];

let palette26 = [
  [234,226,183, alpha2],
  [252,191,73, alpha],
  [247,127,0, alpha],
  [214,40,40, alpha],
  [0,48,73, 255],
];

let palette27 = [
  [242,100,25, alpha2],
  [246,174,45, alpha],
  [47,72,88, alpha],
  [191,49,0, alpha],
  [255,255,255, 255],
];

let palette28 = [
  [68,187,164, alpha2],
  [63,136,197, alpha],
  [246,247,235, alpha],
  [233,79,55, alpha],
  [57,62,65, 255],
];

let palette29 = [
  [162, 173, 89, alpha2],
  [142, 147, 109, alpha],
  [89, 131, 129, alpha],
  [23, 126, 137, alpha],
  [35,35,26, 255],
  // [8, 96, 95, 255],
];




// let c1 = color(255, 149, 140);
// let c2 = color(238, 133, 181);
let currentPalette = palette29;

// L-system variables
let level = 4; // fractal level
let length = 14; // step length
let axiom;
let sentence;
let rules = {};
let lsystem;
let lf; // length adjustment factor

// Shape and color variables
let s; // shape
let c; // color palette

// r = length;
// a = 0.5;
//dir = -1;
let fl = false; // whether the shapes are filled or stroke

let wadj = 0.2; // amount to to translate in x direction
let hadj = 0.8; // amount to to translate in y direction
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

let currentPattern = patterns[6];

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
let sh = shapes[18];



function preload() {
  loadJSON("rules.json", loadLSystem);
}

function setup() {
  createCanvas(600, 600);
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
    s = new Lissajous(0, 0, length*0.4, 1, 2, PI *.4);
    s.addPoints();
     } else if (sh === "ophiuride") {
    s = new Ophiuride(0, 0, length * 0.5, 2, .2);
    s.addPoints();
  } else if (sh === "quadrifolium") {
    s = new Quadrifolium(0, 0, length * 0.75);
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
    s = new Supershape(0, 0, length * 0.5,  2.5, 0.4, 1, 2, 1, 4);
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
