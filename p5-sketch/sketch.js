let level; // fractal level
let length; // step length
let axiom;
let sentence;
let rules = {};
let fractals = {};
let currentFractal;
let lsystem; // rules data
let lf; // length adjustment factor

// Add variables for the lsystems
let none;
let board;
let circular;
let cross;
let crystal;
let dragon;
let fern;
let hexagonal_gosper;
let hilbert;
let kolam;
let koch_curve;
let krishna_anklet;
let koch_snowflake;
let leaf;
let mango_leaf;
let peano;
let pentaplexity;
let quadratic_gosper;
let quadratic_koch_island;
let rings;
let snake_kolam;
let skierpinski;
let square_skierpinski;
let sticks;
let tree2;
let tiles;
let triangle_rule;

// Shape and color variables
let selectedShape; // custom shape to use in fractal
let blueGreenPalette;
let lightBluePalette;
let brownGreenPalette;
let aquaBluePalette;
let plantGreensPalette;
let redPalette;
let orangeBluePalette;
let currentPalette;
let selectedColor; // current color within palette
let palettes = {}; // array that holds all of the available palettes
//let colorIndex = 0; // index to pick color
let fl = true; // whether the shapes are filled or stroke
let sw; // strokeweight
let currentAlpha; // alpha of color
let angle; // angle of rotation

let resetButton; // Reset fractal
let wadj; // amount to to translate in x direction
let hadj; // amount to to translate in y direction
let shapeScale; //variable to adjust size of shapes

// Shape parameters
let a;
let b;
let m;
let n;

// Sliders
let wSlider, hSlider; // placement of fractral
let levelSlider; // the level of the fractal
let lengthSlider; // determines step size
let strokeWeightSlider; // strokeweight
let scaleSlider; // scale of shape
let rotateSlider; // rotation of fractal
let alphaSlider;

// Sliders for parameters
let aSlider;
let bSlider;
let mSlider;
let nSlider;
let checkbox; // boolean for whether shape is filed

// Submit buttons
// let aButton;
// let bButton;

// Labels for sliders/input
let wlabel;
let hlabel;
let levellabel;
let lengthlabel;
let swlabel;
let scalelabel;
let rotatelabel;
let alphalabel;
let alabel;
let blabel;
let mlabel;
let nlabel;

// Drop downs to select rule, pattern, and colors
let colorDropdown;
let shapeDropdown;
let ruleDropdown;

function addSliders() {
  wSlider = createSlider(0.1, 1, 0.5, 0.05);
  //  wSlider = createSlider(5, width - 5, width*0.5, 5);
  wSlider.position(width + 10, 35);
  // Create a label for the slider
  wlabel = createP("Translate x:");
  wlabel.position(wSlider.x, wSlider.y - 35);

  hSlider = createSlider(0.1, 1, 0.5, 0.05);
  // hSlider = createSlider(5, height - 5, height*0.5, 5);
  hSlider.position(width + 10, 90);
  hlabel = createP("Translate y:");
  hlabel.position(hSlider.x, hSlider.y - 35);

  levelSlider = createSlider(0, 12, 1, 1);
  levelSlider.position(width + 10, 155);
  levellabel = createP("Fractal level:");
  levellabel.position(levelSlider.x, levelSlider.y - 35);

  lengthSlider = createSlider(10, 50, 20, 1);
  lengthSlider.position(width + 10, 215);
  lengthlabel = createP("Step length:");
  lengthlabel.position(lengthSlider.x, lengthSlider.y - 35);

  strokeWeightSlider = createSlider(1, 8, 1, 1);
  strokeWeightSlider.position(width + 10, 270);
  swlabel = createP("StrokeWeight:");
  swlabel.position(strokeWeightSlider.x, strokeWeightSlider.y - 35);

  // Create alpha slider
  alphaSlider = createSlider(100, 255, 200, 10);
  alphaSlider.position(width + 10, 330);
  alphalabel = createP("Alpha:");
  alphalabel.position(alphaSlider.x, alphaSlider.y - 35);

  scaleSlider = createSlider(0.25, 1, 0.5, 0.1);
  scaleSlider.position(width + 10, 370);
  scalelabel = createP("Scale:");
  scalelabel.position(scaleSlider.x, scaleSlider.y - 35);

  rotateSlider = createSlider(-180, 180, 0, 10);
  rotateSlider.position(width + 10, 410);
  rotatelabel = createP("Rotate:");
  rotatelabel.position(scaleSlider.x, rotateSlider.y - 35);

  aSlider = createSlider(0, 4, 1, 0.25);
  aSlider.position(width + 10, 500);
  alabel = createP("a:");
  alabel.position(aSlider.x, aSlider.y - 35);
  bSlider = createSlider(0, 3, 1, 0.25);
  bSlider.position(width + 10, 540);
  blabel = createP("b: ");
  blabel.position(bSlider.x, bSlider.y - 35);
  mSlider = createSlider(0, 10, 4, 1);
  mSlider.position(width + 10, 580);
  mlabel = createP("m:");
  mlabel.position(mSlider.x, mSlider.y - 35);
  nSlider = createSlider(-1, 1, 1, 0.5);
  nSlider.position(width + 10, 620);
  nlabel = createP("n: ");
  nlabel.position(nSlider.x, nSlider.y - 35);

  wSlider.input(reset);
  hSlider.input(reset);
  levelSlider.input(reset);
  lengthSlider.input(reset);
  strokeWeightSlider.input(reset);
  scaleSlider.input(reset);
  aSlider.input(reset);
  bSlider.input(reset);
  mSlider.input(reset);
  nSlider.input(reset);
  rotateSlider.input(reset);
  alphaSlider.input(reset);
}

function setRule(pattern) {
  axiom = pattern.axiom;
  rules = pattern.rules;
  angle = radians(pattern.angle);
  lf = pattern.length_factor;
  sentence = axiom;
}

function getRules(data) {
  lsystem = data;

  none = lsystem.none;
  board = lsystem.board;
  circular = lsystem.circular;
  cross = lsystem.cross;
  crystal = lsystem.crystal;
  dragon = lsystem.dragon;
  fern = lsystem.fern;
  hexagonal_gosper = lsystem.hexagonal_gosper;
  hilbert = lsystem.hilbert;
  krishna_anklet = lsystem.krishna_anklet;
  kolam = lsystem.kolam;
  koch_curve = lsystem.koch_curve;
  krishna_anklet = lsystem.krishna_anklet;
  koch_snowflake = lsystem.koch_snowflake;
  leaf = lsystem.leaf;
  mango_leaf = lsystem.mango_leaf;
  peano = lsystem.peano;
  pentaplexity = lsystem.pentaplexity;
  quadratic_gosper = lsystem.quadratic_gosper;
  quadratic_koch_island = lsystem.quadratic_koch_island;
  rings = lsystem.rings;
  snake_kolam = lsystem.snake_kolam;
  skierpinski = lsystem.skierpinski;
  square_skierpinski = lsystem.square_skierpinski;
  sticks = lsystem.sticks;
  tree2 = lsystem.tree2;
  tiles = lsystem.tiles;
  triangle_rule = lsystem.triangle;

  ruleDropdown = createSelect();
  ruleDropdown.position(10, 5);
  ruleDropdown.option("none");
  ruleDropdown.option("board");
  ruleDropdown.option("board2");
  ruleDropdown.option("circular");
  ruleDropdown.option("cross");
  ruleDropdown.option("crystal");
  ruleDropdown.option("dragon");
  ruleDropdown.option("fern");
  ruleDropdown.option("hexagonal_gosper");
  ruleDropdown.option("hilbert");
  ruleDropdown.option("kolam");
  ruleDropdown.option("koch_curve");
  ruleDropdown.option("krishna_anklet");
  ruleDropdown.option("koch_snowflake");
  ruleDropdown.option("mango_leaf");
  ruleDropdown.option("peano");
  ruleDropdown.option("pentaplexity");
  ruleDropdown.option("quadratic_gosper");
  ruleDropdown.option("quadratic_koch_island");
  ruleDropdown.option("rings");
  ruleDropdown.option("snake_kolam");
  ruleDropdown.option("skierpinski");
  ruleDropdown.option("square_skierpinski");
  ruleDropdown.option("sticks");
  ruleDropdown.option("tree2");
  ruleDropdown.option("tiles");
  // ruleDropdown.option("tree");
  ruleDropdown.option("triangle_rule");

  // Set initial value of the dropdown
  currentFractal = ruleDropdown.selected("dragon");
  ruleDropdown.changed(pickRule);
}
function pickRule() {
  currentFractal = ruleDropdown.value();

  switch (currentFractal) {
    case "none":
      currentFractal = none;
      break;

    case "board":
      currentFractal = board;
      break;
    case "circular":
      currentFractal = circular;
      break;
    case "cross":
      currentFractal = cross;
      break;
    case "crystal":
      currentFractal = crystal;
      break;
    case "dragon":
      currentFractal = dragon;
      break;
    case "fern":
      currentFractal = fern;
      break;
    case "hexagonal_gosper":
      currentFractal = hexagonal_gosper;
      break;
    case "hilbert":
      currentFractal = hilbert;
      break;
    case "kolam":
      currentFractal = kolam;
      break;
    case "krishna_anklet":
      currentFractal = krishna_anklet;
      break;
    case "koch_curve":
      currentFractal = koch_curve;
      break;
    case "koch_snowflake":
      currentFractal = koch_snowflake;
      break;
    case "leaf":
      currentFractal = leaf;
      break;
    case "mango_leaf":
      currentFractal = mango_leaf;
      break;
    case "peano":
      currentFractal = peano;
      break;
    case "pentaplexity":
      currentFractal = pentaplexity;
      break;
    case "quadratic_gosper":
      currentFractal = quadratic_gosper;
      break;
    case "quadratic_koch_island":
      currentFractal = quadratic_koch_island;
      break;
    case "rings":
      currentFractal = rings;
      break;
    case "snake_kolam":
      currentFractal = snake_kolam;
      break;
    case "rings":
      currentFractal = rings;
      break;
    case "skierpinski":
      currentFractal = skierpinski;
      break;
    case "square_skierpinski":
      currentFractal = square_skierpinski;
      break;
    case "sticks":
      currentFractal = sticks;
      break;
    case "tiles":
      currentFractal = tiles;
      break;
    case "tree2":
      currentFractal = tree2;
      break;
    case "triangle_rule":
      currentFractal = triangle_rule;
      break;
  }
  setRule(currentFractal);
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

  // Set default palette
  currentPalette = blueGreenPalette;

  // Create dropdown menu
  colorDropdown = createSelect();
  colorDropdown.position(300, 5);
  colorDropdown.option("aqua_blue");
  colorDropdown.option("light_blue");
  colorDropdown.option("brown_green");
  colorDropdown.option("blue_green");
  colorDropdown.option("plant_greens");
  colorDropdown.option("reds");
  colorDropdown.option("orange_blue");

  // Set initial value of the dropdown
  colorDropdown.selected("blue_green");

  // Attach event listener
  colorDropdown.changed(pickColor);
  selectedColor = chooseColor(currentPalette);
}

function addShapes() {
  shapeDropdown = createSelect();
  shapeDropdown.position(180, 5);
  shapeDropdown.option("archimedes");
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
  shapeDropdown.option("spiral");
  shapeDropdown.option("tear");
  shapeDropdown.option("zigzag");

  // Set initial value of the dropdown
  shapeDropdown.selected("cassini");
}

function pickShape() {
  let selected = shapeDropdown.value();
  //shapeScale = scaleSlider.value();
  // a = aSlider.value();
  // b = bSlider.value();
  // m = mSlider.value();
  // n = nSlider.value();
  // updateLabels();
  switch (selected) {
    case "archimedes":
      selectedShape = new ArchimedesSpiral(0, 0, length * shapeScale, -1, 0);
      selectedShape.addPoints();
      break;
    case "astroid":
      selectedShape = new Astroid(0, 0, length * shapeScale, a);
      selectedShape.addPoints();
      break;
    case "bicorn":
      selectedShape = new Bicorn(0, 0, length * shapeScale);
      selectedShape.addPoints();
      break;
    case "cassini":
      // 1, 1.25 peanut shaped/
      // 1, 2 oval
      selectedShape = new CassiniOval(0, 0, length * shapeScale, a, b);
      selectedShape.addPoints();
      break;
    case "ceva":
      selectedShape = new Ceva(0, 0, length * shapeScale);
      selectedShape.addPoints();
      break;
    case "cornu":
      selectedShape = new CornuSpiral(0, 0, length * shapeScale, PI / 2);
      selectedShape.addPoints();
      break;
    case "cross":
      // 1 quadrifolium
      // gets longer and more rounded as a increases
      selectedShape = new MalteseCross(0, 0, length * shapeScale, a, b);
      selectedShape.addPoints();
      break;
    case "eight":
      selectedShape = new Eight(0, 0, length * shapeScale);
      selectedShape.addPoints();
      break;
    case "kiss":
      selectedShape = new KissCurve(0, 0, length * shapeScale, a, b);
      selectedShape.addPoints();
      break;
    case "line":
      selectedShape = null;
      break;
    case "quadrifolium":
      selectedShape = new Quadrifolium(0, 0, length * shapeScale);
      selectedShape.addPoints();
      break;
    case "spiral":
      // n = 1 Archimedian Spiral
      // n = -1 Hyperbolic Spiral
      // n = 1/2 Fermat spiral
      // n = -1/2 Lituus spiral
      // n = 2 Galilean spiral
      // let a = 0.5;
      // let n = -0.5;
      let dir = -1;
      selectedShape = new Spiral(
        0,
        0,
        dir,
        length * shapeScale,
        a,
        n,
        (PI * 10) / 8
      );
      //selectedShape = new Spiral(0, 0, dir, length, .5, -0.5, 0);
      selectedShape.addPoints();
      break;
    case "superellipse":
      selectedShape = new Superellipse(0, 0, length * shapeScale, a, b, n);
      selectedShape.addPoints();
      break;
    case "supershape":
      selectedShape = new Supershape(
        0,
        0,
        length * shapeScale,
        a,
        b,
        1,
        1,
        1,
        m
      );
      selectedShape.addPoints();
      break;
    case "tear":
      selectedShape = new TearDrop(0, 0, length * shapeScale, PI);
      selectedShape.addPoints();
      break;
    case "zigzag":
      selectedShape = new Zigzag(0, 0, length * shapeScale, PI);
      selectedShape.addPoints();
      break;
  }
  shapeDropdown.changed(pickShape);
}

function pickColor() {
  currentPalette = colorDropdown.value();
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

  colorDropdown.changed(pickColor);
  fillShape.changed(adjustFill);
}

// Parameters for the shapes
// function addParameters() {
//   aInput = createInput();
//   aInput.position(width + 10, 500);
//   alabel = createP("Input value for a:");
//   alabel.position(aInput.x, aInput.y - 35);

//   aButton = createButton("Submit");
//   aButton.position(aInput.x + aInput.width + 10, 500);
//   aInput.changed(pickShape);
//   //console.log(aButton);

//   bInput = createInput();
//   bInput.position(width + 10, 550);
//   blabel = createP("Input value for b:");
//   blabel.position(bInput.x, bInput.y - 35);

//   bButton = createButton("Submit");
//   bButton.position(bInput.x + bInput.width, 550);
//   bButton.changed(reset);
// }

function preload() {
  loadJSON("rules.json", getRules);
  loadJSON("palettes.json", getColors);
}

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.position(0, 50);
  background(currentPalette[4]);
  addSliders();
  //addParameters();

  fillShape = createCheckbox("Fill");
  fillShape.position(450, 5);

  resetButton = createButton("Reset");
  resetButton.position(500, 5);
  resetButton.mousePressed(reset);

  wadj = wSlider.value();
  hadj = hSlider.value();
  level = levelSlider.value();
  length = lengthSlider.value();
  sw = strokeWeightSlider.value();
  angle = radians(rotateSlider.value());
  shapeScale = scaleSlider.value();
  currentAlpha = alphaSlider.value();
  shapeScale = scaleSlider.value();
  a = aSlider.value();
  b = bSlider.value();
  m = mSlider.value();
  n = nSlider.value();

  // adjustFill();
  // adjustAlpha();
  // chooseColor(currentPalette);

  pickRule();
  addShapes();
  pickShape();
  translate(width / 2, height / 2);
  rotate(angle);
  for (let i = 0; i < level; i++) {
    generate();
  }
  turtle();

  //console.log(selectedColor);
}

function draw() {
  noLoop();
}

function updateVariables() {
  colorDropdown.changed(pickColor);
  background(currentPalette[4]);
  fillShape.changed(adjustFill);
  shapeDropdown.changed(pickShape);
  ruleDropdown.changed(pickRule);
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

function reset() {
  background(currentPalette[4]);
  wadj = wSlider.value();
  hadj = hSlider.value();
  level = levelSlider.value();
  length = lengthSlider.value();
  sw = strokeWeightSlider.value();
  angle = radians(rotateSlider.value());
  shapeScale = scaleSlider.value();
  a = aSlider.value();
  b = bSlider.value();
  m = mSlider.value();
  n = nSlider.value();

  // Update Color Variables
  currentAlpha = alphaSlider.value();
  adjustAlpha();
  selectedColor = chooseColor(currentPalette);
  //console.log(currentPalette)
  adjustFill();

  updateVariables();
  updateLabels();
  pickShape();
  push();
  translate(width * wadj, height * hadj);
  rotate(angle);
  pickRule();
  for (let i = 0; i < level; i++) {
    generate();
  }
  turtle();
  pop();
  //console.log(sentence)
}

function updateLabels() {
  wlabel.html("Translate w: " + wSlider.value());
  hlabel.html("Translate h: " + hSlider.value());
  levellabel.html("Level: " + levelSlider.value());
  lengthlabel.html("Length: " + lengthSlider.value());
  rotatelabel.html("Rotate: " + rotateSlider.value());
  scalelabel.html("Scale: " + scaleSlider.value());
  alphalabel.html("Alpha: " + alphaSlider.value());
  alabel.html("a: " + aSlider.value());
  blabel.html("b: " + bSlider.value());
  mlabel.html("m: " + mSlider.value());
  nlabel.html("n: " + nSlider.value());
  swlabel.html("StrokeWeight: " + strokeWeightSlider.value());
}

function adjustFill() {
  selectedColor = chooseColor(currentPalette);
  if (fillShape.checked() === true) {
    noStroke();
    fill(selectedColor);
  } else {
    noFill();
    strokeWeight(sw);
    stroke(selectedColor);
  }
}

function adjustAlpha() {
  //currentAlpha = alphaSlider.value();
  currentPalette[0][4] = currentAlpha;
  currentPalette[1][4] = currentAlpha;
  currentPalette[2][4] = currentAlpha;
  currentPalette[3][4] = currentAlpha;
  //console.log(currentPalette[0][4]);
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
    let sl = sentence.length;
    let current = sentence.charAt(i);
    // adjustAlpha();
    adjustFill();
    if (current === "F") {
      if (selectedShape) {
        selectedShape.show();
      } else {
        stroke(currentPalette[1]);
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

// function setPosition() {
//   currentFractal = ruleDropdown.value();
//   switch(currentFractal) {
//         case "board":
//       wadj = 0.05*width;
//       hadj = 0.95*height;
//       break;
//       case "dragon":
//       wadj = 0.3*width;
//       hadj = 0.6*height;
//       break;
//       case "tree":
//       wadj = 0.5*width;
//       hadj = 0.95*height;
//       break
//   }
//      // translate(wadj, hadj);
// }

// // function mousePressed() {
// //   save("image.jpg");
// // }
