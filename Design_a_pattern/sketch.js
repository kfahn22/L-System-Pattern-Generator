// https://github.com/kfahn22/L-System-Pattern-Generator
// https://editor.p5js.org/kfahn/sketches/6maEEOkD2

// Lsystem data from rules.json
let rulesetData;

// Control variables
let controls;
let sliderGroup;
let sliders = []; // Array to store slider references
let dropdowns = []; // Array to store dropdowns
let shape_ui;
let images = [];

// Message variables
let ruleWarning; // Warning if level gets too high
let shapeMessage; // Shape message re parameters to choosen shape

// Buttons/checkboxes
let resetButton;
// addStroke , fillShape , addP5Grain (default false),
// https://github.com/meezwhite/p5.grain
let checkBoxes;

// Preload the L-system rulesets and example data
function preload() {
  rulesetData = loadJSON("rules.json");
  for (let i = 0; i < 10; i++) {
    const path = "images/flowers";
    images[i] = loadImage(`${path}/${i}.png`);
  }
}

function setup() {
  canvas = createCanvas(600, 600);
  canvas.position(250, 200);
  p5grain.setup();

  controls = addLsystem();
}

function handleInput(dropdowns, resetButton, sliders) {
  for (let d of dropdowns) {
    d.changed(reset);
  }
  for (let s of sliders) {
    s.input(reset);
  }
  for (let c of checkBoxes) {
    c.changed(reset);
  }
  resetButton.mousePressed(reset);
}

function reset() {
  clear();
  shapeMessage.hide();
  ruleWarning.hide();
  controls.getValues();
  let values = controls.values;
  sliderGroup.updateLabels();
  setSystemVariables(values);
}

function addLsystem() {
  controls = new AddControls(750, rulesetData);
  //[dropdowns, resetButton] = addControls();
  addControls();
  controls.getValues();
  let values = controls.values;
  setSystemVariables(values);
  // Add function to handle changes in sliders
  handleInput(dropdowns, resetButton, sliders);
  return controls;
}

function addControls() {
  //dropdowns = controls.returnDropdowns();
  // for (d of otherdropdowns) {
  //   dropdowns.push(d);
  // }
  // Retrieve control objects
  resetButton = controls.returnButtons();
  checkBoxes = controls.returnCheckboxes();
  sliderGroup = controls.sliderGroup;
  sliders = sliderGroup.sliders;
  //return [dropdowns, resetButton, sliderGroup, sliders];
}

function setSystemVariables(values) {
  let [currentBackgroundPalette, currentStrokePalette, currentFillPalette] =
    controls.setPalettes();

  background(currentBackgroundPalette[0]);

  let ruleset = controls.ruleset;
  let shape_ui = controls.shape_ui;

  let colorMode;
  if (values[5] === true && values[6] === false) {
    colorMode = 0;
  } else if (values[5] === false && values[6] === true) {
    colorMode = 1;
  } else if (values[5] === true && values[6] === true) {
    colorMode = 2;
  }

  //Add turtle system
  let turtle = new Turtle(
    values,
    shape_ui,
    ruleset,
    currentStrokePalette,
    currentFillPalette,
    colorMode,
    images
  );

  // When both stroke and fill are choosen, render is best if they are added sequencially
  if (colorMode == 0 || colorMode == 1) {
    turtle.addLsystem(colorMode);
  } else if (colorMode == 2) {
    turtle.addLsystemStrokeFill();
  }
  // Update value of addP5Grain
  checkBoxes[2].checked(values[7]);

  if (values[7] == true) {
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
  shapeMessage.position(250, 110);
  shapeMessage.addClass("p");

  if (addMessage) {
    shapeMessage.show();
  } else {
    shapeMessage.hide();
  }
  ruleWarning = createP(warning);
  ruleWarning.position(250, 130);
  ruleWarning.addClass("p");

  if (!addWarning) {
    ruleWarning.hide();
  }
}
