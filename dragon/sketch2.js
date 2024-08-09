// L-system rules mostly from Paul Bourke
// https://paulbourke.net/fractals/lsys/

let level; // fractal level
let length; // step length
let axiom;
let sentence;
let rules = {};
let fractals = {};
let currentFractal;
let lsystem; // rules data
let lf; // length adjustment factor
let fractal; // rendered fractal

let rule = {"dragon1": {
    "axiom": "FX",
    "rules": {
      "X": "X+YF+",
      "Y": "-{FZXZ}-Y",
      "Z": "*",
      "length_factor": "1"
    },
    "angle": "90",
    "length_factor": "1"
  }
}
let palette = [
  [158, 173, 200, 200],
  [249, 219, 109, 200],
  [91, 97, 138, 200],
  [91, 80, 122, 200],
  [4, 3, 3],
];
// Add variables for the lsystems
// let none;
// let board;
// let circular;
// let circular3;
// let cross;
// let crystal;
// let diamond;
let dragon1, dragon2;
// let fern, fern2, fern3;
// let hexagonal_gosper;
// let hilbert;
// let kolam;
// let koch_curve;
// let krishna_anklet;
// let koch_snowflake;
// let leaf;
// let mango_leaf;
// let peano;
// let pentaplexity;
// let quadratic_gosper;
// let quadratic_snowflake1;
// let quadratic_snowflake2;
// let quadratic_koch_island;
// let rings;
// let snake_kolam;
// let skierpinski;
// let square_skierpinski;
// let sticks;
// let tree2;
// let tiles;
// let triangle_rule;

// Shape and color variables
let selectedShape; // custom shape to use in fractal
let blueGreenPalette;
let lightBluePalette;
let brownGreenPalette;
let aquaBluePalette;
let plantGreensPalette;
let redPalette;
let orangeBluePalette;
let rygbPalette;
let gyobPalette;
let violetMintPalette;
let purpleBluePalette;
let yellowBluePalette;
let blueYellowPalette;
let modrianPalette;
let pinkPalette;
let currentPalette;
let selectedColor; // current color within palette
let palettes = {}; // array that holds all of the available palettes

// Color variables
let fl = true; // whether the shapes are filled or stroke
let sw; // strokeweight
let currentAlpha; // alpha of color
let angle; // angle of rotation
let checkbox; // boolean for whether shape is filed
let i = 0; // index for color
let resetButton; // Reset fractal
let saveButton; // Save image
let wadj = 0.5; // amount to to translate in x direction
let hadj = 0.5; // amount to to translate in y direction
let shapeScale; //variable to adjust size of shapes

// Shape parameters
let shapeAngle;
let a;
let b;
let m;
let n;
let n1, n2, n3;

// Drop downs to select rule, pattern, and colors
let colorDropdown;
let shapeDropdown;
let ruleDropdown;

let frames = 120;

function keyPressed() {
  if (key == "s") {
    const options = {
      units: "frames",
      delay: 0,
    };
    saveGif("GIF/dragon.gif", frames, options);
  }
}

function preload() {
  loadJSON("rules.json", getRules);
  //loadJSON("palettes.json", getColors);
}

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.position(0, 50);
  //background(palette[3]);

  // currentFractal = "dragon2";
  // setRule(currentFractal);
  angle = 0;
  currentAlpha = 200;
  a = 1;
  b = 1;
  m = 4;
  n = 0.5;
  angle = 0;
  shapeScale = 0.2;
  shapeAngle = 0;
  // n1 = 1;
  // n2 = 1;
  // n3 = 1;
  length = 250;
  level = 0;
  sw = 5;
  noFill();
  pickRule();
  addShapes();
  pickShape();
}

function draw() {
  background(10, 16, 69);
  // background(13, 10, 11);

  pickRule();
  addShapes();
  pickShape();
  wadj = 0.5;
  hadj = 0.5;
  adjustPosition;
  push();
  translate(width * wadj, height * hadj);
  rotate(angle);
  for (let i = 0; i < level; i++) {
    generate();
  }
  turtle();
  pop();

  if (a < 3) {
    a += 0.1;
  } else if (int(a) === 3) {
    a = 1;
  }
  if (b < 3) {
    b += 0.1;
  } else if (b === 3) {
    b = 1;
  }
  if (level === 9) {
    noLoop();
  } else if (int(a) === 3) {
    level += 1;
    length = length / sqrt(2);
    sw = map(length, 0, 200, 0.5, 5);
    adjustPosition();
  }
}

function adjustPosition() {
  if (level === 2) {
    wadj = 0.666;
    hadj = 0.333;
  } else if (level === 3) {
    wadj = 0.666;
    hadj = 0.6;
  } else if (level === 4) {
    wadj = 0.6;
    hadj = 0.71;
  } else if (level === 5) {
    wadj = 0.36;
    hadj = 0.71;
  } else if (level === 6) {
    wadj = 0.25;
    hadj = 0.6;
  } else if (level === 7) {
    wadj = 0.3;
    hadj = 0.36;
  } else if (level === 8) {
    wadj = 0.43;
    hadj = 0.33;
  } else if (level === 9) {
    wadj = 0.66;
    hadj = 0.5;
  }
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
  // board = lsystem.board;
  // circular = lsystem.circular;
  // circular3 = lsystem.circular3;
  // cross = lsystem.cross;
  // crystal = lsystem.crystal;
  // diamond = lsystem.diamond;
  dragon1 = lsystem.dragon1; // some shapes have fill
  dragon2 = lsystem.dragon2; // unfilled
  // leaf = lsystem.leaf;
  // fern = lsystem.fern;
  // fern2 = lsystem.fern2;
  // fern3 = lsystem.fern3;
  // hexagonal_gosper = lsystem.hexagonal_gosper;
  // hilbert = lsystem.hilbert;
  // krishna_anklet = lsystem.krishna_anklet;
  // kolam = lsystem.kolam;
  // koch_curve = lsystem.koch_curve;
  // krishna_anklet = lsystem.krishna_anklet;
  // koch_snowflake = lsystem.koch_snowflake;
  // leaf = lsystem.leaf;
  // mango_leaf = lsystem.mango_leaf;
  // peano = lsystem.peano;
  // pentaplexity = lsystem.pentaplexity;
  // quadratic_gosper = lsystem.quadratic_gosper;
  // quadratic_koch_island = lsystem.quadratic_koch_island;
  // quadratic_snowflake1 = lsystem.quadratic_snowflake1;
  // quadratic_snowflake2 = lsystem.quadratic_snowflake2;
  // rings = lsystem.rings;
  // snake_kolam = lsystem.snake_kolam;
  // skierpinski = lsystem.skierpinski;
  // square_skierpinski = lsystem.square_skierpinski;
  // sticks = lsystem.sticks;
  // tree2 = lsystem.tree2;
  // tiles = lsystem.tiles;
  // triangle_rule = lsystem.triangle;

  ruleDropdown = createSelect();
  ruleDropdown.position(10, 5);
  // ruleDropdown.option("none");
  // ruleDropdown.option("board");
  // ruleDropdown.option("board2");
  // ruleDropdown.option("circular");
  // ruleDropdown.option("circular3");
  // ruleDropdown.option("cross");
  // ruleDropdown.option("crystal");
  // ruleDropdown.option("diamond");
  ruleDropdown.option("dragon1");
  ruleDropdown.option("dragon2");
  // ruleDropdown.option("fern");
  // ruleDropdown.option("fern2");
  // ruleDropdown.option("fern3");
  // ruleDropdown.option("hexagonal_gosper");
  // ruleDropdown.option("hilbert");
  // ruleDropdown.option("kolam");
  // ruleDropdown.option("koch_curve");
  // ruleDropdown.option("krishna_anklet");
  // ruleDropdown.option("koch_snowflake");
  // ruleDropdown.option("leaf");
  // ruleDropdown.option("mango_leaf");
  // ruleDropdown.option("peano");
  // ruleDropdown.option("pentaplexity");
  // ruleDropdown.option("quadratic_gosper");
  // ruleDropdown.option("quadratic_koch_island");
  // ruleDropdown.option("quadratic_snowflake1");
  // ruleDropdown.option("quadratic_snowflake2");
  // ruleDropdown.option("rings");
  // ruleDropdown.option("snake_kolam");
  // ruleDropdown.option("skierpinski");
  // ruleDropdown.option("square_skierpinski");
  // ruleDropdown.option("sticks");
  // ruleDropdown.option("tree2");
  // ruleDropdown.option("tiles");
  // ruleDropdown.option("tree");
  // ruleDropdown.option("triangle_rule");

  // Set initial value of the dropdown
  currentFractal = ruleDropdown.selected("dragon1");
  ruleDropdown.changed(pickRule);
}
function pickRule() {
  currentFractal = ruleDropdown.value();

  switch (currentFractal) {
    case "none":
      currentFractal = none;
      break;

    // case "board":
    //   currentFractal = board;
    //   break;
    // case "circular":
    //   currentFractal = circular;
    //   break;
    // case "circular3":
    //   currentFractal = circular3;
    //   break;
    // case "cross":
    //   currentFractal = cross;
    //   break;
    // case "crystal":
    //   currentFractal = crystal;
    //   break;
    // case "diamond":
    //   currentFractal = diamond;
    //   break;
    case "dragon1":
      currentFractal = dragon1;
      break;
    case "dragon2":
      currentFractal = dragon2;
      break;
    // case "fern":
    //   currentFractal = fern;
    //   break;
    // case "fern2":
    //   currentFractal = fern2;
    //   break;
    // case "fern3":
    //   currentFractal = fern3;
    //   break;
    // case "hexagonal_gosper":
    //   currentFractal = hexagonal_gosper;
    //   break;
    // case "hilbert":
    //   currentFractal = hilbert;
    //   break;
    // case "kolam":
    //   currentFractal = kolam;
    //   break;
    // case "krishna_anklet":
    //   currentFractal = krishna_anklet;
    //   break;
    // case "koch_curve":
    //   currentFractal = koch_curve;
    //   break;
    // case "koch_snowflake":
    //   currentFractal = koch_snowflake;
    //   break;
    // case "leaf":
    //   currentFractal = leaf;
    //   break;
    // case "mango_leaf":
    //   currentFractal = mango_leaf;
    //   break;
    // case "peano":
    //   currentFractal = peano;
    //   break;
    // case "pentaplexity":
    //   currentFractal = pentaplexity;
    //   break;
    // case "quadratic_gosper":
    //   currentFractal = quadratic_gosper;
    //   break;
    // case "quadratic_koch_island":
    //   currentFractal = quadratic_koch_island;
    //   break;
    // case "quadratic_snowflake1":
    //   currentFractal = quadratic_snowflake1;
    //   break;
    // case "quadratic_snowflake2":
    //   currentFractal = quadratic_snowflake2;
    //   break;
    // case "rings":
    //   currentFractal = rings;
    //   break;
    // case "snake_kolam":
    //   currentFractal = snake_kolam;
    //   break;
    // case "rings":
    //   currentFractal = rings;
    //   break;
    // case "skierpinski":
    //   currentFractal = skierpinski;
    //   break;
    // case "square_skierpinski":
    //   currentFractal = square_skierpinski;
    //   break;
    // case "sticks":
    //   currentFractal = sticks;
    //   break;
    // case "tiles":
    //   currentFractal = tiles;
    //   break;
    // case "tree2":
    //   currentFractal = tree2;
    //   break;
    // case "triangle_rule":
    //   currentFractal = triangle_rule;
    //   break;
  }
  setRule(currentFractal);
}

// function getColors(data) {
//   palettes = data.colors;
//   aquaBluePalette = palettes.aqua_blue;
//   lightBluePalette = palettes.light_blue;
//   brownGreenPalette = palettes.brown_green;
//   blueGreenPalette = palettes.blue_green;
//   plantGreensPalette = palettes.plant_greens;
//   redPalette = palettes.reds;
//   orangeBluePalette = palettes.orange_blue;
//   rygbPalette = palettes.rygb;
//   gyobPalette = palettes.gyob;
//   violetMintPalette = palettes.violet_mint;
//   maroonBluePalette = palettes.maroon_blue;
//   purpleBluePalette = palettes.purple_blue;
//   yellowBluePalette = palettes.yellow_blue;
//   modrianPalette = palettes.modrian;
//   blueYellowPalette = palettes.blue_yellow;
//   pinkPalette = palettes.pink;

//   // Set default palette
//   currentPalette = blueGreenPalette;

//   // Create dropdown menu
//   colorDropdown = createSelect();
//   colorDropdown.position(300, 5);
//   colorDropdown.option("aqua_blue");
//   colorDropdown.option("light_blue");
//   colorDropdown.option("brown_green");
//   colorDropdown.option("blue_green");
//   colorDropdown.option("plant_greens");
//   colorDropdown.option("reds");
//   colorDropdown.option("orange_blue");
//   colorDropdown.option("rygb");
//   colorDropdown.option("gyob");
//   colorDropdown.option("violet_mint");
//   colorDropdown.option("maroon_blue");
//   colorDropdown.option("purple_blue");
//   colorDropdown.option("yellow_blue");
//   colorDropdown.option("blue_yellow");
//   colorDropdown.option("modrian");
//   colorDropdown.option("pink");

//   // Set initial value of the dropdown
//   colorDropdown.selected("blue_green");

//   // Attach event listener
//   colorDropdown.changed(pickColor);
//   //selectedColor = chooseColor(currentPalette);
// }

function addShapes() {
  shapeDropdown = createSelect();
  shapeDropdown.position(180, 5);
  // shapeDropdown.option("archimedes");
  // shapeDropdown.option("astroid");
  // shapeDropdown.option("atom");
  // shapeDropdown.option("bicorn");
  // shapeDropdown.option("butterfly");
  // shapeDropdown.option("cannibus");
  // shapeDropdown.option("cassini");
  // shapeDropdown.option("ceva");
  // shapeDropdown.option("deltoid");
  // shapeDropdown.option("cornu");
  shapeDropdown.option("cross");
  shapeDropdown.option("eight");
  shapeDropdown.option("gear");
  // shapeDropdown.option("heart");
  // shapeDropdown.option("lissajous");
  // shapeDropdown.option("kiss");
  // shapeDropdown.option("knot");
  // shapeDropdown.option("line");
  // shapeDropdown.option("ophiuride");
  // shapeDropdown.option("quadrifolium");
  shapeDropdown.option("quadrilateral");
  // shapeDropdown.option("rose");
  shapeDropdown.option("superellipse");
  shapeDropdown.option("supershape");
  // shapeDropdown.option("spiral");
  // shapeDropdown.option("tear");
  // shapeDropdown.option("zigzag");

  // Set initial value of the dropdown
  shapeDropdown.selected("superellipse");
}

function pickShape() {
  let selected = shapeDropdown.value();
  switch (selected) {
    //   case "archimedes":
    //     selectedShape = new ArchimedesSpiral(
    //       0,
    //       0,
    //       length * shapeScale,
    //       -1,
    //       shapeAngle
    //     );
    //     selectedShape.addPoints();
    //     break;
    //   case "astroid":
    //     selectedShape = new Astroid(0, 0, length * shapeScale, a);
    //     selectedShape.addPoints();
    //     break;
    //   case "atom":
    //     // angle 27/64
    //     // a is hard-coded at 0.25 to keep length short
    //     selectedShape = new AtomSpiral(0, 0, length * shapeScale, a, shapeAngle);
    //     selectedShape.addPoints();
    //     break;
    //   case "bicorn":
    //     selectedShape = new Bicorn(0, 0, length * shapeScale);
    //     selectedShape.addPoints();
    //     break;
    //   case "butterfly":
    //     selectedShape = new Butterfly(0, 0, length * shapeScale);
    //     selectedShape.addPoints();
    //     break;
    //   case "cannibus":
    //     selectedShape = new Cannibus(0, 0, length * shapeScale, shapeAngle);
    //     selectedShape.addPoints();
    //     break;
    //   case "cassini":
    //     // 1, 1.25 peanut shaped/
    //     // 1, 2 oval
    //     selectedShape = new CassiniOval(0, 0, length * shapeScale, a, b);
    //     selectedShape.addPoints();
    //     break;
    //   case "ceva":
    //     selectedShape = new Ceva(0, 0, length * shapeScale);
    //     selectedShape.addPoints();
    //     break;
    //   case "cornu":
    //     // angle PI/2;
    //     selectedShape = new CornuSpiral(0, 0, length * shapeScale, shapeAngle);
    //     selectedShape.addPoints();
    //     break;
    case "cross":
      //     // 1 quadrifolium
      //     // gets longer and more rounded as a increases
      selectedShape = new MalteseCross(0, 0, length * shapeScale, a, b);
      selectedShape.addPoints();
      break;
    //   case "deltoid":
    //     // angle PI/6;
    //     selectedShape = new Deltoid(0, 0, length * shapeScale, a, shapeAngle);
    //     selectedShape.addPoints();
    //     break;
    case "eight":
      selectedShape = new Eight(0, 0, length * shapeScale);
      selectedShape.addPoints();
      break;
    case "gear":
      selectedShape = new Gear(0, 0, length * shapeScale, b, m);
      selectedShape.addPoints();
      break;
    // case "heart":
    //   selectedShape = new Heart(0, 0, length * shapeScale, shapeAngle);
    //   selectedShape.addPoints();
    //   break;
    // case "knot":
    //   selectedShape = new Knot(0, 0, length * shapeScale, shapeAngle);
    //   selectedShape.addPoints();
    //   break;
    // case "kiss":
    //   selectedShape = new KissCurve(0, 0, length * shapeScale, a, b);
    //   selectedShape.addPoints();
    //   break;
    // case "line":
    //   selectedShape = null;
    //   break;
    // case "lissajous":
    //   // angle - PI/2
    //   selectedShape = new Lissajous(
    //     0,
    //     0,
    //     length * shapeScale,
    //     a,
    //     b,
    //     m,
    //     shapeAngle
    //   );
    //   selectedShape.addPoints();
    //   break;
    // case "quadrifolium":
    //   selectedShape = new Quadrifolium(0, 0, length * shapeScale, a);
    //   selectedShape.addPoints();
    //   break;
    // case "quadrilateral":
    //   selectedShape = new Quadrilateral(
    //     0,
    //     0,
    //     length * shapeScale,
    //     m,
    //     shapeAngle
    //   );
    //   selectedShape.addPoints();
    //   break;
    // case "rose":
    //   // a > 0 levels hole in middle
    //   selectedShape = new Rose(0, 0, length * shapeScale, a, b, n);
    //   selectedShape.addPoints();
    //   break;
    // case "ophiuride":
    //   // a > 0 levels hole in middle
    //   selectedShape = new Ophiuride(
    //     0,
    //     0,
    //     length * shapeScale,
    //     a,
    //     b,
    //     shapeAngle
    //   );
    //   selectedShape.addPoints();
    //   break;
    // case "spiral":
    //   // n = 1 Archimedian Spiral
    //   // n = -1 Hyperbolic Spiral
    //   // n = 1/2 Fermat spiral
    //   // n = -1/2 Lituus spiral
    //   // n = 2 Galilean spiral
    //   // let a = 0.5;
    //   // let n = -0.5;
    //   // (PI * 10) / 8
    //   let dir = -1;
    //   selectedShape = new Spiral(
    //     0,
    //     0,
    //     dir,
    //     length * shapeScale,
    //     a,
    //     n,
    //     shapeAngle
    //   );
    //   //selectedShape = new Spiral(0, 0, dir, length, .5, -0.5, 0);
    //   selectedShape.addPoints();
    //   break;
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
        n1,
        n2,
        n3,
        m
      );
      selectedShape.addPoints();
      break;
    // case "tear":
    //   // shapeAngle PI
    //   selectedShape = new TearDrop(0, 0, length * shapeScale, shapeAngle);
    //   selectedShape.addPoints();
    //   break;
    // case "zigzag":
    //   // shapeAngle PI
    //   selectedShape = new Zigzag(0, 0, length * shapeScale, shapeAngle);
    //   selectedShape.addPoints();
    //   break;
  }
  shapeDropdown.changed(pickShape);
}

//

// Add buttons
// function addButtons() {
//   // Add a reset button
//   resetButton = createButton("Reset");
//   resetButton.position(470, 5);
//   resetButton.mousePressed(reset);

// Add a button to save the design
// saveButton = createButton("Save Image");
// saveButton.position(520, 5);
// saveButton.mousePressed();
//}

// Function to save the canvas as an image when 's' key is pressed
function keyPressed() {
  if (key === "s" || key === "S") {
    save("img.jpg");
  }
}

// function updateVariables() {
//   colorDropdown.changed(pickColor);
//   background(currentPalette[4]);
//   fillShape.changed(adjustFill);
//   shapeDropdown.changed(pickShape);
//   ruleDropdown.changed(pickRule);
// }

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
      if (selectedShape) {
        noFill();
        strokeWeight(sw);
        stroke(255, 136, 17, currentAlpha);
        selectedShape.show();
      } else {
        stroke(palette[2]);
        noFill();
        strokeWeight(sw);
        line(0, 0, length, 0);
      }
      translate(length, 0);
    } else if (current === "f") {
      translate(length, 0);
    } else if (current === "+") {
      rotate(angle);
      amt += 0.1
    } else if (current === "-") {
      rotate(-angle);
      amt += 0.2
    } else if (current == "[") {
      push();
    } else if (current == "]") {
      pop();
    } else if (current == ">") {
      push();
      if (ruleDropdown === "line") {
        length = length * lf;
      } else {
        length = length * lf;
        pickShape();
      }
      pop();
    } else if (current == "<") {
      push();
      if (ruleDropdown === "line") {
        length = length / lf;
      } else {
        length = length / lf;
        pickShape();
      }
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
      //let c = color(112, 238, 156, alpha);
      //let c = color(249, 233, 0, alpha);
      let c1 = color(4, 150, 255, alpha);
      let c2 = color(244,208,111, alpha);
      let c = lerpColor(c2, c1, amt);
      fill(c1);
      endShape();
    }
  }
}
