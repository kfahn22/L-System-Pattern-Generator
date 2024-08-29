// L-system rules mostly from Paul Bourke
// https://paulbourke.net/fractals/lsys/

// Basic code from:
// https://natureofcode.com/fractals/
// https://thecodingtrain.com/challenges/16-l-system-fractal-trees

// You can find additional information about code at https://github.com/kfahn22/L-System-Pattern-Generator

// let level; // fractal level
// let length; // step length
let axiom;
let sentence;
//let angle; // angle of fractal rotation
let rules = {};
let fractals = {};
let currentFractal0;
let currentFractal1;
let lsystem; // rules data
let lf; // length adjustment factor
let maxLevel; // control added to keep sketch from freezing
let fractal; // rendered fractal

let fractalSliders;
let fractalParameters = []; // array of values from sliders
let sliders0 = [];
let sliders1 = [];
let sliderLabels0 = [];
let sliderLabels1 = [];
// Shape and color variables
let selectedShape; // custom shape to use in fractal

// Fractal sliders
let level; // fractal level
let length; // step length
let angle; // angle of fractal rotation
let wadj; // amount to to translate in x direction
let hadj; // amount to to translate in y direction

let currentAlpha;
let sw; // strokeweight

// // Shape parameters
let shapeAngle; // angle of rotation for shape
let shapeScale; // variable to adjust size of shapes
let a;
let b;
let m;
let n;
let n1, n2, n3;

// Buttons and checkboxes
let resetButton; // Reset both fractals

let deleteSecondFractal; // Whether to add a second fractal

// Color variables
// whether the shapes are filled or stroke
let fillShape0;
let fillShape1;

// Checkboxes for background color
// let blackBackground; // background black? (true or false)
// let whiteBackground; // background white? (true or false)
// let colorBackground; // background comes from 1st palette (true) or 3nd palette (false)

// Drop downs to select rule, pattern, and colors
let shapeDropdown0;
let shapeDropdown1;
let ruleDropdown0;
let ruleDropdown1;
let paletteDropdown0;
let paletteDropdown1;
let backgroundDropdown;
let url;
let url0;
let url1;

// Paragraph adding warning if level gets too high
let p;

let warning = "";
let addWarning = false;

// Add a message if choosen shape is a function of shape parameters
let p2;
let shapeMessage = null;
let ruleMessage = null;
let message0 = null;
let message1 = null;
let addMessage;

// Color palette variables
let palette;
let currentPalette;
let x;

// Checkbox if you want to know where the fractal starts to determine optimal placement
let showCircle;

// Preload the L-system rules
function preload() {
  loadJSON("rules.json", getRules);
}

function setup() {
  x = 250;
  let canvas = createCanvas(600, 600);
  canvas.position(x, 200);
  let myDiv = createDiv("");
  myDiv.position(355, 60);
  myDiv.size(550, 150);
  // myDiv.style("color", "white");
  // myDiv.html(
  //   "If you change the fractal pattern, you will most likely need to adjust its position on the canvas (Translate w, h). Some of the shapes can be adjusted using (some of) the shape parameters (a, b, m, n, n1, n2, n3)."
  // );
  // Add Buttons and checkboxes
  addControls(x + 225);

  // Add sliders and dropdowns for first fractal
  // addSliders(pos, idName, wadj, hadj, level, length, strokeweight, alpha, scale, rotate, rotateShape, a, b, m, n, n1, n2, n3)
  [sliders0, sliderLabels0] = addSliders(
    10,
    "first",
    0.5,
    0.5,
    12,
    20,
    2,
    200,
    0.5,
    0,
    0,
    2,
    2.5,
    6,
    1,
    1,
    1,
    1
  );
  ruleDropdown0 = addRuleDropdown(x, 5, "dragon2");
  shapeDropdown0 = addShapesDropdown(x, 50, "gear");
  paletteDropdown0 = addPalettes(x, 95, "purple");

  // Add fractal
  message0 = addFractal(
    sliders0,
    ruleDropdown0,
    shapeDropdown0,
    paletteDropdown0,
    fillShape0
  );

  // Add sliders for second fractal
  if (deleteSecondFractal.checked() === false) {
    [sliders1, sliderLabels1] = addSliders(
      x + 625,
      "second",
      0.5,
      0.5,
      12,
      20,
      2,
      200,
      0.5,
      -180,
      0,
      2,
      2.5,
      6,
      1,
      1,
      1,
      1
    );
    ruleDropdown1 = addRuleDropdown(x + 450, 5, "dragon2");
    shapeDropdown1 = addShapesDropdown(x + 450, 50, "gear");
    paletteDropdown1 = addPalettes(x + 450, 95, "orange");

    message1 = addFractal(
      sliders1,
      ruleDropdown1,
      shapeDropdown1,
      paletteDropdown1,
      fillShape1
    );
  }

  if (selectedShape === "word") {
    addText();
  }

  p = createP(warning);
  p.position(250, 75);
  p.addClass("p");

  if (!addWarning) {
    p.hide();
  }
  p2 = addShapeMessage(message0, message1);
}

function draw() {
  noLoop();
}

// Adds a message if the choosen shape is a function of one of the shape parameters
function addShapeMessage(message0, message1) {
  addMessage = true;
  let message = null;
  if (
    (message0 === message1 && message0 != null) ||
    (message0 != null && message1 === null)
  ) {
    message = message0;
  } else if (message0 != null && message1 != null && message0 != message1) {
    message = message0 + " " + message1;
  } else if (message0 === null && message1 != null) {
    message = message1;
  } else {
    addMessage = false;
  }

  let p2 = createP(message);
  p2.position(250, 155);
  p2.addClass("p");

  if (addMessage) {
    p2.show();
  } else {
    p2.hide();
  }
  return p2;
}

function addFractal(
  sliders,
  ruleDropdown,
  shapeDropdown,
  paletteDropdown,
  fillShape
) {
  wadj = sliders[0].value();
  hadj = sliders[1].value();
  level = sliders[2].value();
  length = sliders[3].value();
  sw = sliders[4].value();
  currentAlpha = sliders[5].value();
  shapeScale = sliders[6].value();
  angle = radians(sliders[7].value());
  shapeAngle = radians(sliders[8].value());
  a = sliders[9].value();
  b = sliders[10].value();
  m = sliders[11].value();
  n = sliders[12].value();
  n1 = sliders[13].value();
  n2 = sliders[14].value();
  n3 = sliders[15].value();

  // Get color palette
  selectPalette(paletteDropdown.value());
  //url = selectPalette(paletteDropdown.value());
  palette = createPaletteFromURL(url);

  adjustFill(palette, sw, currentAlpha, fillShape); //sw, currentAlpha);

  let fractal = ruleDropdown.value();
  push();
  translate(width * wadj, height * hadj);
  rotate(angle);
  let shapeMessage = pickShape(shapeDropdown.value());
  pickRule(fractal);
  if (level < maxLevel) {
    ruleMessage =
      "The level cannot be greater than " + `${maxLevel}` + " for this rule.";
    for (let i = 0; i < level; i++) {
      generate();
    }
    turtle(palette, sliders, shapeDropdown, fillShape);
    pop();
  } else {
    for (let i = 0; i < maxLevel; i++) {
      generate();
    }
    turtle(palette, sliders, shapeDropdown, fillShape);
    pop();
  }
  return shapeMessage;
  //return [shapeMessage, ruleMessage];
}

// Helper functions to convert the url string to the palette array from chatGPT
function createPaletteFromURL(url) {
  // Extract the color codes from the URL using a regular expression
  let regex = /[0-9A-F]{6}/gi;
  let matches = url.match(regex);

  // Convert HEX codes to RGB and create the palette array
  let palette = matches.map((hex) => hexToRgb(hex));

  return palette;
}

// Helper function to convert HEX to RGB
function hexToRgb(hex) {
  let r = parseInt(hex.slice(0, 2), 16);
  let g = parseInt(hex.slice(2, 4), 16);
  let b = parseInt(hex.slice(4, 6), 16);
  let a = 255;
  return [r, g, b, a];
}

function addPalettes(posx, posy, choice) {
  let options = [
    "white",
    "black",
    "gray",
    "rose",
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "purple",
    "raspberry",
    "purple_aqua",
    "plant-greens",
    "fushia_blue",
    "fushia_multi",
    "pink_ltblue",
    "blue_green",
    "blue_aqua",
    "blue_yellow",
    "orange_blue",
    "purple_green",
    "red_multi",
    "primary",
    "sunny",
    "orange_green",
  ];

  paletteDropdown = createSelect();
  paletteDropdown.position(posx, posy);
  paletteDropdown.addClass("dropdown");
  options.forEach((option) => paletteDropdown.option(option));
  // Set default palette
  paletteDropdown.selected(choice);
  paletteDropdown.changed(selectPalette);

  return paletteDropdown;
}

// Add urls with color palettes
function selectPalette(selected) {
  switch (selected) {
    case "white":
      url =
        "https://supercolorpalette.com/?scp=G0-hsl-FFFFFF-FFFFFF-FFFFFF-FFFFFF-FFFFFF-FFFFFF-FFFFFF";
      break;
    case "black":
      url =
        "https://supercolorpalette.com/?scp=G0-hsl-000000-000000-000000-000000-000000";
      break;
    case "gray":
      url =
        "https://supercolorpalette.com/?scp=G0-hsl-4D4D4D-737373-999999-BFBFBF-E6E6E6";
      break;
    case "rose":
      url =
        "https://supercolorpalette.com/?scp=G0-hsl-C99CC4-CFA5CD-D2AFD4-D5B9DA-D9C3DF-DDCDE4-E3D7EA-E9E1EF";
      break;
    case "red":
      url =
        "https://supercolorpalette.com/?scp=G0-hsl-FA0000-FF1414-FF2E2E-FF4747-FF6161";
      break;
    case "orange":
      url =
        "https://supercolorpalette.com/?scp=G0-hsl-FFA91F-FF9924-FF8929-FF7B2E-FF6D33-FF6038";
      break;
    case "yellow":
      url =
        "https://supercolorpalette.com/?scp=G0-hsl-FFDA1F-FFDE38-FFE252-FFE66B-FFEB85";
      break;
    case "green":
      url =
        "https://supercolorpalette.com/?scp=G0-hsl-118823-13961B-17A314-25B116-36BF18-49CC19-5EDA1B-75E421";
      break;
    case "blue":
      url =
        "https://supercolorpalette.com/?scp=G0-hsl-2A1FFF-242BFF-2942FF-2E58FF-336DFF-3881FF";
      break;
    case "purple":
      url =
        "https://supercolorpalette.com/?scp=G0-hsl-8B1FFF-961FFF-A11FFF-AD1FFF-B81FFF-C31FFF";
      break;
    case "raspberry":
      url =
        "https://supercolorpalette.com/?scp=G0-hsl-FF1FE9-FF1FFB-F01FFF-DD1FFF-CB1FFF";
      break;
    case "orange_green":
      url =
        "https://supercolorpalette.com/?scp=G0-hsl-FF9E1F-FFE957-F4C148-73BE50-18AF6B";
      break;
    case "blue_yellow":
      url =
        "https://supercolorpalette.com/?scp=G0-hsl-FFDA1F-FFC71F-FFB41F-FFA21F-1F44FF-1F57FF-1F69FF-1F7CFF";
      break;
    case "plant-greens":
      url =
        "https://supercolorpalette.com/?scp=G0-hsl-015A0F-015F08-036402-0C6902-166F02-207402-2B7902-387E02-448302-528802";
      break;
    case "fushia_blue":
      url =
        "https://supercolorpalette.com/?scp=G0-hsl-FF1FE9-DD1FFF-A51FFF-6D1FFF-351FFF-531FFF-711FFF";
      break;
    case "pink_ltblue":
      url =
        "https://supercolorpalette.com/?scp=G0-hsl-E198B8-E3A1CE-E5A9E1-DDB0E8-D4B8EA-CEC0EC-CBC8EF-D0D6F1";
      break;
    case "blue_green":
      url =
        "https://supercolorpalette.com/?scp=G0-hsl-3C80B4-3C8AB4-3C94B4-3C9EB4-3CA8B4-3CB2B4-3CB4AC-3CB4A2";
      break;
    case "blue_aqua":
      url =
        "https://supercolorpalette.com/?scp=G0-hsl-1F75FF-1F87FF-1F9AFF-1FADFF-1FBFFF-1FD2FF-1FE5FF-1FF8FF";
      break;
    case "orange_blue":
      url =
        "https://supercolorpalette.com/?scp=G0-hsl-FF8B1F-FF781F-FF661F-1F9CFF-1FAFFF";
      break;
    case "purple_green":
      url =
        "https://supercolorpalette.com/?scp=G0-hsl-8F1FFF-7C1FFF-691FFF-93FF1F-A5FF1F-B8FF1F";
      break;
    case "fushia_multi":
      url =
        "https://supercolorpalette.com/?scp=G0-hsl-FF1FE1-FF1FF4-FFA91F-FF961F-1FFF39-1FFF26-1F75FF-1F87FF";
      break;
    case "red_multi":
      url =
        "https://supercolorpalette.com/?scp=G0-hsl-B80000-B8000F-5FB800-6EB800-00B8B5-00B8A5-5900B8-4900B8";
      break;
    case "primary":
      url =
        "https://supercolorpalette.com/?scp=G0-hsl-1F75FF-1F87FF-1F9AFF-FF2F1F-FF201F-FF1F30-F5FF1F-FFF61F";
      break;
    case "sunny":
      url =
        "https://supercolorpalette.com/?scp=G0-hsl-FBFF05-FFDA05-FFB005-FF8605-FF5D05-FF3305-FF0905-FF0526";
      break;
    case "purple_aqua":
      url =
        "https://supercolorpalette.com/?scp=G0-hsl-BF1FFF-9C24FF-7B29FF-5B2EFF-3D33FF-384FFF-3D74FF-4297FF-47B9FF-4DD8FF";
      break;
  }
}

function addSliders(
  pos,
  idName,
  wadj,
  hadj,
  level,
  length,
  strokeweight,
  shapeAlpha,
  sc,
  rot,
  rotateShape,
  a,
  b,
  m,
  n,
  n1,
  n2,
  n3
) {
  let mySliders = [];
  let sliderLabels = [];

  // wadj
  mySliders[0] = createSlider(0.0, 1, wadj, 0.025);
  sliderLabels[0] = createP("Translate x:");

  // hadj
  mySliders[1] = createSlider(0.0, 1, hadj, 0.025);
  sliderLabels[1] = createP("Translate y:");

  // level
  mySliders[2] = createSlider(0, 13, level, 1);
  sliderLabels[2] = createP("Level:");

  // length
  mySliders[3] = createSlider(5, 150, length, 1);
  sliderLabels[3] = createP("Step length:");

  // strokeweight
  mySliders[4] = createSlider(0.1, 8, strokeweight, 0.1);
  sliderLabels[4] = createP("StrokeWeight:");

  // alpha
  mySliders[5] = createSlider(100, 255, shapeAlpha, 5);
  sliderLabels[5] = createP("Alpha:");

  // shape scale slider
  mySliders[6] = createSlider(0.15, 1.15, sc, 0.05);
  sliderLabels[6] = createP("Scale:");

  // rotate fractal slider
  mySliders[7] = createSlider(-180, 180, rot, 5);
  sliderLabels[7] = createP("Rotate fractal:");

  // Sliders for shape variables
  // rotate shape
  mySliders[8] = createSlider(-180, 180, rotateShape, 1);
  sliderLabels[8] = createP("Rotate shape:");

  // a
  mySliders[9] = createSlider(0, 10, a, 0.25);
  sliderLabels[9] = createP("a:");

  // b
  mySliders[10] = createSlider(0, 10, b, 0.25);
  sliderLabels[10] = createP("b: ");

  // m
  mySliders[11] = createSlider(0, 10, m, 1);
  sliderLabels[11] = createP("m: ");

  // n
  mySliders[12] = createSlider(-1, 5, n, 0.5);
  sliderLabels[12] = createP("n: ");

  // n1
  mySliders[13] = createSlider(0.25, 2, n1, 0.25);
  sliderLabels[13] = createP("n1: ");

  // n2
  mySliders[14] = createSlider(0.25, 2, n2, 0.25);
  sliderLabels[14] = createP("n2: ");

  // n3
  mySliders[15] = createSlider(0.25, 2, n3, 0.25);
  sliderLabels[15] = createP("n3: ");

  for (let i = 0; i < mySliders.length; i++) {
    mySliders[i].addClass("slider");
    mySliders[i].id(idName);
    mySliders[i].position(pos + 10, 35 + i * 50);
    mySliders[i].input(reset);
    sliderLabels[i].position(mySliders[i].x, mySliders[i].y - 35);
    sliderLabels[i].style("color", "white");
  }
  updateLabels(mySliders, sliderLabels);
  return [mySliders, sliderLabels];
}

function setRule(pattern) {
  axiom = pattern.axiom;
  rules = pattern.rules;
  angle = radians(pattern.angle);
  lf = pattern.length_factor;
  maxLevel = pattern.max_Level;
  sentence = axiom;
}

function getRules(data) {
  lsystem = data;
}

function addRuleDropdown(posx, posy, choice) {
  let ruleDropdown;
  let ruleOptions = [
    "none",
    "ADH231a",
    "ADH256a",
    "board",
    "board2",
    "box",
    "recursive_circles",
    "recursive_circles2",
    "circular",
    "cross",
    "crystal",
    "doily",
    "dragon1",
    "dragon2",
    "fern",
    "fern2",
    "fern3",
    "flower",
    "hilbert",
    "island_curve",
    "kolam",
    "koch_curve",
    "koch_snowflake",
    "krishna_anklet",
    "leaf",
    "levy_curve",
    "mango_leaf",
    "notched_square",
    "peano",
    "peano_c",
    "pentigree",
    "pentaplexity",
    "pentadentrite",
    "quadratic_gosper",
    "quadratic_koch_island",
    "quadratic_snowflake2",
    "rings",
    "rounded_star",
    "rounded_cross",
    "snake_kolam",
    "skierpinski",
    "square_skierpinski",
    "skierpinski_carpet",
    "sticks",
    "tiles",
    "torn_square",
    "tree",
    "triangle",
  ];

  ruleDropdown = createSelect();
  ruleDropdown.position(posx, posy);
  ruleOptions.forEach((option) => ruleDropdown.option(option));

  // Set initial value of the dropdown
  ruleDropdown.selected(choice);
  ruleDropdown.addClass("dropdown");
  ruleDropdown.changed(pickRule);
  return ruleDropdown;
}

function pickRule(currentFractal) {
  switch (currentFractal) {
    case "none":
      currentFractal = lsystem.none;
      break;
    case "ADH231a":
      currentFractal = lsystem.ADH231a;
      break;
    case "ADH256a":
      currentFractal = lsystem.ADH256a;
      break;
    case "board":
      currentFractal = lsystem.board;
      break;
    case "board2":
      currentFractal = lsystem.board2;
      break;
    case "box":
      currentFractal = lsystem.box;
      break;
    case "recursive_circles":
      currentFractal = lsystem.recursive_circles;
      break;
    case "recursive_circles2":
      currentFractal = lsystem.recursive_circles2;
      break;
    case "circular":
      currentFractal = lsystem.circular;
      break;
    case "cross":
      currentFractal = lsystem.cross;
      break;
    case "crystal":
      currentFractal = lsystem.crystal;
      break;
    case "doily":
      currentFractal = lsystem.doily;
      break;
    case "dragon1":
      currentFractal = lsystem.dragon1;
      break;
    case "dragon2":
      currentFractal = lsystem.dragon2;
      break;
    case "fern":
      currentFractal = lsystem.fern;
      break;
    case "fern2":
      currentFractal = lsystem.fern2;
      break;
    case "fern3":
      currentFractal = lsystem.fern3;
      break;
    case "flower":
      currentFractal = lsystem.flower;
      break;
    case "island_curve":
      currentFractal = lsystem.island_curve;
      break;
    case "hilbert":
      currentFractal = lsystem.hilbert;
      break;
    case "kolam":
      currentFractal = lsystem.kolam;
      break;
    case "krishna_anklet":
      currentFractal = lsystem.krishna_anklet;
      break;
    case "koch_curve":
      currentFractal = lsystem.koch_curve;
      break;
    case "koch_snowflake":
      currentFractal = lsystem.koch_snowflake;
      break;
    case "leaf":
      currentFractal = lsystem.leaf;
      break;
    case "levy_curve":
      currentFractal = lsystem.levy_curve;
      break;
    case "mango_leaf":
      currentFractal = lsystem.mango_leaf;
      break;
    case "maze":
      currentFractal = lsystem.maze;
      break;
    case "notched_square":
      currentFractal = lsystem.notched_square;
      break;
    case "peano":
      currentFractal = lsystem.peano;
      break;
    case "peano_c":
      currentFractal = lsystem.peano_c;
      break;
    case "pentaplexity":
      currentFractal = lsystem.pentaplexity;
      break;
    case "pentadentrite":
      currentFractal = lsystem.pentadentrite;
      break;
    case "pentigree":
      currentFractal = lsystem.pentigree;
      break;
    case "quadratic_gosper":
      currentFractal = lsystem.quadratic_gosper;
      break;
    case "quadratic_koch_island":
      currentFractal = lsystem.quadratic_koch_island;
      break;
    case "quadratic_koch_island2":
      currentFractal = lsystem.quadratic_koch_island2;
      break;
    case "quadratic_snowflake2":
      currentFractal = lsystem.quadratic_snowflake2;
      break;
    case "rings":
      currentFractal = lsystem.rings;
      break;
    case "snake_kolam":
      currentFractal = lsystem.snake_kolam;
      break;
    case "rings":
      currentFractal = lsystem.rings;
      break;
    case "rounded_cross":
      currentFractal = lsystem.rounded_cross;
      break;
    case "rounded_star":
      currentFractal = lsystem.rounded_star;
      break;
    case "skierpinski":
      currentFractal = lsystem.skierpinski;
      break;
    case "skierpinski_carpet":
      currentFractal = lsystem.skierpinski_carpet;
      break;
    case "square_skierpinski":
      currentFractal = lsystem.square_skierpinski;
      break;
    case "sticks":
      currentFractal = lsystem.sticks;
      break;
    case "tiles":
      currentFractal = lsystem.tiles;
      break;
    case "tree":
      currentFractal = lsystem.tree;
      break;
    case "torn_square":
      currentFractal = lsystem.torn_square;
      break;
    case "triangle":
      currentFractal = lsystem.triangle;
      break;
  }
  setRule(currentFractal);
}

function addShapesDropdown(px, py, choice) {
  let shapeOptions = [
    "archimedes",
    "astroid",
    "bicorn",
    "cassini",
    "ceva",
    "cornu",
    "cross",
    "deltoid",
    "eight",
    "gear",
    "heart",
    "kiss",
    "line",
    "quadrifolium",
    "quadrilateral",
    "rose",
    "superellipse",
    "supershape",
    "tear",
    "word",
  ];

  shapeDropdown = createSelect();
  shapeDropdown.position(px, py);
  shapeOptions.forEach((option) => shapeDropdown.option(option));

  // Set initial value of the dropdowns
  shapeDropdown.selected(choice);
  shapeDropdown.changed(pickShape);
  shapeDropdown.addClass("dropdown");
  return shapeDropdown;
}

function pickShape(selected) {
  // x, y, r, a, b, m, n, n1, n2, n3, angle
  selectedShape = new Shape(
    0,
    0,
    length * shapeScale,
    a,
    b,
    m,
    n,
    n1,
    n2,
    n3,
    shapeAngle
  );
  addMessage = false;
  let message = null;
  switch (selected) {
    case "archimedes":
      selectedShape.archimedesSpiral();
      addMessage = true;
      message = "The archimedes spiral is a f(n).";
      break;
    case "astroid":
      selectedShape.astroid();
      addMessage = true;
      message = "The astroid is a f(a).";
      break;
    case "bicorn":
      selectedShape.bicorn();
      break;
    case "cassini":
      // 1, 1.25 peanut shaped/
      // 1, 2 oval
      addMessage = true;
      selectedShape.cassiniOval();
      message = "The cassini oval curve is a f(a, b).";
      break;
    case "ceva":
      selectedShape.ceva();
      break;
    case "cornu":
      // angle PI/2;
      addMessage = true;
      selectedShape.cornuSpiral();
      message = "The cornu spiral is f(a), a ~ [0.5, 2]";
      break;
    case "cross":
      // 1 quadrifolium
      // gets longer and more rounded as a increases
      selectedShape.malteseCross();
      addMessage = true;
      message = "The cross curve is a f(a, b).";
      break;
    case "deltoid":
      // angle PI/6;
      selectedShape.deltoid();
      break;
    case "eight":
      selectedShape.eight();
      break;
    case "gear":
      selectedShape.gear();
      addMessage = true;
      message = "The gear curve is a f(a, b, m).";
      break;
    case "heart":
      selectedShape.heart();
      addMessage = false;
      break;
    case "kiss":
      selectedShape.kissCurve();
      addMessage = true;
      message = "The kiss curve is a f(a, b).";
      break;
    case "line":
      selectedShape.showLine();
      break;
    case "quadrifolium":
      selectedShape.quadrifolium();
      break;
    case "quadrilateral":
      selectedShape.quadrilaterial();
      addMessage = true;
      message = "The quadrilaterial curve is a f(m).";
      break;
    case "superellipse":
      selectedShape.superellipse();
      addMessage = true;
      message = "The superellipse curve is a f(a, b, n).";
      break;
    case "supershape":
      selectedShape.supershape();
      addMessage = true;
      message = "The supershape curve is a f(a, b, m, n, n1, n2, n3).";
      break;
    case "tear":
      // selectedShapeAngle PI
      selectedShape.tearDrop();
      break;
    case "word":
      selectedShape = new addWord(0, 0, length * shapeScale, shapeAngle);
      push();
      translate(width / 2, height / 2);
      noStroke();
      fill(random(palette));
      textSize(30);
      textAlign(CENTER, CENTER);
      text("IS ALL YOU NEED", 0, 0);
      pop();
      break;
  }
  return message;
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

function turtle(palette, sliders, shapeDropdown, fillShape) {
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);
    let sw = sliders[4].value();
    let a = sliders[5].value();
    let openShapes = ["archimedes", "cornu", "spiral", "zigzig"];
    adjustFill(palette, sw, a, fillShape);
    if (current === "F") {
      if (selectedShape) {
        {
          //console.log(selectedShape);
          if (openShapes.includes(shapeDropdown.value())) {
            selectedShape.openShow();
          } else {
            selectedShape.show();
          }
        }
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
      length = length * lf;
      pickShape(shapeDropdown.value());
      pop();
    } else if (current == "<") {
      push();
      length = length / lf;
      pickShape(shapeDropdown.value());
      pop();
    } else if (current == "(") {
      angle -= radians(0.1);
    } else if (current == ")") {
      angle += radians(0.1);
    } else if (current == "*") {
      rotate(-PI / 2);
    } else if (current == "@") {
      rotate(PI / 2);
    } else if (current == "{") {
      beginShape();
    } else if (current == "}") {
      noStroke();
      fill(random(palette));
      endShape();
    }
  }
}

function reset() {
  // addWarning = false;
  // warning = "";
  p.hide();
  //p2.hide();
  message0 = null;
  message1 = null;

  // Update Variables
  // if (bkcolor.checked() === true) {
  //   background(255);
  // } else {
  //   background(0);
  // }
  addBackgroundColor();

  push();
  message0 = addValidFractal(
    sliders0,
    sliderLabels0,
    ruleDropdown0,
    shapeDropdown0,
    paletteDropdown0,
    fillShape0
  );
  pop();
  if (deleteSecondFractal.checked() === false) {
    push();
    message1 = addValidFractal(
      sliders1,
      sliderLabels1,
      ruleDropdown1,
      shapeDropdown1,
      paletteDropdown1,
      fillShape1
    );
    pop();
  }
  p = createP(warning);
  p.position(250, 140);

  if (addWarning) {
    p.show();
  } else {
    p.hide();
  }
  p2 = addShapeMessage(message0, message1);

  if (showCircle.checked() === true) {
    push();
    translate(width * wadj, height * hadj);
    fill(255, 0, 0);
    circle(0, 0, 20);
    pop();
  }
}

// Limits added to level for certain fractals to prevent sketch from freezing!
function addValidFractal(
  sliders,
  sliderLabels,
  ruleDropdown,
  shapeDropdown,
  paletteDropdown,
  fillShape
) {
  addWarning = false;
  warning = "";
  p2.hide();
  // Update values
  wadj = sliders[0].value();
  hadj = sliders[1].value();
  level = sliders[2].value();
  length = sliders[3].value();
  sw = sliders[4].value();
  currentAlpha = sliders[5].value();
  shapeScale = sliders[6].value();
  angle = radians(sliders[7].value());
  shapeAngle = radians(sliders[8].value());
  a = sliders[9].value();
  b = sliders[10].value();
  m = sliders[11].value();
  n = sliders[12].value();
  n1 = sliders[13].value();
  n2 = sliders[14].value();
  n3 = sliders[15].value();

  selectPalette(paletteDropdown.value());
  palette = createPaletteFromURL(url);
  adjustFill(palette, sw, currentAlpha, fillShape);
  let message = pickShape(shapeDropdown.value());
  translate(width * wadj, height * hadj);
  rotate(angle);
  // pickRule() must be after rotate(angle) for rotation to work properly
  let currentFractal = ruleDropdown.value();
  pickRule(currentFractal);
  //let max = maxLevel;
  if (level > maxLevel) {
    warning =
      "The level cannot be greater " + `${maxLevel}` + " with this rule-set.";
    addWarning = true;
    for (let i = 0; i < maxLevel; i++) {
      generate();
    }
    turtle(palette, sliders, shapeDropdown, fillShape);
    sliderLabels[2].html("Level: " + `${maxLevel}`);
  } else {
    for (let i = 0; i < level; i++) {
      generate();
    }
    turtle(palette, sliders, shapeDropdown, fillShape);
    sliderLabels[2].html("Level: " + `${level}`);
  }
  updateLabels(sliders, sliderLabels);
  return message;
}

// Add buttons and checkboxes
function addControls(pos) {
  // Add a reset button for both fractals
  resetButton = createButton("Reset");
  resetButton.position(pos, 5);
  resetButton.mousePressed(reset);

  // Checkbox to add a second fractal
  deleteSecondFractal = createCheckbox("Delete fractal 2", false);
  deleteSecondFractal.position(pos + 60, 65);
  deleteSecondFractal.style("color", "white");

  // Checkbox to determine whether shapes are filled
  fillShape0 = createCheckbox("Fill fractal 1 shapes", false);
  fillShape0.position(pos + 60, 90);
  fillShape0.style("color", "white");
  fillShape1 = createCheckbox("Fill fractal 2 shapes", false);
  fillShape1.position(pos + 60, 115);
  fillShape1.style("color", "white");

  let backgroundColorP = createP("Background Color");
  backgroundColorP.position(pos - 90, 25);
  backgroundColorP.style("color", "white");
  backgroundDropdown = addPalettes(pos - 90, 70, "black");

  showCircle = createCheckbox("Show start", false);
  showCircle.position(pos + 60, 40);
  showCircle.style("color", "white");

  // Have to add background color after palettes are added
  addBackgroundColor();
}

// Function to save the canvas as an image when 's' key is pressed
function keyPressed() {
  if (key === "s" || key === "S") {
    save("rules/img.jpg");
  }
}

function updateLabels(sliders, sliderLabels) {
  sliderLabels[0].html("Translate w: " + sliders[0].value());
  sliderLabels[1].html("Translate h: " + sliders[1].value());
  sliderLabels[2].html("Level: " + sliders[2].value());
  sliderLabels[3].html("Length: " + sliders[3].value());
  sliderLabels[4].html("StrokeWeight: " + sliders[4].value());
  sliderLabels[5].html("Alpha: " + sliders[5].value());
  sliderLabels[6].html("Scale: " + sliders[6].value());
  sliderLabels[7].html("Rotate fractal: " + sliders[7].value());
  sliderLabels[8].html("Rotate shape: " + sliders[8].value());
  sliderLabels[9].html("a: " + sliders[9].value());
  sliderLabels[10].html("b: " + sliders[10].value());
  sliderLabels[11].html("m: " + sliders[11].value());
  sliderLabels[12].html("n: " + sliders[12].value());
  sliderLabels[13].html("n1: " + sliders[13].value());
  sliderLabels[14].html("n2: " + sliders[14].value());
  sliderLabels[15].html("n3: " + sliders[15].value());
}

function adjustFill(palette, sw, a, fillShape) {
  let c = random(palette);
  c[3] = a;
  if (fillShape.checked() === true) {
    noStroke();
    fill(c);
  } else {
    noFill();
    strokeWeight(sw);
    stroke(c);
  }
}

function addBackgroundColor() {
  selectPalette(backgroundDropdown.value());
  palette = createPaletteFromURL(url);
  background(random(palette));
}

function addText() {
  push();
  let s = length * shapeScale;
  translate(width / 2, height / 2);
  fill(random(palette));
  textSize(2 * s);
  text("IS ALL YOU NEED", 0, 0);
  pop();
}
