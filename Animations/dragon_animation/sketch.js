// L-system draon2 rule from Paul Bourke
// https://paulbourke.net/fractals/lsys/

let level = 0; // fractal level
let length = 250; // step length
let axiom;
let sentence;
let currentFractal;
let lsystem; // rules data
let lf; // length adjustment factor
let fractal; // rendered fractal

let dragon1;
let dragon2;

let data = {
  dragon1: {
    axiom: "FX",
    rules: {
      X: "X+YF+",
      Y: "-{FZXZ}-Y",
      Z: "*",
      length_factor: "1",
    },
    angle: "90",
    length_factor: "1",
  },
  dragon2: {
    axiom: "FX",
    rules: {
      X: "X+YF+",
      Y: "-FX-Y",
      length_factor: "1",
    },
    angle: "90",
    length_factor: "1",
  },
};

let sw = 5; // strokeweight
let currentAlpha = 200; // alpha of color
// Amount to adjust translation
let wadj = 0.5;
let hadj = 0.5;

// Shape parameters
let shapeScale = 0.2;
let a = 1;
let b = 1;
let n = 0.5;

let frames = 60

function keyPressed() {
  if (key == "s") {
    const options = {
      units: "frames",
      delay: 0,
    };
    saveGif("GIF/dragon.gif", frames, options);
  }
}

function setup() {
  let canvas = createCanvas(600, 600);
}

function draw() {
  // background(10, 16, 69);
  background(1, 22, 56);
  pickRule(data);
  selectedShape = new Superellipse(0, 0, length * shapeScale, a, b, n);
  selectedShape.addPoints();
  adjustPosition();
  push();
  translate(width * wadj, height * hadj);
  rotate(angle);
  for (let i = 0; i < level; i++) {
    generate();
  }
  turtle();
  pop();
  //let d = map(a, 0, 3, 0, TWO_PI);
  if (a < 3) {
    a += 0.05
    //a += d / frames;
  } else if (int(a) === 3) {
    a = 1;
  }
  if (b < 3) {
    b += 0.05
    //b += d / frames;
  } else if (b === 3) {
    b = 1;
  }
  if (level === 12) {
    noLoop();
    console.log(frameCount)
  } else if (int(a) === 3) {
    level += 1;
    length = length / sqrt(2);
    sw = map(length, 0, 200, 0.5, 5);
    adjustPosition();
  }
}

function adjustPosition() {
  if (level === 1) {
    wadj = 0.5;
    hadj = 0.33;
  } else if (level === 2) {
    wadj = 0.6;
    hadj = 0.4;
  } else if (level === 3) {
    wadj = 0.66;
    hadj = 0.56;
  } else if (level === 4) {
    wadj = 0.56;
    hadj = 0.66;
  } else if (level === 5) {
    wadj = 0.4;
    hadj = 0.66;
  } else if (level === 6) {
    wadj = 0.33;
    hadj = 0.6;
  } else if (level === 7) {
    wadj = 0.33;
    hadj = 0.4;
  } else if (level === 8) {
    wadj = 0.43;
    hadj = 0.33;
  } else if (level === 9) {
    wadj = 0.6;
    hadj = 0.33;
  } else if (level === 10) {
    wadj = 0.66;
    hadj = 0.4;
  } else if (level === 11) {
    wadj = 0.66;
    hadj = 0.6;
  } else if (level === 12) {
    wadj = 0.6;
    hadj = 0.7;
  }
}

function setRule(pattern) {
  axiom = pattern.axiom;
  rules = pattern.rules;
  angle = radians(pattern.angle);
  lf = pattern.length_factor;
  sentence = axiom;
}

function pickRule(data) {
  lsystem = data;

  dragon1 = lsystem.dragon1; // some shapes have fill
  dragon2 = lsystem.dragon2; // unfilled
  currentFractal = "dragon1";

  switch (currentFractal) {
    case "dragon1":
      currentFractal = dragon1;
      break;
    case "dragon2":
      currentFractal = dragon2;
      break;
  }
  setRule(currentFractal);
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
    let alpha = 150;
    let amt = 0;
    let current = sentence.charAt(i);
    if (current === "F") {
      if (level < 10) {
        noFill();
        strokeWeight(sw);
        //stroke(255, 136, 17, currentAlpha);
        stroke(212, 163, 185, currentAlpha);
        selectedShape.show();
      } else {
        fill(212, 163, 185);
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
      let c = color(4, 150, 255, alpha);
      let c1 = color(144, 85, 162, alpha);
      fill(c1);
      endShape();
    }
  }
}

function mousePressed() {
  save("dragon_img.jpg");
}
