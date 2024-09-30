// https://github.com/kfahn22/L-System-Pattern-Generator
// https://editor.p5js.org/kfahn/sketches/3fdOtG7WX

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
  canvas = createCanvas(800, 800);
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
  let values = updateValues();
  setSystemVariables(values);
}

function updateValues() {
  let values = [];
  // Add ruleset, shape, palettes dropdown values
  for (let i = 0; i < dropdowns.length; i++) {
    values.push(dropdowns[i].selected());
  }
  // Add values for addStroke, fillShape, and addP5Grain
  for (let i = 0; i < 3; i++) {
    values.push(checkBoxes[i].checked());
  }
  let sliderValues = sliderGroup.getValues();
  for (let s of sliderValues) {
    values.push(s);
  }
  sliderGroup.updateLabels();
  console.log(values);
  return values;
}

function addLsystem() {
  controls = new AddControls(750, rulesetData);
  addControls();

  let values = updateValues();
  setSystemVariables(values);
  // Add function to handle changes in sliders
  handleInput(dropdowns, resetButton, sliders);
  return controls;
}

function addControls() {
  // Retrieve control objects
  dropdowns = controls.returnDropdowns();
  resetButton = controls.returnButtons();
  checkBoxes = controls.returnCheckboxes();
  sliderGroup = controls.sliderGroup;
  sliders = sliderGroup.sliders;
  //return [dropdowns, resetButton, sliderGroup, sliders];
}

function setSystemVariables(values) {
  console.log(values);
  // The palette choices are aliases for urls
  // We need to create the palette using the url - refer to the palette-dropdown.js file
  // Use the url to set the palette
  let [currentBackgroundPalette, currentStrokePalette, currentFillPalette] =
    controls.setPalettes(values[2], values[3], values[4]);

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

// This function adds a message if the choosen shape is a function of the parameters (a, b, m, n, n1, n2, n3)
// A warning is also added if the choosen level exceeds some limits I imposed to keep the sketch from slowing down significantly or freezing
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
