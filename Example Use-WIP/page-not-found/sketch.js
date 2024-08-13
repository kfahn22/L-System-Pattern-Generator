/// L-system koch-snowflake rule from Paul Bourk2
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


function setup() {
  createCanvas(800, 600);
  background("#595959");
  
  fractal = lsystem.koch_snowflake;
  setRule(fractal);
  
  // Set text size as a fraction of length
  shapeScale = 0.4;
  selectedShape = new addText(0, 0, length * shapeScale);
  push();
  translate(width * 0.25, height * 0.31);

  for (let i = 0; i < level; i++) {
    generate();
  }
  turtle();
  pop();
  push();
  noStroke();
  fill(255);
  textSize(24);
  textAlign(CENTER, CENTER)
  text("PAGE NOT FOUND", width/2, height /2);
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
      fill(255);
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
