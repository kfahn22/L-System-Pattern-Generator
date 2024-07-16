// L-system variables
let level = 3; // fractal level
let length = 22; // step length
let axiom;
let sentence;
let rules = {};
let lsystem;
let lf; // length adjustment factor

// Shape and color variables
let selectedShape; // custom shape to use in fractal
let selectedColor; // color palette

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
let currentPalette;
let palettes = {}; // array that holds all of the available palettes
let i = 0; // index to pick color

// Controls
let wSlider, hSlider; // placement of fractral
let levelSlider; // the level of the fractal
let lengthSlider; // determines step size
let checkbox; // boolean for whether shape is filed

// Drop downs to select rule, pattern, and colors
let dropdown; // color
let shapeDropdown;
let ruleDropdown;

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

let currentRule = patterns[2];
//let currentPattern = patterns[2];

function pickRule() {
  ruleDropdown = createSelect();
  ruleDropdown.position(150, 10);
  ruleDropdown.option("none");
  ruleDropdown.option("board");
  ruleDropdown.option("board2");
  ruleDropdown.option("circular");
  ruleDropdown.option("cross1");
  ruleDropdown.option("crystal");
  ruleDropdown.option("dragon1");
  ruleDropdown.option("fern");
  ruleDropdown.option("hexagonal gosper");
  ruleDropdown.option("hilbert");
  ruleDropdown.option("kolam");
  ruleDropdown.option("koch curve");
  ruleDropdown.option("krishna_anklet");
  ruleDropdown.option("koch_snowflake");
  ruleDropdown.option("mango_leaf");
  ruleDropdown.option("peano");
  ruleDropdown.option("pentaplexity");
  ruleDropdown.option("quadratic gosper");
  ruleDropdown.option("quadratic koch island");
  ruleDropdown.option("rings");
  ruleDropdown.option("snake kolam");
  ruleDropdown.option("skierpinski");
  ruleDropdown.option("square skierpinski");
  ruleDropdown.option("sticks");
  ruleDropdown.option("tree");
  ruleDropdown.option("tiles");
  ruleDropdown.option("tree");
  ruleDropdown.option("triangle");

  // Set initial value of the dropdown
  currentRule = ruleDropdown.selected("board");

  // Attach event listener

  //console.log(rule);
  // ruleDropdown.changed(setRule(rule));
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
  selectedColor = chooseColor(currentPalette);
}

function addShapes() {
  shapeDropdown = createSelect();
  shapeDropdown.position(300, 10);
  shapeDropdown.option("astroid");
  shapeDropdown.option("bicorn");
  shapeDropdown.option("cassini");
  shapeDropdown.option("ceva");
  shapeDropdown.option("cornu");
  shapeDropdown.option("cross");
  shapeDropdown.option("eight");
  shapeDropdown.option("kiss");
  shapeDropdown.option("line");
  shapeDropdown.option("quadrifolium");
  shapeDropdown.option("superellipse");
  shapeDropdown.option("supershape");
  shapeDropdown.option("tear");
  shapeDropdown.option("zigzag");

  // Set initial value of the dropdown
  shapeDropdown.selected("supershape");
}

function pickShape() {
  let selected = shapeDropdown.value();
  switch (selected) {
    case "astroid":
      selectedShape = new Astroid(0, 0, length * 0.5, 2);
      selectedShape.addPoints();
      break;
    case "bicorn":
      selectedShape = new Bicorn(0, 0, length * 0.5);
      selectedShape.addPoints();
      break;
    case "cassini":
      // 1, 1.25 peanut shaped/
      // 1, 2 oval
      selectedShape = new CassiniOval(0, 0, length / 2, 1, 1.25);
      selectedShape.addPoints();
      break;
    case "ceva":
      selectedShape = new Ceva(0, 0, length / 4);
      selectedShape.addPoints();
      break;
    case "cornu":
      selectedShape = new CornuSpiral(0, 0, length / 3, PI / 2);
      selectedShape.addPoints();
      break;
    case "cross":
      // 1 quadrifolium
      // gets longer and more rounded as a increases
      selectedShape = new MalteseCross(0, 0, length * 0.45, 4, 2);
      selectedShape.addPoints();
      break;
    case "eight":
      selectedShape = new Eight(0, 0, length * 0.75);
      selectedShape.addPoints();
      break;
    case "kiss":
      selectedShape = new KissCurve(0, 0, length * 0.75, 1, 1);
      selectedShape.addPoints();
      break;
    case "line":
      selectedShape = null;
      break;
    case "quadrifolium":
      selectedShape = new Quadrifolium(0, 0, length * 1);
      selectedShape.addPoints();
      break;
    case "spiral":
      // n = 1 Archimedian Spiral
      // n = -1 Hyperbolic Spiral
      // n = 1/2 Fermat spiral
      // n = -1/2 Lituus spiral
      // n = 2 Galilean spiral
      let a = 0.5;
      let n = -0.5;
      let dir = -1;
      selectedShape = new Spiral(0, 0, dir, length, a, n, (PI * 10) / 8);
      //selectedShape = new Spiral(0, 0, dir, length, .5, -0.5, 0);
      selectedShape.addPoints();
      break;
    case "superellipse":
      selectedShape = new Superellipse(0, 0, length, 2, 1, 0.5);
      selectedShape.addPoints();
      break;
    case "supershape":
      selectedShape = new Supershape(0, 0, length * 0.5, 1, 2, 1, 1, 1, 4);
      selectedShape.addPoints();
      break;
    case "tear":
      selectedShape = new TearDrop(0, 0, length * 1, PI);
      selectedShape.addPoints();
      break;
    case "zigzag":
      selectedShape = new Zigzag(0, 0, length / 2, PI);
      selectedShape.addPoints();
      break;
  }
  shapeDropdown.changed(pickShape);
}

function pickColor() {
  currentPalette = dropdown.value();
  switch (currentPalette) {
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
  //background(currentPalette[4]);
  //translate(width * wadj, height * hadj);
  rotate(-PI / 2);
  //pickShape();
  //fillShape.changed(changeFill);

  dropdown.changed(pickColor);
  fillShape.changed(adjustFill);
  //shapeDropdown.input(draw);
  //shapeDropdown.changed(pickShape);
  // for (let i = 0; i < level; i++) {
  //   generate();
  // }
  //turtle();
  //pop()
}

function addSliders() {
  wSlider = createSlider(5, width - 5, 5, 5);
  wSlider.position(width + 10, 10);
  hSlider = createSlider(5, height - 5, 5, 5);
  hSlider.position(width + 10, 30);
  levelSlider = createSlider(0, 12, 2, 1);
  levelSlider.position(width + 10, 50);
  // level = levelSlider.value();
  lengthSlider = createSlider(5, 50, 20, 1);
  lengthSlider.position(width + 10, 70);
  // length = lengthSlider.value();

  wSlider.input(draw);
  hSlider.input(draw);
  levelSlider.input(draw);
  lengthSlider.input(draw);
}

function adjustPosition() {
  translate(wSlider.value(), hSlider.value());
}

function adjustFill() {
  //selectedColor = chooseColor( currentPalette);
  if (fillShape.checked() === true) {
    fill(currentPalette[1]);
    noStroke();
  } else {
    noFill();
    stroke(currentPalette[1]);
  }
}

// function adjustLevel() {
//   level = levelSlider.value();
// }

// function adjustLength() {
//   length = lengthSlider.value();
// }

// function updateFractal() {
//   push();
//   // adjustPosition();
//   // if (wSlider.changed() | hSlider.changed) {
//   //   adjustPosition();
//   // }
//   wadj = wSlider.value();
//   hadj = hSlider.value();
//   translate(wadj, hadj);
//   level = levelSlider.value();
//   length = lengthSlider.value();
//   dropdown.changed(pickColor);
//   fillShape.changed(adjustFill);
//   shapeDropdown.changed(pickShape);
//   //turtle();
// }

function preload() {
  loadJSON("rules.json", loadRules);
  loadJSON("palettes.json", getColors);
}

function setup() {
  createCanvas(600, 600);
  addSliders();

  //push()
  // background(currentPalette[4]);
  //translate(wadj, hadj);
  //rotate(-PI / 2);
  fillShape = createCheckbox("Fill");
  fillShape.position(30, 40);

  //checkbox.changed(changeFill);
  pickRule();
  addShapes();
  pickShape();
  for (let i = 0; i < level; i++) {
    generate();
  }
  turtle();
  //pop()
}

function draw() {
  background(currentPalette[4]);
  wadj = wSlider.value();
  hadj = hSlider.value();
  level = levelSlider.value();
  length = lengthSlider.value();
  translate(wadj, hadj);
  rotate(-PI / 2);

  dropdown.changed(pickColor);
  fillShape.changed(adjustFill);
  shapeDropdown.changed(pickShape);

  //ruleDropdown.changed(pickRule);
  //push();
  // updateFractal();
  // noLoop();
  //pop();
  // dropdown.changed(pickColor);
  // shapeDropdown.changed(pickShape);
  // fillShape.changed(changeFill);
  // translate(width * wadj, height * hadj);
  // rotate(-PI / 2);

  turtle();
  //noLoop();
}

// function changeFill() {
//   if ((fl = true)) {
//     fl = false;
//   } else {
//     fl = true;
//   }
// }

function loadRules(data) {
  lsystem = data;
  // currentPattern = ruleDropdown.value();
  setRule(currentRule);

  // ruleDropdown.changed(setRule(currentPattern));
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

function regenerate(level) {
  for (let i = 0; i < level; i++) {
    generate();
  }
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

// function chooseColor(i, palette) {
//   let c;
//   if (i === 0) {
//     c = palette[0];
//   } else if (i === 1) c = palette[1];
//   if (i === 2) {
//     c = palette[2];
//   }
//   if (i === 3) {
//     c = palette[3];
//   }
//   i += 1;
//   return c;
// }

function turtle() {
  for (let i = 0; i < sentence.length; i++) {
    let rl = sentence.length % 2;
    let current = sentence.charAt(i);
    //selectedColor = chooseColor( currentPalette);
    adjustFill();
    if (current === "F") {
      if (selectedShape) {
        // if (!fl) {
        //   stroke(selectedColor);
        //   strokeWeight(sw);
        //   noFill();
        // } else {
        //   fill(selectedColor);
        //   noStroke();
        // }
        selectedShape.show();
      } else {
        stroke(currentPalette);
        noFill();
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

// // function mousePressed() {
// //   save("image.jpg");
// // }
