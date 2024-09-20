// https://editor.p5js.org/kfahn/sketches/dlekolbSx

let backgroundDropdown0;
let backgrounddropdown;
let fillDropdown0;
let filldropdown;
let strokedropdown;
let strokeDropdown0;

// Lsystem variables
let data;
let lsystem0;
let wadj, hadj; // translation variations
let level;
let length; // grid length

let sw; // strokeWeight
let currentAlpha;

let ruleDropdown0; // object
let ruleDropdown;
let shapeDropdown;

// Colors
let currentStrokePalette;
let currentFillPalette;
let currentBackgroundColor;
let currentFillColor;
let currentStrokeColor;

let selectedShape;
let sliderGroup0; // object
let sliders0 = []; // Array to store slider references
let shapeValues0 = []; // Array to store shape values

let sliderChanged;
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
let fillShape0;
let addStroke0;

let turtle0;
let shape_ui;
let shapeValues;
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
  for (let s of sliders0) {
    s.input(reset);
  }

  shapeDropdown.changed(reset);
  ruleDropdown.changed(reset);
  filldropdown.changed(reset);
  strokedropdown.changed(reset);
  backgrounddropdown.changed(reset);
}

function reset() {
  clear();
  p.hide();
  p2.hide();
  setSystemVariables();
}

function addSystem() {
  // Add color palette dropdowns
  addColorPaletteDropdowns();
  setColorPalettes();
  background(currentBackgroundPalette[0]);

  // Add sliders and shape/rule dropdowns
  controls = new AddControls(10, 250, data, currentShape, currentRule);
  sliderGroup = controls.sliderGroup;
  sliderGroup.updateLabels();
  let values = sliderGroup.getValues();
  sliders0 = sliderGroup.sliders;

  // Rretrieve shape values
  shape_ui = controls.shape_ui;
  shapeDropdown = controls.shapeDropdown;
  shape_ui.selectShape(values);
  p2 = addShapeMessage(shape_ui.message);

  // Retrieve ruleset values
  ruleDropdown = controls.rulesetDropdown;
  let ruleset = controls.ruleset;

  //Add turtle
  turtle0 = new Turtle(
    currentStrokePalette,
    currentFillPalette,
    fillShape0,
    addStroke0,
    shape_ui,
    values,
    ruleset
  );

  turtle0.addLsystem();
  warning = turtle0.warning;
  addRuleWarning();
}

function setSystemVariables() {
  setColorPalettes();
  background(currentBackgroundPalette[0]);

  let values = sliderGroup.getValues();
  sliderGroup.updateLabels();
  //console.log(values);

  shape_ui.selectShape(values);
  p2 = addShapeMessage(shape_ui.message);

  let ruleset = controls.ruleset;
  //console.log(ruleset)

  //Add turtle
  turtle0 = new Turtle(
    currentStrokePalette,
    currentFillPalette,
    fillShape0,
    addStroke0,
    shape_ui,
    values,
    ruleset
  );

  turtle0.addLsystem();
  warning = turtle0.warning;
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

function addColorPaletteDropdowns() {
  // Instantiate the color dropdowns
  backgroundDropdown0 = new PaletteDropdown(300, 50, "black");
  fillDropdown0 = new PaletteDropdown(450, 50, "blue");
  strokeDropdown0 = new PaletteDropdown(600, 50, "blue");
}

function setColorPalettes() {
  backgroundDropdown0.setPalette();
  backgrounddropdown = backgroundDropdown0.dropdown;
  currentBackgroundPalette = backgroundDropdown0.palette;

  fillDropdown0.setPalette();
  filldropdown = fillDropdown0.dropdown;
  currentFillPalette = fillDropdown0.palette;

  strokeDropdown0.setPalette();
  strokedropdown = strokeDropdown0.dropdown;
  currentStrokePalette = strokeDropdown0.palette;

  currentFillColor = random(currentFillPalette);
  currentStrokeColor = random(currentStrokePalette);
}

function addControls(pos) {
  controls = new AddControls(10, 250, data, currentShape, currentRule);
  sliders0 = controls.sliders;
  shapeDropdown = controls.shapeDropdown;
  ruleDropdown = controls.rulesetDropdown;

  // Add a reset button for both fractals
  resetButton = createButton("Reset");
  resetButton.position(pos, 150);
  resetButton.mousePressed(reset);

  // Checkbox to determine whether shapes are filled
  fillShape0 = createCheckbox("Fill L-system 1 shapes", false);
  fillShape0.position(pos, 200);
  fillShape0.style("color", "white");

  // Checkbox to determine whether shapes have stroke
  addStroke0 = createCheckbox("Add stroke L-system 1", true);
  addStroke0.position(pos, 250);
  addStroke0.style("color", "white");
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

function addRuleWarning() {
  p = createP(warning);
  p.position(250, 75);
  p.addClass("p");

  if (!addWarning) {
    p.hide();
  }
}
