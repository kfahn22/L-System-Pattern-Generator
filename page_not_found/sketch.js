// L-system koch-snowflake rule from Paul Bourke
// https://paulbourke.net/fractals/lsys/
// Basic code from:
// https://natureofcode.com/fractals/
// https://thecodingtrain.com/challenges/16-l-system-fractal-trees

let level = 2; // fractal level
let length = 45; // step length
let axiom;
let rules;
let angle;
let sentence;
let fractal;
let shapeScale; //  set text length to fraction of step length

let lsystem = {
  koch_snowflake: {
    axiom: "F++F++F",
    rules: {
      F: "F-F++F-F",
    },
    angle: "60",
  },
};

let palette = [
  "#70327E",
  "#0B6A88",
  "#701616",
  "#9253A1",
  "#2DC5F4",
  "#F16164",
  "#A42963",
  "#F89E4F",
  "#EC015A",
  "#F063A4",
  "#FCEE21",
  "#66D334",
];

function setup() {
  createCanvas(800, 600);
  background(255);

  fractal = lsystem.koch_snowflake;
  setRule(fractal);

  // Set text size as a fraction of length
  shapeScale = 0.75;
  selectedShape = new addText(0, 0, length * shapeScale);
  push();
  translate(width * 0.25, height * 0.3);

  for (let i = 0; i < level; i++) {
    generate();
  }
  turtle();
  pop();
  push();
  rectMode(CENTER);
  noStroke();
  fill("#70327E");
  textSize(24);
  text("PAGE NOT FOUND", width * 0.375, height * 0.51);
  pop();
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
      fill(random(palette));
      noStroke();
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

function mousePressed() {
  save("img.jpg");
}
