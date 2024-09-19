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
let axiom;
let sentence;
let rules = {};
let angle;
let lf;
let maxLevel;

let wadj, hadj; // translation variations
let level;
let length; // grid length
let sw; // strokeWeight
let currentAlpha;

let ruleDropdown0; // object
let ruledropdown;
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

let currentShape = "astroid";
let currentRule = "dragon";

let addMessage;
let p2; // shape messages

// Buttons
let resetButton;
let fillShape0;
let addStroke0;

let turtle0;

// Preload the L-system rules
function preload() {
  data = loadJSON("rules.json");
}

function setup() {
  canvas = createCanvas(400, 400);
  canvas.position(300, 100);

  addControls(750);

  addColorPaletteDropdowns();
  setColorPalettes();
  background(currentBackgroundPalette[0]);

  // Instantiate the shape UI
  addShapeUI();
  setShape();

  ruleDropdown0 = new RuleDropdown(750, 50, data, currentRule);
  ruledropdown = ruleDropdown0.dropdown;
  ruleDropdown0.selectRule();
  lsystem0 = ruleDropdown0.setRule();

  // Retrieve values
  rules = lsystem0[0];
  angle = lsystem0[1];
  lf = lsystem0[2];
  maxLevel = lsystem0[3];
  sentence = lsystem0[4];

  wadj = shapeValues0[0];
  hadj = shapeValues0[1];
  level = shapeValues0[2];
  length = shapeValues0[3];
  sw = shapeValues0[4];
  currentAlpha = shapeValues0[5];

  addTurtle();

  // Add function to handle changes in sliders
  handleInput();
}

function handleInput() {
  for (let s of sliders0) {
    s.input(reset);
  }
  shapeDropdown.changed(reset);
  ruledropdown.changed(reset);
  filldropdown.changed(reset);
  strokedropdown.changed(reset);
  backgrounddropdown.changed(reset);
}

function reset() {
  clear();
  p2.hide();
  handleInput();

  // Update color palettes
  setColorPalettes();
  background(currentBackgroundPalette[0]);

  // Update shape
  setShape();

  // Update ruleset
  ruleDropdown0.selectRule();
  lsystem0 = ruleDropdown0.setRule();
  rules = lsystem0[0];
  angle = lsystem0[1];
  lf = lsystem0[2];
  maxLevel = lsystem0[3];
  sentence = lsystem0[4];

  wadj = shapeValues0[0];
  hadj = shapeValues0[1];
  level = shapeValues0[2];
  length = shapeValues0[3];
  sw = shapeValues0[4];
  currentAlpha = shapeValues0[5];

  addTurtle();
}

function addShapeUI() {
  shape_ui = new ShapeUI(
    10,
    250,
    currentStrokePalette,
    currentFillPalette,
    fillShape0,
    addStroke0
  );
  shapeDropdown = shape_ui.dropdown;
  sliderGroup0 = shape_ui.sliderGroup;
  sliders0 = shape_ui.sliders;
}

function setShape() {
  shapeValues0 = sliderGroup0.getValues();
  shape_ui.selectShape();
  p2 = addShapeMessage(shape_ui.message);
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

function addTurtle() {
  turtle0 = new Turtle(
    sentence,
    length,
    angle,
    lf,
    sw,
    currentAlpha,
    currentStrokePalette,
    currentFillPalette,
    fillShape0,
    addStroke0,
    shape_ui
  );

  push();
  translate(width * wadj, height * hadj);
  for (let i = 0; i < level; i++) {
    turtle0.generate();
  }
  turtle0.turtle();
  pop();
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
