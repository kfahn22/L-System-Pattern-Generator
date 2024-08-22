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
let fractal; // rendered fractal

//et firstSliders = [];

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

// Controls
let resetButton; // Reset fractal

// Drop downs to select rule, pattern, and colors
let shapeDropdown0;
let shapeDropdown1;
let ruleDropdown;
let ruleDropdown0;
let ruleDropdown1;
let paletteDropdown0;
let paletteDropdown1;
let url;
let url0;
let url1;

// Color palette variables
let palette;
let currentPalette;

// Color variables
//let fl = false; // whether the shapes are filled or stroke
let fillShape0 = false;
let fillShape1 = false;
let bkcolor = false; // background white (true) or black (false)

function preload() {
  loadJSON("rules.json", getRules);
}

function setup() {
  let canvas = createCanvas(600, 600);
  //let x = (windowWidth - width) / 2;   // Calculate the x-coordinate for centering
  canvas.position(500, 150);
  let myDiv = createDiv("");
  myDiv.position(505, 60);
  myDiv.size(550, 150);
  myDiv.style("color", "white");
  myDiv.html(
    "If you change the fractal pattern, you will most likely need to adjust its position on the canvas (Translate w, h). Some of the shapes can be adjusted using (some of) the shape parameters (a, b, m, n, n1, n2, n3)."
  );
  // Controls
  addButtons();

  fillShape0 = createCheckbox("Fill fractal 1 shapes");
  fillShape0.position(550, 5);
  fillShape0.style("color", "white");
  fillShape1 = createCheckbox("Fill fractal 2 shapes");
  fillShape1.position(550, 25);
  fillShape1.style("color", "white");

  bkcolor = createCheckbox("Background");
  bkcolor.position(550, 40);
  bkcolor.style("color", "white");

  if (bkcolor.checked() === true) {
    background(255);
  } else {
    background(0);
  }

  // Add two sets of sliders
  sliderValues0 = addSliders(0);
  sliders0 = sliderValues0[0];
  sliderLabels0 = sliderValues0[1];
  console.log(sliderLabels0);
  sliderValues1 = addSliders(1100);
  sliders1 = sliderValues1[0];
  sliderLabels1 = sliderValues1[1];
  addShapes();
  addPalettes();

  // Add two fractals
  // addFractal(
  //   sliders0,
  //   ruleDropdown0,
  //   shapeDropdown0,
  //   paletteDropdown0,
  //   fillShape0
  // );
  // addFractal(
  //   sliders1,
  //   ruleDropdown1,
  //   shapeDropdown1,
  //   paletteDropdown1,
  //   fillShape1
  // );

  if (selectedShape === "word") {
    addText();
  }
}

function draw() {
  noLoop();
}

function addFractal(
  sliders,
  ruleDropdown,
  shapeDropdown,
  paletteDropdown,
  fillShape
) {
  // Add sliders
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

  //currentFractal = ruleDropdown.value();
  let fractal = ruleDropdown.value();
  push();
  translate(width * wadj, height * hadj);
  rotate(angle);
  pickShape(shapeDropdown.value());
  pickRule(fractal);
  for (let i = 0; i < level; i++) {
    generate();
  }
  turtle(palette, sliders, shapeDropdown, fillShape);
  pop();
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

function addPalettes() {
  let options = [
    "purple",
    "purple_aqua",
    "green",
    "plant-greens",
    "rose",
    "raspberry",
    "fushia_blue",
    "fushia_multi",
    "pink_ltblue",
    "blue",
    "blue_green",
    "blue_aqua",
    "blue_yellow",
    "orange_blue",
    "green_purple",
    "red_multi",
    "primary",
    "sunny",
    "orange",
    "orange_green",
  ];
  paletteDropdown0 = createSelect();
  paletteDropdown1 = createSelect();
  paletteDropdown0.position(430, 5);
  paletteDropdown1.position(1600, 5);
  options.forEach((option) => paletteDropdown0.option(option));
  options.forEach((option) => paletteDropdown1.option(option));

  // Set default palette
  paletteDropdown0.selected("blue");
  paletteDropdown1.selected("blue_aqua");
  paletteDropdown0.changed(selectPalette);
  paletteDropdown1.changed(selectPalette);
}

function selectPalette(selected) {
  // choice = paletteDropdown.value();
  switch (selected) {
    case "orange_green":
      url =
        "https://supercolorpalette.com/?scp=G0-hsl-FF9E1F-FFE957-F4C148-73BE50-18AF6B";
      break;
    case "blue_yellow":
      url =
        "https://supercolorpalette.com/?scp=G0-hsl-FFDA1F-FFC71F-FFB41F-FFA21F-1F44FF-1F57FF-1F69FF-1F7CFF";
      break;
    case "purple":
      url =
        "https://supercolorpalette.com/?scp=G0-hsl-1F7CFF-1F5EFF-1F40FF-1F22FF-391FFF-571FFF-751FFF-931FFF";
      break;
    case "green":
      url =
        "https://supercolorpalette.com/?scp=G0-hsl-118823-13961B-17A314-25B116-36BF18-49CC19-5EDA1B-75E421";
      break;
    case "plant-greens":
      url =
        "https://supercolorpalette.com/?scp=G0-hsl-015A0F-015F08-036402-0C6902-166F02-207402-2B7902-387E02-448302-528802";
      break;
    case "raspberry":
      url =
        "https://supercolorpalette.com/?scp=G0-hsl-FF1F57-FF246D-FF2982-FF2E96-FF33AA-FF38BD-FF3DCF-FF42E0-FF47F0-FF4DFF";
      break;
    case "rose":
      url =
        "https://supercolorpalette.com/?scp=G0-hsl-C99CC4-CFA5CD-D2AFD4-D5B9DA-D9C3DF-DDCDE4-E3D7EA-E9E1EF";
      break;
    case "fushia_blue":
      url =
        "https://supercolorpalette.com/?scp=G0-hsl-9E0A4A-AD0B79-BB0CAF-A70DC9-800ED8-530FE6-2314F0-2248F1";
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
    case "green_purple":
      url =
        "https://supercolorpalette.com/?scp=G0-hsl-43AB17-50AB17-5CAB17-68AB17-7E17AB-7217AB-6617AB-5A17AB";
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
    case "blue":
      url =
        "https://supercolorpalette.com/?scp=G0-hsl-2A1FFF-242BFF-2942FF-2E58FF-336DFF-3881FF";
      break;
    case "orange":
      url =
        "https://supercolorpalette.com/?scp=G0-hsl-FFA91F-FF9924-FF8929-FF7B2E-FF6D33-FF6038";
      break;
  }
  //return url;
}

function addSliders(pos) {
  let mySliders = [];
  let sliderLabels = [];
  // wadj
  mySliders[0] = createSlider(0.05, 1, 0.1, 0.025);
  mySliders[0].position(pos + 10, 35);
  mySliders[0].addClass("slider");
  sliderLabels[0] = createP("Translate x:");
  sliderLabels[0].position(mySliders[0].x, mySliders[0].y - 35);
  sliderLabels[0].style("color", "white");

  // hadj
  mySliders[1] = createSlider(0.05, 1, 0.1, 0.025);
  mySliders[1].position(pos + 10, 90);
  mySliders[1].addClass("slider");
  sliderLabels[1] = createP("Translate y:");
  sliderLabels[1].position(mySliders[1].x, mySliders[1].y - 35);
  sliderLabels[1].style("color", "white");

  // level
  mySliders[2] = createSlider(0, 12, 3, 1);
  mySliders[2].position(pos + 10, 150);
  mySliders[2].addClass("slider");
  sliderLabels[2] = createP("Level:");
  sliderLabels[2].position(mySliders[2].x, mySliders[2].y - 35);
  sliderLabels[2].style("color", "white");

  // length
  mySliders[3] = createSlider(10, 100, 20, 1);
  mySliders[3].position(pos + 10, 215);
  mySliders[3].addClass("slider");
  sliderLabels[3] = createP("Step length:");
  sliderLabels[3].position(mySliders[3].x, mySliders[3].y - 35);
  sliderLabels[3].style("color", "white");

  // strokeweight
  mySliders[4] = createSlider(0.1, 8, 1.5, 0.1);
  mySliders[4].position(pos + 10, 270);
  mySliders[4].addClass("slider");
  sliderLabels[4] = createP("StrokeWeight:");
  sliderLabels[4].position(mySliders[4].x, mySliders[4].y - 35);
  sliderLabels[4].style("color", "white");

  // alpha
  mySliders[5] = createSlider(100, 255, 200, 5);
  mySliders[5].position(pos + 10, 330);
  mySliders[5].addClass("slider");
  sliderLabels[5] = createP("Alpha:");
  sliderLabels[5].position(mySliders[5].x, mySliders[5].y - 35);
  sliderLabels[5].style("color", "white");

  // scale slider
  mySliders[6] = createSlider(0.15, 1.15, 0.5, 0.05);
  mySliders[6].position(pos + 10, 370);
  mySliders[6].addClass("slider");
  sliderLabels[6] = createP("Scale:");
  sliderLabels[6].position(mySliders[6].x, mySliders[6].y - 35);
  sliderLabels[6].style("color", "white");

  // rotate slider
  mySliders[7] = createSlider(-180, 180, 0, 5);
  mySliders[7].position(pos + 10, 415);
  mySliders[7].addClass("slider");
  sliderLabels[7] = createP("Rotate fractal:");
  sliderLabels[7].position(mySliders[7].x, mySliders[7].y - 35);
  sliderLabels[7].style("color", "white");

  // Sliders for shape variables
  // rotate shape
  mySliders[8] = createSlider(-180, 180, 0, 1);
  mySliders[8].position(pos + 10, 460);
  mySliders[8].addClass("slider");
  //rotateShapeSlider.size(150);
  sliderLabels[8] = createP("Rotate shape:");
  sliderLabels[8].position(mySliders[8].x, mySliders[8].y - 35);
  sliderLabels[8].style("color", "white");

  // a
  mySliders[9] = createSlider(0, 10, 2, 0.25);
  mySliders[9].position(pos + 10, 500);
  mySliders[9].addClass("slider");
  sliderLabels[9] = createP("a:");
  sliderLabels[9].position(mySliders[9].x, mySliders[9].y - 35);
  sliderLabels[9].style("color", "white");

  // b
  mySliders[10] = createSlider(0, 10, 2.5, 0.25);
  mySliders[10].position(pos + 10, 540);
  mySliders[10].addClass("slider");
  sliderLabels[10] = createP("b: ");
  sliderLabels[10].position(mySliders[10].x, mySliders[10].y - 35);
  sliderLabels[10].style("color", "white");

  // m
  mySliders[11] = createSlider(0, 10, 6, 1);
  mySliders[11].position(pos + 10, 580);
  mySliders[11].addClass("slider");
  sliderLabels[11] = createP("m:");
  sliderLabels[11].position(mySliders[11].x, mySliders[11].y - 35);
  sliderLabels[11].style("color", "white");

  // n
  mySliders[12] = createSlider(-1, 5, 1, 0.5);
  mySliders[12].position(pos + 10, 620);
  mySliders[12].addClass("slider");
  sliderLabels[12] = createP("n: ");
  sliderLabels[12].position(mySliders[12].x, mySliders[12].y - 35);
  sliderLabels[12].style("color", "white");

  // n1
  mySliders[13] = createSlider(0.25, 2, 1, 0.25);
  mySliders[13].position(pos + 10, 650);
  mySliders[13].addClass("slider");
  sliderLabels[13] = createP("n1: ");
  sliderLabels[13].position(mySliders[13].x, mySliders[13].y - 35);
  sliderLabels[13].style("color", "white");

  // n2
  mySliders[14] = createSlider(0.25, 2, 1, 0.25);
  mySliders[14].position(pos + 10, 690);
  mySliders[14].addClass("slider");
  sliderLabels[14] = createP("n2: ");
  sliderLabels[14].position(mySliders[14].x, mySliders[14].y - 35);
  sliderLabels[14].style("color", "white");

  // n3
  mySliders[15] = createSlider(0.25, 2, 1, 0.25);
  mySliders[15].position(pos + 10, 730);
  mySliders[15].addClass("slider");
  sliderLabels[15] = createP("n3: ");
  sliderLabels[15].position(mySliders[15].x, mySliders[15].y - 35);
  sliderLabels[15].style("color", "white");

  for (let i = 0; i < mySliders.length; i++) {
    mySliders[i].input(reset);
  }
  updateLabels(mySliders, sliderLabels);
  return [mySliders, sliderLabels];
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
  addRuleDropdowns();
}

function addRuleDropdowns() {
  let ruleOptions = [
    "none",
    "board",
    "board2",
    "circular",
    "circular2",
    "cross",
    "crystal",
    "dragon1",
    "dragon2",
    "fern",
    "fern2",
    "fern3",
    "hexagonal_gosper",
    "hilbert",
    "kolam",
    "koch_curve",
    "koch_snowflake",
    "krishna_anklet",
    "levy",
    "mango_leaf",
    "peano",
    "pentaplexity",
    "quadratic_gosper",
    "quadratic_koch_island",
    "quadratic_koch_island2",
    "quadratic_snowflake1",
    "quadratic_snowflake2",
    "rings",
    "snake_kolam",
    "skierpinski",
    "square_skierpinski",
    "skierpinski_arrowhead",
    "sticks",
    "tree",
    "tiles",
    "triangle_rule",
  ];
  ruleDropdown0 = createSelect();
  ruleDropdown1 = createSelect();
  ruleDropdown0.position(150, 5);
  ruleDropdown1.position(1250, 5);
  ruleOptions.forEach((option) => ruleDropdown0.option(option));
  ruleOptions.forEach((option) => ruleDropdown1.option(option));
  // Set initial value of the dropdown
  ruleDropdown0.selected("crystal");
  ruleDropdown1.selected("pentaplexity");
  ruleDropdown0.changed(pickRule);
  ruleDropdown1.changed(pickRule);
}

function pickRule(currentFractal) {
  switch (currentFractal) {
    case "none":
      currentFractal = lsystem.none;
      break;
    case "board":
      currentFractal = lsystem.board;
      break;
    case "board2":
      currentFractal = lsystem.board2;
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
    case "diamond":
      currentFractal = lsystem.diamond;
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
    case "hexagonal_gosper":
      currentFractal = lsystem.hexagonal_gosper;
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
    case "levy":
      currentFractal = lsystem.levy;
      break;
    case "mango_leaf":
      currentFractal = lsystem.mango_leaf;
      break;
    case "peano":
      currentFractal = lsystem.peano;
      break;
    case "pentaplexity":
      currentFractal = lsystem.pentaplexity;
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
    case "quadratic_snowflake1":
      currentFractal = lsystem.quadratic_snowflake1;
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
    case "skierpinski":
      currentFractal = lsystem.skierpinski;
      break;
    case "skierpinski_arrowhead":
      currentFractal = lsystem.skierpinski_arrowhead;
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
    case "triangle_rule":
      currentFractal = lsystem.triangle_rule;
      break;
  }
  setRule(currentFractal);
}

function addShapes() {
  let shapeOptions = [
    "archimedes",
    "astroid",
    "atom",
    "bicorn",
    "butterfly",
    "cannibus",
    "cassini",
    "ceva",
    "craniod",
    "cornu",
    "cross",
    "deltoid",
    "eight",
    "gear",
    "heart",
    "lissajous",
    "hersheyKiss",
    "kiss",
    "knot",
    "line",
    "ophiuride",
    "quadrifolium",
    "quadrilateral",
    "rose",
    "superellipse",
    "supershape",
    "spiral",
    "tear",
    "word",
    "zigzag",
  ];
  shapeDropdown0 = createSelect();
  shapeDropdown1 = createSelect();
  shapeDropdown0.position(325, 5);
  shapeDropdown1.position(1410, 5);
  shapeOptions.forEach((option) => shapeDropdown0.option(option));
  shapeOptions.forEach((option) => shapeDropdown1.option(option));

  // Set initial value of the dropdowns
  shapeDropdown0.selected("cross");
  shapeDropdown1.selected("quadrilateral");

  shapeDropdown0.changed(pickShape);
  shapeDropdown1.changed(pickShape);
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
  switch (selected) {
    case "archimedes":
      selectedShape.archimedesSpiral();
      break;
    case "astroid":
      selectedShape.astroid();
      break;
    case "atom":
      selectedShape.atom();
      break;
    case "bicorn":
      selectedShape.bicorn();
      break;
    case "butterfly":
      selectedShape.butterfly();
      break;
    case "cannibus":
      selectedShape.cannibus();
      break;
    case "cassini":
      // 1, 1.25 peanut shaped/
      // 1, 2 oval
      selectedShape.cassiniOval();
      break;
    case "ceva":
      selectedShape.ceva();
      break;
    case "cornu":
      // angle PI/2;
      selectedShape.cornuSpiral();
      break;
    case "craniod":
      // angle PI/2;
      selectedShape.craniod();
      break;
    case "cross":
      // 1 quadrifolium
      // gets longer and more rounded as a increases
      selectedShape.malteseCross();
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
      break;
    case "heart":
      selectedShape.heart();
      break;
    case "knot":
      selectedShape.knot();
      break;
    case "kiss":
      selectedShape.kissCurve();
      break;
    case "hersheyKiss":
      selectedShape.hersheyKiss();
      break;
    case "line":
      selectedShape.showLine();
      break;
    case "lissajous":
      selectedShape.lissajous();
      break;
    case "quadrifolium":
      selectedShape.quadrifolium();
      break;
    case "quadrilateral":
      selectedShape.quadrilaterial();
      break;
    case "rose":
      // a > 0 levels hole in middle
      selectedShape.rose();
      break;
    case "ophiuride":
      // a > 0 levels hole in middle
      selectedShape.ophiuride();
      break;
    case "spiral":
      selectedShape.spiral();
      break;
    case "superellipse":
      selectedShape.superellipse();
      break;
    case "supershape":
      selectedShape.supershape();
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
      //text("PAGE NOT FOUND", 0, 0);
      pop();
      break;
    case "zigzag":
      // this.shapeAngle PI
      selectedShape.zigzag();
      break;
  }
  // shapeDropdown.changed(pickShape);
}

// Add buttons
function addButtons() {
  // Add a reset button
  resetButton = createButton("Reset fractals");
  resetButton.position(750, 5);
  resetButton.mousePressed(reset);
}

// Function to save the canvas as an image when 's' key is pressed
function keyPressed() {
  if (key === "s" || key === "S") {
    save("img.jpg");
  }
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
    adjustFill(palette, sw, a, fillShape);
    if (current === "F") {
      if (selectedShape) {
        {
          if (
            shapeDropdown.value() == "archimedes" ||
            shapeDropdown.value() == "cornu" ||
            shapeDropdown.value() == "spiral" ||
            shapeDropdown.value() === "zigzig"
          ) {
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
      pickShape(shapeDropdown);
      pop();
    } else if (current == "<") {
      push();

      length = length / lf;
      pickShape(shapeDropdown);
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

function reset() {
  // Update Variables
  if (bkcolor.checked() === true) {
    background(255);
  } else {
    background(0);
  }

  push();
  addValidFractal(
    sliders0,
    sliderLabels0,
    ruleDropdown0,
    shapeDropdown0,
    paletteDropdown0,
    fillShape0
  );
  pop();
  push();
  addValidFractal(
    sliders1,
    sliderLabels1,
    ruleDropdown1,
    shapeDropdown1,
    paletteDropdown1,
    fillShape1
  );
  pop();
  if (selectedShape === "word") {
    addText();
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

  //updateLabels(sliders);
  selectPalette(paletteDropdown.value());
  palette = createPaletteFromURL(url);
  adjustFill(palette, sw, currentAlpha, fillShape);
  pickShape(shapeDropdown.value());
  translate(width * wadj, height * hadj);
  rotate(angle);
  // pickRule() must be after rotate(angle) for rotation to work properly
  let currentFractal = ruleDropdown.value();
  pickRule(currentFractal);

  if (
    (sliders[2].value() > 1 && ruleDropdown.value() === "circular") ||
    ruleDropdown.value() === "circular2"
  ) {
    stroke(255);
    text(
      "The level cannot be > 1 with the circular pattern",
      -width / 2,
      -height / 2
    );
    textSize(20);
    level = 1;
    for (let i = 0; i < 1; i++) {
      generate();
    }
    sliderLabels[2].html("Level: " + "1");
    turtle(palette, sliders, shapeDropdown, fillShape);
  } else if (
    sliders[2].value() > 2 &&
    (ruleDropdown.value() === "quadratic_gosper" ||
      ruleDropdown.value() === "quadratic_koch_island")
  ) {
    stroke(255);
    text(
      "The level cannot be > 2 with the current fractal pattern",
      -width / 2,
      -height / 2
    );
    level = 2;
    for (let i = 0; i < level; i++) {
      generate();
    }
    sliderLabels[2].html("Level: " + "2");
    turtle(palette, sliders, shapeDropdown, fillShape);
  } else if (
    sliders[2].value() > 3 &&
    (ruleDropdown.value() === "board" ||
      ruleDropdown.value() === "fern" ||
      ruleDropdown.value() === "hexagonal_gosper" ||
      ruleDropdown.value() === "skierpinski" ||
      ruleDropdown.value() === "peano" ||
      ruleDropdown.value() === "quadratic_snowflake1" ||
      ruleDropdown.value() === "quadratic_snowflake2" ||
      ruleDropdown.value() === "skierpinski" ||
      ruleDropdown.value() === "square_skierpinski" ||
      ruleDropdown.value() === "tiles")
  ) {
    stroke(255);
    text(
      "The level cannot be > 3 with the current fractal pattern",
      -width / 2 + 20,
      -height / 2 + 20
    );
    level = 3;
    for (let i = 0; i < level; i++) {
      generate();
    }
    sliderLabels[2].html("Level: " + "3");
    turtle(palette, sliders, shapeDropdown, fillShape);
  } else if (
    sliders[2].value() > 4 &&
    (ruleDropdown.value() === "cross" || ruleDropdown.value() === "crystal")
  ) {
    stroke(255);
    text(
      "The level cannot be > 4 with the current fractal pattern",
      -width / 2 + 20,
      -height / 2 + 20
    );
    level = 4;
    for (let i = 0; i < level; i++) {
      generate();
    }
    sliderLabels[2].html("Level: " + "4");
    turtle(palette, sliders, shapeDropdown, fillShape);
  } else if (
    sliders[2].value() > 5 &&
    (ruleDropdown.value() === "hilbert" ||
      ruleDropdown.value() === "pentaplexity" ||
      ruleDropdown.value() === "triangle_rule" ||
      ruleDropdown.value() === "fern3" ||
      ruleDropdown.value() === "snake-kolam")
  ) {
    stroke(255);
    text(
      "The level cannot be > 5 with the current fractal pattern",
      -width / 2 + 20,
      -height / 2 + 20
    );
    textSize(20);
    level = 5;
    for (let i = 0; i < level; i++) {
      generate();
    }
    sliderLabels[2].html("Level: " + "5");
    turtle(palette, sliders, shapeDropdown, fillShape);
  } else {
    for (let i = 0; i < level; i++) {
      generate();
    }
    turtle(palette, sliders, shapeDropdown, fillShape);
    sliderLabels[2].html("Level: " + sliders[2].value());
  }
  updateLabels(sliders, sliderLabels);
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

function addText() {
  push();
  let s = length * shapeScale;
  translate(width / 2, height / 2);
  fill(random(palette));
  textSize(2 * s);
  text("IS ALL YOU NEED", 0, 0);
  pop();
}
