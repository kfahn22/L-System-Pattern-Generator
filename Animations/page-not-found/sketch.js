// L-system dragon rule from Paul Bourke
// https://paulbourke.net/fractals/lsys/
// https://thecodingtrain.com/challenges/16-l-system-fractal-trees

let level = 0; // fractal level
let length = 200; // step length
let axiom;
let sentence;
let currentFractal;
let fractal; // rendered fractal
let shapeAngle = 0;
let amt;

let dragon;

let lsystem = {
  dragon: {
    axiom: "FX",
    rules: {
      X: "X+YF+",
      Y: "-FX-Y",
    },
    angle: "90",
  },
};

let sw = 5; // strokeweight
let currentAlpha = 255; // alpha of color
// Amount to adjust translation
let wadj = 0.5;
let hadj = 0.5;

// Shape parameters
let shapeScale = 0.5; //0.2;

let frames = 60;

function setup() {
  createCanvas(800, 600);
  amt = PI / 4;
}

function draw() {
  background(206, 54, 153);
  fractal = lsystem.dragon;
  setRule(fractal);
  let s = length * shapeScale;
  selectedShape = new addWord(0, 0, s, radians(shapeAngle));
  adjustPosition();
  push();
  translate(width * wadj, height * hadj);
  rotate(angle);
  for (let i = 0; i < level; i++) {
    generate();
  }
  turtle();
  pop();
  if (level === 9) {
    noLoop();
    push();
    background(206, 54, 153);
    textSize(50);
    textAlign(CENTER, CENTER);
    fill(255);
    text("PAGE NOT FOUND", width / 2, height / 2);
    pop();
    let amt = map(s, 4.419, 100, 22.629, 108);
  } else if (frameCount % 108 === int(amt)) {
    shapeAngle = 0;
    level += 1;
    length = length / sqrt(2);
    sw = map(length, 0, 200, 0.5, 5);
    adjustPosition();
  }

  shapeAngle += PI / 4;
}

function adjustPosition() {
  if (level === 1) {
    wadj = 0.5;
    hadj = 0.4;
  } else if (level === 2) {
    wadj = 0.56;
    hadj = 0.4;
  } else if (level === 3) {
    wadj = 0.6;
    hadj = 0.55;
  } else if (level === 4) {
    wadj = 0.5;
    hadj = 0.6;
  } else if (level === 5) {
    wadj = 0.45;
    hadj = 0.6;
  } else if (level === 6) {
    wadj = 0.4;
    hadj = 0.55;
  } else if (level === 7) {
    wadj = 0.4;
    hadj = 0.45;
  } else if (level === 8) {
    wadj = 0.45;
    hadj = 0.36;
  } else if (level === 9) {
    wadj = 0.55;
    hadj = 0.4;
  }
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
  for (let i = 0; i < sentence.length; i++) {
    let amt = 0;
    let current = sentence.charAt(i);
    if (current === "F") {
      if (level < 10) {
        fill(255, 255, 255, currentAlpha);
        noStroke();
        selectedShape.show();
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
    } else if (current == "*") {
      alpha -= 50;
    } else if (current == "{") {
      beginShape();
    } else if (current == "}") {
      noStroke();
      // let c = color(4, 150, 255, alpha);
      // let c1 = color(144, 85, 162, alpha);
      // fill(c1);
      endShape();
    }
  }
}

function mousePressed() {
  save("dragon_img.jpg");
}
