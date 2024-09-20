// https://editor.p5js.org/kfahn/sketches/dlekolbSx

// Lsystem variables
let data;
//let lsystem0;
// let wadj, hadj; // translation variations
// let level;
// let length; // grid length

// Colors
let currentStrokePalette;
let currentFillPalette;
let currentBackgroundColor;
let currentFillColor;
let currentStrokeColor;

let selectedShape;
//let sliderGroup0; // object
let sliders = []; // Array to store slider references
//let shapeValues = []; // Array to store shape values
let dropdowns = [];
let palettes = [];
let sliderGroup;

let currentShape = "Gear";
let currentRule = "dragon1";

let addMessage;
let addWarning;
let warning;
let p; // level warning
let p2; // shape messages

// Buttons/checkboxes
let controls;
let resetButton;
let fillShape;
let addStroke;

let turtle;
let shape_ui;
let lsystemValues;

// Preload the L-system rules
function preload() {
  data = loadJSON("rules.json");
}

function setup() {
  canvas = createCanvas(400, 400);
  canvas.position(300, 100);

  addControls(750);
  addSystem();

  // Add function to handle changes in sliders
  handleInput();
}

function handleInput() {
  for (let s of sliders) {
    s.input(reset);
  }

  for (let d of dropdowns) {
    d.changed(reset);
  }
}

function reset() {
  clear();
  p.hide();
  p2.hide();
  setSystemVariables();
}

function addSystem() {
  // Add sliders and shape/rule dropdowns
  controls = new AddControls(10, 250, data, currentShape, currentRule);

  dropdowns = controls.returnDropdowns();

  // Retrieve color palettes
  controls.setPalettes();
  palettes = controls.returnColorPalettes();
  let currentBackgroundPalette = palettes[0];
  let currentStrokePalette = palettes[1];
  let currentFillPalette = palettes[2];
  background(currentBackgroundPalette[0]);

  sliderGroup = controls.sliderGroup;
  sliderGroup.updateLabels();
  let values = sliderGroup.getValues();
  sliders = sliderGroup.sliders;

  // Rretrieve shape values
  shape_ui = controls.shape_ui;
  shape_ui.selectShape(values);
  p2 = addShapeMessage(shape_ui.message);

  // Retrieve ruleset values
  let ruleset = controls.ruleset;

  //console.log(fillShape, addStroke)
  //Add turtle
  turtle = new Turtle(
    currentStrokePalette,
    currentFillPalette,
    fillShape,
    addStroke,
    shape_ui,
    values,
    ruleset
  );

  turtle.addLsystem(currentStrokePalette, currentFillPalette);
  warning = turtle.warning;
  addRuleWarning();
}

function setSystemVariables() {
  controls.setPalettes();
  palettes = controls.returnColorPalettes();
  let currentBackgroundPalette = palettes[0];
  let currentStrokePalette = palettes[1];
  let currentFillPalette = palettes[2];
  background(currentBackgroundPalette[0]);

  let values = sliderGroup.getValues();
  sliderGroup.updateLabels();

  shape_ui.selectShape(values);
  p2 = addShapeMessage(shape_ui.message);

  let ruleset = controls.ruleset;

  //Add turtle
  turtle = new Turtle(
    currentStrokePalette,
    currentFillPalette,
    fillShape,
    addStroke,
    shape_ui,
    values,
    ruleset
  );

  turtle.addLsystem(currentStrokePalette, currentFillPalette);
  warning = turtle.warning;
  addRuleWarning();
}

function addShapeMessage(message0) {
  addMessage = true;
  let message = null;
  if (message0 != null) {
    message = message0;
  } else addMessage = false;

  let p2 = createP(message);
  p2.position(500, 10);
  p2.addClass("p");

  if (addMessage) {
    p2.show();
  } else {
    p2.hide();
  }
  return p2;
}

function addControls(pos) {
  // Add a reset button for both fractals
  resetButton = createButton("Reset");
  resetButton.position(pos, 150);
  resetButton.mousePressed(reset);

  // Checkbox to determine whether shapes are filled
  fillShape = createCheckbox("Fill L-system 1 shapes", false);
  fillShape.position(pos, 200);
  fillShape.style("color", "white");

  // Checkbox to determine whether shapes have stroke
  addStroke = createCheckbox("Add stroke L-system 1", true);
  addStroke.position(pos, 250);
  addStroke.style("color", "white");
}

// function addText() {
//   push();
//   let s = length * shapeScale;
//   translate(width / 2, height / 2);
//   fill(random(palette));
//   textSize(2 * s);
//   text("IS ALL YOU NEED", 0, 0);
//   pop();
// }

function addRuleWarning() {
  p = createP(warning);
  p.position(250, 75);
  p.addClass("p");

  if (!addWarning) {
    p.hide();
  }
}
