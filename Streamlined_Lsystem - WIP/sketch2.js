// https://editor.p5js.org/kfahn/sketches/eJ37jUEeU

// Lsystem data from rules.json
let rulesetData;

// Control variables
let controls;
let sliderGroup;
let sliders = []; // Array to store slider references
let dropdowns = []; // Array to store dropdowns
let shape_ui;

// Message variables
let ruleWarning; // Warning if level gets too high
let shapeMessage; // Shape message re parameters to choosen shape

// Buttons/checkboxes
let resetButton;
let fillShape; // Boolean, default false
let addStroke; // Boolean, defualt true

// https://github.com/meezwhite/p5.grain
let addGrain; // Boolean, default false

// Preload the L-system rulesets and example data
function preload() {
  rulesetData = loadJSON("rules.json");
}

function setup() {
  canvas = createCanvas(600, 600);
  canvas.position(250, 200);
  p5grain.setup();


  controls = addLsystem("dragon1", "Gear");
}

function handleInput(sliders, dropdowns, resetButton) {
  for (let s of sliders) {
    s.input(reset);
  }

  for (let d of dropdowns) {
    d.changed(reset);
  }
  resetButton.mousePressed(reset);
}

function reset() {
  clear();
  shapeMessage.hide();
  ruleWarning.hide();
  setSystemVariables(controls);
}

function addLsystem(ruleChoice, shapeChoice) {
  let controls = new AddControls(10, 250, 250, rulesetData, ruleChoice, shapeChoice);
  [dropdowns, resetButton, sliderGroup, sliders, shape_ui] =
    addControls(controls);
  setSystemVariables(controls);
  // Add function to handle changes in sliders
  handleInput(sliders, dropdowns, resetButton);
  return controls;
}

function addControls(controls) {
  dropdowns = controls.returnDropdowns();
  resetButton = controls.returnButtons();
  [fillShape, addStroke, addGrain] = controls.returnCheckboxes();
  sliderGroup = controls.sliderGroup;
  sliders = sliderGroup.sliders;
  shape_ui = controls.shape_ui;
  return [dropdowns, resetButton, sliderGroup, sliders, shape_ui];
}

function setSystemVariables(controls) {
  controls.setPalettes();
  [currentBackgroundPalette, currentStrokePalette, currentFillPalette] =
    controls.returnColorPalettes();
  background(currentBackgroundPalette[0]);

  let values = sliderGroup.getValues();
 console.log(values)
  sliderGroup.updateLabels();
  shape_ui.selectShape(values);

  let ruleset = controls.ruleset;

  //Add turtle system
  let turtle = new Turtle(fillShape, addStroke, shape_ui, values, ruleset);
  turtle.addLsystem(currentStrokePalette, currentFillPalette);

  if (addGrain.checked() == true) {
    applyChromaticGrain(42);
  }
  // Add messages for shape parameters and rule level
  addMessages(shape_ui.message, turtle.warning, turtle.addWarning);
}

function addMessages(newMessage, warning, addWarning) {
  let addMessage = true;
  let message = null;
  if (newMessage != null) {
    message = newMessage;
  } else addMessage = false;

  shapeMessage = createP(message);
  shapeMessage.position(600, 10);
  shapeMessage.addClass("p");

  if (addMessage) {
    shapeMessage.show();
  } else {
    shapeMessage.hide();
  }
  ruleWarning = createP(warning);
  ruleWarning.position(600, 50);
  ruleWarning.addClass("p");

  if (!addWarning) {
    ruleWarning.hide();
  }
}
